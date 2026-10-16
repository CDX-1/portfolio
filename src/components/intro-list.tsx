"use client";

import { useReducedMotion } from "motion/react";
import { type ComponentType, type ReactNode, useState } from "react";
import { cn } from "@/lib/utils";
import {
    CircuitEffect,
    DesignerEffect,
    type EffectProps,
    MedalsEffect,
    StudentEffect,
    TorontoEffect,
} from "./intro-effects";
import LocalClock from "./local-clock";

// Highlighter ink per row; the mark grows from an underline to a full
// highlight while its row is hovered.
export type MarkerColor = "cream" | "sky" | "sage" | "rose" | "butter";

export const MARKER: Record<MarkerColor, string> = {
    cream: "rgb(236 112 66 / 0.32)",
    sky: "rgb(120 180 240 / 0.38)",
    sage: "rgb(130 200 140 / 0.38)",
    rose: "rgb(245 140 165 / 0.38)",
    butter: "rgb(245 205 80 / 0.45)",
};

type Row = {
    color: MarkerColor;
    Effect: ComponentType<EffectProps>;
    /** Anchor the effect at the end of the line instead of the first mark. */
    atEnd?: boolean;
    content: (
        mark: (text: ReactNode, anchor?: boolean) => ReactNode,
    ) => ReactNode;
};

const ROWS: Row[] = [
    {
        color: "butter",
        Effect: StudentEffect,
        content: (mark) => (
            <>
                I'm a {mark("grade 12 student", true)} at{" "}
                {mark("Bur Oak Secondary School")}
            </>
        ),
    },
    {
        color: "sky",
        Effect: DesignerEffect,
        content: (mark) => (
            <>
                I'm a {mark("self-taught developer & designer", true)} with{" "}
                {mark("6+ years")} of building things
            </>
        ),
    },
    {
        color: "cream",
        Effect: MedalsEffect,
        atEnd: true,
        content: (mark) => (
            <>
                I'm an {mark("active hackathon participant", true)} and placed
                at {mark("4 hackathons")}
            </>
        ),
    },
    {
        color: "sage",
        Effect: CircuitEffect,
        atEnd: true,
        content: (mark) => (
            <>I'm aspiring to study {mark("Computer Engineering", true)}</>
        ),
    },
    {
        color: "rose",
        Effect: TorontoEffect,
        atEnd: true,
        content: (mark) => (
            <>
                I'm based in {mark("Toronto, ON", true)}, where it's{" "}
                <LocalClock className="font-mono text-[0.92em] text-foreground" />
            </>
        ),
    },
];

export default function IntroList() {
    const reduced = useReducedMotion();
    const [active, setActive] = useState<number | null>(null);

    return (
        <ol className="mt-6 space-y-2.5 sm:space-y-3">
            {ROWS.map((row, i) => {
                const isActive = active === i;
                const mark = (text: ReactNode, anchor = false) => (
                    <Mark color={row.color} active={isActive}>
                        {text}
                        {anchor && !row.atEnd && (
                            <row.Effect show={isActive && !reduced} />
                        )}
                    </Mark>
                );

                return (
                    <li
                        key={row.color}
                        onMouseEnter={() => setActive(i)}
                        onMouseLeave={() => setActive(null)}
                        className={cn(
                            "flex items-baseline gap-3 text-base sm:text-xl tracking-tight leading-snug",
                            "transition-colors duration-200",
                            active === null || isActive
                                ? "text-foreground/80"
                                : "text-foreground/40",
                        )}
                    >
                        <span
                            className={cn(
                                "shrink-0 font-mono text-xs sm:text-sm tabular-nums transition-colors duration-200",
                                isActive
                                    ? "text-primary"
                                    : "text-foreground/35",
                            )}
                        >
                            [{i + 1}]
                        </span>
                        <span>
                            {row.content(mark)}
                            {row.atEnd && (
                                <span className="relative inline-block h-[1em] w-0 align-[-0.15em]">
                                    <row.Effect show={isActive && !reduced} />
                                </span>
                            )}
                        </span>
                    </li>
                );
            })}
        </ol>
    );
}

function Mark({
    color,
    active,
    children,
}: {
    color: MarkerColor;
    active: boolean;
    children: ReactNode;
}) {
    return (
        <span
            className={cn(
                "relative rounded-[2px] bg-no-repeat bg-bottom px-0.5 -mx-0.5 font-medium text-foreground",
                "transition-[background-size] duration-300 ease-out box-decoration-clone",
            )}
            style={{
                backgroundImage: `linear-gradient(${MARKER[color]}, ${MARKER[color]})`,
                backgroundSize: active ? "100% 88%" : "100% 30%",
            }}
        >
            {children}
        </span>
    );
}
