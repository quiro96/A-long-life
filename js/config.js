// js/config.js
export const config = {
    // Timing & Speed
    speedPxPerSec: 300,
    timeMultiplier: 1.5,
    initialInactivityDelayMs: 4000, // 4 secondi per "Premi..."
    shineInactivityDelayMs: 3000,   // 3 secondi per "Risplendi..."
    secondsPerYearSquare: 45,

    // Durations
    audioRampExpandDuration: 0.6,
    audioRampShrinkDuration: 3.0,
    timelineGlowExpandDuration: '0.6s',
    timelineGlowShrinkDuration: '3.0s',
    promptFadeDuration: 1.5, // Secondi
    animationFadeDuration: 1.5, // Secondi

    // Audio
    noiseMaxVolume: -25,
    noiseMinVolume: -Infinity,

    // Visuals
    timelineGlowOn: '0 0 25px rgba(255, 255, 255, 1.0), 0 0 35px rgba(255, 255, 255, 0.7)',
    timelineGlowOff: '0 0 0px rgba(255, 255, 255, 0)',
    numberOfYearGridCells: 100,

    // Animation specifics
    numberOfHappyCircles: 15,
    numberOfFadeParticles: 25,
    numberOfStackingBlocks: 5,
    numberOfIntertwiningCircles: 3,
    numberOfRunningDots: 5,
    brainSvgPath: "M50,5 C25,5 10,25 10,40 C10,55 25,75 50,75 C75,75 90,55 90,40 C90,25 75,5 50,5 Z M50,15 C65,15 75,25 75,40 C75,55 65,65 50,65 C35,65 25,55 25,40 C25,25 35,15 50,15 Z M40,30 Q50,20 60,30 Q70,40 60,50 Q50,60 40,50 Q30,40 40,30 Z",
    footprintSvgPath: "M25,5 C15,5 5,20 5,35 Q5,50 15,60 L25,75 L35,60 Q45,50 45,35 C45,20 35,5 25,5 Z M25,15 Q35,20 35,35 Q35,45 25,55 Q15,45 15,35 Q15,20 25,15 Z",
    speechBubbleSvgPath: "M5,5 Q5,0 10,0 H50 Q55,0 55,5 V30 Q55,35 50,35 H30 L25,45 L20,35 H10 Q5,35 5,30 Z",

    // ids
    ids: {
        titleH1: 'title-h1',
        titleContainer: 'title-container',
        timeLine: 'time-line',
        timeLineContainer: 'time-line-container',
        currentPrompt: 'current-prompt',
        promptContainer: 'prompt-container',
        yearGridContainer: 'year-grid-container',
        timerDisplay: 'timer-display',
        animationContainer: 'animation-container',
        brainSvg: 'brain-svg',
        footprintSvg: 'footprint-svg',
        speechBubbleSvg: 'speech-bubble-svg',
    },

    // classes
    classes: {
        visible: 'visible',
        titleVisible: 'title-visible',
        titleHidden: 'title-hidden',
        timelineHidden: 'timeline-hidden',
        yearGridVisible: 'visible',
        happyCircle: 'happy-circle',
        fadeParticle: 'fade-particle',
        stackingBlock: 'stacking-block',
        intertwiningCircle: 'intertwining-circle',
        gridLine: 'grid-line',
        gridLineHorizontal: 'horizontal',
        gridLineVertical: 'vertical',
        runningDot: 'running-dot',
        yearSquare: 'year-square',
        gridCell: 'grid-cell',
    },

    // --- NUOVA SEQUENZA timelineEvents ---
    timelineEvents: [
        // Prima del titolo
        { start: 8,  end: 15, type: 'animation', id: 'anim_happy', text: "Giorni felici..." }, // +7s, Animazione Happy
        { start: 20, end: 27, type: 'prompt',    id: 'text_noMemory', text: "Di cui non ho memoria." }, // +7s, Solo Testo

        // Titolo
        { start: 30, end: 40, type: 'title' }, // Durata 10s

        // Dopo il titolo
        { start: 42, end: 52, type: 'animation', id: 'anim_brain', text: "Nei primi istanti di vita, il cervello non sa ancora come immagazzinare informazioni nella memoria a lungo termine." }, // +10s, Animazione Cervello

        // Aggiungi qui altri eventi futuri se necessario, mantenendo una spaziatura
        // { start: 60, end: 67, type: '...', id: '...', text: '...' }

    ],
    // --- FINE NUOVA SEQUENZA ---

    // Prompt Inattività
    inactivityPrompts: {
        initial: "Premi -> per proseguire",
        shine: "Non dimenticarti di risplendere"
    },

    // Mappa ID animazione -> Nome funzione JS
    animationCreatorMap: {
        'anim_happy': 'createHappyAnimation',
        'anim_particles': 'createParticleAnimation', // Non usata nella nuova sequenza ma la lasciamo
        'anim_brain': 'createBrainAnimation',
        'anim_school': 'createStackingBlocksAnimation', // Non usata ma lasciamo
        'anim_friends': 'createIntertwiningCirclesAnimation', // Non usata ma lasciamo
        'anim_steps': 'createFootprintAnimation', // Non usata ma lasciamo
        'anim_voices': 'createSpeechBubbleAnimation', // Non usata ma lasciamo
        'anim_rules': 'createGridLinesAnimation', // Non usata ma lasciamo
        'anim_running': 'createRunningDotsAnimation', // Non usata ma lasciamo
    }
}; // Chiusura dell'oggetto config principale