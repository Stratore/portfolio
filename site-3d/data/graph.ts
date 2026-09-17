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
                tagline: "Gestion d'étudiants — C++ / Qt",
                description:
                    "Application de gestion d'étudiants développée en C++ avec Qt : fiches étudiants (identité, coordonnées, photo, section) et suivi des absences, justifiées ou non. Les données sont persistées dans des fichiers bruts, au format JSON ou XML, sans base de données.",
                tags: ["tech-cpp", "tech-qt", "tech-json", "tech-xml"],
                github: "https://github.com/Stratore/Klass",
                screenshots: [
                    "/assets/screenshots/klass/02-liste-etudiants.png",
                    "/assets/screenshots/klass/01-formulaire-vide.png",
                    "/assets/screenshots/klass/03-ajout-absence.png",
                ],
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
                screenshots: [
                    "/assets/screenshots/gpierres/02-itineraire-multi-villes.png",
                    "/assets/screenshots/gpierres/01-carte-villes.png",
                    "/assets/screenshots/gpierres/03-matrice-trajets.png",
                ],
            },
        },
        {
            id: "proj-dashboard",
            type: "projet",
            label: "Tableau de Bord Interactif",
            weight: 1.3,
            project: {
                tagline: "SAE S2.05 — Maquette de facturation gaz en C++ / Qt",
                description:
                    "Maquette d'application de facturation de gaz réalisée en C++ avec Qt, en groupe. À partir des relevés de compteur (index précédent / index actuel), l'application calcule la consommation en kWh et le montant TTC selon le prix du kWh et l'abonnement mensuel en vigueur. Une session administrateur permet de configurer ces tarifs et affiche un tableau de bord global (nombre de relevés, consommation cumulée, dépense totale).",
                tags: ["tech-cpp", "tech-qt", "skill-poo", "skill-ui", "skill-gestion-projet"],
                github: "https://github.com/Stratore/Facture",
                screenshots: [
                    "/assets/screenshots/facture/02-tableau-de-bord.png",
                    "/assets/screenshots/facture/01-connexion.png",
                    "/assets/screenshots/facture/03-confirmation-saisie.png",
                ],
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
        {
            id: "proj-portfolio",
            type: "projet",
            label: "Ce Portfolio 3D",
            weight: 1,
            project: {
                tagline: "Graphe 3D interactif — conçu en pilotage actif avec l'IA",
                description:
                    "Le site que tu es en train de consulter : un portfolio en graphe 3D interactif (avec repli en vue texte classique), développé en TypeScript avec Next.js, React Three Fiber et Three.js. Conçu en pilotant activement des outils d'IA (Claude Code) — cadrage des fonctionnalités, revue de chaque changement, itération rapide sur le design — plutôt qu'en la subissant : une façon concrète de montrer cette compétence à l'œuvre.",
                tags: ["tech-typescript", "tech-react", "tech-threejs", "skill-ia", "skill-ui"],
                github: "https://github.com/Stratore/portfolio",
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
        { id: "tech-xml", type: "techno", label: "XML", weight: 0.5 },
        { id: "tech-sqlite", type: "techno", label: "SQLite", weight: 0.6 },
        { id: "tech-typescript", type: "techno", label: "TypeScript", weight: 0.7 },
        { id: "tech-react", type: "techno", label: "React / Next.js", weight: 0.7 },
        { id: "tech-threejs", type: "techno", label: "Three.js / WebGL", weight: 0.6 },

        // --- Compétences ---
        { id: "skill-algo", type: "skill", label: "Algorithmique", weight: 0.9 },
        { id: "skill-poo", type: "skill", label: "POO", weight: 0.9 },
        { id: "skill-web", type: "skill", label: "Web & Données", weight: 0.7 },
        { id: "skill-systemes", type: "skill", label: "Systèmes", weight: 0.8 },
        { id: "skill-cyber", type: "skill", label: "Cybersécurité (sensibilisation)", weight: 0.8 },
        { id: "skill-api", type: "skill", label: "Intégration d'API", weight: 0.8 },
        { id: "skill-ui", type: "skill", label: "UI / UX", weight: 0.7 },
        { id: "skill-gestion-projet", type: "skill", label: "Gestion de projet", weight: 0.7 },
        { id: "skill-ia", type: "skill", label: "Collaboration avec l'IA", weight: 0.9 },
    ],
    edges: [
        // Projets → technologies utilisées
        { source: "proj-klass", target: "tech-cpp" },
        { source: "proj-klass", target: "tech-qt" },
        { source: "proj-klass", target: "tech-json" },
        { source: "proj-klass", target: "tech-xml" },
        { source: "proj-gps", target: "tech-cpp" },
        { source: "proj-gps", target: "tech-qt" },
        { source: "proj-gps", target: "tech-json" },
        { source: "proj-gps", target: "skill-algo" },
        { source: "proj-gps", target: "skill-api" },
        { source: "proj-dashboard", target: "tech-cpp" },
        { source: "proj-dashboard", target: "tech-qt" },
        { source: "proj-dashboard", target: "skill-poo" },
        { source: "proj-dashboard", target: "skill-ui" },
        { source: "proj-dashboard", target: "skill-gestion-projet" },
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
        { source: "proj-portfolio", target: "tech-typescript" },
        { source: "proj-portfolio", target: "tech-react" },
        { source: "proj-portfolio", target: "tech-threejs" },
        { source: "proj-portfolio", target: "skill-ia" },
        { source: "proj-portfolio", target: "skill-ui" },

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
