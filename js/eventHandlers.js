// js/eventHandlers.js - fix
import { config } from './config.js';
import { state } from './state.js';
// --- !!! AGGIUNGERE IMPORT QUI !!! ---
import { elements } from './elements.js';
// --- FINE AGGIUNTA IMPORT ---
import { updatePromptDisplay, checkAndShowInactivityPrompt, setTimelineGlow, updateAutoAdvanceButtonVisibility } from './ui.js';
import { startAudioContextAndNoise, rampVolume } from './audio.js';

export function handleAutoAdvanceClick() {
    // Ora 'elements' dovrebbe essere definito grazie all'import sopra
    const buttonElement = elements.autoAdvanceButton;
    if (!buttonElement) {
        console.warn("[handleAutoAdvanceClick] Button element not found in 'elements' object.");
        return;
    }

    state.isAutoAdvancing = !state.isAutoAdvancing;
    console.log(`[handleAutoAdvanceClick] Auto-advance toggled to: ${state.isAutoAdvancing}`);

    if (state.isAutoAdvancing) {
        state.isMovingRight = true;
        state.lastTimestampMs = 0;
        if (state.currentPromptId === 'inactive_initial' || state.currentPromptId === 'inactive_shine') {
            updatePromptDisplay();
        }
        clearTimeout(state.inactivityTimeoutId); state.inactivityTimeoutId = null;
        setTimelineGlow(true);
        rampVolume(config.noiseMaxVolume, config.audioRampExpandDuration);
    } else {
        state.isMovingRight = false;
        setTimelineGlow(false);
        rampVolume(config.noiseMinVolume, config.audioRampShrinkDuration);
        clearTimeout(state.inactivityTimeoutId);
        const delay = state.totalHoldTimeSec === 0 ? config.initialInactivityDelayMs : config.shineInactivityDelayMs;
        state.inactivityTimeoutId = setTimeout(checkAndShowInactivityPrompt, delay);
    }
    updateAutoAdvanceButtonVisibility();
}


export async function handleKeyDown(event) {
    if (event.key !== "ArrowRight") return;

    if (state.isAutoAdvancing) {
         console.log('[handleKeyDown] Manual input detected, disabling auto-advance.');
         handleAutoAdvanceClick();
    }

    if (state.isMovingRight) return;

    event.preventDefault();

    clearTimeout(state.inactivityTimeoutId); state.inactivityTimeoutId = null;
    if (state.currentPromptId === 'inactive_initial' || state.currentPromptId === 'inactive_shine') {
        updatePromptDisplay();
    }

    state.isMovingRight = true;
    state.lastTimestampMs = 0;

    if (!state.isToneStarted) {
        const success = await startAudioContextAndNoise();
        if (success) { rampVolume(config.noiseMaxVolume, config.audioRampExpandDuration); }
    } else {
         rampVolume(config.noiseMaxVolume, config.audioRampExpandDuration);
    }
    setTimelineGlow(true);
}

export function handleKeyUp(event) {
    if (event.key !== "ArrowRight") return;

    if (state.isAutoAdvancing) { return; }
    if (!state.isMovingRight) return;

    event.preventDefault();
    state.isMovingRight = false;

    rampVolume(config.noiseMinVolume, config.audioRampShrinkDuration);
    setTimelineGlow(false);

    clearTimeout(state.inactivityTimeoutId);
    const delay = state.totalHoldTimeSec === 0 ? config.initialInactivityDelayMs : config.shineInactivityDelayMs;
    state.inactivityTimeoutId = setTimeout(checkAndShowInactivityPrompt, delay);
}
