// js/init.js
import { config } from './config.js';
import { state } from './state.js';
import { elements } from './elements.js'; // Importa l'oggetto vuoto
import { initAudio } from './audio.js';
import { handleKeyDown, handleKeyUp } from './eventHandlers.js';
import { startAnimationLoop } from './mainLoop.js';
import { checkAndShowInactivityPrompt } from './ui.js'; // Importa per il setup iniziale

function initializeExperience() {
    if (state.interactionStarted) return;
    state.interactionStarted = true;
    console.log("Initializing Experience...");

    // Popola l'oggetto elements importato
    Object.keys(config.ids).forEach(key => {
         // Trova l'elemento DOM e assegnalo a elements[key]
         const element = document.getElementById(config.ids[key]);
         if (element) {
             elements[key] = element;
         } else {
              console.error(`Initialization failed: Element with ID '${config.ids[key]}' not found.`);
              // Potresti voler bloccare l'inizializzazione qui se un elemento è cruciale
         }
    });

     // Verifica elementi essenziali (Opzionale, ma buona pratica)
     // ... (puoi aggiungere un controllo qui se vuoi) ...

    // Imposta transizioni CSS iniziali (assicura che siano definite)
    if(elements.currentPrompt) elements.currentPrompt.style.transition = `opacity ${config.promptFadeDuration}s ease-in-out`;
    if(elements.animationContainer) elements.animationContainer.style.transition = `opacity ${config.animationFadeDuration}s ease-in-out`;
    // ... (aggiungi altre se necessario) ...


    // Crea Celle Griglia Anni
     if(elements.yearGridContainer) {
         elements.yearGridContainer.innerHTML = '';
         elements.gridCells = []; // Aggiungi gridCells a elements per accedervi da ui.js
         for (let i = 0; i < config.numberOfYearGridCells; i++) {
             const cell = document.createElement('div');
             cell.classList.add(config.classes.gridCell);
             elements.yearGridContainer.appendChild(cell);
             elements.gridCells.push(cell); // Popola l'array
         }
     } else {
          console.error("Year grid container not found during initialization.");
     }


    // Inizializza Audio
    initAudio();

    // Aggiungi Listener Eventi
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // Imposta il primo timer per il prompt di inattività iniziale
     clearTimeout(state.inactivityTimeoutId);
     state.inactivityTimeoutId = setTimeout(checkAndShowInactivityPrompt, config.initialInactivityDelayMs);

    // Avvia Loop Animazione
    startAnimationLoop();

    console.log("Experience Initialized.");
}

// --- Avvio ---
// Assicurati che il DOM sia pronto prima di inizializzare
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeExperience);
} else {
    initializeExperience(); // Chiama subito se il DOM è già pronto
}