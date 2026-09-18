// Source unique pour tout ce qui touche à l'identité "publique" du site
// (Open Graph, JSON-LD, robots.txt, sitemap.xml) - un seul endroit à changer
// si le nom de domaine ou le contenu évolue, plutôt que des valeurs éparpillées.
export const siteConfig = {
    name: "Pierre Puget",
    title: "Pierre Puget | Portfolio 3D",
    description:
        "Portfolio interactif de Pierre Puget - graphe 3D reliant projets, technologies et compétences (BUT Informatique, développement & systèmes).",
    // À définir via la variable d'environnement NEXT_PUBLIC_SITE_URL une fois
    // le site déployé (ex. dans les réglages du projet Vercel) - le domaine
    // final n'est pas encore connu à ce stade, donc pas de valeur en dur ici
    // qui prétendrait être la bonne adresse.
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
    linkedin: "https://www.linkedin.com/in/pierre-puget-54b427366/",
    github: "https://github.com/Stratore",
};
