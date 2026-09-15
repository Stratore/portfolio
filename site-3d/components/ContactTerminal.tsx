"use client";

import { useState } from "react";
import { TerminalPanel } from "./TerminalPanel";
import { SplitText } from "./SplitText";

const EMAIL = "pierre.puget@etu.univ-amu.fr";

export function ContactTerminal({ onClose }: { onClose: () => void }) {
    const [copied, setCopied] = useState(false);

    const copyEmail = async () => {
        try {
            await navigator.clipboard.writeText(EMAIL);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // Presse-papiers indisponible : le lien mailto reste une solution de repli.
        }
    };

    return (
        <TerminalPanel path="~/pierre-puget/contact.sh" title="Contact" onClose={onClose}>
            <p className="term-prompt">
                <span className="term-prompt__sigil">$</span> ./contact.sh --init
            </p>
            <SplitText as="h2" text="Établir le contact" className="term-name" />
            <p className="term-tagline">Ouvert aux opportunités de stage et d&apos;alternance.</p>

            <p className="term-section">&gt; canal</p>
            <div className="term-row">
                <p className="term-row__key">email</p>
                <p className="term-row__val">{EMAIL}</p>
            </div>

            <div className="term-cmd-list">
                <button className="term-cmd" onClick={copyEmail}>
                    <span className="term-prompt__sigil">$</span> {copied ? "copié ✓" : "copy --clipboard"}
                </button>
                <a className="term-cmd" href={`mailto:${EMAIL}`}>
                    <span className="term-prompt__sigil">$</span> open mail://
                </a>
                <a
                    className="term-cmd"
                    href="https://www.linkedin.com/in/pierre-puget-54b427366/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <span className="term-prompt__sigil">$</span> open linkedin
                </a>
                <a className="term-cmd" href="https://github.com/Stratore" target="_blank" rel="noopener noreferrer">
                    <span className="term-prompt__sigil">$</span> open github
                </a>
            </div>

            <p className="term-eof">-- EOF --</p>
        </TerminalPanel>
    );
}
