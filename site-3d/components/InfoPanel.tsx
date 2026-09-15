"use client";

import { graphData } from "@/data/graph";
import { useGraphContext } from "./GraphContext";

function techLabel(id: string): string {
    return graphData.nodes.find((n) => n.id === id)?.label ?? id;
}

export function InfoPanel() {
    const { selectedProject, selectProject } = useGraphContext();
    const project = selectedProject?.project;

    if (!selectedProject || !project) return null;

    return (
        <aside className="info-panel glass" role="dialog" aria-label={selectedProject.label}>
            <button className="info-panel__close" onClick={() => selectProject(null)} aria-label="Fermer">
                ×
            </button>

            {project.image && (
                <img className="info-panel__image" src={project.image} alt={selectedProject.label} />
            )}

            <p className="info-panel__eyebrow">Dossier — Projet</p>
            <h2 className="info-panel__title">{selectedProject.label}</h2>
            <p className="info-panel__tagline">{project.tagline}</p>

            <div className="info-panel__tags">
                {project.tags.map((tagId) => (
                    <span key={tagId} className="info-panel__tag">
                        {techLabel(tagId)}
                    </span>
                ))}
            </div>

            <p className="info-panel__description">{project.description}</p>

            <div className="info-panel__actions">
                {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="info-panel__link">
                        Code source ↗
                    </a>
                )}
                {project.demo && (
                    <a href={project.demo} target="_blank" rel="noopener noreferrer" className="info-panel__link">
                        Démo ↗
                    </a>
                )}
            </div>
        </aside>
    );
}
