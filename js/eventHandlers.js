// js/eventHandlers.js
import { config } from './config.js';
import { state } from './state.js';
import { elements } from './elements.js';
import { updatePromptDisplay, checkAndShowInactivityPrompt, setTimelineGlow, updateAutoAdvanceButtonVisibility } from './ui.js';
// --- AGGIUNTO startAudioContextAndNoise ALL'IMPORT ---
import { startAudioContextAndNoise, rampVolume } from './audio.js';

// --- HELPER: Logica per iniziare l'avanzamento (tasto o tocco) ---
async function startProgression() {
    // Non iniziare se già in movimento o se la fine è raggiunta
    if (state.isMovingRight || state.isEnding) return;

    // Ferma timer inattività se attivo
    if (state.inactivityTimeoutId) {
        console.log('[Progression] Clearing inactivity timeout ID:', state.inactivityTimeoutId);
    }
    clearTimeout(state.inactivityTimeoutId); state.inactivityTimeoutId = null;

    // Nascondi prompt inattività se visibile
    if (state.currentPromptId === 'inactive_initial' || state.currentPromptId === 'inactive_shine') {
        console.log('[Progression] Hiding inactivity prompt:', state.currentPromptId);
        updatePromptDisplay();
    }

    state.isMovingRight = true; // Attiva movimento
    state.lastTimestampMs = 0; // Resetta per calcolo delta

    // Avvia/Riprendi Audio (assicurandosi che il contesto sia attivo)
    if (!state.isToneStarted) {
        const success = await startAudioContextAndNoise(); // Aspetta avvio contesto
        if (success) {
             rampVolume(config.noiseMaxVolume, config.audioRampExpandDuration);
        }
    } else {
         rampVolume(config.noiseMaxVolume, config.audioRampExpandDuration);
    }

    // Attiva Glow
    setTimelineGlow(true);
    console.log('[Progression] Started.');
}

// --- HELPER: Logica per fermare l'avanzamento (tasto o tocco) ---
function stopProgression() {
    // Non fermare se non era in movimento o se la fine è attiva
    if (!state.isMovingRight || state.isEnding) return;

    state.isMovingRight = false; // Ferma movimento

    // Abbassa Volume Audio
    rampVolume(config.noiseMinVolume, config.audioRampShrinkDuration);
    // Rimuovi Glow Timeline
    setTimelineGlow(false);

    // Imposta timer inattività (solo se non stiamo finendo)
    if (!state.isEnding) {
        clearTimeout(state.inactivityTimeoutId);
        const delay = state.totalHoldTimeSec === 0 ? config.initialInactivityDelayMs : config.shineInactivityDelayMs;
        state.inactivityTimeoutId = setTimeout(checkAndShowInactivityPrompt, delay);
        console.log(`[Progression] Stopped. Inactivity timer set (${delay}ms). ID: ${state.inactivityTimeoutId}`);
    } else {
         console.log('[Progression] Stopped (End sequence active).');
    }
}


// --- Gestore Click Bottone (Usa gli helper) ---
export function handleAutoAdvanceClick() {
    if (state.isEnding) return;
    const buttonElement = elements.autoAdvanceButton;
    if (!buttonElement) return;

    state.isAutoAdvancing = !state.isAutoAdvancing;
    console.log(`[handleAutoAdvanceClick] Auto-advance toggled to: ${state.isAutoAdvancing}`);

    if (state.isAutoAdvancing) {
        startProgression(); // Usa helper per avviare
    } else {
        stopProgression(); // Usa helper per fermare
    }
    updateAutoAdvanceButtonVisibility();
}

// --- Gestore KeyDown (Usa gli helper) ---
export async function handleKeyDown(event) {
    if (state.isEnding) return; // Ignora input alla fine
    if (event.key !== "ArrowRight") return;

    // Disattiva auto-advance se attivo
    if (state.isAutoAdvancing) {
         console.log('[handleKeyDown] Manual input detected, disabling auto-advance.');
         handleAutoAdvanceClick(); // Questo chiamerà stopProgression internamente
         // NON impostare isMovingRight a true qui, perchè lo farà startProgression
    }

    // Evita doppie chiamate se il tasto viene tenuto premuto
    if (state.isMovingRight) return;

    event.preventDefault(); // Previene comportamento default tasto
    await startProgression(); // Chiama l'helper (await per sicurezza audio)
}

// --- Gestore KeyUp (Usa gli helper) ---
export function handleKeyUp(event) {
    if (state.isEnding) return; // Ignora input alla fine
    if (event.key !== "ArrowRight") return;

    // Se l'auto-avanzamento è attivo, non fare nulla (è stato gestito da keyDown)
    if (state.isAutoAdvancing) return;

    // Se non era in movimento (es. doppio keyup), non fare nulla
    if (!state.isMovingRight) return;

    event.preventDefault();
    stopProgression(); // Chiama l'helper
}

// --- NUOVI GESTORI TOUCH ---

export async function handleTouchStart(event) {
    if (state.isEnding) return;

    // Disattiva auto-advance se attivo
    if (state.isAutoAdvancing) {
        console.log('[handleTouchStart] Touch detected, disabling auto-advance.');
        handleAutoAdvanceClick(); // Disattiva auto-advance
    }

    // Evita doppie chiamate se il tocco persiste
    if (state.isMovingRight) return;

    event.preventDefault(); // Cruciale per evitare scroll/zoom/etc.
    console.log('[handleTouchStart] Touch detected, starting progression.');
    await startProgression(); // Chiama l'helper (await per sicurezza audio)
}

export function handleTouchEnd(event) {
    if (state.isEnding) return;

    // Se l'auto-avanzamento è attivo, non fare nulla
    if (state.isAutoAdvancing) return;

    // Se non era in movimento (improbabile ma per sicurezza)
    if (!state.isMovingRight) return;

    event.preventDefault();
    console.log('[handleTouchEnd] Touch released, stopping progression.');
    stopProgression(); // Chiama l'helper
}

// Gestisci anche touchcancel come touchend
export function handleTouchCancel(event) {
     if (state.isEnding) return;
     if (state.isAutoAdvancing) return;
     if (!state.isMovingRight) return;

     event.preventDefault();
     console.log('[handleTouchCancel] Touch cancelled, stopping progression.');
     stopProgression();
}

// --- FINE NUOVI GESTORI TOUCH ---
