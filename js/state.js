// js/state.js
export let state = {
    isMovingRight: false,
    currentWidthPx: 0,
    totalHoldTimeSec: 0,
    lastTimestampMs: 0,
    animationFrameId: null,
    inactivityTimeoutId: null,
    isTitleVisible: false,
    yearSquaresShown: 0,
    interactionStarted: false,
    isToneStarted: false,
    currentPromptId: null,
    currentAnimationId: null,
    backgroundNoise: null,
};