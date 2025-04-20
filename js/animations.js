// js/animations.js ok
import { config } from './config.js';
import { elements } from './elements.js';

// --- Funzioni Creazione Animazioni ---
function clearAnimationContainer() { if(elements.animationContainer) elements.animationContainer.innerHTML = ''; }

// Esistenti
export function createHappyAnimation() { clearAnimationContainer(); if (!elements.animationContainer) return; for (let i = 0; i < config.numberOfHappyCircles; i++) { const circle = document.createElement('div'); circle.classList.add(config.classes.happyCircle); circle.style.left = `${Math.random() * 100}%`; circle.style.animationDelay = `${Math.random() * 5}s`; elements.animationContainer.appendChild(circle); } }
export function createParticleAnimation() { clearAnimationContainer(); if (!elements.animationContainer) return; for (let i = 0; i < config.numberOfFadeParticles; i++) { const particle = document.createElement('div'); particle.classList.add(config.classes.fadeParticle); particle.style.left = `${Math.random() * 100}%`; particle.style.top = `${Math.random() * 100}%`; particle.style.animationDelay = `${Math.random() * 1.2}s`; elements.animationContainer.appendChild(particle); } }
export function createBrainAnimation() { clearAnimationContainer(); if (!elements.animationContainer) return; const svgNS = "http://www.w3.org/2000/svg"; const svg = document.createElementNS(svgNS, "svg"); svg.setAttribute("id", config.ids.brainSvg); svg.setAttribute("viewBox", "0 0 100 80"); svg.style.overflow = "visible"; const path = document.createElementNS(svgNS, "path"); path.setAttribute("d", config.brainSvgPath); path.setAttribute("stroke", "white"); path.setAttribute("stroke-width", "1.5"); path.setAttribute("fill", "none"); svg.appendChild(path); elements.animationContainer.appendChild(svg); }
export function createStackingBlocksAnimation() { clearAnimationContainer(); if (!elements.animationContainer) return; for (let i = 0; i < config.numberOfStackingBlocks; i++) { const block = document.createElement('div'); block.classList.add(config.classes.stackingBlock); elements.animationContainer.appendChild(block); } }
export function createIntertwiningCirclesAnimation() { clearAnimationContainer(); if (!elements.animationContainer) return; for (let i = 0; i < config.numberOfIntertwiningCircles; i++) { const circle = document.createElement('div'); circle.classList.add(config.classes.intertwiningCircle); elements.animationContainer.appendChild(circle); } }
export function createFootprintAnimation() { clearAnimationContainer(); if (!elements.animationContainer) return; const svgNS = "http://www.w3.org/2000/svg"; const svg = document.createElementNS(svgNS, "svg"); svg.setAttribute("id", config.ids.footprintSvg); svg.setAttribute("viewBox", "0 0 50 80"); svg.style.overflow = "visible"; const path = document.createElementNS(svgNS, "path"); path.setAttribute("d", config.footprintSvgPath); path.setAttribute("stroke", "white"); path.setAttribute("stroke-width", "1.5"); path.setAttribute("fill", "none"); svg.appendChild(path); elements.animationContainer.appendChild(svg); }
export function createSpeechBubbleAnimation() { clearAnimationContainer(); if (!elements.animationContainer) return; const svgNS = "http://www.w3.org/2000/svg"; const svg = document.createElementNS(svgNS, "svg"); svg.setAttribute("id", config.ids.speechBubbleSvg); svg.setAttribute("viewBox", "0 0 60 50"); svg.style.overflow = "visible"; const path = document.createElementNS(svgNS, "path"); path.setAttribute("d", config.speechBubbleSvgPath); path.setAttribute("stroke", "white"); path.setAttribute("stroke-width", "1.5"); path.setAttribute("fill", "none"); svg.appendChild(path); elements.animationContainer.appendChild(svg); }
export function createGridLinesAnimation() { clearAnimationContainer(); if (!elements.animationContainer) return; for (let i = 0; i < 3; i++) { const hLine = document.createElement('div'); hLine.classList.add(config.classes.gridLine, config.classes.gridLineHorizontal); hLine.style.top = `${25 + i * 25}%`; hLine.style.animationDelay = `${i * 0.2}s`; elements.animationContainer.appendChild(hLine); } for (let i = 0; i < 3; i++) { const vLine = document.createElement('div'); vLine.classList.add(config.classes.gridLine, config.classes.gridLineVertical); vLine.style.left = `${25 + i * 25}%`; vLine.style.animationDelay = `${0.5 + i * 0.2}s`; elements.animationContainer.appendChild(vLine); } }
export function createRunningDotsAnimation() { clearAnimationContainer(); if (!elements.animationContainer) return; for (let i = 0; i < config.numberOfRunningDots; i++) { const dot = document.createElement('div'); dot.classList.add(config.classes.runningDot); dot.style.top = `${10 + Math.random() * 80}%`; dot.style.animationDelay = `${Math.random() * 0.5}s`; elements.animationContainer.appendChild(dot); } }

// --- NUOVE FUNZIONI ANIMAZIONE ---
export function createHanoiTowerAnimation() {
    clearAnimationContainer();
    if (!elements.animationContainer) return;
    // Crea 3 blocchi con la classe hanoi-block definita nel CSS
    for (let i = 0; i < 3; i++) {
        const block = document.createElement('div');
        block.classList.add(config.classes.hanoiBlock);
        // Il CSS gestisce posizione e delay
        elements.animationContainer.appendChild(block);
    }
}

export function createSunAnimation() {
    clearAnimationContainer();
    if (!elements.animationContainer) return;
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("id", config.ids.sunSvg); // Usa ID da config
    svg.setAttribute("viewBox", "0 0 100 100"); // Viewbox per il path
    svg.style.overflow = "visible";
    const path = document.createElementNS(svgNS, "path");
    path.setAttribute("d", config.sunSvgPath); // Path da config
    // Stile e animazione sono definiti nel CSS tramite l'ID #sun-svg
    svg.appendChild(path);
    elements.animationContainer.appendChild(svg);
}
// --- FINE NUOVE FUNZIONI ---


// Mappa nomi funzioni (stringhe) -> funzioni reali (include nuove)
export const animationCreators = {
    createHappyAnimation, createParticleAnimation, createBrainAnimation,
    createStackingBlocksAnimation, createIntertwiningCirclesAnimation,
    createFootprintAnimation, createSpeechBubbleAnimation,
    createGridLinesAnimation, createRunningDotsAnimation,
    // --- NUOVE ---
    createHanoiTowerAnimation, createSunAnimation,
};
