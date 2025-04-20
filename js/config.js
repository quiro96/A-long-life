// js/config.js
export const config = {
    // Timing & Speed
    speedPxPerSec: 300,
    timeMultiplier: 1.5,
    initialInactivityDelayMs: 4000,
    shineInactivityDelayMs: 3000,
    // --- MODIFICA TIMING ANNI ---
    yearGridAppearTime: 45, // Tempo (s) in cui appare la griglia e il primo anno
    secondsPerYearSquare: 15, // Secondi per ogni anno successivo
    // --- FINE MODIFICA TIMING ---

    // Durations
    audioRampExpandDuration: 0.6,
    audioRampShrinkDuration: 3.0,
    timelineGlowExpandDuration: '0.6s',
    timelineGlowShrinkDuration: '3.0s',
    promptFadeDuration: 1.5, // Secondi
    animationFadeDuration: 1.5, // Secondi

    // --- NUOVA CONFIG: Bottone ---
    autoAdvanceAppearTime: 75, // Anno 3 = 45 + 2*15

    // Audio
    noiseMaxVolume: -25,
    noiseMinVolume: -Infinity,

    // Visuals
    timelineGlowOn: '0 0 25px rgba(255, 255, 255, 1.0), 0 0 35px rgba(255, 255, 255, 0.7)',
    timelineGlowOff: '0 0 0px rgba(255, 255, 255, 0)',
    numberOfYearGridCells: 100, // Manteniamo 100 per visualizzazione potenziale

    // Animation specifics (rimuoviamo quelli non più usati?) - Lasciamoli per ora
    numberOfHappyCircles: 15, numberOfFadeParticles: 25,
    numberOfStackingBlocks: 5, numberOfIntertwiningCircles: 3,
    numberOfRunningDots: 5,
    // SVG Paths
    brainSvgPath: "M50,5 C25,5 10,25 10,40 C10,55 25,75 50,75 C75,75 90,55 90,40 C90,25 75,5 50,5 Z M50,15 C65,15 75,25 75,40 C75,55 65,65 50,65 C35,65 25,55 25,40 C25,25 35,15 50,15 Z M40,30 Q50,20 60,30 Q70,40 60,50 Q50,60 40,50 Q30,40 40,30 Z",
    footprintSvgPath: "M25,5 C15,5 5,20 5,35 Q5,50 15,60 L25,75 L35,60 Q45,50 45,35 C45,20 35,5 25,5 Z M25,15 Q35,20 35,35 Q35,45 25,55 Q15,45 15,35 Q15,20 25,15 Z",
    speechBubbleSvgPath: "M5,5 Q5,0 10,0 H50 Q55,0 55,5 V30 Q55,35 50,35 H30 L25,45 L20,35 H10 Q5,35 5,30 Z",
    // --- NUOVO SVG Path ---
    sunSvgPath: "M50,50 m-25,0 a25,25 0 1,0 50,0 a25,25 0 1,0 -50,0 Z M50,10 V0 M50,100 V90 M10,50 H0 M100,50 H90 M20,20 L10,10 M80,80 L90,90 M20,80 L10,90 M80,20 L90,10", // Cerchio con raggi

    // ids
    ids: {
        titleH1: 'title-h1', titleContainer: 'title-container',
        timeLine: 'time-line', timeLineContainer: 'time-line-container',
        currentPrompt: 'current-prompt', promptContainer: 'prompt-container',
        yearGridContainer: 'year-grid-container', timerDisplay: 'timer-display',
        animationContainer: 'animation-container',
        brainSvg: 'brain-svg', footprintSvg: 'footprint-svg', speechBubbleSvg: 'speech-bubble-svg',
        // --- NUOVI ID ---
        autoAdvanceButton: 'auto-advance-btn',
        sunSvg: 'sun-svg', // ID per l'elemento SVG sole
    },

    // classes
    classes: {
        visible: 'visible', titleVisible: 'title-visible', titleHidden: 'title-hidden',
        timelineHidden: 'timeline-hidden', yearGridVisible: 'visible',
        happyCircle: 'happy-circle', fadeParticle: 'fade-particle', stackingBlock: 'stacking-block',
        intertwiningCircle: 'intertwining-circle', gridLine: 'grid-line',
        gridLineHorizontal: 'horizontal', gridLineVertical: 'vertical',
        runningDot: 'running-dot', yearSquare: 'year-square', gridCell: 'grid-cell',
        // --- NUOVE CLASSI ---
        autoAdvanceButtonActive: 'active', // Classe per bottone attivo
        autoAdvanceButtonVisible: 'visible', // Classe per mostrare bottone
        hanoiBlock: 'hanoi-block', // Classe per blocchi Hanoi
    },

    // --- AGGIORNAMENTO timelineEvents CON NUOVO TIMING E ANNI 2-10 ---
    timelineEvents: [
        // 0-45 secondi: Intro & Titolo
        { start: 8,  end: 15, type: 'animation', id: 'anim_happy', text: "Giorni felici..." }, // 7s
        { start: 20, end: 27, type: 'prompt',    id: 'text_noMemory', text: "Di cui non ho memoria." }, // 7s
        { start: 30, end: 40, type: 'title' }, // 10s
        { start: 42, end: 45, type: 'animation', id: 'anim_brain', text: "Il cervello impara..." }, // Testo più breve per adattarsi prima del 45s

        // Anno 1 (45s - 60s) - 1 quadratino visibile
        { start: 48, end: 54, type: 'animation', id: 'anim_hanoi_new', text: "Ricordo la torre di Hanoi!" }, // 6s, Nuova animazione Hanoi
        { start: 55, end: 60, type: 'animation', id: 'anim_dad_sun', text: "E le parole di mio papà: 'Sei un sole.'" }, // 5s, Nuova animazione Sole

        // Anno 2 (60s - 75s) - 2 quadratini
        { start: 63, end: 69, type: 'animation', id: 'anim_steps', text: "I primi passi incerti... che fatica!" }, // 6s
        { start: 70, end: 75, type: 'animation', id: 'anim_voices', text: "Le prime parole... 'mamma'?" }, // 5s

        // Anno 3 (75s - 90s) - 3 quadratini - Bottone appare
        { start: 78, end: 84, type: 'prompt',    id: 'whys', text: "Un sacco di perché, immagino..." }, // 6s
        { start: 85, end: 90, type: 'animation', id: 'anim_school', text: "Costruire mondi con poco." }, // 5s

        // Anno 4 (90s - 105s) - 4 quadratini
        { start: 93, end: 99, type: 'prompt',    id: 'learning_names', text: "Imparare i nomi delle cose." }, // 6s
        { start: 100, end: 105, type: 'animation', id: 'anim_particles', text: "La scoperta continua." }, // 5s

        // Anno 5 (105s - 120s) - 5 quadratini
        { start: 108, end: 114, type: 'prompt', id: 'bedtime_stories', text: "Le storie prima di dormire..." }, // 6s
        { start: 115, end: 120, type: 'animation', id: 'anim_rules', text: "Si iniziava a capire le regole." }, // 5s

        // Anno 6 (120s - 135s) - 6 quadratini
        { start: 123, end: 129, type: 'animation', id: 'anim_friends', text: "I primi amici! Un piccolo mondo." }, // 6s
        { start: 130, end: 135, type: 'prompt',    id: 'waiting_turn', text: "Aspettare il proprio turno." }, // 5s

        // Anno 7 (135s - 150s) - 7 quadratini
        { start: 138, end: 144, type: 'prompt', id: 'laughter_prompt', text: "Quante risate per niente..." }, // 6s
        { start: 145, end: 150, type: 'animation', id: 'anim_running', text: "Corse a perdifiato." }, // 5s

        // Anno 8 (150s - 165s) - 8 quadratini
        { start: 153, end: 159, type: 'animation', id: 'anim_school', text: "La scuola, i compiti." }, // 6s
        { start: 160, end: 165, type: 'prompt',    id: 'fights_friends', text: "A volte si litigava, ma poi pace." }, // 5s

        // Anno 9 (165s - 180s) - 9 quadratini
        { start: 168, end: 174, type: 'animation', id: 'anim_friends', text: "Legami che sembravano eterni." }, // 6s
        { start: 175, end: 180, type: 'prompt',    id: 'sharing_prompt', text: "Dividere la merenda!" }, // 5s

        // Anno 10 (180s - 195s) - 10 quadratini
        { start: 183, end: 189, type: 'animation', id: 'anim_running', text: "Giocare fino al tramonto." }, // 6s
        { start: 190, end: 195, type: 'prompt',    id: 'growing_up', text: "Si cresceva in fretta..." } // 5s

        // Continuare fino a 100 anni richiederebbe molti eventi!
    ],
    // --- FINE AGGIORNAMENTO ---

    // Prompt Inattività
    inactivityPrompts: {
        initial: "Premi -> per proseguire",
        shine: "Non dimenticarti di risplendere"
    },

    // Mappa ID animazione -> Nome funzione JS (Include nuove animazioni)
    animationCreatorMap: {
        'anim_happy': 'createHappyAnimation',
        'anim_particles': 'createParticleAnimation',
        'anim_brain': 'createBrainAnimation',
        'anim_school': 'createStackingBlocksAnimation', // Per costruzioni/scuola
        'anim_friends': 'createIntertwiningCirclesAnimation',
        'anim_steps': 'createFootprintAnimation',
        'anim_voices': 'createSpeechBubbleAnimation', // Per voci generiche/parole papà
        'anim_rules': 'createGridLinesAnimation',
        'anim_running': 'createRunningDotsAnimation',
        // --- NUOVE MAPPE ---
        'anim_hanoi_new': 'createHanoiTowerAnimation', // Nuova funzione per Hanoi
        'anim_dad_sun': 'createSunAnimation',       // Nuova funzione per Sole
    }
};
