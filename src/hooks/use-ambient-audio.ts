import { useEffect, useRef, useCallback, useState } from "react";

let audioCtx: AudioContext | null = null;

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new AudioContext();
  }
  return audioCtx;
}

/**
 * Ambient low-frequency hum that grows louder as user scrolls deeper.
 * Returns { startAudio, isActive } — must be triggered by user gesture.
 */
export function useAmbientHum() {
  const nodesRef = useRef<{
    osc: OscillatorNode;
    gain: GainNode;
    osc2: OscillatorNode;
    gain2: GainNode;
  } | null>(null);
  const [isActive, setIsActive] = useState(false);
  const rafRef = useRef<number>(0);

  const startAudio = useCallback(() => {
    if (nodesRef.current) return;
    const ctx = getAudioContext();
    if (ctx.state === "suspended") ctx.resume();

    // Primary drone — 55 Hz (low A)
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = 55;
    gain.gain.value = 0;
    osc.connect(gain).connect(ctx.destination);
    osc.start();

    // Secondary harmonic — 82 Hz with slight detune for texture
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = "sine";
    osc2.frequency.value = 82;
    osc2.detune.value = 5;
    gain2.gain.value = 0;
    osc2.connect(gain2).connect(ctx.destination);
    osc2.start();

    nodesRef.current = { osc, gain, osc2, gain2 };
    setIsActive(true);

    // Scroll listener — map scroll progress to volume
    const update = () => {
      const scrollFrac = Math.min(
        window.scrollY / (document.documentElement.scrollHeight - window.innerHeight),
        1
      );
      // Volume ramps from 0.02 to 0.18 across the page
      const vol = 0.02 + scrollFrac * 0.16;
      if (nodesRef.current) {
        nodesRef.current.gain.gain.value = vol;
        nodesRef.current.gain2.gain.value = vol * 0.4;
      }
      rafRef.current = requestAnimationFrame(update);
    };
    update();
  }, []);

  useEffect(() => {
    return () => {
      cancelAnimationFrame(rafRef.current);
      if (nodesRef.current) {
        nodesRef.current.osc.stop();
        nodesRef.current.osc2.stop();
        nodesRef.current = null;
      }
    };
  }, []);

  return { startAudio, isActive };
}

/**
 * Ventilator breathing sounds — hiss/click pattern using filtered noise.
 * Plays while `active` is true.
 */
export function useVentilatorSound(active: boolean) {
  const nodesRef = useRef<{
    source: AudioBufferSourceNode;
    gain: GainNode;
    filter: BiquadFilterNode;
    lfo: OscillatorNode;
    lfoGain: GainNode;
  } | null>(null);

  useEffect(() => {
    if (!active) {
      // Fade out
      if (nodesRef.current) {
        const { gain, source, lfo } = nodesRef.current;
        gain.gain.linearRampToValueAtTime(0, getAudioContext().currentTime + 0.5);
        setTimeout(() => {
          try { source.stop(); lfo.stop(); } catch {}
          nodesRef.current = null;
        }, 600);
      }
      return;
    }

    // Don't double-start
    if (nodesRef.current) return;

    const ctx = getAudioContext();
    if (ctx.state === "suspended") return; // Need user gesture first

    // Create white noise buffer
    const bufferSize = ctx.sampleRate * 4;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.5;
    }

    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    // Bandpass filter for "hiss" quality
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = 800;
    filter.Q.value = 0.8;

    // LFO modulates gain for breathing rhythm (~4s cycle = 0.25 Hz)
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.type = "sine";
    lfo.frequency.value = 0.25; // 4-second breathing cycle
    lfoGain.gain.value = 0.06;

    const gain = ctx.createGain();
    gain.gain.value = 0.04;

    // Wire: noise -> filter -> gain -> destination
    //        lfo -> lfoGain -> gain.gain
    source.connect(filter).connect(gain).connect(ctx.destination);
    lfo.connect(lfoGain).connect(gain.gain);

    source.start();
    lfo.start();

    nodesRef.current = { source, gain, filter, lfo, lfoGain };

    return () => {
      try { source.stop(); lfo.stop(); } catch {}
      nodesRef.current = null;
    };
  }, [active]);
}

/**
 * Subtle EKG-style beep that plays periodically while active.
 */
export function useHeartbeepSound(active: boolean) {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!active) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    const ctx = getAudioContext();
    if (ctx.state === "suspended") return;

    const playBeep = () => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = 1000; // classic monitor beep
      gain.gain.setValueAtTime(0.03, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
      osc.connect(gain).connect(ctx.destination);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.15);
    };

    playBeep();
    intervalRef.current = setInterval(playBeep, 1800); // beep every 1.8s

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [active]);
}

/**
 * Peaceful release sound — warm chord that fades in with a flatline transition.
 */
export function playReleaseSound() {
  const ctx = getAudioContext();
  if (ctx.state === "suspended") ctx.resume();
  const now = ctx.currentTime;

  // Short flatline beep (sustained tone that decays)
  const flatline = ctx.createOscillator();
  const flatGain = ctx.createGain();
  flatline.type = "sine";
  flatline.frequency.value = 1000;
  flatGain.gain.setValueAtTime(0.06, now);
  flatGain.gain.linearRampToValueAtTime(0.02, now + 2);
  flatGain.gain.exponentialRampToValueAtTime(0.001, now + 4);
  flatline.connect(flatGain).connect(ctx.destination);
  flatline.start(now);
  flatline.stop(now + 4);

  // Warm peaceful chord (C major with overtones) fading in after flatline
  const notes = [261.63, 329.63, 392.0, 523.25]; // C4, E4, G4, C5
  notes.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0, now + 1.5);
    gain.gain.linearRampToValueAtTime(0.04, now + 3);
    gain.gain.linearRampToValueAtTime(0.03, now + 6);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 10);
    osc.connect(gain).connect(ctx.destination);
    osc.start(now + 1.5);
    osc.stop(now + 10);
  });
}
