// js/audio.js
import { config } from './config.js';
import { state } from './state.js'; // Importa per modificare state.backgroundNoise e state.isToneStarted

export function initAudio() {
    try {
        if (typeof Tone !== 'undefined' && Tone.Noise) {
             state.backgroundNoise = new Tone.Noise({ type: "brown", volume: config.noiseMinVolume }).toDestination();
             console.log("Tone.js Noise ready.");
        } else { console.warn("Tone.js library not found or Tone.Noise is unavailable."); state.backgroundNoise = null; }
    } catch (error) { console.error("Error initializing Tone.js noise:", error); state.backgroundNoise = null; }
}

export async function startAudioContextAndNoise() {
    if (!state.backgroundNoise || state.isToneStarted) return; // Già avviato o non inizializzato
     try {
        await Tone.start();
        state.isToneStarted = true;
        console.log("Tone.js context started.");
        if (state.backgroundNoise.state !== "started") {
             state.backgroundNoise.start();
        }
         return true; // Successo
    } catch (error) {
        console.error("Error starting Tone.js context:", error);
        return false; // Fallimento
    }
}

export function rampVolume(targetVolume, duration) {
     if (state.backgroundNoise && state.isToneStarted) {
         state.backgroundNoise.volume.rampTo(targetVolume, duration);
     }
}