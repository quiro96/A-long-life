// js/init.js
import { config } from './config.js';
import { state } from './state.js';
import { elements } from './elements.js';
import { initAudio } from './audio.js';
import { handleKeyDown, handleKeyUp, handleAutoAdvanceClick } from './eventHandlers.js';
import { startAnimationLoop } from './mainLoop.js';
import { checkAndShowInactivityPrompt } from './ui.js';

function initializeExperience() {
    if (state.interactionStarted) return;
    state.interactionStarted = true;
    console.log("Initializing Experience...");

    // Popola elements (include endScreen)
    Object.keys(config.ids).forEach(key => {
         const element = document.getElementById(config.ids[key]);
         if (element) {
             elements[key] = element;
         } else {
             // Log warning solo per elementi non dinamici/opzionali
             if (!['brainSvg', 'footprintSvg', 'speechBubbleSvg', 'sunSvg', 'autoAdvanceButton', 'endScreen'].includes(key)) {
                console.warn(`Initialization warning: Element with ID '${config.ids[key]}' not found.`);
             }
             elements[key] = null; // Imposta a null se non trovato
         }
    });

    // Verifica esistenza endScreen
    if (!elements.endScreen) {
         console.error("CRITICAL: End screen element not found! End sequence will fail.");
    }


    // Imposta transizioni CSS
    if(elements.currentPrompt) elements.currentPrompt.style.transition = `opacity ${config.promptFadeDuration}s ease-in-out`;
    if(elements.animationContainer) elements.animationContainer.style.transition = `opacity ${config.animationFadeDuration}s ease-out`; // Usa fade out
    if(elements.yearGridContainer) elements.yearGridContainer.style.transition = `opacity ${config.finalFadeOutDuration}s ease-out`; // Usa fade out finale
    if(elements.titleH1) elements.titleH1.style.transition = `opacity 1.5s ease-in-out`;
    if(elements.timeLineContainer) elements.timeLineContainer.style.transition = `opacity ${config.finalFadeOutDuration}s ease-out`; // Usa fade out finale
    if(elements.autoAdvanceButton) elements.autoAdvanceButton.style.transition = 'background-color 0.3s ease, color 0.3s ease, opacity 1.5s ease-out'; // Usa fade out finale
    if(elements.timerDisplay) elements.timerDisplay.style.transition = `opacity ${config.finalFadeOutDuration}s ease-out`; // Usa fade out finale
    // Transizione per endScreen è già nel CSS


    // Crea Celle Griglia
     if(elements.yearGridContainer) { /* ... (invariato) ... */ elements.yearGridContainer.innerHTML = ''; elements.gridCells = []; for (let i = 0; i < config.numberOfYearGridCells; i++) { const cell = document.createElement('div'); cell.classList.add(config.classes.gridCell); elements.yearGridContainer.appendChild(cell); elements.gridCells.push(cell); } }
     else { console.error("Year grid container not found during initialization."); }

    // Inizializza Audio
    initAudio();

    // Listeners
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    if (elements.autoAdvanceButton) { elements.autoAdvanceButton.addEventListener('click', handleAutoAdvanceClick); console.log("Auto-advance button listener added."); }
    else { console.warn("Auto-advance button element not available to add listener."); }

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
