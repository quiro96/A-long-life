// js/init.js
import { config } from './config.js';
import { state } from './state.js';
import { elements } from './elements.js';
import { initAudio } from './audio.js';
import { handleKeyDown, handleKeyUp, handleAutoAdvanceClick } from './eventHandlers.js'; // Assicurati che questo import sia corretto
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
             // Logga un warning solo se l'elemento non è uno degli SVG o il bottone
             if (!['brainSvg', 'footprintSvg', 'speechBubbleSvg', 'sunSvg', 'autoAdvanceButton'].includes(key)) {
                console.warn(`Initialization warning: Element with ID '${config.ids[key]}' not found.`);
             }
             elements[key] = null; // Imposta a null se non trovato
         }
    });

    // --- AGGIUNTO LOG SPECIFICO PER IL BOTTONE ---
    console.log("[Init] Attempting to find button with ID:", config.ids.autoAdvanceButton);
    if (elements.autoAdvanceButton) {
        console.log("[Init] Auto-advance button FOUND.");
    } else {
         console.error("[Init] Auto-advance button element NOT FOUND during element search loop."); // Errore se non trovato qui
    }
    // --- FINE LOG SPECIFICO ---


    // Imposta transizioni CSS iniziali
    if(elements.currentPrompt) elements.currentPrompt.style.transition = `opacity ${config.promptFadeDuration}s ease-in-out`;
    if(elements.animationContainer) elements.animationContainer.style.transition = `opacity ${config.animationFadeDuration}s ease-in-out`;
    if(elements.yearGridContainer) elements.yearGridContainer.style.transition = `opacity 1.0s ease-in`;
    if(elements.titleH1) elements.titleH1.style.transition = `opacity 1.5s ease-in-out`;
    if(elements.timeLineContainer) elements.timeLineContainer.style.transition = `opacity 1.0s ease-out`;
    // Aggiungiamo transizione anche per il bottone se non già fatta via CSS globale
    if(elements.autoAdvanceButton) elements.autoAdvanceButton.style.transition = 'background-color 0.3s ease, color 0.3s ease, opacity 0.5s ease-in-out';


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

    // Aggiungi Listener Bottone (verificando di nuovo l'esistenza)
    if (elements.autoAdvanceButton) {
        elements.autoAdvanceButton.addEventListener('click', handleAutoAdvanceClick);
        console.log("[Init] Auto-advance button listener ADDED.");
    } else {
         console.warn("[Init] Auto-advance button element not available to add listener.");
    }

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
