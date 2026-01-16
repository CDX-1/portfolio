'use client';

import { useRef, useEffect } from "react";

type Props = {
    text: string;
};

export function HoverPhrase({ text }: Props) {
    const containerRef = useRef<HTMLSpanElement>(null);
    const rafRef = useRef<number | null>(null);
    const targetX = useRef(0);

    useEffect(() => {
        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, []);

    const updateLetters = () => {
        const letters = containerRef.current?.querySelectorAll<HTMLSpanElement>(
            ".letter"
        );
        if (!letters) return;

        letters.forEach((letter) => {
            const rect = letter.getBoundingClientRect();
            const center = rect.left + rect.width / 2;

            const distance = Math.abs(targetX.current - center);
            const max = 140;

            const strength = Math.max(0, 1 - distance / max);

            const lift = strength * 22;
            const scale = 1 + strength * 0.25;
            const x = (targetX.current - center) * 0.04 * strength;
            const blur = strength * 10;

            letter.style.setProperty("--lift", `${lift}px`);
            letter.style.setProperty("--scale", `${scale}`);
            letter.style.setProperty("--x", `${x}px`);
            letter.style.setProperty("--glow", `${blur}px`);
        });
    };

    const handleMove = (clientX: number) => {
        targetX.current = clientX;

        if (!rafRef.current) {
            rafRef.current = requestAnimationFrame(() => {
                updateLetters();
                rafRef.current = null;
            });
        }
    };

    const handleLeave = () => {
        const letters = containerRef.current?.querySelectorAll<HTMLSpanElement>(
            ".letter"
        );
        if (!letters) return;

        letters.forEach((letter) => {
            letter.style.setProperty("--lift", "0px");
            letter.style.setProperty("--scale", "1");
            letter.style.setProperty("--x", "0px");
            letter.style.setProperty("--glow", "0px");
        });
    };

    return (
        <span
            ref={containerRef}
            className="inline-flex"
            onMouseMove={(e) => handleMove(e.clientX)}
            onMouseLeave={handleLeave}
            onTouchMove={(e) =>
                handleMove(e.touches[0]?.clientX ?? 0)
            }
            onTouchEnd={handleLeave}
        >
            {text.split("").map((char, i) => (
                <span
                    key={i}
                    className="letter inline-block select-none"
                >
                    {char === " " ? "\u00A0" : char}
                </span>
            ))}
        </span>
    );
}
