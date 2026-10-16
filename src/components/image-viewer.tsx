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
                className="group relative mt-8 block w-full cursor-zoom-in overflow-hidden rounded-md border border-border bg-muted/30"
            >
                <Image
                    alt={alt || "Project Image"}
                    src={src}
                    unoptimized={src?.endsWith(".gif")}
                    width={0}
                    height={0}
                    sizes="(max-width: 768px) 100vw, 768px"
                    style={{ width: "100%", height: "auto" }}
                    className="block h-auto w-full transition-transform duration-500 ease-out group-hover:scale-[1.015]"
                />
                <span
                    className="absolute top-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-background/70 backdrop-blur-md border border-border/40 px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.18em] text-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    aria-hidden
                >
                    <IconZoomInFilled className="size-3" />
                    Zoom
                </span>
            </button>

            {alt && (
                <p className="mt-2.5 mb-8 font-mono text-xs leading-relaxed text-foreground/50">
                    <span className="text-primary">↳ </span>
                    {alt}
                </p>
            )}

            {open && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 md:p-8 cursor-zoom-out"
                    role="dialog"
                    aria-modal="true"
                    aria-label={alt || "Enlarged image"}
                >
                    <button
                        type="button"
                        onClick={close}
                        className="absolute inset-0 cursor-zoom-out"
                        aria-label="Close enlarged image"
                    />
                    <button
                        type="button"
                        onClick={close}
                        className="absolute top-4 right-4 z-20 rounded-full bg-background/20 hover:bg-background/40 text-white p-2 transition-colors cursor-pointer"
                        aria-label="Close enlarged image"
                    >
                        <IconX className="size-5" />
                    </button>

                    <Image
                        src={src}
                        alt={alt}
                        width={1600}
                        height={900}
                        unoptimized={src.endsWith(".gif")}
                        className="relative z-10 max-w-full max-h-full object-contain rounded-xl select-none"
                    />
                </div>
            )}
        </>
    );
}
