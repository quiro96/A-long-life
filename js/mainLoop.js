// js/mainLoop.js
import { config } from './config.js';
import { state } from './state.js';
import {
    updateTimerDisplay, updateTimelineVisuals,
    handleTitleVisibility, updateYearGrid,
    updatePromptDisplay, updateAnimationDisplay,
    updateAutoAdvanceButtonVisibility,
    fadeOutElements, showEndScreen // Importa funzioni fine
} from './ui.js';
import { rampVolume } from './audio.js'; // Importa per fermare audio
import { setTimelineGlow } from './ui.js'; // Importa per rimuovere glow


function easeInOutExpo(t) { /* ... (invariato) ... */ }
function updateTimerAndTimelineLogic(deltaTimeMs) { /* ... (invariato) ... */ if (state.isMovingRight) { const timeIncrement = (deltaTimeMs * config.timeMultiplier) / 1000; state.totalHoldTimeSec += timeIncrement; const maxWidthPx = window.innerWidth / 2; if (state.currentWidthPx < maxWidthPx) { const widthIncrement = (config.speedPxPerSec * deltaTimeMs) / 1000; state.currentWidthPx = Math.min(state.currentWidthPx + widthIncrement, maxWidthPx); } } }
function handleTimelineEvents() { /* ... (invariato) ... */ if (state.isTitleVisible) return; let activePromptText = null; let activePromptId = null; let activeAnimationId = null; let activeEvent = null; for (const event of config.timelineEvents) { if (event.type !== 'title' && state.totalHoldTimeSec >= event.start && state.totalHoldTimeSec < event.end) { activeEvent = event; break; } } const wasTimelineEventActive = state.currentPromptId && state.currentPromptId !== 'inactive_initial' && state.currentPromptId !== 'inactive_shine'; const wasTimelineAnimActive = state.currentAnimationId; if (activeEvent) { activePromptText = activeEvent.text || null; activePromptId = activeEvent.id; activeAnimationId = (activeEvent.type === 'animation') ? activeEvent.id : null; if (state.currentPromptId === 'inactive_initial' || state.currentPromptId === 'inactive_shine') { updatePromptDisplay(); } clearTimeout(state.inactivityTimeoutId); state.inactivityTimeoutId = null; } else { if (wasTimelineEventActive) { activePromptText = null; activePromptId = null; } else { activePromptText = undefined; activePromptId = undefined; } if (wasTimelineAnimActive) { activeAnimationId = null; } else { activeAnimationId = undefined; } } if (activePromptId !== undefined) { updatePromptDisplay(activePromptText, activePromptId); } if (activeAnimationId !== undefined) { updateAnimationDisplay(activeAnimationId); } }


function animationLoop(timestampMs) {
    // Richiedi sempre il prossimo frame finché non viene annullato esplicitamente
    state.animationFrameId = requestAnimationFrame(animationLoop);

    // Calcolo Delta Time (spostato prima del controllo isEnding)
    if (state.lastTimestampMs === 0) {
        state.lastTimestampMs = timestampMs;
        return; // Salta primo frame
    }
    const deltaTimeMs = timestampMs - state.lastTimestampMs;
    state.lastTimestampMs = timestampMs;
    if (deltaTimeMs <= 0 || deltaTimeMs > 500) {
        return; // Ignora frame anomali
    }

    // Se la sequenza finale è attiva, non eseguire più la logica di gioco/UI
    if (state.isEnding) {
         // Potremmo voler fermare completamente il loop dopo un po'
         // cancelAnimationFrame(state.animationFrameId);
         // state.animationFrameId = null;
         return;
    }

    // --- Logica di Gioco/UI (Eseguita solo se !state.isEnding) ---

    // Aggiorna stato logico (tempo, larghezza)
    updateTimerAndTimelineLogic(deltaTimeMs);

    // Aggiorna Interfaccia Utente
    updateTimerDisplay();
    updateTimelineVisuals();
    handleTitleVisibility();
    handleTimelineEvents();
    updateYearGrid();
    updateAutoAdvanceButtonVisibility();

    // --- CONTROLLO ATTIVAZIONE FINE (DOPO tutti gli aggiornamenti UI) ---
    if (state.totalHoldTimeSec >= config.endTime) {
        state.isEnding = true; // Imposta lo stato finale ORA
        console.log(`[End Sequence] End time ${config.endTime}s reached. Starting end sequence.`);

        // Ferma avanzamento
        state.isMovingRight = false;
        state.isAutoAdvancing = false;
        clearTimeout(state.inactivityTimeoutId); state.inactivityTimeoutId = null;

        // Ferma audio e glow
        rampVolume(config.noiseMinVolume, config.finalFadeOutDuration);
        setTimelineGlow(false);

        // Attiva fade out elementi UI e mostra schermata finale
        fadeOutElements(); // Applica la classe .fade-out-final
        showEndScreen();   // Applica la classe .visible a #end-screen

        // NON fermare il loop qui, lascia che l'inizio del loop veda isEnding=true
        // e permetta alle transizioni CSS di eseguirsi.
    }
    // --- FINE CONTROLLO ATTIVAZIONE ---
}

export function startAnimationLoop() { if (state.animationFrameId === null) { state.lastTimestampMs = 0; state.animationFrameId = requestAnimationFrame(animationLoop); console.log("Animation loop started."); } }
export function stopAnimationLoop() { if (state.animationFrameId) { cancelAnimationFrame(state.animationFrameId); state.animationFrameId = null; console.log("Animation loop stopped."); } } // Questa funzione ora è usata solo se si vuole fermare esplicitamente prima della fine
