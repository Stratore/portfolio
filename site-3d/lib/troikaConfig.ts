import { configureTextBuilder } from "troika-three-text";

// Désactive le Web Worker de troika-three-text (utilisé par drei <Text> pour
// le layout des polices). Certains environnements sandboxés/CSP stricts
// bloquent silencieusement la création du Worker : le layout de texte ne
// répond alors jamais, ce qui laisse tout le <Suspense> englobant (donc
// toute la scène 3D) bloqué en fallback indéfiniment, sans erreur console.
// Calcul sur le thread principal à la place — légèrement plus coûteux sur de
// très gros volumes de texte, mais fiable dans tous les environnements.
configureTextBuilder({ useWorker: false });
