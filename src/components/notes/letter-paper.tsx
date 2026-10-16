import type { CSSProperties } from "react";
import type { NoteColor } from "@/content/notes";
import { NOTE_PALETTE } from "@/content/notes";
import { cn } from "@/lib/utils";

/** Ruled writing lines under each line of text, drawn in the ink colour. */
export function ruledLines(lineHeight: number): CSSProperties {
    return {
        lineHeight: `${lineHeight}px`,
        backgroundImage: `linear-gradient(to bottom, transparent ${lineHeight - 1}px, color-mix(in oklab, currentColor 18%, transparent) ${lineHeight - 1}px)`,
        backgroundSize: `100% ${lineHeight}px`,
    };
}

/** Small stable tilt so a wall of letters looks hand-pinned, not gridded. */
export function letterTilt(seed: string) {
    let h = 0;
    for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) | 0;
    return ((Math.abs(h) % 5) - 2) * 0.45;
}

/** A perforated postage stamp with a maple leaf. */
export function Stamp({
    color,
    className,
}: {
    color: NoteColor;
    className?: string;
}) {
    return (
        <span
            aria-hidden
            className={cn(
                "stamp-edge block h-[46px] w-[38px] rotate-3 bg-[#fffdf8] p-[3px] shadow-[0_1px_2px_rgba(0,0,0,0.15)]",
                className,
            )}
        >
            <span
                className={cn(
                    "flex h-full w-full flex-col items-center justify-center gap-0.5 text-[#fffdf8]",
                    NOTE_PALETTE[color].seal,
                )}
            >
                <svg
                    viewBox="0 0 24 24"
                    className="size-[18px]"
                    fill="currentColor"
                >
                    <title>maple leaf</title>
                    <path d="M12 1 L13.6 5.4 L15.8 4.4 L15.2 9.2 L18.6 6.8 L19.4 8.8 L22.6 8.2 L21.2 11.4 L22.8 12.4 L17.6 16.2 L18.4 18.4 L12.8 17.6 L13 23 H11 L11.2 17.6 L5.6 18.4 L6.4 16.2 L1.2 12.4 L2.8 11.4 L1.4 8.2 L4.6 8.8 L5.4 6.8 L8.8 9.2 L8.2 4.4 L10.4 5.4 Z" />
                </svg>
                <span className="font-mono text-[6px] leading-none tracking-[0.12em]">
                    CANADA
                </span>
            </span>
        </span>
    );
}

/** A round postmark with the date, plus wavy cancellation lines. */
export function Postmark({
    label,
    className,
}: {
    label: string;
    className?: string;
}) {
    return (
        <span
            aria-hidden
            className={cn(
                "pointer-events-none flex items-center opacity-45",
                className,
            )}
        >
            <svg viewBox="0 0 40 20" className="h-5 w-10" fill="none">
                <title>cancellation lines</title>
                {[4, 10, 16].map((y) => (
                    <path
                        key={y}
                        d={`M0 ${y} q5 -3 10 0 t10 0 t10 0 t10 0`}
                        stroke="currentColor"
                        strokeWidth="1.2"
                    />
                ))}
            </svg>
            <span className="-ml-1 grid size-[46px] -rotate-12 place-items-center rounded-full border-[1.5px] border-current">
                <span className="grid size-[36px] place-items-center rounded-full border border-current text-center font-mono text-[7px] font-semibold uppercase leading-[1.15] tracking-[0.08em]">
                    {label}
                </span>
            </span>
        </span>
    );
}
