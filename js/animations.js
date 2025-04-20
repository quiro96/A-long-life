// js/animations.js

// Assicurati che import siano corretti all'inizio del file
import { config } from './config.js';
import { elements } from './elements.js';

function clearAnimationContainer() { if(elements.animationContainer) elements.animationContainer.innerHTML = ''; }

export function createHappyAnimation() {
    clearAnimationContainer(); // Pulisce prima
    if (!elements.animationContainer) return; // Sicurezza
    for (let i = 0; i < config.numberOfHappyCircles; i++) {
        // La dichiarazione deve essere PRIMA dell'uso
        const circle = document.createElement('div');
        circle.classList.add(config.classes.happyCircle);
        circle.style.left = `${Math.random() * 100}%`;
        circle.style.animationDelay = `${Math.random() * 5}s`;
        elements.animationContainer.appendChild(circle); // Aggiunge al container
    }
}

export function createParticleAnimation() { clearAnimationContainer(); /* ... codice ... */ elements.animationContainer.appendChild(particle); }
// ... (tutte le altre funzioni create...Animation, assicurati che usino 'elements.animationContainer') ...
export function createRunningDotsAnimation() { clearAnimationContainer(); /* ... codice ... */ elements.animationContainer.appendChild(dot); }


// Mappa nomi funzioni (stringhe) -> funzioni reali
// Rendi disponibili le funzioni create... per la mappa
export const animationCreators = {
    createHappyAnimation, createParticleAnimation, // ... e tutte le altre ...
    createRunningDotsAnimation,
};