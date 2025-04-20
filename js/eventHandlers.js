// js/eventHandlers.js
import { config } from './config.js';
import { state } from './state.js';
import { updatePromptDisplay, checkAndShowInactivityPrompt, setTimelineGlow, updateAutoAdvanceButtonVisibility } from './ui.js';
import { startAudioContextAndNoise, rampVolume } from './audio.js';

// --- !!! AGGIUNTO 'export' QUI !!! ---
export function handleAutoAdvanceClick() {
    // Recupera l'elemento bottone da elements (deve essere popolato da init)
    const buttonElement = elements.autoAdvanceButton; // Usa l'oggetto 'elements'
    if (!buttonElement) {
        console.warn("[handleAutoAdvanceClick] Button element not found in 'elements' object.");
        return;
    }

    // Inverti lo stato di avanzamento automatico
    state.isAutoAdvancing = !state.isAutoAdvancing;
    console.log(`[handleAutoAdvanceClick] Auto-advance toggled to: ${state.isAutoAdvancing}`);

    if (state.isAutoAdvancing) {
        // Attivato Auto-Advance
        state.isMovingRight = true; // Simula pressione tasto
        state.lastTimestampMs = 0;
        if (state.currentPromptId === 'inactive_initial' || state.currentPromptId === 'inactive_shine') {
            updatePromptDisplay();
        }
        clearTimeout(state.inactivityTimeoutId); state.inactivityTimeoutId = null;
        setTimelineGlow(true);
        rampVolume(config.noiseMaxVolume, config.audioRampExpandDuration);
    } else {
        // Disattivato Auto-Advance
        state.isMovingRight = false;
        setTimelineGlow(false);
        rampVolume(config.noiseMinVolume, config.audioRampShrinkDuration);
        clearTimeout(state.inactivityTimeoutId);
        const delay = state.totalHoldTimeSec === 0 ? config.initialInactivityDelayMs : config.shineInactivityDelayMs;
        state.inactivityTimeoutId = setTimeout(checkAndShowInactivityPrompt, delay);
    }

    // Aggiorna l'aspetto del bottone (classe .active)
    updateAutoAdvanceButtonVisibility(); // Questa funzione ora gestisce anche la classe 'active'
}
// --- FINE CORREZIONE ---


export async function handleKeyDown(event) {
    if (event.key !== "ArrowRight") return;

    if (state.isAutoAdvancing) {
         console.log('[handleKeyDown] Manual input detected, disabling auto-advance.');
         // Chiama la funzione per disattivare l'auto-advance
         // Assicurati che questa funzione sia definita e accessibile (lo è perché esportata)
         handleAutoAdvanceClick();
    }

    if (state.isMovingRight) return; // Già in movimento manuale

    event.preventDefault();

    clearTimeout(state.inactivityTimeoutId); state.inactivityTimeoutId = null;
    if (state.currentPromptId === 'inactive_initial' || state.currentPromptId === 'inactive_shine') {
        updatePromptDisplay();
    }

    state.isMovingRight = true; // Attiva movimento manuale
    state.lastTimestampMs = 0;

    // Audio
    if (!state.isToneStarted) {
        const success = await startAudioContextAndNoise();
        if (success) { rampVolume(config.noiseMaxVolume, config.audioRampExpandDuration); }
    } else {
         rampVolume(config.noiseMaxVolume, config.audioRampExpandDuration);
    }
    // Glow
    setTimelineGlow(true);
}

export function handleKeyUp(event) {
    if (event.key !== "ArrowRight") return;

    // Ignora keyUp se l'auto-avanzamento è attivo (è stato disattivato da keyDown)
    if (state.isAutoAdvancing) {
        // console.log('[handleKeyUp] Key released, but auto-advance was active.'); // Log opzionale
        return;
    }

     // Ignora se non era in movimento (es. doppio keyup)
     if (!state.isMovingRight) return;

    event.preventDefault();
    state.isMovingRight = false; // Ferma movimento manuale

    // Audio
    rampVolume(config.noiseMinVolume, config.audioRampShrinkDuration);
    // Glow
    setTimelineGlow(false);

    // Imposta timer inattività
    clearTimeout(state.inactivityTimeoutId);
    const delay = state.totalHoldTimeSec === 0 ? config.initialInactivityDelayMs : config.shineInactivityDelayMs;
    state.inactivityTimeoutId = setTimeout(checkAndShowInactivityPrompt, delay);
}
