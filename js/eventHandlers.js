// js/mainLoop.js
import { config } from './config.js';
import { state } from './state.js';
import {
    updateTimerDisplay, updateTimelineVisuals,
    handleTitleVisibility, updateYearGrid,
    updatePromptDisplay, updateAnimationDisplay,
    updateAutoAdvanceButtonVisibility // *** AGGIUNTO IMPORT ***
} from './ui.js';

function easeInOutExpo(t) { if (t === 0 || t === 1) return t; if (t < 0.5) return Math.pow(2, 20 * t - 10) / 2; return (2 - Math.pow(2, -20 * t + 10)) / 2; }

function updateTimerAndTimelineLogic(deltaTimeMs) {
    if (state.isMovingRight) { // Controlla stato (manuale o automatico)
        // console.log(`[Loop] Updating time/width. Delta: ${deltaTimeMs.toFixed(1)}ms`); // Log rimosso per pulizia
        const timeIncrement = (deltaTimeMs * config.timeMultiplier) / 1000;
        state.totalHoldTimeSec += timeIncrement;
        const maxWidthPx = window.innerWidth / 2;
        if (state.currentWidthPx < maxWidthPx) {
            const widthIncrement = (config.speedPxPerSec * deltaTimeMs) / 1000;
            state.currentWidthPx = Math.min(state.currentWidthPx + widthIncrement, maxWidthPx);
            // console.log(`[Loop] New time: ${state.totalHoldTimeSec.toFixed(3)}s, New width: ${state.currentWidthPx.toFixed(1)}px`); // Log rimosso
        }
         // else { console.log(`[Loop] Max width reached (${maxWidthPx}px). Time: ${state.totalHoldTimeSec.toFixed(3)}s`); } // Log rimosso
    }
}

function handleTimelineEvents() {
    if (state.isTitleVisible) return;
    let activePromptText = null;
    let activePromptId = null;
    let activeAnimationId = null;
    let activeEvent = null;
    for (const event of config.timelineEvents) {
        if (event.type !== 'title' && state.totalHoldTimeSec >= event.start && state.totalHoldTimeSec < event.end) {
             activeEvent = event; break;
        }
    }
    const wasTimelineEventActive = state.currentPromptId && state.currentPromptId !== 'inactive_initial' && state.currentPromptId !== 'inactive_shine';
    const wasTimelineAnimActive = state.currentAnimationId;
    if (activeEvent) {
        activePromptText = activeEvent.text || null;
        activePromptId = activeEvent.id;
        activeAnimationId = (activeEvent.type === 'animation') ? activeEvent.id : null;
        if (state.currentPromptId === 'inactive_initial' || state.currentPromptId === 'inactive_shine') { updatePromptDisplay(); }
         clearTimeout(state.inactivityTimeoutId); state.inactivityTimeoutId = null;
    } else {
        if (wasTimelineEventActive) { activePromptText = null; activePromptId = null; }
        else { activePromptText = undefined; activePromptId = undefined; }
         if (wasTimelineAnimActive) { activeAnimationId = null; }
         else { activeAnimationId = undefined; }
    }
    if (activePromptId !== undefined) { updatePromptDisplay(activePromptText, activePromptId); }
     if (activeAnimationId !== undefined) { updateAnimationDisplay(activeAnimationId); }
}

function animationLoop(timestampMs) {
    state.animationFrameId = requestAnimationFrame(animationLoop);
    if (state.lastTimestampMs === 0) { state.lastTimestampMs = timestampMs; return; }
    const deltaTimeMs = timestampMs - state.lastTimestampMs;
    state.lastTimestampMs = timestampMs;
    if (deltaTimeMs <= 0 || deltaTimeMs > 500) { return; }

    updateTimerAndTimelineLogic(deltaTimeMs);
    updateTimerDisplay();
    updateTimelineVisuals();
    handleTitleVisibility();
    handleTimelineEvents();
    updateYearGrid();
    // --- AGGIUNTA CHIAMATA PER BOTTONE ---
    updateAutoAdvanceButtonVisibility(); // Aggiorna visibilità/stato bottone
    // --- FINE AGGIUNTA ---
}

export function startAnimationLoop() { if (state.animationFrameId === null) { state.lastTimestampMs = 0; state.animationFrameId = requestAnimationFrame(animationLoop); console.log("Animation loop started."); } }
export function stopAnimationLoop() { if (state.animationFrameId) { cancelAnimationFrame(state.animationFrameId); state.animationFrameId = null; console.log("Animation loop stopped."); } }
