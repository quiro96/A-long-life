// js/ui.js
import { config } from './config.js';
import { state } from './state.js';
import { elements } from './elements.js'; // Oggetto popolato da init.js
import { animationCreators } from './animations.js'; // Mappa dei creator

// Aggiorna il display del prompt (testo)
export function updatePromptDisplay(text = null, promptId = null) {
    if (!elements.currentPrompt) return; // Sicurezza: esci se l'elemento non esiste
    const isCurrentlyVisible = elements.currentPrompt.classList.contains(config.classes.visible);

    // Mostra/Aggiorna: se testo fornito E ID diverso da quello attuale
    if (text && promptId !== state.currentPromptId) {
        elements.currentPrompt.textContent = text;
        elements.currentPrompt.classList.add(config.classes.visible); // Trigger fade-in o mantiene visibile
        state.currentPromptId = promptId; // Aggiorna ID visibile
    }
    // Nascondi: se testo NON fornito E un prompt è attualmente registrato come attivo
    else if (!text && state.currentPromptId !== null) {
         if (isCurrentlyVisible) {
            elements.currentPrompt.classList.remove(config.classes.visible); // Trigger fade-out
         }
         state.currentPromptId = null; // Resetta ID visibile
    }
}

// Aggiorna il display dell'animazione
export function updateAnimationDisplay(animationId = null) {
    if (!elements.animationContainer) return; // Sicurezza
    const isCurrentlyVisible = elements.animationContainer.classList.contains(config.classes.visible);

    // Mostra/Aggiorna: se ID fornito E (ID diverso O non visibile)
    if (animationId && (animationId !== state.currentAnimationId || !isCurrentlyVisible)) {
        const creatorFunctionName = config.animationCreatorMap[animationId];
        if (creatorFunctionName && animationCreators[creatorFunctionName]) {
            // Chiama la funzione corretta per creare l'HTML/SVG
            animationCreators[creatorFunctionName]();
            elements.animationContainer.classList.add(config.classes.visible); // Trigger fade-in
            state.currentAnimationId = animationId; // Aggiorna ID visibile
        } else {
            // ID fornito ma non valido o creator non trovato
            // console.warn(`[updateAnimationDisplay] Animation creator for ID '${animationId}' not found.`); // Log rimosso
            if (isCurrentlyVisible) {
                 elements.animationContainer.classList.remove(config.classes.visible); // Nascondi
            }
             clearAnimationContainer(); // Pulisci comunque
             state.currentAnimationId = null;
        }
    }
    // Nascondi: se ID NON fornito E attualmente visibile
    else if (!animationId && isCurrentlyVisible) {
         elements.animationContainer.classList.remove(config.classes.visible); // Trigger fade-out
         state.currentAnimationId = null; // Resetta ID visibile
         // Potremmo pulire dopo il fade con: setTimeout(clearAnimationContainer, config.animationFadeDuration * 1000);
    }
}

// Aggiorna la griglia degli anni
export function updateYearGrid() {
     if (!elements.yearGridContainer || !elements.gridCells) return; // Sicurezza
    const targetSquareCount = Math.floor(state.totalHoldTimeSec / config.secondsPerYearSquare);

    if (targetSquareCount >= 1 && !elements.yearGridContainer.classList.contains(config.classes.yearGridVisible)) {
        elements.yearGridContainer.classList.add(config.classes.yearGridVisible);
    }

    if (targetSquareCount > state.yearSquaresShown) {
        const numToAdd = targetSquareCount - state.yearSquaresShown;
        for (let i = 0; i < numToAdd; i++) {
            const currentSquareIndex = state.yearSquaresShown + i;
            if (currentSquareIndex < elements.gridCells.length) {
                const cell = elements.gridCells[currentSquareIndex];
                if (cell && !cell.querySelector('.' + config.classes.yearSquare)) {
                    const square = document.createElement('div');
                    square.classList.add(config.classes.yearSquare);
                    cell.appendChild(square);
                    void square.offsetWidth;
                    square.style.opacity = 1;
                }
            }
        }
        state.yearSquaresShown = targetSquareCount;
    }
     else if (targetSquareCount < state.yearSquaresShown) {
         const numToRemove = state.yearSquaresShown - targetSquareCount;
          for (let i = 0; i < numToRemove; i++) {
              const currentSquareIndex = state.yearSquaresShown - 1 - i;
               if (currentSquareIndex >= 0 && currentSquareIndex < elements.gridCells.length) {
                    const cell = elements.gridCells[currentSquareIndex];
                    const square = cell.querySelector('.' + config.classes.yearSquare);
                    if (square) cell.removeChild(square);
               }
          }
         state.yearSquaresShown = targetSquareCount;
     }
}

