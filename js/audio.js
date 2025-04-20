// js/audio.js
import { config } from './config.js';
import { state } from './state.js';

export function initAudio() {
    try {
        if (typeof Tone !== 'undefined' && Tone.Noise) {
             state.backgroundNoise = new Tone.Noise({ type: "brown", volume: config.noiseMinVolume }).toDestination();
             console.log("Tone.js Noise ready.");
        } else { console.warn("Tone.js library not found or Tone.Noise is unavailable."); state.backgroundNoise = null; }
    } catch (error) { console.error("Error initializing Tone.js noise:", error); state.backgroundNoise = null; }
}

// --- Esporta questa funzione ---
export async function startAudioContextAndNoise() {
    if (!state.backgroundNoise || state.isToneStarted) return false;
     try {
        await Tone.start(); // Cruciale per interazione utente (tocco o tasto)
        state.isToneStarted = true;
        console.log("Tone.js context started by user interaction.");
        if (state.backgroundNoise.state !== "started") {
             state.backgroundNoise.start();
        }
         return true;
    } catch (error) {
        console.error("Error starting Tone.js context:", error);
        return false;
    }
}

export function rampVolume(targetVolume, duration) {
     if (state.backgroundNoise && state.isToneStarted) {
         state.backgroundNoise.volume.rampTo(targetVolume, duration);
     }
}
