// js/eventHandlers.js
import { config } from './config.js';
import { state } from './state.js';
import { updatePromptDisplay, checkAndShowInactivityPrompt, setTimelineGlow } from './ui.js';
import { startAudioContextAndNoise, rampVolume } from './audio.js';
// import { startAnimationLoop } from './mainLoop.js'; // Non serve riavviare loop qui

export async function handleKeyDown(event) {
    if (event.key !== "ArrowRight" || state.isMovingRight) return;
    event.preventDefault();

    // Ferma timer inattività se attivo
    // *** AGGIUNGI QUESTO LOG ***
    if (state.inactivityTimeoutId) {
        console.log('[handleKeyDown] Clearing inactivity timeout ID:', state.inactivityTimeoutId);
    }
    clearTimeout(state.inactivityTimeoutId); state.inactivityTimeoutId = null;

    // Nascondi prompt inattività se visibile
    if (state.currentPromptId === 'inactive_initial' || state.currentPromptId === 'inactive_shine') {
         console.log('[handleKeyDown] Hiding inactivity prompt:', state.currentPromptId);
        updatePromptDisplay();
    }

    state.isMovingRight = true;
    state.lastTimestampMs = 0; // Resetta per calcolo delta

    // Audio
    if (!state.isToneStarted) {
        const success = await startAudioContextAndNoise();
        if (success) {
             rampVolume(config.noiseMaxVolume, config.audioRampExpandDuration);
        }
    } else {
         rampVolume(config.noiseMaxVolume, config.audioRampExpandDuration);
    }

    // Glow
    setTimelineGlow(true);

    // Riavvia loop se necessario (normalmente non serve)
    // if (state.animationFrameId === null) { startAnimationLoop(); }
}

export function handleKeyUp(event) {
    if (event.key !== "ArrowRight" || !state.isMovingRight) return;
    event.preventDefault();
    state.isMovingRight = false;

    // Audio
    rampVolume(config.noiseMinVolume, config.audioRampShrinkDuration);
    // Glow
    setTimelineGlow(false);

    // Imposta timer inattività con delay corretto
    clearTimeout(state.inactivityTimeoutId); // Cancella eventuali precedenti (sicurezza)
    const delay = state.totalHoldTimeSec === 0 ? config.initialInactivityDelayMs : config.shineInactivityDelayMs;

    // *** AGGIUNGI QUESTO LOG ***
    console.log(`[handleKeyUp] Setting inactivity timeout with delay: ${delay}ms (time: ${state.totalHoldTimeSec.toFixed(1)}s)`);

    // Chiama checkAndShowInactivityPrompt DOPO il delay
    state.inactivityTimeoutId = setTimeout(checkAndShowInactivityPrompt, delay);

     // *** AGGIUNGI QUESTO LOG ***
     console.log('[handleKeyUp] Inactivity timeout ID set to:', state.inactivityTimeoutId);
}