// js/init.js
import { config } from './config.js';
import { state } from './state.js';
import { elements } from './elements.js';
import { initAudio } from './audio.js';
// --- AGGIUNTO handleTouchStart, handleTouchEnd, handleTouchCancel ALL'IMPORT ---
import { handleKeyDown, handleKeyUp, handleAutoAdvanceClick, handleTouchStart, handleTouchEnd, handleTouchCancel } from './eventHandlers.js';
import { startAnimationLoop } from './mainLoop.js';
import { checkAndShowInactivityPrompt } from './ui.js';

function initializeExperience() {
    if (state.interactionStarted) return;
    state.interactionStarted = true;
    console.log("Initializing Experience...");

    // Popola elements
    Object.keys(config.ids).forEach(key => { /* ... (invariato) ... */ const element = document.getElementById(config.ids[key]); if (element) { elements[key] = element; } else { if (!['brainSvg', 'footprintSvg', 'speechBubbleSvg', 'sunSvg', 'autoAdvanceButton', 'endScreen'].includes(key)) { console.warn(`Initialization warning: Element with ID '${config.ids[key]}' not found.`); } elements[key] = null; } });
    if (!elements.endScreen) { console.error("CRITICAL: End screen element not found! End sequence will fail."); }

    // Imposta transizioni CSS
    if(elements.currentPrompt) elements.currentPrompt.style.transition = `opacity ${config.promptFadeDuration}s ease-in-out`;
    if(elements.animationContainer) elements.animationContainer.style.transition = `opacity ${config.animationFadeDuration}s ease-out`;
    if(elements.yearGridContainer) elements.yearGridContainer.style.transition = `opacity ${config.finalFadeOutDuration}s ease-out`;
    if(elements.titleH1) elements.titleH1.style.transition = `opacity 1.5s ease-in-out`;
    if(elements.timeLineContainer) elements.timeLineContainer.style.transition = `opacity ${config.finalFadeOutDuration}s ease-out`;
    if(elements.autoAdvanceButton) elements.autoAdvanceButton.style.transition = 'background-color 0.3s ease, color 0.3s ease, opacity 1.5s ease-out';
    if(elements.timerDisplay) elements.timerDisplay.style.transition = `opacity ${config.finalFadeOutDuration}s ease-out`;
    if(elements.endScreen) elements.endScreen.style.transition = 'opacity 2.5s ease-in 1s'; // Transizione definita anche nel CSS

    // Crea Celle Griglia
     if(elements.yearGridContainer) { /* ... (invariato) ... */ elements.yearGridContainer.innerHTML = ''; elements.gridCells = []; for (let i = 0; i < config.numberOfYearGridCells; i++) { const cell = document.createElement('div'); cell.classList.add(config.classes.gridCell); elements.yearGridContainer.appendChild(cell); elements.gridCells.push(cell); } }
     else { console.error("Year grid container not found during initialization."); }

    // Inizializza Audio
    initAudio();

    // --- AGGIORNAMENTO LISTENERS ---
    // Tasti
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    // Bottone
    if (elements.autoAdvanceButton) {
        elements.autoAdvanceButton.addEventListener('click', handleAutoAdvanceClick);
        console.log("Auto-advance button listener added.");
    } else { console.warn("Auto-advance button element not available to add listener."); }
    // Touch (su tutta la finestra)
    window.addEventListener('touchstart', handleTouchStart, { passive: false }); // passive:false necessario per preventDefault
    window.addEventListener('touchend', handleTouchEnd, { passive: false });
    window.addEventListener('touchcancel', handleTouchCancel, { passive: false }); // Gestisci anche cancellazione
    console.log("Touch listeners added to window.");
    // --- FINE AGGIORNAMENTO LISTENERS ---


    // Timer Inattività iniziale
     clearTimeout(state.inactivityTimeoutId);
     state.inactivityTimeoutId = setTimeout(checkAndShowInactivityPrompt, config.initialInactivityDelayMs);

    // Avvio Loop
    startAnimationLoop();

    console.log("Experience Initialized.");
}

// Avvio
if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', initializeExperience); }
else { initializeExperience(); }