// Aggiorna il testo del timer
 export function updateTimerDisplay() {
      if(elements.timerDisplay) elements.timerDisplay.textContent = state.totalHoldTimeSec.toFixed(1) + 's';
 }

 // Aggiorna la larghezza visuale della timeline
 export function updateTimelineVisuals() {
       if(elements.timeLine) elements.timeLine.style.width = state.currentWidthPx + 'px';
 }

 // Imposta/rimuove l'effetto glow sulla timeline
 export function setTimelineGlow(on) {
      if (!elements.timeLine) return; // Sicurezza
      if (on) {
          elements.timeLine.style.transition = `box-shadow ${config.timelineGlowExpandDuration} ease-out`;
          elements.timeLine.style.boxShadow = config.timelineGlowOn;
      } else {
           elements.timeLine.style.transition = `box-shadow ${config.timelineGlowShrinkDuration} ease-out`;
           elements.timeLine.style.boxShadow = config.timelineGlowOff;
      }
 }

// Gestisce la visibilità del titolo principale
export function handleTitleVisibility() {
   if (!elements.titleH1 || !elements.timeLineContainer || !elements.animationContainer) return;
    const titleEvent = config.timelineEvents.find(event => event.type === 'title');
    const shouldBeVisible = titleEvent && state.totalHoldTimeSec >= titleEvent.start && state.totalHoldTimeSec < titleEvent.end;

    if (shouldBeVisible && !state.isTitleVisible) {
        elements.titleH1.classList.remove(config.classes.titleHidden);
        elements.titleH1.classList.add(config.classes.titleVisible);
        elements.timeLineContainer.classList.add(config.classes.timelineHidden);
        updatePromptDisplay();
        updateAnimationDisplay();
        state.isTitleVisible = true;
         clearTimeout(state.inactivityTimeoutId); state.inactivityTimeoutId = null;
    } else if (!shouldBeVisible && state.isTitleVisible) {
        elements.titleH1.classList.remove(config.classes.titleVisible);
        elements.titleH1.classList.add(config.classes.titleHidden);
        elements.timeLineContainer.classList.remove(config.classes.timelineHidden);
        state.isTitleVisible = false;
    }
}

// --- !!! ASSICURATI CHE QUESTA FUNZIONE SIA ESPORTATA CORRETTAMENTE !!! ---
// Controlla se mostrare un prompt di inattività (chiamata da setTimeout)
export function checkAndShowInactivityPrompt() {
    state.inactivityTimeoutId = null; // Resetta ID timeout

    // Condizioni di Blocco: esci se una è vera
    if (state.isMovingRight || state.isTitleVisible || state.currentPromptId || state.currentAnimationId) {
         // Se per caso un prompt di inattività era visibile, nascondilo
         if (state.currentPromptId === 'inactive_initial' || state.currentPromptId === 'inactive_shine') {
             updatePromptDisplay();
         }
        return;
    }

    // Se nessuna condizione blocca, determina quale prompt mostrare
    let inactivityText = null;
    let inactivityId = null;
    if (state.totalHoldTimeSec === 0) {
        inactivityText = config.inactivityPrompts.initial;
        inactivityId = 'inactive_initial';
    } else {
        inactivityText = config.inactivityPrompts.shine;
        inactivityId = 'inactive_shine';
    }

    // Mostra il prompt di inattività
    updatePromptDisplay(inactivityText, inactivityId);
}
// --- FINE DELLA FUNZIONE checkAndShowInactivityPrompt ---

// Helper per pulire l'animazione (funzione interna, non esportata)
function clearAnimationContainer() {
     if (elements.animationContainer) {
         elements.animationContainer.innerHTML = '';
     }
}