// js/mainLoop.js
import { config } from './config.js';
import { state } from './state.js';
import {
    updateTimerDisplay, updateTimelineVisuals,
    handleTitleVisibility, updateYearGrid,
    updatePromptDisplay, updateAnimationDisplay,
    updateAutoAdvanceButtonVisibility,
    // --- IMPORTA FUNZIONI FINE ---
    fadeOutElements, showEndScreen
} from './ui.js';
// --- Importa anche funzioni audio per fermarlo ---
import { rampVolume } from './audio.js';

function easeInOutExpo(t) { /* ... */ }
function updateTimerAndTimelineLogic(deltaTimeMs) { /* ... (invariato) ... */ if (state.isMovingRight) { const timeIncrement = (deltaTimeMs * config.timeMultiplier) / 1000; state.totalHoldTimeSec += timeIncrement; const maxWidthPx = window.innerWidth / 2; if (state.currentWidthPx < maxWidthPx) { const widthIncrement = (config.speedPxPerSec * deltaTimeMs) / 1000; state.currentWidthPx = Math.min(state.currentWidthPx + widthIncrement, maxWidthPx); } } }
function handleTimelineEvents() { /* ... (invariato dalla versione precedente corretta) ... */ if (state.isTitleVisible) return; let activePromptText = null; let activePromptId = null; let activeAnimationId = null; let activeEvent = null; for (const event of config.timelineEvents) { if (event.type !== 'title' && state.totalHoldTimeSec >= event.start && state.totalHoldTimeSec < event.end) { activeEvent = event; break; } } const wasTimelineEventActive = state.currentPromptId && state.currentPromptId !== 'inactive_initial' && state.currentPromptId !== 'inactive_shine'; const wasTimelineAnimActive = state.currentAnimationId; if (activeEvent) { activePromptText = activeEvent.text || null; activePromptId = activeEvent.id; activeAnimationId = (activeEvent.type === 'animation') ? activeEvent.id : null; if (state.currentPromptId === 'inactive_initial' || state.currentPromptId === 'inactive_shine') { updatePromptDisplay(); } clearTimeout(state.inactivityTimeoutId); state.inactivityTimeoutId = null; } else { if (wasTimelineEventActive) { activePromptText = null; activePromptId = null; } else { activePromptText = undefined; activePromptId = undefined; } if (wasTimelineAnimActive) { activeAnimationId = null; } else { activeAnimationId = undefined; } } if (activePromptId !== undefined) { updatePromptDisplay(activePromptText, activePromptId); } if (activeAnimationId !== undefined) { updateAnimationDisplay(activeAnimationId); } }

function animationLoop(timestampMs) {
    // --- CONTROLLO FINE ---
    // Se la sequenza finale è già attiva, non fare più nulla tranne richiedere il prossimo frame
    // (questo permette alle transizioni CSS di completarsi)
    if (state.isEnding) {
         state.animationFrameId = requestAnimationFrame(animationLoop);
         return;
    }
    // --- FINE CONTROLLO ---

    state.animationFrameId = requestAnimationFrame(animationLoop);

    if (state.lastTimestampMs === 0) { state.lastTimestampMs = timestampMs; return; }
    const deltaTimeMs = timestampMs - state.lastTimestampMs;
    state.lastTimestampMs = timestampMs;
    if (deltaTimeMs <= 0 || deltaTimeMs > 500) { return; }

    // --- CONTROLLO ATTIVAZIONE FINE ---
    if (state.totalHoldTimeSec >= config.endTime && !state.isEnding) {
        state.isEnding = true; // Imposta lo stato finale
        console.log(`[End Sequence] End time ${config.endTime}s reached. Starting end sequence.`);

        // Ferma avanzamento (manuale o automatico)
        state.isMovingRight = false;
        state.isAutoAdvancing = false; // Assicura sia disattivato
        clearTimeout(state.inactivityTimeoutId); state.inactivityTimeoutId = null; // Cancella timer

        // Ferma audio e glow
        rampVolume(config.noiseMinVolume, config.finalFadeOutDuration); // Fade out audio
        setTimelineGlow(false); // Rimuovi glow

        // Attiva fade out elementi UI e mostra schermata finale
        fadeOutElements();
        showEndScreen();

        // Non fare return qui, lascia che il prossimo frame veda isEnding a true
    }
    // --- FINE CONTROLLO ATTIVAZIONE ---


    // --- Aggiornamenti normali (eseguiti solo se !state.isEnding) ---
    updateTimerAndTimelineLogic(deltaTimeMs);
    updateTimerDisplay();
    updateTimelineVisuals();
    handleTitleVisibility();
    handleTimelineEvents();
    updateYearGrid();
    updateAutoAdvanceButtonVisibility(); // Chiamata rimane qui
    // --- Fine Aggiornamenti normali ---
}

export function startAnimationLoop() { if (state.animationFrameId === null) { state.lastTimestampMs = 0; state.animationFrameId = requestAnimationFrame(animationLoop); console.log("Animation loop started."); } }
export function stopAnimationLoop() { if (state.animationFrameId) { cancelAnimationFrame(state.animationFrameId); state.animationFrameId = null; console.log("Animation loop stopped."); } } // Questa ora verrà chiamata implicitamente dalla logica di isEnding
