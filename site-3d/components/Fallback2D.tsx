import { graphData } from "@/data/graph";

function techLabel(id: string): string {
    return graphData.nodes.find((n) => n.id === id)?.label ?? id;
}

/**
 * Contenu 2D statique, toujours présent dans le HTML généré côté serveur —
 * lisible sans JavaScript et indexable par les moteurs de recherche. Le
 * monde 3D (client-only, ssr:false) vient se superposer par-dessus une fois
 * hydraté ; voir app/page.tsx pour le bouton "vue classique" qui le bascule.
 * Sert aussi de vue "CV classique" pour les recruteurs qui préfèrent lire
 * l'information sans manipuler le graphe 3D.
 */
export function Fallback2D() {
    const projects = graphData.nodes.filter((n) => n.type === "projet");
    const skills = graphData.nodes.filter((n) => n.type === "skill");
    const technos = graphData.nodes.filter((n) => n.type === "techno");

    return (
        <main className="fallback-2d">
            <p className="fallback-2d__eyebrow">Vue classique — même contenu que le graphe 3D</p>
            <h1>Pierre Puget</h1>
            <p className="fallback-2d__role">Étudiant en BUT Informatique — IUT d&apos;Arles</p>
            <p className="fallback-2d__intro">
                Développement C++ / POO, systèmes Linux, web, sensibilisé aux enjeux de cybersécurité. Ce portfolio
                se présente habituellement sous la forme d&apos;un graphe 3D interactif reliant projets, technologies
                et compétences — voici son contenu au format texte, pour un accès rapide sans navigation 3D.
            </p>

            <h2>Projets</h2>
            <ul className="fallback-2d__projects">
                {projects.map((p) => (
                    <li key={p.id}>
                        <strong>{p.label}</strong>
                        {p.project && <span className="fallback-2d__tagline"> — {p.project.tagline}</span>}
                        {p.project && <p className="fallback-2d__desc">{p.project.description}</p>}
                        {p.project && p.project.tags.length > 0 && (
                            <div className="fallback-2d__tags">
                                {p.project.tags.map((tagId) => (
                                    <span key={tagId} className="fallback-2d__tag">
                                        {techLabel(tagId)}
                                    </span>
                                ))}
                            </div>
                        )}
                        {p.project?.github && (
                            <a href={p.project.github} target="_blank" rel="noopener noreferrer">
                                Code source ↗
                            </a>
                        )}
                    </li>
                ))}
            </ul>

            <h2>Compétences</h2>
            <ul>
                {skills.map((n) => (
                    <li key={n.id}>{n.label}</li>
                ))}
            </ul>

            <h2>Technologies</h2>
            <ul>
                {technos.map((n) => (
                    <li key={n.id}>{n.label}</li>
                ))}
            </ul>

            <h2>Contact</h2>
            <ul>
                <li>
                    <a href="mailto:pierre.puget@etu.univ-amu.fr">pierre.puget@etu.univ-amu.fr</a>
                </li>
                <li>
                    <a href="https://www.linkedin.com/in/pierre-puget-54b427366/" target="_blank" rel="noopener noreferrer">
                        LinkedIn
                    </a>
                </li>
                <li>
                    <a href="https://github.com/Stratore" target="_blank" rel="noopener noreferrer">
                        GitHub
                    </a>
                </li>
                <li>
                    <a href="/CV_PUGET_Pierre.pdf" target="_blank" rel="noopener noreferrer">
                        Curriculum Vitae (PDF)
                    </a>
                </li>
            </ul>
        </main>
    );
}
