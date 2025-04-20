// js/ui.js
import { config } from './config.js';
import { state } from './state.js';
import { elements } from './elements.js';
import { animationCreators } from './animations.js';

// --- Funzioni UI Esistenti (Assicurati siano corrette) ---
export function updatePromptDisplay(text = null, promptId = null) { if (!elements.currentPrompt) return; const isCurrentlyVisible = elements.currentPrompt.classList.contains(config.classes.visible); if (text && promptId !== state.currentPromptId) { elements.currentPrompt.textContent = text; elements.currentPrompt.classList.add(config.classes.visible); state.currentPromptId = promptId; } else if (!text && state.currentPromptId !== null) { if (isCurrentlyVisible) { elements.currentPrompt.classList.remove(config.classes.visible); } state.currentPromptId = null; } }
export function updateAnimationDisplay(animationId = null) { if (!elements.animationContainer) return; const isCurrentlyVisible = elements.animationContainer.classList.contains(config.classes.visible); if (animationId && (animationId !== state.currentAnimationId || !isCurrentlyVisible)) { const creatorFunctionName = config.animationCreatorMap[animationId]; if (creatorFunctionName && animationCreators[creatorFunctionName]) { animationCreators[creatorFunctionName](); elements.animationContainer.classList.add(config.classes.visible); state.currentAnimationId = animationId; } else { if (isCurrentlyVisible) { elements.animationContainer.classList.remove(config.classes.visible); } clearAnimationContainer(); state.currentAnimationId = null; } } else if (!animationId && isCurrentlyVisible) { elements.animationContainer.classList.remove(config.classes.visible); state.currentAnimationId = null; } }
export function updateYearGrid() { if (!elements.yearGridContainer || !elements.gridCells) return; if (state.totalHoldTimeSec >= config.yearGridAppearTime && !elements.yearGridContainer.classList.contains(config.classes.yearGridVisible)) { elements.yearGridContainer.classList.add(config.classes.yearGridVisible); } let targetSquareCount = 0; if (state.totalHoldTimeSec >= config.yearGridAppearTime) { targetSquareCount = Math.floor((state.totalHoldTimeSec - config.yearGridAppearTime) / config.secondsPerYearSquare) + 1; } targetSquareCount = Math.max(0, targetSquareCount); if (targetSquareCount > state.yearSquaresShown) { const numToAdd = targetSquareCount - state.yearSquaresShown; for (let i = 0; i < numToAdd; i++) { const currentSquareIndex = state.yearSquaresShown + i; if (currentSquareIndex < elements.gridCells.length) { const cell = elements.gridCells[currentSquareIndex]; if (cell && !cell.querySelector('.' + config.classes.yearSquare)) { const square = document.createElement('div'); square.classList.add(config.classes.yearSquare); cell.appendChild(square); void square.offsetWidth; square.style.opacity = 1; } } } state.yearSquaresShown = targetSquareCount; } else if (targetSquareCount < state.yearSquaresShown) { const numToRemove = state.yearSquaresShown - targetSquareCount; for (let i = 0; i < numToRemove; i++) { const currentSquareIndex = state.yearSquaresShown - 1 - i; if (currentSquareIndex >= 0 && currentSquareIndex < elements.gridCells.length) { const cell = elements.gridCells[currentSquareIndex]; const square = cell.querySelector('.' + config.classes.yearSquare); if (square) cell.removeChild(square); } } state.yearSquaresShown = targetSquareCount; } }
export function updateTimerDisplay() { if(elements.timerDisplay) elements.timerDisplay.textContent = state.totalHoldTimeSec.toFixed(1) + 's'; }
export function updateTimelineVisuals() { if(elements.timeLine) elements.timeLine.style.width = state.currentWidthPx + 'px'; }
export function setTimelineGlow(on) { if (!elements.timeLine) return; if (on) { elements.timeLine.style.transition = `box-shadow ${config.timelineGlowExpandDuration} ease-out`; elements.timeLine.style.boxShadow = config.timelineGlowOn; } else { elements.timeLine.style.transition = `box-shadow ${config.timelineGlowShrinkDuration} ease-out`; elements.timeLine.style.boxShadow = config.timelineGlowOff; } }
export function handleTitleVisibility() { if (!elements.titleH1 || !elements.timeLineContainer || !elements.animationContainer) return; const titleEvent = config.timelineEvents.find(event => event.type === 'title'); const shouldBeVisible = titleEvent && state.totalHoldTimeSec >= titleEvent.start && state.totalHoldTimeSec < titleEvent.end; if (shouldBeVisible && !state.isTitleVisible) { elements.titleH1.classList.remove(config.classes.titleHidden); elements.titleH1.classList.add(config.classes.titleVisible); elements.timeLineContainer.classList.add(config.classes.timelineHidden); updatePromptDisplay(); updateAnimationDisplay(); state.isTitleVisible = true; clearTimeout(state.inactivityTimeoutId); state.inactivityTimeoutId = null; } else if (!shouldBeVisible && state.isTitleVisible) { elements.titleH1.classList.remove(config.classes.titleVisible); elements.titleH1.classList.add(config.classes.titleHidden); elements.timeLineContainer.classList.remove(config.classes.timelineHidden); state.isTitleVisible = false; } }
export function checkAndShowInactivityPrompt() { state.inactivityTimeoutId = null; if (state.isMovingRight || state.isTitleVisible || state.currentPromptId || state.currentAnimationId) { if (state.currentPromptId === 'inactive_initial' || state.currentPromptId === 'inactive_shine') { updatePromptDisplay(); } return; } let inactivityText = (state.totalHoldTimeSec === 0) ? config.inactivityPrompts.initial : config.inactivityPrompts.shine; let inactivityId = (state.totalHoldTimeSec === 0) ? 'inactive_initial' : 'inactive_shine'; updatePromptDisplay(inactivityText, inactivityId); }
function clearAnimationContainer() { if (elements.animationContainer) { elements.animationContainer.innerHTML = ''; } }
export function updateAutoAdvanceButtonVisibility() { if (!elements.autoAdvanceButton) return; if (state.isEnding) { elements.autoAdvanceButton.classList.remove(config.classes.autoAdvanceButtonVisible); elements.autoAdvanceButton.classList.remove(config.classes.autoAdvanceButtonActive); return; } const shouldBeVisible = state.totalHoldTimeSec >= config.autoAdvanceAppearTime; const isCurrentlyVisible = elements.autoAdvanceButton.classList.contains(config.classes.autoAdvanceButtonVisible); if (shouldBeVisible && !isCurrentlyVisible) { elements.autoAdvanceButton.classList.add(config.classes.autoAdvanceButtonVisible); } else if (!shouldBeVisible && isCurrentlyVisible) { elements.autoAdvanceButton.classList.remove(config.classes.autoAdvanceButtonVisible); } if (state.isAutoAdvancing) { elements.autoAdvanceButton.classList.add(config.classes.autoAdvanceButtonActive); } else { elements.autoAdvanceButton.classList.remove(config.classes.autoAdvanceButtonActive); } }

// --- !!! ASSICURATI CI SIA 'export' QUI !!! ---
export function fadeOutElements() {
    console.log("[End Sequence] Fading out UI elements.");
    const elementsToFade = [
        elements.promptContainer, elements.timeLineContainer, elements.yearGridContainer,
        elements.timerDisplay, elements.animationContainer, elements.autoAdvanceButton
    ];
    elementsToFade.forEach(el => {
        if (el) {
            el.style.transition = `opacity ${config.finalFadeOutDuration}s ease-out`;
            el.classList.add(config.classes.fadeOutFinal);
        }
    });
     updatePromptDisplay(); // Nasconde specificamente prompt/anim
     updateAnimationDisplay();
}

// --- !!! ASSICURATI CI SIA 'export' QUI !!! ---
export function showEndScreen() {
    console.log("[End Sequence] Showing end screen.");
    if (elements.endScreen) {
        elements.endScreen.classList.add(config.classes.visible);
    } else {
         console.error("End screen element not found.");
    }
}
// --- FINE FUNZIONI FINE ---
