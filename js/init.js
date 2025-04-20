// js/init.js
import { config } from './config.js';
import { state } from './state.js';
import { elements } from './elements.js';
import { initAudio } from './audio.js';
// *** AGGIUNTO handleAutoAdvanceClick ALL'IMPORT ***
import { handleKeyDown, handleKeyUp, handleAutoAdvanceClick } from './eventHandlers.js';
import { startAnimationLoop } from './mainLoop.js';
import { checkAndShowInactivityPrompt } from './ui.js';

function initializeExperience() {
    if (state.interactionStarted) return;
    state.interactionStarted = true;
    console.log("Initializing Experience...");

    // Popola l'oggetto elements
    Object.keys(config.ids).forEach(key => {
         const element = document.getElementById(config.ids[key]);
         if (element) {
             elements[key] = element;
         } else {
              // Logga un warning solo se l'elemento non è uno degli SVG creati dinamicamente o il bottone (che potrebbe non esistere subito)
              if (!['brainSvg', 'footprintSvg', 'speechBubbleSvg', 'sunSvg', 'autoAdvanceButton'].includes(key)) {
                 console.warn(`Initialization warning: Element with ID '${config.ids[key]}' not found.`);
              } else {
                   elements[key] = null; // Imposta a null se non trovato inizialmente
              }
         }
    });

    // Imposta transizioni CSS iniziali
    if(elements.currentPrompt) elements.currentPrompt.style.transition = `opacity ${config.promptFadeDuration}s ease-in-out`;
    if(elements.animationContainer) elements.animationContainer.style.transition = `opacity ${config.animationFadeDuration}s ease-in-out`;
    if(elements.yearGridContainer) elements.yearGridContainer.style.transition = `opacity 1.0s ease-in`;
    if(elements.titleH1) elements.titleH1.style.transition = `opacity 1.5s ease-in-out`;
    if(elements.timeLineContainer) elements.timeLineContainer.style.transition = `opacity 1.0s ease-out`;

    // Crea Celle Griglia Anni
     if(elements.yearGridContainer) {
         elements.yearGridContainer.innerHTML = '';
         elements.gridCells = [];
         for (let i = 0; i < config.numberOfYearGridCells; i++) {
             const cell = document.createElement('div'); cell.classList.add(config.classes.gridCell);
             elements.yearGridContainer.appendChild(cell); elements.gridCells.push(cell);
         }
     } else { console.error("Year grid container not found during initialization."); }

    // Inizializza Audio
    initAudio();

    // Aggiungi Listener Eventi Finestra
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // --- AGGIUNGI LISTENER BOTTONE ---
    if (elements.autoAdvanceButton) {
        elements.autoAdvanceButton.addEventListener('click', handleAutoAdvanceClick);
        console.log("Auto-advance button listener added.");
    } else {
         console.warn("Auto-advance button element not found during initialization. Click will not work.");
    }
    // --- FINE AGGIUNTA LISTENER ---

    // Imposta il primo timer per il prompt di inattività iniziale
     clearTimeout(state.inactivityTimeoutId);
     state.inactivityTimeoutId = setTimeout(checkAndShowInactivityPrompt, config.initialInactivityDelayMs);

    // Avvia Loop Animazione
    startAnimationLoop();

    console.log("Experience Initialized.");
}

// Avvio
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeExperience);
} else {
    initializeExperience();
}
