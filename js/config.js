// js/config.js
export const config = {
    // Timing & Speed
    speedPxPerSec: 300, timeMultiplier: 1.5, initialInactivityDelayMs: 4000,
    shineInactivityDelayMs: 3000, yearGridAppearTime: 45, secondsPerYearSquare: 15,
    autoAdvanceAppearTime: 60, // Appare al 2° anno (60s)
    // --- NUOVO: End Time ---
    endTime: 1530, // 45 + 99*15 -> Tempo per riempire 100 quadrati

    // Durations
    audioRampExpandDuration: 0.6, audioRampShrinkDuration: 3.0,
    timelineGlowExpandDuration: '0.6s', timelineGlowShrinkDuration: '3.0s',
    promptFadeDuration: 1.5, animationFadeDuration: 1.5,
    // --- NUOVO: Fade Out Finale ---
    finalFadeOutDuration: 1.5, // Durata fade out elementi UI (secondi)

    // Audio
    noiseMaxVolume: -25, noiseMinVolume: -Infinity,

    // Visuals & Animation Counts/Paths (invariati)
    timelineGlowOn: '0 0 25px rgba(255, 255, 255, 1.0), 0 0 35px rgba(255, 255, 255, 0.7)', timelineGlowOff: '0 0 0px rgba(255, 255, 255, 0)',
    numberOfYearGridCells: 100, numberOfHappyCircles: 15, numberOfFadeParticles: 25, numberOfStackingBlocks: 5, numberOfIntertwiningCircles: 3, numberOfRunningDots: 5,
    brainSvgPath: "M50,5 C25,5 10,25 10,40 C10,55 25,75 50,75 C75,75 90,55 90,40 C90,25 75,5 50,5 Z M50,15 C65,15 75,25 75,40 C75,55 65,65 50,65 C35,65 25,55 25,40 C25,25 35,15 50,15 Z M40,30 Q50,20 60,30 Q70,40 60,50 Q50,60 40,50 Q30,40 40,30 Z",
    footprintSvgPath: "M25,5 C15,5 5,20 5,35 Q5,50 15,60 L25,75 L35,60 Q45,50 45,35 C45,20 35,5 25,5 Z M25,15 Q35,20 35,35 Q35,45 25,55 Q15,45 15,35 Q15,20 25,15 Z",
    speechBubbleSvgPath: "M5,5 Q5,0 10,0 H50 Q55,0 55,5 V30 Q55,35 50,35 H30 L25,45 L20,35 H10 Q5,35 5,30 Z",
    sunSvgPath: "M50,50 m-25,0 a25,25 0 1,0 50,0 a25,25 0 1,0 -50,0 Z M50,10 V0 M50,100 V90 M10,50 H0 M100,50 H90 M20,20 L10,10 M80,80 L90,90 M20,80 L10,90 M80,20 L90,10",

    // ids
    ids: {
        titleH1: 'title-h1', titleContainer: 'title-container', timeLine: 'time-line', timeLineContainer: 'time-line-container',
        currentPrompt: 'current-prompt', promptContainer: 'prompt-container', yearGridContainer: 'year-grid-container',
        timerDisplay: 'timer-display', animationContainer: 'animation-container', autoAdvanceButton: 'auto-advance-btn',
        brainSvg: 'brain-svg', footprintSvg: 'footprint-svg', speechBubbleSvg: 'speech-bubble-svg', sunSvg: 'sun-svg',
        // --- NUOVO ID ---
        endScreen: 'end-screen',
    },

    // classes
    classes: {
        visible: 'visible', titleVisible: 'title-visible', titleHidden: 'title-hidden', timelineHidden: 'timeline-hidden', yearGridVisible: 'visible',
        happyCircle: 'happy-circle', fadeParticle: 'fade-particle', stackingBlock: 'stacking-block', intertwiningCircle: 'intertwining-circle',
        gridLine: 'grid-line', gridLineHorizontal: 'horizontal', gridLineVertical: 'vertical', runningDot: 'running-dot', yearSquare: 'year-square', gridCell: 'grid-cell',
        autoAdvanceButtonActive: 'active', autoAdvanceButtonVisible: 'visible', hanoiBlock: 'hanoi-block',
        // --- NUOVA CLASSE ---
        fadeOutFinal: 'fade-out-final', // Classe per fade out finale
    },

    // --- TIMELINE EVENTS ESTESA FINO A 1530s ---
    // (Durata eventi ~5s, Pausa ~10s) - Frequenza ridotta con l'età
    timelineEvents: [
        // Intro (0-45s)
        { start: 8,  end: 13, type: 'animation', id: 'anim_happy', text: "Giorni felici..." },
        { start: 20, end: 25, type: 'prompt',    id: 'text_noMemory', text: "Di cui non ho memoria." },
        { start: 30, end: 40, type: 'title' },
        { start: 42, end: 45, type: 'animation', id: 'anim_brain', text: "Il cervello impara..." },

        // Anni 1-10 (45s - 195s)
        { start: 48, end: 53, type: 'animation', id: 'anim_hanoi_new', text: "Ricordo la torre di Hanoi!" },
        { start: 60, end: 65, type: 'animation', id: 'anim_dad_sun', text: "Le parole di mio papà: 'Sei un sole.'" },
        { start: 70, end: 75, type: 'animation', id: 'anim_steps', text: "I primi passi incerti." },
        { start: 80, end: 85, type: 'animation', id: 'anim_voices', text: "'Mamma'? Le prime parole?" },
        { start: 90, end: 95, type: 'prompt',    id: 'whys', text: "Un sacco di perché..." },
        { start: 100, end: 105, type: 'animation', id: 'anim_school', text: "Costruire mondi con poco." },
        { start: 110, end: 115, type: 'prompt', id: 'learning_names', text: "Imparare i nomi delle cose." },
        { start: 120, end: 125, type: 'animation', id: 'anim_rules', text: "Le prime regole da capire." },
        { start: 130, end: 135, type: 'animation', id: 'anim_friends', text: "I primi amici! Giochi insieme." },
        { start: 140, end: 145, type: 'prompt', id: 'laughter_prompt', text: "Quante risate per sciocchezze!" },
        { start: 150, end: 155, type: 'animation', id: 'anim_running', text: "Corse a perdifiato nel cortile." },
        { start: 160, end: 165, type: 'prompt',    id: 'fights_friends', text: "A volte si litigava..." },
        { start: 170, end: 175, type: 'animation', id: 'anim_friends', text: "...ma poi si faceva pace." },
        { start: 180, end: 185, type: 'prompt', id: 'sharing_prompt', text: "Difficile dividere la merenda!" },
        { start: 190, end: 195, type: 'animation', id: 'anim_particles', text: "Si cresceva in fretta..." },

        // Anni 11-20 (195s - 345s)
        { start: 205, end: 210, type: 'animation', id: 'anim_school', text: "Le medie... nuovi compagni, nuovi prof." },
        { start: 220, end: 225, type: 'animation', id: 'anim_brain', text: "Il corpo cambiava, che imbarazzo a volte." },
        { start: 235, end: 240, type: 'animation', id: 'anim_friends', text: "Le prime cotte... farfalle nello stomaco." },
        { start: 250, end: 255, type: 'prompt',    id: 'music_discovery', text: "La musica! Ore ad ascoltare..." },
        { start: 265, end: 270, type: 'animation', id: 'anim_rules', text: "Le superiori. Più libertà, più responsabilità." },
        { start: 280, end: 285, type: 'animation', id: 'anim_running', text: "Lo sport, la squadra... sudore e soddisfazioni." },
        { start: 295, end: 300, type: 'prompt',    id: 'first_drive', text: "La patente! Il mondo sembrava aprirsi." },
        { start: 310, end: 315, type: 'animation', id: 'anim_steps', text: "Esami, scelte... cosa fare 'da grande'?" },
        { start: 325, end: 330, type: 'animation', id: 'anim_friends', text: "L'ultimo anno. Saluti, promesse..." },
        { start: 340, end: 345, type: 'animation', id: 'anim_particles', text: "Un capitolo si chiudeva." },

         // Anni 21-40 (345s - 645s) - Frequenza ridotta
         { start: 360, end: 365, type: 'animation', id: 'anim_school', text: "L'università, o il primo lavoro. Imparare ancora." },
         { start: 380, end: 385, type: 'animation', id: 'anim_steps', text: "Vivere da soli? Le prime bollette!" },
         { start: 405, end: 410, type: 'animation', id: 'anim_friends', text: "L'amore importante. Costruire insieme." },
         { start: 430, end: 435, type: 'prompt',    id: 'career_start', text: "La carriera... alti e bassi." },
         { start: 455, end: 460, type: 'animation', id: 'anim_running', text: "Anni frenetici, pieni di cose da fare." },
         { start: 485, end: 490, type: 'animation', id: 'anim_hanoi_new', text: "Magari una casa? Un progetto concreto." }, // Riusiamo Hanoi per 'costruire'
         { start: 515, end: 520, type: 'animation', id: 'anim_dad_sun', text: "I figli? Un sole che sorge di nuovo." }, // Riusiamo sole
         { start: 545, end: 550, type: 'animation', id: 'anim_happy', text: "Momenti di pura felicità familiare." },
         { start: 580, end: 585, type: 'animation', id: 'anim_brain', text: "Preoccupazioni, responsabilità... crescere." },
         { start: 615, end: 620, type: 'animation', id: 'anim_rules', text: "La routine, le abitudini si consolidano." },

         // Anni 41-60 (645s - 945s)
         { start: 645, end: 650, type: 'prompt',    id: 'midlife', text: "Metà del cammino? Riflessioni." },
         { start: 675, end: 680, type: 'animation', id: 'anim_steps', text: "I figli crescono, prendono la loro strada." },
         { start: 710, end: 715, type: 'animation', id: 'anim_school', text: "Forse un cambio di carriera? Nuove sfide." },
         { start: 745, end: 750, type: 'animation', id: 'anim_friends', text: "Le amicizie di una vita si rafforzano." },
         { start: 780, end: 785, type: 'prompt',    id: 'health_care', text: "Prendersi cura della salute, dei genitori." },
         { start: 815, end: 820, type: 'animation', id: 'anim_particles', text: "Viaggi, nuove scoperte, se possibile." },
         { start: 850, end: 855, type: 'animation', id: 'anim_voices', text: "Conversazioni importanti, bilanci." },
         { start: 885, end: 890, type: 'animation', id: 'anim_brain', text: "La memoria a volte inizia a fare scherzi." },
         { start: 920, end: 925, type: 'animation', id: 'anim_hanoi_new', text: "Pianificare la pensione." },

        // Anni 61-80 (945s - 1245s)
        { start: 945, end: 950, type: 'prompt',    id: 'retirement', text: "La pensione! Un nuovo ritmo." },
        { start: 980, end: 985, type: 'animation', id: 'anim_happy', text: "Più tempo per le passioni, i nipoti." },
        { start: 1015, end: 1020, type: 'animation', id: 'anim_friends', text: "Ritrovarsi con gli amici di sempre." },
        { start: 1050, end: 1055, type: 'animation', id: 'anim_steps', text: "Acciacchi, visite mediche... fa parte del gioco." },
        { start: 1085, end: 1090, type: 'prompt',    id: 'loss', text: "Qualche perdita dolorosa, amici che se ne vanno." },
        { start: 1120, end: 1125, type: 'animation', id: 'anim_particles', text: "Ricordi che riaffiorano, più vividi." },
        { start: 1155, end: 1160, type: 'animation', id: 'anim_dad_sun', text: "La saggezza dell'età? Forse." },
        { start: 1190, end: 1195, type: 'animation', id: 'anim_voices', text: "Raccontare storie ai più giovani." },
        { start: 1225, end: 1230, type: 'animation', id: 'anim_brain', text: "Il mondo cambia così in fretta." },

        // Anni 81-100+ (1245s - 1530s)
        { start: 1245, end: 1250, type: 'prompt', id: 'old_age', text: "Le primavere diventano preziose." },
        { start: 1280, end: 1285, type: 'animation', id: 'anim_happy', text: "Le piccole gioie quotidiane." },
        { start: 1315, end: 1320, type: 'animation', id: 'anim_friends', text: "Il calore della famiglia rimasta." },
        { start: 1350, end: 1355, type: 'animation', id: 'anim_steps', text: "Il passo si fa più lento." },
        { start: 1385, end: 1390, type: 'animation', id: 'anim_particles', text: "Ricordi, tanti ricordi..." },
        { start: 1420, end: 1425, type: 'prompt', id: 'legacy', text: "Cosa si lascia?" },
        { start: 1455, end: 1460, type: 'animation', id: 'anim_brain', text: "La mente vaga..." },
        { start: 1490, end: 1495, type: 'animation', id: 'anim_dad_sun', text: "Una lunga vita..." },
        { start: 1520, end: 1525, type: 'prompt', id: 'gratitude', text: "Gratitudine." }, // Ultimo prompt prima della fine
    ],
    // --- FINE TIMELINE ---

    // Prompt Inattività
    inactivityPrompts: { initial: "Premi -> per proseguire", shine: "Non dimenticarti di risplendere" },

    // Mappa ID animazione -> Nome funzione JS
    animationCreatorMap: { /* ... (invariata, contiene tutte) ... */
        'anim_happy': 'createHappyAnimation', 'anim_particles': 'createParticleAnimation', 'anim_brain': 'createBrainAnimation',
        'anim_school': 'createStackingBlocksAnimation', 'anim_friends': 'createIntertwiningCirclesAnimation', 'anim_steps': 'createFootprintAnimation',
        'anim_voices': 'createSpeechBubbleAnimation', 'anim_rules': 'createGridLinesAnimation', 'anim_running': 'createRunningDotsAnimation',
        'anim_hanoi_new': 'createHanoiTowerAnimation', 'anim_dad_sun': 'createSunAnimation',
     }
};
