"use client";

import { useEffect, useRef, useState } from "react";
import { graphData } from "@/data/graph";
import { useGraphContext } from "./GraphContext";
import { ImageLightbox } from "./ImageLightbox";

function techLabel(id: string): string {
    return graphData.nodes.find((n) => n.id === id)?.label ?? id;
}

export function InfoPanel() {
    const { selectedProject, selectProject } = useGraphContext();
    const project = selectedProject?.project;
    const videoRef = useRef<HTMLVideoElement>(null);
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    // Un <video> en lecture (autoPlay+loop) doit être explicitement arrêté et
    // libéré - le laisser au seul ramasse-miettes peut faire tourner le
    // décodeur en arrière-plan un moment après la fermeture du panneau ou le
    // changement de projet. Se déclenche au changement de vidéo ET au
    // démontage (fermeture du panneau). L'élément est capturé ICI (au montage
    // de l'effet) plutôt que relu dans le cleanup : par ce moment-là, la ref
    // peut déjà pointer vers un autre nœud DOM.
    useEffect(() => {
        const el = videoRef.current;
        return () => {
            if (!el) return;
            el.pause();
            el.removeAttribute("src");
            el.load();
        };
    }, [project?.video]);

    // Referme la visionneuse plein écran au changement de projet - sinon un
    // index de galerie resterait ouvert sur les captures du projet précédent.
    // Ajusté pendant le rendu plutôt que dans un effet (pattern recommandé
    // par React pour "réinitialiser un état quand une prop change" - évite un
    // aller-retour de rendu superflu par rapport à un useEffect équivalent).
    const [lightboxProjectId, setLightboxProjectId] = useState(selectedProject?.id);
    if (selectedProject?.id !== lightboxProjectId) {
        setLightboxProjectId(selectedProject?.id);
        setLightboxIndex(null);
    }

    if (!selectedProject || !project) return null;

    const lightboxSrc = lightboxIndex !== null ? project.screenshots?.[lightboxIndex] : undefined;

    return (
        <>
            <aside className="info-panel glass" role="dialog" aria-label={selectedProject.label}>
                <button className="info-panel__close" onClick={() => selectProject(null)} aria-label="Fermer">
                    ×
                </button>

                <p className="info-panel__eyebrow">Dossier - Projet</p>
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

                {project.video ? (
                    <>
                        <p className="info-panel__section-label">Aperçu</p>
                        <video
                            ref={videoRef}
                            className="info-panel__media"
                            src={project.video}
                            autoPlay
                            loop
                            muted
                            playsInline
                            aria-label={`Aperçu vidéo - ${selectedProject.label}`}
                        />
                    </>
                ) : project.screenshots && project.screenshots.length > 0 ? (
                    <>
                        <p className="info-panel__section-label">Captures d&apos;écran</p>
                        <div className="info-panel__gallery">
                            {project.screenshots.map((src, i) => (
                                <button
                                    key={src}
                                    className="info-panel__gallery-item"
                                    onClick={() => setLightboxIndex(i)}
                                    aria-label={`Agrandir la capture ${i + 1} - ${selectedProject.label}`}
                                >
                                    {/* eslint-disable-next-line @next/next/no-img-element -- miniatures statiques, pas besoin du pipeline next/image */}
                                    <img src={src} alt={`${selectedProject.label} - capture ${i + 1}`} loading="lazy" />
                                </button>
                            ))}
                        </div>
                    </>
                ) : (
                    project.image && (
                        <>
                            <p className="info-panel__section-label">Aperçu</p>
                            {/* eslint-disable-next-line @next/next/no-img-element -- image statique, pas besoin du pipeline next/image */}
                            <img className="info-panel__media" src={project.image} alt={selectedProject.label} />
                        </>
                    )
                )}

                <div className="info-panel__actions">
                    {project.github ? (
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="info-panel__link">
                            Code source ↗
                        </a>
                    ) : (
                        project.inProgress && (
                            <span className="info-panel__status">Projet en cours de développement</span>
                        )
                    )}
                    {project.demo && (
                        <a href={project.demo} target="_blank" rel="noopener noreferrer" className="info-panel__link">
                            Démo ↗
                        </a>
                    )}
                </div>
            </aside>

            {lightboxSrc && (
                <ImageLightbox
                    src={lightboxSrc}
                    alt={`${selectedProject.label} - capture ${(lightboxIndex ?? 0) + 1}`}
                    onClose={() => setLightboxIndex(null)}
                />
            )}
        </>
    );
}
