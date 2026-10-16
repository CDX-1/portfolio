"use client";

import Image from "next/image";
import {
    type PointerEvent as ReactPointerEvent,
    useCallback,
    useEffect,
    useId,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import { cn } from "@/lib/utils";

export interface Connection {
    id: string;
    type: "in" | "out" | "dual";
    /** A short line about the link, shown when either end is hovered. */
    note?: string;
}

export interface TechStackItem {
    id: string;
    name: string;
    icon: string;
    connections: Connection[];
}

type Point = { x: number; y: number };
type Size = { w: number; h: number };
type Edge = {
    id: string;
    source: string;
    target: string;
    arrowEnd: boolean;
    arrowStart: boolean;
    note?: string;
};

// Room kept clear between a node and the frame's crop marks / labels.
const PAD_X = 20;
const PAD_Y = 40;
// Gap between a node's edge and where its line starts, so arrowheads breathe.
const LINE_GAP = 6;
// Width of the hover card, and its gap from the node it describes.
const CARD_W = 240;
const CARD_GAP = 10;

/**
 * Draggable system diagram drawn on the orange blueprint sheet.
 *
 * Node centres live in state as fractions of the frame, and both the nodes
 * and the lines are drawn from that one source, so they can't drift apart
 * on resize or drag. Until someone drags a node, the layout is recomputed
 * for whatever size the frame is.
 */
export function TechStackGraph({ items }: { items: TechStackItem[] }) {
    const frameRef = useRef<HTMLDivElement>(null);
    const nodeRefs = useRef<Record<string, HTMLDivElement | null>>({});
    const markerId = useId();

    const [frame, setFrame] = useState<Size | null>(null);
    const [nodeSizes, setNodeSizes] = useState<Record<string, Size>>({});
    const [positions, setPositions] = useState<Record<string, Point>>({});
    const [moved, setMoved] = useState(false);
    const [dragging, setDragging] = useState<string | null>(null);
    const [hovered, setHovered] = useState<string | null>(null);
    const grab = useRef<Point>({ x: 0, y: 0 });

    const edges = useMemo(() => buildEdges(items), [items]);

    // Track the frame size.
    useLayoutEffect(() => {
        const el = frameRef.current;
        if (!el) return;
        const ro = new ResizeObserver(([entry]) => {
            const { width, height } = entry.contentRect;
            setFrame({ w: width, h: height });
        });
        ro.observe(el);
        return () => ro.disconnect();
    }, []);

    // Track every node's rendered size (fonts and icons can change it).
    useLayoutEffect(() => {
        const ro = new ResizeObserver((entries) => {
            setNodeSizes((prev) => {
                const next = { ...prev };
                for (const entry of entries) {
                    const id = (entry.target as HTMLElement).dataset.nodeId;
                    if (!id) continue;
                    const el = entry.target as HTMLElement;
                    next[id] = { w: el.offsetWidth, h: el.offsetHeight };
                }
                return next;
            });
        });
        for (const item of items) {
            const el = nodeRefs.current[item.id];
            if (el) ro.observe(el);
        }
        return () => ro.disconnect();
    }, [items]);

    // Lay out for the current frame until the reader has arranged it by hand.
    useEffect(() => {
        if (!frame || moved) return;
        setPositions(computeLayout(items, edges, frame));
    }, [frame, items, edges, moved]);

    const sizeOf = useCallback(
        (id: string): Size => nodeSizes[id] ?? estimateSize(id, items),
        [nodeSizes, items],
    );

    // Pixel centre of a node, clamped so the whole node stays on the sheet.
    const centerOf = useCallback(
        (id: string): Point | null => {
            const p = positions[id];
            if (!p || !frame) return null;
            const { w, h } = sizeOf(id);
            return {
                x: clamp(p.x * frame.w, w / 2 + PAD_X, frame.w - w / 2 - PAD_X),
                y: clamp(p.y * frame.h, h / 2 + PAD_Y, frame.h - h / 2 - PAD_Y),
            };
        },
        [positions, frame, sizeOf],
    );

    function onPointerDown(e: ReactPointerEvent<HTMLDivElement>, id: string) {
        const c = centerOf(id);
        const rect = frameRef.current?.getBoundingClientRect();
        if (!c || !rect) return;
        e.currentTarget.setPointerCapture(e.pointerId);
        grab.current = {
            x: e.clientX - rect.left - c.x,
            y: e.clientY - rect.top - c.y,
        };
        setDragging(id);
    }

    function onPointerMove(e: ReactPointerEvent<HTMLDivElement>, id: string) {
        if (dragging !== id || !frame) return;
        const rect = frameRef.current?.getBoundingClientRect();
        if (!rect) return;
        const { w, h } = sizeOf(id);
        const x = clamp(
            e.clientX - rect.left - grab.current.x,
            w / 2 + PAD_X,
            frame.w - w / 2 - PAD_X,
        );
        const y = clamp(
            e.clientY - rect.top - grab.current.y,
            h / 2 + PAD_Y,
            frame.h - h / 2 - PAD_Y,
        );
        setMoved(true);
        setPositions((prev) => ({
            ...prev,
            [id]: { x: x / frame.w, y: y / frame.h },
        }));
    }

    function onPointerUp(e: ReactPointerEvent<HTMLDivElement>) {
        e.currentTarget.releasePointerCapture(e.pointerId);
        setDragging(null);
    }

    // Phones stack the diagram, so give it height per node.
    const height =
        frame && frame.w < 640 ? Math.max(480, items.length * 84 + 90) : 420;
    const focus = dragging ?? hovered;
    const ready = !!frame && Object.keys(positions).length > 0;
    const card = hovered && !dragging ? hovered : null;

    return (
        <div
            ref={frameRef}
            className="relative my-8 w-full select-none overflow-hidden rounded-md blueprint-grid ring-1 ring-inset ring-white/10"
            style={{ height }}
        >
            <FrameMarks
                moved={moved}
                onReset={() => {
                    setMoved(false);
                }}
            />

            <svg
                aria-hidden="true"
                className={cn(
                    "pointer-events-none absolute inset-0 h-full w-full text-white transition-opacity duration-300",
                    ready ? "opacity-100" : "opacity-0",
                )}
            >
                <defs>
                    <marker
                        id={markerId}
                        viewBox="0 0 10 10"
                        refX="9"
                        refY="5"
                        markerWidth="7"
                        markerHeight="7"
                        orient="auto-start-reverse"
                    >
                        <path d="M0,1 L9,5 L0,9 z" fill="currentColor" />
                    </marker>
                </defs>
                {edges.map((edge) => {
                    const a = centerOf(edge.source);
                    const b = centerOf(edge.target);
                    if (!a || !b) return null;
                    const start = exitPoint(a, b, sizeOf(edge.source));
                    const end = exitPoint(b, a, sizeOf(edge.target));
                    if (!start || !end) return null;
                    const lit =
                        !focus ||
                        edge.source === focus ||
                        edge.target === focus;
                    return (
                        <line
                            key={edge.id}
                            x1={start.x}
                            y1={start.y}
                            x2={end.x}
                            y2={end.y}
                            stroke="currentColor"
                            strokeWidth={1.25}
                            markerEnd={
                                edge.arrowEnd ? `url(#${markerId})` : undefined
                            }
                            markerStart={
                                edge.arrowStart
                                    ? `url(#${markerId})`
                                    : undefined
                            }
                            className="transition-opacity duration-200"
                            opacity={lit ? 0.85 : 0.25}
                        />
                    );
                })}
            </svg>

            {items.map((item) => {
                const c = centerOf(item.id);
                const lit =
                    !focus ||
                    focus === item.id ||
                    edges.some(
                        (e) =>
                            (e.source === focus && e.target === item.id) ||
                            (e.target === focus && e.source === item.id),
                    );
                return (
                    <div
                        key={item.id}
                        data-node-id={item.id}
                        ref={(el) => {
                            nodeRefs.current[item.id] = el;
                        }}
                        onPointerDown={(e) => onPointerDown(e, item.id)}
                        onPointerMove={(e) => onPointerMove(e, item.id)}
                        onPointerUp={onPointerUp}
                        onPointerCancel={onPointerUp}
                        onPointerEnter={() => setHovered(item.id)}
                        onPointerLeave={() => setHovered(null)}
                        className={cn(
                            "absolute left-0 top-0 flex touch-none items-center gap-2 whitespace-nowrap rounded-[4px] bg-white px-2.5 py-1.5 text-xs font-medium text-neutral-900",
                            "shadow-[0_8px_18px_-10px_rgba(0,0,0,0.55)] ring-1 ring-black/5",
                            "transition-[opacity,box-shadow] duration-200",
                            dragging === item.id
                                ? "z-20 cursor-grabbing shadow-[0_14px_28px_-12px_rgba(0,0,0,0.6)]"
                                : "z-10 cursor-grab",
                            lit ? "opacity-100" : "opacity-55",
                            !c && "invisible",
                        )}
                        style={
                            c
                                ? {
                                      transform: `translate(${c.x}px, ${c.y}px) translate(-50%, -50%)`,
                                  }
                                : undefined
                        }
                    >
                        <Image
                            src={iconUrl(item.icon)}
                            alt=""
                            width={16}
                            height={16}
                            className="size-4 object-contain"
                            draggable={false}
                            unoptimized
                        />
                        <span>{item.name}</span>
                    </div>
                );
            })}

            {card && frame && (
                <ConnectionCard
                    id={card}
                    items={items}
                    edges={edges}
                    frame={frame}
                    center={centerOf(card)}
                    size={sizeOf(card)}
                />
            )}
        </div>
    );
}

/**
 * Small card beside a hovered node listing everything it's wired to, with
 * which way data flows and the connection's note. Sits below the node in the
 * top half of the sheet and above it in the bottom half.
 */
function ConnectionCard({
    id,
    items,
    edges,
    frame,
    center,
    size,
}: {
    id: string;
    items: TechStackItem[];
    edges: Edge[];
    frame: Size;
    center: Point | null;
    size: Size;
}) {
    const links = edges.flatMap((edge) => {
        if (edge.source !== id && edge.target !== id) return [];
        const otherId = edge.source === id ? edge.target : edge.source;
        const other = items.find((i) => i.id === otherId);
        if (!other) return [];
        const out = edge.source === id ? edge.arrowEnd : edge.arrowStart;
        const inn = edge.source === id ? edge.arrowStart : edge.arrowEnd;
        const dir = out && inn ? "↔" : out ? "→" : inn ? "←" : "—";
        return [{ other, dir, note: edge.note }];
    });
    if (!center || links.length === 0) return null;

    const below = center.y < frame.h / 2;
    const width = Math.min(CARD_W, frame.w - PAD_X * 2);
    const x = clamp(
        center.x,
        width / 2 + PAD_X / 2,
        frame.w - width / 2 - PAD_X / 2,
    );
    const y = below
        ? center.y + size.h / 2 + CARD_GAP
        : center.y - size.h / 2 - CARD_GAP;

    return (
        <div
            role="tooltip"
            className="pointer-events-none absolute left-0 top-0 z-30 flex flex-col gap-1.5 rounded-[4px] bg-neutral-950/90 px-2.5 py-2 text-[11px] leading-snug text-white shadow-[0_10px_24px_-12px_rgba(0,0,0,0.7)] backdrop-blur-sm"
            style={{
                width,
                transform: `translate(${x}px, ${y}px) translate(-50%, ${below ? "0" : "-100%"})`,
            }}
        >
            {links.map(({ other, dir, note }) => (
                <div key={other.id} className="flex gap-2">
                    <span
                        className="w-3 shrink-0 text-center font-mono text-white/50"
                        aria-hidden
                    >
                        {dir}
                    </span>
                    <div className="min-w-0">
                        <span className="font-medium">{other.name}</span>
                        {note && (
                            <span className="block text-white/65">{note}</span>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

// Crop marks and callouts matching the project showcase panels.
function FrameMarks({
    moved,
    onReset,
}: {
    moved: boolean;
    onReset: () => void;
}) {
    const corner = "absolute size-3 border-white/60";
    return (
        <div className="absolute inset-3 font-mono text-[10px] uppercase tracking-[0.14em] text-white/75 sm:inset-4">
            <span className={`${corner} left-0 top-0 border-l border-t`} />
            <span className={`${corner} right-0 top-0 border-r border-t`} />
            <span className={`${corner} bottom-0 left-0 border-b border-l`} />
            <span className={`${corner} bottom-0 right-0 border-b border-r`} />
            <span className="absolute left-5 top-0 -translate-y-[3px]">
                System diagram
            </span>
            {moved ? (
                <button
                    type="button"
                    onClick={onReset}
                    className="absolute bottom-0 right-5 translate-y-[3px] uppercase tracking-[0.14em] text-white/90 underline decoration-white/40 underline-offset-2 transition-colors hover:text-white"
                >
                    Reset layout
                </button>
            ) : (
                <span className="absolute bottom-0 right-5 translate-y-[3px]">
                    Drag to rearrange
                </span>
            )}
        </div>
    );
}

function iconUrl(icon: string) {
    const base =
        "https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons";
    return icon.endsWith(".svg")
        ? `${base}/${icon}`
        : `${base}/${icon}/default.svg`;
}

function clamp(v: number, min: number, max: number) {
    if (min > max) return (min + max) / 2;
    return Math.min(max, Math.max(min, v));
}

// Rough node size before it has rendered: padding + icon + text.
function estimateSize(id: string, items: TechStackItem[]): Size {
    const name = items.find((i) => i.id === id)?.name ?? "";
    return { w: 44 + name.length * 6.6, h: 30 };
}

/** Where the line from `from` toward `to` leaves `from`'s box. */
function exitPoint(from: Point, to: Point, size: Size): Point | null {
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    if (dx === 0 && dy === 0) return null;
    const hw = size.w / 2 + LINE_GAP;
    const hh = size.h / 2 + LINE_GAP;
    const t = Math.min(
        dx === 0 ? Infinity : hw / Math.abs(dx),
        dy === 0 ? Infinity : hh / Math.abs(dy),
    );
    // Boxes overlap: no room for a line.
    if (t >= 0.5) return null;
    return { x: from.x + dx * t, y: from.y + dy * t };
}

/**
 * Collapse each item's in/out/dual connections into one edge per pair,
 * with arrowheads on whichever ends data flows into.
 */
function buildEdges(items: TechStackItem[]): Edge[] {
    const ids = new Set(items.map((i) => i.id));
    const directed = new Set<string>();
    for (const item of items) {
        for (const conn of item.connections) {
            if (!ids.has(conn.id) || conn.id === item.id) continue;
            if (conn.type === "out" || conn.type === "dual")
                directed.add(`${item.id}->${conn.id}`);
            if (conn.type === "in" || conn.type === "dual")
                directed.add(`${conn.id}->${item.id}`);
        }
    }

    const edges: Edge[] = [];
    const seen = new Set<string>();
    for (const item of items) {
        for (const conn of item.connections) {
            if (!ids.has(conn.id) || conn.id === item.id) continue;
            const [a, b] = [item.id, conn.id].sort();
            const id = `${a}-${b}`;
            if (seen.has(id)) {
                // Either side may carry the note.
                const edge = edges.find((e) => e.id === id);
                if (edge && !edge.note && conn.note) edge.note = conn.note;
                continue;
            }
            seen.add(id);
            edges.push({
                id,
                source: a,
                target: b,
                arrowEnd: directed.has(`${a}->${b}`),
                arrowStart: directed.has(`${b}->${a}`),
                note: conn.note,
            });
        }
    }
    return edges;
}

/**
 * Small deterministic force layout: nodes repel, edges pull like springs,
 * then the result is stretched to fill the frame. Returns centres as
 * fractions of the frame.
 */
function computeLayout(
    items: TechStackItem[],
    edges: Edge[],
    frame: Size,
): Record<string, Point> {
    const n = items.length;
    if (n === 0) return {};
    if (n === 1) return { [items[0].id]: { x: 0.5, y: 0.5 } };

    const index = new Map(items.map((item, i) => [item.id, i]));
    const sizes = items.map((item) => estimateSize(item.id, items));
    const ideal = Math.min(frame.w, frame.h) * 0.42;

    // Start on a circle (squashed to the frame's aspect) for determinism.
    const pts = items.map((_, i) => {
        const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
        return {
            x: frame.w / 2 + Math.cos(angle) * frame.w * 0.3,
            y: frame.h / 2 + Math.sin(angle) * frame.h * 0.3,
        };
    });

    for (let step = 0; step < 400; step++) {
        const cool = 1 - step / 400;
        const force = pts.map(() => ({ x: 0, y: 0 }));

        // Repulsion, measured between box edges so wide labels keep apart.
        for (let i = 0; i < n; i++) {
            for (let j = i + 1; j < n; j++) {
                const dx = pts[i].x - pts[j].x;
                const dy = pts[i].y - pts[j].y;
                const gapX = Math.max(
                    1,
                    Math.abs(dx) - (sizes[i].w + sizes[j].w) / 2,
                );
                const gapY = Math.max(
                    1,
                    Math.abs(dy) - (sizes[i].h + sizes[j].h) / 2,
                );
                const d = Math.max(1, Math.hypot(gapX, gapY));
                const f = (ideal * ideal) / d / 6;
                const len = Math.hypot(dx, dy) || 1;
                force[i].x += (dx / len) * f;
                force[i].y += (dy / len) * f;
                force[j].x -= (dx / len) * f;
                force[j].y -= (dy / len) * f;
            }
        }

        // Springs along edges.
        for (const edge of edges) {
            const i = index.get(edge.source);
            const j = index.get(edge.target);
            if (i === undefined || j === undefined) continue;
            const dx = pts[j].x - pts[i].x;
            const dy = pts[j].y - pts[i].y;
            const len = Math.hypot(dx, dy) || 1;
            const f = (len - ideal) * 0.08;
            force[i].x += (dx / len) * f;
            force[i].y += (dy / len) * f;
            force[j].x -= (dx / len) * f;
            force[j].y -= (dy / len) * f;
        }

        // Gentle pull to the middle keeps unconnected nodes on the sheet.
        for (let i = 0; i < n; i++) {
            force[i].x += (frame.w / 2 - pts[i].x) * 0.01;
            force[i].y += (frame.h / 2 - pts[i].y) * 0.01;
            const mag = Math.hypot(force[i].x, force[i].y) || 1;
            const capped = Math.min(mag, 30 * cool + 1);
            pts[i].x += (force[i].x / mag) * capped;
            pts[i].y += (force[i].y / mag) * capped;
        }
    }

    // Stretch to fill the usable area of the frame.
    const maxW = Math.max(...sizes.map((s) => s.w));
    const minX = Math.min(...pts.map((p) => p.x));
    const maxX = Math.max(...pts.map((p) => p.x));
    const minY = Math.min(...pts.map((p) => p.y));
    const maxY = Math.max(...pts.map((p) => p.y));
    const left = maxW / 2 + PAD_X + 8;
    const right = frame.w - left;
    const top = PAD_Y + 30;
    const bottom = frame.h - top;

    const placed = pts.map((p) => ({
        x:
            left +
            (maxX - minX < 1 ? 0.5 : (p.x - minX) / (maxX - minX)) *
                (right - left),
        y:
            top +
            (maxY - minY < 1 ? 0.5 : (p.y - minY) / (maxY - minY)) *
                (bottom - top),
    }));
    separate(placed, sizes, frame);

    const out: Record<string, Point> = {};
    items.forEach((item, i) => {
        out[item.id] = {
            x: placed[i].x / frame.w,
            y: placed[i].y / frame.h,
        };
    });
    return out;
}

/**
 * Nudge overlapping boxes apart, staying inside the frame. Stretching a
 * layout into a narrow (phone) frame squeezes wide labels together; this
 * pushes them apart, preferring the vertical axis where there's room.
 */
function separate(pts: Point[], sizes: Size[], frame: Size) {
    const GAP_X = 14;
    const GAP_Y = 40;
    for (let iter = 0; iter < 300; iter++) {
        let moved = false;
        for (let i = 0; i < pts.length; i++) {
            for (let j = i + 1; j < pts.length; j++) {
                const dx = pts[j].x - pts[i].x;
                const dy = pts[j].y - pts[i].y;
                const ox = (sizes[i].w + sizes[j].w) / 2 + GAP_X - Math.abs(dx);
                const oy = (sizes[i].h + sizes[j].h) / 2 + GAP_Y - Math.abs(dy);
                if (ox <= 0 || oy <= 0) continue;
                moved = true;
                if (oy <= ox * 1.6) {
                    const s = dy === 0 ? 1 : Math.sign(dy);
                    pts[i].y -= (s * oy) / 2;
                    pts[j].y += (s * oy) / 2;
                } else {
                    const s = dx === 0 ? 1 : Math.sign(dx);
                    pts[i].x -= (s * ox) / 2;
                    pts[j].x += (s * ox) / 2;
                }
            }
        }
        pts.forEach((p, i) => {
            const { w, h } = sizes[i];
            p.x = clamp(p.x, w / 2 + PAD_X, frame.w - w / 2 - PAD_X);
            p.y = clamp(p.y, h / 2 + PAD_Y, frame.h - h / 2 - PAD_Y);
        });
        if (!moved) break;
    }
}
