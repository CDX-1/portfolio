"use client";

import { useEffect, useRef, useState, ViewTransition } from "react";
import type { ProjectType } from "@/lib/mdx";
import { PROJECT_TYPE_LABELS } from "@/lib/project-types";
import { cn } from "@/lib/utils";
import { ProjectIPhone } from "./project-iphone";
import { ProjectMacbook } from "./project-macbook";
import { ProjectPolaroids } from "./project-polaroids";

/**
 * The orange blueprint panel with a project's device mockup on it. Used by
 * the project cards and as the hero of the project page.
 */
export default function ProjectShowcase({
    slug,
    type,
    name,
    main,
    images,
    index,
    expanded = false,
    className,
}: {
    /** Names the panel so it morphs between the card and the project page. */
    slug: string;
    type: ProjectType;
    name: string;
    main: string;
    images: string[];
    index?: string;
    /** Hold the image fan open (project page) instead of opening on hover. */
    expanded?: boolean;
    className?: string;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const size = useElementSize(ref);

    return (
        <ViewTransition name={`project-${slug}`} share="panel-morph">
            <div
                ref={ref}
                className={cn(
                    "relative mx-auto flex w-full items-center justify-center rounded-md blueprint-grid ring-1 ring-inset ring-white/10 p-6 sm:p-8 lg:p-12",
                    className,
                )}
            >
                <BlueprintMarks
                    index={index}
                    label={PROJECT_TYPE_LABELS[type]}
                    size={size}
                    showDimensions={expanded}
                />
                <div className="relative flex h-full w-full items-center justify-center">
                    {type === "laptop" && (
                        <ProjectMacbook
                            main={main}
                            images={images}
                            expanded={expanded}
                        />
                    )}
                    {type === "phone" && (
                        <ProjectIPhone
                            main={main}
                            images={images}
                            expanded={expanded}
                        />
                    )}
                    {type === "hardware" && (
                        <ProjectPolaroids
                            name={name}
                            main={main}
                            images={images}
                            expanded={expanded}
                        />
                    )}
                </div>
            </div>
        </ViewTransition>
    );
}

function useElementSize(ref: React.RefObject<HTMLElement | null>) {
    const [size, setSize] = useState<{ w: number; h: number } | null>(null);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const ro = new ResizeObserver(([entry]) => {
            const box = entry.borderBoxSize[0];
            setSize({
                w: Math.round(box.inlineSize),
                h: Math.round(box.blockSize),
            });
        });
        ro.observe(el);
        return () => ro.disconnect();
    }, [ref]);
    return size;
}

// Crop marks and figure callouts so the panel reads like a drafting sheet.
function BlueprintMarks({
    index,
    label,
    size,
    showDimensions,
}: {
    index?: string;
    label: string;
    size: { w: number; h: number } | null;
    /** Keep the dimension lines drawn instead of revealing them on hover. */
    showDimensions: boolean;
}) {
    const corner = "absolute size-3 border-white/60";
    return (
        <div
            className="pointer-events-none absolute inset-3 sm:inset-4 font-mono text-[10px] uppercase tracking-[0.14em] text-white/75"
            aria-hidden
        >
            <span className={`${corner} left-0 top-0 border-l border-t`} />
            <span className={`${corner} right-0 top-0 border-r border-t`} />
            <span className={`${corner} left-0 bottom-0 border-l border-b`} />
            <span className={`${corner} right-0 bottom-0 border-r border-b`} />
            {index && (
                <span className="absolute left-5 top-0 -translate-y-[3px]">
                    Fig. {index}
                </span>
            )}
            <span className="absolute right-5 bottom-0 translate-y-[3px]">
                {label}
            </span>
            {size && (
                <>
                    <DimensionLine
                        axis="x"
                        value={size.w}
                        shown={showDimensions}
                    />
                    <DimensionLine
                        axis="y"
                        value={size.h}
                        shown={showDimensions}
                    />
                </>
            )}
        </div>
    );
}

// Engineering-drawing dimension line with end ticks and the measured size in
// px. On cards it draws itself out from the centre when the card is hovered.
function DimensionLine({
    axis,
    value,
    shown,
}: {
    axis: "x" | "y";
    value: number;
    shown: boolean;
}) {
    const horizontal = axis === "x";
    const reveal = shown
        ? ""
        : horizontal
          ? "scale-x-0 group-hover:scale-x-100"
          : "scale-y-0 group-hover:scale-y-100";
    const label = shown ? "" : "opacity-0 group-hover:opacity-100";

    return (
        <span
            className={cn(
                "absolute flex items-center justify-center",
                horizontal
                    ? "left-6 right-6 top-3 h-2"
                    : "top-6 bottom-6 left-3 w-2 flex-col",
            )}
        >
            <span
                className={cn(
                    "absolute transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    horizontal
                        ? "inset-x-0 top-1/2 h-px bg-white/55 before:absolute before:left-0 before:-top-1 before:h-2 before:w-px before:bg-white/70 after:absolute after:right-0 after:-top-1 after:h-2 after:w-px after:bg-white/70"
                        : "inset-y-0 left-1/2 w-px bg-white/55 before:absolute before:top-0 before:-left-1 before:w-2 before:h-px before:bg-white/70 after:absolute after:bottom-0 after:-left-1 after:w-2 after:h-px after:bg-white/70",
                    reveal,
                )}
            />
            <span
                className={cn(
                    "relative whitespace-nowrap bg-blueprint px-1.5 tabular-nums tracking-[0.08em] transition-opacity delay-150 duration-300",
                    !horizontal && "-rotate-90",
                    label,
                )}
            >
                {value}
            </span>
        </span>
    );
}
