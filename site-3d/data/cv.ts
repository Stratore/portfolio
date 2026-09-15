// Contenu réel du CV de Pierre Puget — utilisé par le hologramme CV
// (components/CVHologram.tsx). Séparé du rendu pour la même raison que
// data/graph.ts : une seule source de vérité, modifiable sans toucher au code.
export const cvData = {
    name: "Pierre Puget",
    tagline:
        "Actuellement en première année de BUT Informatique à l'IUT d'Arles, ce premier semestre a confirmé mon attrait pour les aspects techniques et la logique algorithmique. Passionné par ces enjeux, je souhaite orienter mon parcours vers la cybersécurité.",

    skills: [
        {
            title: "Développement et Algorithmique",
            desc: "Apprentissage de la logique de programmation et des algorithmes via les langages Python et C++.",
        },
        {
            title: "Web et Données",
            desc: "Bases de l'intégration web (HTML, CSS) et initiation à la gestion de bases de données (SQL).",
        },
        {
            title: "Systèmes et Environnements",
            desc: "Bases de l'administration système (Linux/Bash, Windows). Compréhension de l'architecture des ordinateurs et des systèmes d'exploitation.",
        },
    ],

    education: [
        { title: "Baccalauréat", period: "2024 – 2025", place: "Lycée Louis Pasquet, Arles", note: "Mention Assez Bien" },
        { title: "BAFA", period: "2025", place: "IFAC, Nîmes" },
        { title: "PSC1", period: "2025", place: "La Croix Rouge, Arles" },
        {
            title: "Diplôme National du Brevet",
            period: "2018 – 2022",
            place: "Collège Vincent Van Gogh, Arles",
            note: "Mention Très Bien",
        },
    ],

    experience: [
        {
            title: "Cours de soutien scolaire",
            period: "2024 – 2026",
            place: "À domicile",
            desc: "Accompagnement de deux élèves dans leurs devoirs, avec des approches ludiques pour progresser.",
        },
        {
            title: "Animateur et Assistant Sanitaire",
            period: "Juillet 2025",
            place: "BAFA, Serre Chevalier",
            desc: "Gestion d'un groupe de mineurs, activités ludiques et responsabilité du pôle sanitaire.",
        },
        {
            title: "Stage de mathématiques",
            period: "2024",
            place: "Campus de Luminy, Marseille",
            desc: "Stage encadré par des doctorants, résolution de problèmes techniques en mathématiques.",
        },
        {
            title: "Stage en entreprise",
            period: "2022",
            place: "ESISAR — Grenoble INP, Valence",
            desc: "Découverte des bases de l'informatique et de la cybersécurité auprès d'étudiants ingénieurs.",
        },
    ],

    languages: [
        { name: "Anglais", level: "B2 — Intermédiaire avancé" },
        { name: "Espagnol", level: "A2 — Les bases" },
    ],

    traits: [
        "Curiosité technique",
        "Esprit logique et analytique",
        "Rigueur",
        "Bon relationnel",
        "Sens de l'organisation",
        "Esprit d'équipe",
    ],
} as const;
