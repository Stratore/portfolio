"use client";

import { cvData } from "@/data/cv";
import { TerminalPanel } from "./TerminalPanel";
import { SplitText } from "./SplitText";

export function CVTerminal({ onClose }: { onClose: () => void }) {
    return (
        <TerminalPanel path="~/pierre-puget/cv.tex" title={`CV — ${cvData.name}`} onClose={onClose}>
            <p className="term-prompt">
                <span className="term-prompt__sigil">$</span> cat profil.tex
            </p>
            <SplitText as="h2" text={cvData.name} className="term-name" />
            <p className="term-tagline">{cvData.tagline}</p>

            <p className="term-section">&gt; compétences</p>
            {cvData.skills.map((skill) => (
                <div key={skill.title} className="term-row">
                    <p className="term-row__key">{skill.title}</p>
                    <p className="term-row__val">{skill.desc}</p>
                </div>
            ))}

            <p className="term-section">&gt; formation</p>
            {cvData.education.map((item) => (
                <div key={item.title} className="term-row">
                    <p className="term-row__meta">
                        [{item.period}] {item.place}
                    </p>
                    <p className="term-row__key">{item.title}</p>
                    {"note" in item && item.note && <p className="term-row__val">{item.note}</p>}
                </div>
            ))}

            <p className="term-section">&gt; expériences</p>
            {cvData.experience.map((item) => (
                <div key={item.title} className="term-row">
                    <p className="term-row__meta">
                        [{item.period}] {item.place}
                    </p>
                    <p className="term-row__key">{item.title}</p>
                    <p className="term-row__val">{item.desc}</p>
                </div>
            ))}

            <p className="term-section">&gt; langues</p>
            <p className="term-array">
                [{cvData.languages.map((l) => `"${l.name} — ${l.level}"`).join(", ")}]
            </p>

            <p className="term-section">&gt; atouts</p>
            <p className="term-array">[{cvData.traits.map((t) => `"${t}"`).join(", ")}]</p>

            <a className="term-cmd" href="/CV_PUGET_Pierre.pdf" target="_blank" rel="noopener noreferrer">
                <span className="term-prompt__sigil">$</span> open cv.pdf
            </a>

            <p className="term-eof">-- EOF --</p>
        </TerminalPanel>
    );
}
