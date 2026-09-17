import type { GraphData } from "@/lib/types";

// Données réelles du portfolio de Pierre Puget (BUT Informatique, IUT d'Arles).
// Pour ajouter un projet/techno/compétence : ajouter un nœud + ses arêtes ci-dessous.
export const graphData: GraphData = {
    nodes: [
        // --- Projets (nœuds prioritaires) ---
        {
            id: "proj-klass",
            type: "projet",
            label: "Klass.cpp",
            weight: 1,
            project: {
                tagline: "Gestion d'étudiants — C++ / SQL",
                description:
                    "Projet de gestion d'étudiants en C++, avec persistance des données via SQL. Détails à venir.",
                tags: ["tech-cpp", "tech-sql"],
                github: "https://github.com/Stratore/Klass",
            },
        },
        {
            id: "proj-gps",
            type: "projet",
            label: "GpierreS",
            weight: 1.3,
            project: {
                tagline: "SAE S2.02 — GPS interactif en C++ / Qt",
                description:
                    "Application GPS développée en C++ avec l'interface graphique Qt, à partir de deux fichiers CSV fournis : les informations des 100 villes clés (population, coordonnées...) et les temps de trajet entre chaque paire de villes. L'application calcule automatiquement le chemin le plus court entre deux points (algorithme de Floyd-Warshall) et permet d'ajouter autant de villes intermédiaires que voulu. Un bandeau d'information affiche les données de la ville sélectionnée (population...), enrichies en direct par l'API Météo France (température, vent, lever du soleil...), dont la réponse JSON est parsée en C++.",
                tags: ["tech-cpp", "tech-qt", "tech-json", "skill-algo", "skill-api"],
                github: "https://github.com/Stratore/gps",
            },
        },
        {
            id: "proj-dashboard",
            type: "projet",
            label: "Tableau de Bord Interactif",
            weight: 1.3,
            project: {
                tagline: "SAE S2.05 — Application de bureau C++ / Qt",
                description:
                    "Application de bureau conçue et développée en C++ avec le framework Qt. Elle regroupe un système d'authentification à plusieurs niveaux de droits (utilisateur / administrateur) et un module de facturation qui calcule les coûts, génère des statistiques globales et sauvegarde l'historique en fichiers texte. Un module de calcul d'itinéraire entre villes et de connexion à une API météo est prévu en complément.",
                tags: ["tech-cpp", "tech-qt", "skill-poo", "skill-ui"],
                github: "https://github.com/Stratore/Facture",
            },
        },
        {
            id: "proj-tripleboot",
            type: "projet",
            label: "Triple Boot Windows / Manjaro / FreeBSD",
            weight: 1,
            project: {
                tagline: "Environnement de développement multi-OS (VM)",
                description:
                    "Mise en place d'un triple boot sur une machine virtuelle (Windows 11, Manjaro et FreeBSD) pour disposer d'environnements de développement complémentaires. Partitionnement du disque, résolution de plusieurs échecs d'installation (écrasement de partitions), puis installation et configuration de la chaîne de compilation C++ (VS Code, g++) sur chaque système, validée par des tests de compilation croisés. Projet réalisé en binôme.",
                tags: ["tech-linux", "tech-windows", "tech-cpp", "skill-systemes"],
            },
        },
        {
            id: "proj-facelog",
            type: "projet",
            weight: 1.2,
            label: "FaceLog",
            project: {
                tagline: "Appel automatisé par reconnaissance faciale — projet d'équipe",
                description:
                    "Application d'appel automatisé pour le BUT Informatique : un enseignant balaie la salle avec la caméra d'un smartphone, l'application identifie les étudiants présents par rapport au groupe attendu et calcule automatiquement les retards par rapport à l'heure de début du cours. Le projet couvre la gestion du référentiel pédagogique (étudiants, groupes CM/TD/TP, enseignants, cours), l'analyse vidéo (OpenCV, face_recognition) et une base SQLite pour l'historique des présences. Une attention particulière est portée au cadre légal et éthique du traitement de données biométriques (RGPD, CNIL, chiffrement, durée de conservation). Projet d'équipe, encore en cours de développement.",
                tags: [
                    "tech-python",
                    "tech-javascript",
                    "tech-java",
                    "tech-cpp",
                    "tech-sqlite",
                    "skill-algo",
                    "skill-poo",
                    "skill-cyber",
                    "skill-ui",
                    "skill-gestion-projet",
                ],
                inProgress: true,
            },
        },

        // --- Technologies ---
        { id: "tech-cpp", type: "techno", label: "C++", weight: 1 },
        { id: "tech-python", type: "techno", label: "Python", weight: 0.8 },
        { id: "tech-html", type: "techno", label: "HTML", weight: 0.6 },
        { id: "tech-css", type: "techno", label: "CSS", weight: 0.6 },
        { id: "tech-sql", type: "techno", label: "SQL", weight: 0.6 },
        { id: "tech-linux", type: "techno", label: "Linux / Bash", weight: 0.7 },
        { id: "tech-windows", type: "techno", label: "Windows / OS", weight: 0.6 },
        { id: "tech-java", type: "techno", label: "Java", weight: 0.7 },
        { id: "tech-javascript", type: "techno", label: "JavaScript", weight: 0.6 },
        { id: "tech-qt", type: "techno", label: "Qt", weight: 0.5 },
        { id: "tech-json", type: "techno", label: "JSON", weight: 0.5 },
        { id: "tech-sqlite", type: "techno", label: "SQLite", weight: 0.6 },

        // --- Compétences ---
        { id: "skill-algo", type: "skill", label: "Algorithmique", weight: 0.9 },
        { id: "skill-poo", type: "skill", label: "POO", weight: 0.9 },
        { id: "skill-web", type: "skill", label: "Web & Données", weight: 0.7 },
        { id: "skill-systemes", type: "skill", label: "Systèmes", weight: 0.8 },
        { id: "skill-cyber", type: "skill", label: "Cybersécurité (sensibilisation)", weight: 0.8 },
        { id: "skill-api", type: "skill", label: "Intégration d'API", weight: 0.8 },
        { id: "skill-ui", type: "skill", label: "UI / UX", weight: 0.7 },
        { id: "skill-gestion-projet", type: "skill", label: "Gestion de projet", weight: 0.7 },
    ],
    edges: [
        // Projets → technologies utilisées
        { source: "proj-klass", target: "tech-cpp" },
        { source: "proj-klass", target: "tech-sql" },
        { source: "proj-gps", target: "tech-cpp" },
        { source: "proj-gps", target: "tech-qt" },
        { source: "proj-gps", target: "tech-json" },
        { source: "proj-gps", target: "skill-algo" },
        { source: "proj-gps", target: "skill-api" },
        { source: "proj-dashboard", target: "tech-cpp" },
        { source: "proj-dashboard", target: "tech-qt" },
        { source: "proj-dashboard", target: "skill-poo" },
        { source: "proj-dashboard", target: "skill-ui" },
        { source: "proj-tripleboot", target: "tech-linux" },
        { source: "proj-tripleboot", target: "tech-windows" },
        { source: "proj-tripleboot", target: "skill-systemes" },
        { source: "proj-facelog", target: "tech-python" },
        { source: "proj-facelog", target: "tech-javascript" },
        { source: "proj-facelog", target: "tech-java" },
        { source: "proj-facelog", target: "tech-cpp" },
        { source: "proj-facelog", target: "tech-sqlite" },
        { source: "proj-facelog", target: "skill-algo" },
        { source: "proj-facelog", target: "skill-poo" },
        { source: "proj-facelog", target: "skill-cyber" },
        { source: "proj-facelog", target: "skill-ui" },
        { source: "proj-facelog", target: "skill-gestion-projet" },

        // Compétences ↔ technologies associées
        { source: "skill-algo", target: "tech-cpp" },
        { source: "skill-algo", target: "tech-python" },
        { source: "skill-poo", target: "tech-cpp" },
        { source: "skill-web", target: "tech-html" },
        { source: "skill-web", target: "tech-css" },
        { source: "skill-web", target: "tech-sql" },
        { source: "skill-web", target: "tech-sqlite" },
        { source: "skill-systemes", target: "tech-linux" },
        { source: "skill-systemes", target: "tech-windows" },
        { source: "skill-cyber", target: "skill-systemes" },
        { source: "skill-api", target: "tech-json" },
        { source: "skill-ui", target: "tech-qt" },

        // Nouvelles technologies : rattachées aux compétences pertinentes,
        // pas aux projets existants (qui n'utilisent réellement que C++) —
        // évite d'affirmer à tort qu'un projet utilise une techno qu'il
        // n'utilise pas.
        { source: "skill-algo", target: "tech-java" },
        { source: "skill-poo", target: "tech-java" },
        { source: "skill-web", target: "tech-javascript" },
        { source: "tech-qt", target: "tech-cpp" },
        { source: "skill-poo", target: "tech-qt" },
    ],
};
