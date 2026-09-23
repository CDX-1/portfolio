"use client";

import { IconArrowBackUp, IconEraser } from "@tabler/icons-react";
import { useCallback, useEffect, useRef, useState } from "react";
import {
    DOODLE_VIEWBOX,
    MAX_DOODLE_PATH_LEN,
    MAX_DOODLE_STROKES,
} from "@/content/notes";
import { cn } from "@/lib/utils";

type Point = { x: number; y: number };

// Smooth pointer samples into a quadratic-curve SVG path so strokes read
// like a natural pen stroke without the cost of higher-order splines.
function pointsToPath(points: Point[]): string {
    if (points.length === 0) return "";
    const [first] = points as [Point, ...Point[]];
    if (points.length === 1) {
        // dot: tiny line so it renders
        return `M${first.x} ${first.y} l0.1 0.1`;
    }
    let d = `M${first.x.toFixed(1)} ${first.y.toFixed(1)}`;
    for (let i = 1; i < points.length - 1; i++) {
        const p = points[i];
        const n = points[i + 1];
        if (!p || !n) continue;
        const mx = (p.x + n.x) / 2;
        const my = (p.y + n.y) / 2;
        d += ` Q${p.x.toFixed(1)} ${p.y.toFixed(1)} ${mx.toFixed(1)} ${my.toFixed(1)}`;
    }
    const last = points[points.length - 1];
    if (last) d += ` L${last.x.toFixed(1)} ${last.y.toFixed(1)}`;
    return d;
}

export default function DoodleCanvas({
    strokes,
    onChange,
    ink,
    className,
}: {
    strokes: string[];
    onChange: (next: string[]) => void;
    ink: string;
    className?: string;
}) {
    const svgRef = useRef<SVGSVGElement>(null);
    const [drawingPoints, setDrawingPoints] = useState<Point[] | null>(null);
    const activePointerRef = useRef<number | null>(null);

    const toLocal = useCallback((clientX: number, clientY: number): Point => {
        const svg = svgRef.current;
        if (!svg) return { x: 0, y: 0 };
        const rect = svg.getBoundingClientRect();
        const scaleX = DOODLE_VIEWBOX.w / rect.width;
        const scaleY = DOODLE_VIEWBOX.h / rect.height;
        return {
            x: (clientX - rect.left) * scaleX,
            y: (clientY - rect.top) * scaleY,
        };
    }, []);

    useEffect(() => {
        function onUp() {
            if (drawingPoints && drawingPoints.length > 0) {
                const path = pointsToPath(drawingPoints);
                if (path.length > 0 && path.length <= MAX_DOODLE_PATH_LEN) {
                    if (strokes.length < MAX_DOODLE_STROKES) {
                        onChange([...strokes, path]);
                    }
                }
            }
            setDrawingPoints(null);
            activePointerRef.current = null;
        }
        window.addEventListener("pointerup", onUp);
        window.addEventListener("pointercancel", onUp);
        return () => {
            window.removeEventListener("pointerup", onUp);
            window.removeEventListener("pointercancel", onUp);
        };
    }, [drawingPoints, strokes, onChange]);

    function onPointerDown(e: React.PointerEvent<SVGSVGElement>) {
        if (strokes.length >= MAX_DOODLE_STROKES) return;
        e.preventDefault();
        activePointerRef.current = e.pointerId;
        (e.currentTarget as SVGSVGElement).setPointerCapture(e.pointerId);
        setDrawingPoints([toLocal(e.clientX, e.clientY)]);
    }

    function onPointerMove(e: React.PointerEvent<SVGSVGElement>) {
        if (activePointerRef.current !== e.pointerId) return;
        setDrawingPoints((prev) =>
            prev ? [...prev, toLocal(e.clientX, e.clientY)] : prev,
        );
    }

    function undo() {
        onChange(strokes.slice(0, -1));
    }

    function clear() {
        onChange([]);
    }

    const preview = drawingPoints ? pointsToPath(drawingPoints) : "";
    const strokeCount = strokes.length + (drawingPoints ? 1 : 0);
    const full = strokes.length >= MAX_DOODLE_STROKES;

    return (
        <div className={cn("flex flex-col gap-1.5", className)}>
            <div className="relative overflow-hidden rounded-lg border border-dashed border-border/60 bg-white/60">
                <svg
                    ref={svgRef}
                    viewBox={`0 0 ${DOODLE_VIEWBOX.w} ${DOODLE_VIEWBOX.h}`}
                    className="block h-40 w-full touch-none cursor-crosshair"
                    onPointerDown={onPointerDown}
                    onPointerMove={onPointerMove}
                    role="img"
                    aria-label="Doodle canvas"
                    style={{
                        backgroundImage:
                            "repeating-linear-gradient(0deg, transparent 0px, transparent 24px, rgba(0,0,0,0.05) 24px, rgba(0,0,0,0.05) 25px)",
                    }}
                >
                    {strokes.map((d, i) => (
                        <path
                            // biome-ignore lint/suspicious/noArrayIndexKey: strokes are append-only + undo
                            key={i}
                            d={d}
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className={ink}
                        />
                    ))}
                    {preview && (
                        <path
                            d={preview}
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className={ink}
                        />
                    )}
                </svg>

                {strokes.length === 0 && !drawingPoints && (
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center font-caveat text-lg text-foreground/30">
                        doodle here ✎
                    </div>
                )}
            </div>

            <div className="flex items-center justify-between text-foreground/50">
                <span className="font-caveat text-sm">
                    {full
                        ? "that's plenty of ink"
                        : "scribble something, if you like"}
                </span>
                <div className="flex items-center gap-1">
                    <button
                        type="button"
                        onClick={undo}
                        disabled={strokeCount === 0}
                        aria-label="undo last stroke"
                        className="rounded-full p-1.5 hover:bg-muted/40 disabled:opacity-30"
                    >
                        <IconArrowBackUp className="size-4" />
                    </button>
                    <button
                        type="button"
                        onClick={clear}
                        disabled={strokeCount === 0}
                        aria-label="clear doodle"
                        className="rounded-full p-1.5 hover:bg-muted/40 disabled:opacity-30"
                    >
                        <IconEraser className="size-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
