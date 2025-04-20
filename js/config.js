// js/config.js
export const config = {
    // Timing & Speed
    speedPxPerSec: 300,
    timeMultiplier: 15,
    initialInactivityDelayMs: 4000,
    shineInactivityDelayMs: 3000,
    yearGridAppearTime: 45,
    secondsPerYearSquare: 15,

    // --- NUOVO TIMING BOTTONE ---
    // Anno 2 inizia a 45+15 = 60s
    autoAdvanceAppearTime: 60,

    // Durations
    audioRampExpandDuration: 0.6, audioRampShrinkDuration: 3.0,
    timelineGlowExpandDuration: '0.6s', timelineGlowShrinkDuration: '3.0s',
    promptFadeDuration: 1.5, animationFadeDuration: 1.5,

    // Audio
    noiseMaxVolume: -25, noiseMinVolume: -Infinity,

    // Visuals
    timelineGlowOn: '0 0 25px rgba(255, 255, 255, 1.0), 0 0 35px rgba(255, 255, 255, 0.7)',
    timelineGlowOff: '0 0 0px rgba(255, 255, 255, 0)',
    numberOfYearGridCells: 100,

    // Animation specifics & SVG Paths (invariati)
    numberOfHappyCircles: 15, numberOfFadeParticles: 25, numberOfStackingBlocks: 5, numberOfIntertwiningCircles: 3, numberOfRunningDots: 5,
    brainSvgPath: "M50,5 C25,5 10,25 10,40 C10,55 25,75 50,75 C75,75 90,55 90,40 C90,25 75,5 50,5 Z M50,15 C65,15 75,25 75,40 C75,55 65,65 50,65 C35,65 25,55 25,40 C25,25 35,15 50,15 Z M40,30 Q50,20 60,30 Q70,40 60,50 Q50,60 40,50 Q30,40 40,30 Z",
    footprintSvgPath: "M25,5 C15,5 5,20 5,35 Q5,50 15,60 L25,75 L35,60 Q45,50 45,35 C45,20 35,5 25,5 Z M25,15 Q35,20 35,35 Q35,45 25,55 Q15,45 15,35 Q15,20 25,15 Z",
    speechBubbleSvgPath: "M5,5 Q5,0 10,0 H50 Q55,0 55,5 V30 Q55,35 50,35 H30 L25,45 L20,35 H10 Q5,35 5,30 Z",
    sunSvgPath: "M50,50 m-25,0 a25,25 0 1,0 50,0 a25,25 0 1,0 -50,0 Z M50,10 V0 M50,100 V90 M10,50 H0 M100,50 H90 M20,20 L10,10 M80,80 L90,90 M20,80 L10,90 M80,20 L90,10",

    // ids
    ids: {
        titleH1: 'title-h1', titleContainer: 'title-container', timeLine: 'time-line', timeLineContainer: 'time-line-container',
        currentPrompt: 'current-prompt', promptContainer: 'prompt-container', yearGridContainer: 'year-grid-container',
        timerDisplay: 'timer-display', animationContainer: 'animation-container', autoAdvanceButton: 'auto-advance-btn', // Include bottone
        brainSvg: 'brain-svg', footprintSvg: 'footprint-svg', speechBubbleSvg: 'speech-bubble-svg', sunSvg: 'sun-svg',
    },

    // classes
    classes: {
        visible: 'visible', titleVisible: 'title-visible', titleHidden: 'title-hidden', timelineHidden: 'timeline-hidden', yearGridVisible: 'visible',
        happyCircle: 'happy-circle', fadeParticle: 'fade-particle', stackingBlock: 'stacking-block', intertwiningCircle: 'intertwining-circle',
        gridLine: 'grid-line', gridLineHorizontal: 'horizontal', gridLineVertical: 'vertical', runningDot: 'running-dot', yearSquare: 'year-square', gridCell: 'grid-cell',
        autoAdvanceButtonActive: 'active', autoAdvanceButtonVisible: 'visible', hanoiBlock: 'hanoi-block',
    },

    // --- TIMELINE EVENTS RICALCOLATI CON PAUSE E ANIMAZIONI RIVISTE ---
    timelineEvents: [
        // Intro (0-45s)
        { start: 8,  end: 13, type: 'animation', id: 'anim_happy', text: "Giorni felici..." }, // 5s
        // Pausa 13-20 (7s)
        { start: 20, end: 25, type: 'prompt',    id: 'text_noMemory', text: "Di cui non ho memoria." }, // 5s
        // Pausa 25-30 (5s)
        { start: 30, end: 40, type: 'title' }, // 10s
        // Pausa 40-42 (2s) - Breve
        { start: 42, end: 45, type: 'animation', id: 'anim_brain', text: "Il cervello impara..." }, // 3s

        // Anno 1 (45s - 60s)
        { start: 48, end: 53, type: 'animation', id: 'anim_hanoi_new', text: "Ricordo la torre di Hanoi!" }, // 5s, Anim Hanoi
        // Pausa 53-60 (7s)

        // Anno 2 (60s - 75s) - Bottone appare
        { start: 60, end: 65, type: 'animation', id: 'anim_dad_sun', text: "Le parole di mio papà: 'Sei un sole.'" }, // 5s, Anim Sole
        // Pausa 65-70 (5s)
        { start: 70, end: 75, type: 'animation', id: 'anim_steps', text: "I primi passi incerti." }, // 5s

        // Anno 3 (75s - 90s)
        // Pausa 75-80 (5s)
        { start: 80, end: 85, type: 'animation', id: 'anim_voices', text: "'Mamma'? Le prime parole?" }, // 5s, Anim Fumetto
        // Pausa 85-90 (5s)

        // Anno 4 (90s - 105s)
        { start: 90, end: 95, type: 'prompt',    id: 'whys', text: "Un sacco di perché..." }, // 5s
        // Pausa 95-100 (5s)
        { start: 100, end: 105, type: 'animation', id: 'anim_school', text: "Costruire mondi con poco." }, // 5s, Anim Blocchi

        // Anno 5 (105s - 120s)
        // Pausa 105-110 (5s)
        { start: 110, end: 115, type: 'prompt', id: 'learning_names', text: "Imparare i nomi delle cose." }, // 5s
        // Pausa 115-120 (5s)

        // Anno 6 (120s - 135s)
        { start: 120, end: 125, type: 'animation', id: 'anim_rules', text: "Le prime regole da capire." }, // 5s, Anim Griglia
        // Pausa 125-130 (5s)
        { start: 130, end: 135, type: 'animation', id: 'anim_friends', text: "I primi amici! Giochi insieme." }, // 5s, Anim Cerchi

        // Anno 7 (135s - 150s)
        // Pausa 135-140 (5s)
        { start: 140, end: 145, type: 'prompt', id: 'laughter_prompt', text: "Quante risate per sciocchezze!" }, // 5s
        // Pausa 145-150 (5s)

        // Anno 8 (150s - 165s)
        { start: 150, end: 155, type: 'animation', id: 'anim_running', text: "Corse a perdifiato nel cortile." }, // 5s, Anim Punti Corsa
        // Pausa 155-160 (5s)
        { start: 160, end: 165, type: 'prompt', id: 'fights_friends', text: "A volte si litigava..." }, // 5s

        // Anno 9 (165s - 180s)
        // Pausa 165-170 (5s)
        { start: 170, end: 175, type: 'animation', id: 'anim_friends', text: "...ma poi si faceva pace." }, // 5s, Anim Cerchi (di nuovo)
        // Pausa 175-180 (5s)

        // Anno 10 (180s - 195s)
        { start: 180, end: 185, type: 'prompt', id: 'sharing_prompt', text: "Difficile dividere la merenda!" }, // 5s
        // Pausa 185-190 (5s)
        { start: 190, end: 195, type: 'animation', id: 'anim_particles', text: "Si cresceva in fretta..." } // 5s, Anim Particelle
    ],
    // --- FINE AGGIORNAMENTO TIMELINE ---

    // Prompt Inattività
    inactivityPrompts: { initial: "Premi -> per proseguire", shine: "Non dimenticarti di risplendere" },

    // Mappa ID animazione -> Nome funzione JS (include nuove)
    animationCreatorMap: {
        'anim_happy': 'createHappyAnimation', 'anim_particles': 'createParticleAnimation',
        'anim_brain': 'createBrainAnimation', 'anim_school': 'createStackingBlocksAnimation',
        'anim_friends': 'createIntertwiningCirclesAnimation', 'anim_steps': 'createFootprintAnimation',
        'anim_voices': 'createSpeechBubbleAnimation', 'anim_rules': 'createGridLinesAnimation',
        'anim_running': 'createRunningDotsAnimation', 'anim_hanoi_new': 'createHanoiTowerAnimation',
        'anim_dad_sun': 'createSunAnimation',
    }
};
