"use client";

import { IconX, IconZoomInFilled } from "@tabler/icons-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

interface ImageViewerProps {
    src: string;
    alt: string;
}

export function ImageViewer({ src, alt }: ImageViewerProps) {
    const [open, setOpen] = useState(false);
    const close = useCallback(() => setOpen(false), []);

    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") close();
        };
        window.addEventListener("keydown", onKey);
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            window.removeEventListener("keydown", onKey);
            document.body.style.overflow = prev;
        };
    }, [open, close]);

    return (
        <>
            <button
                type="button"
                onClick={() => setOpen(true)}
                aria-label={`Enlarge image: ${alt || "project image"}`}
                className="group relative my-8 w-full overflow-hidden rounded-xl border border-border/40 bg-muted/10 cursor-zoom-in block"
            >
                <div className="relative w-full aspect-video md:aspect-21/9 max-h-[500px]">
                    <Image
                        alt={alt || "Project Image"}
                        src={src}
                        unoptimized={src?.endsWith(".gif")}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                        className="object-contain transition-transform duration-500 ease-out group-hover:scale-[1.015]"
                    />
                </div>
                <span
                    className="absolute top-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-background/70 backdrop-blur-md border border-border/40 px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.18em] text-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    aria-hidden
                >
                    <IconZoomInFilled className="size-3" />
                    Zoom
                </span>
            </button>

            {alt && (
                <p className="text-muted-foreground/80 text-center">{alt}</p>
            )}

            {open && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 md:p-8 cursor-zoom-out"
                    onClick={close}
                    role="dialog"
                    aria-modal="true"
                    aria-label={alt || "Enlarged image"}
                >
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            close();
                        }}
                        className="absolute top-4 right-4 z-10 rounded-full bg-background/20 hover:bg-background/40 text-white p-2 transition-colors cursor-pointer"
                        aria-label="Close enlarged image"
                    >
                        <IconX className="size-5" />
                    </button>

                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={src}
                        alt={alt}
                        className="max-w-full max-h-full object-contain rounded-xl select-none"
                        draggable={false}
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}
        </>
    );
}
