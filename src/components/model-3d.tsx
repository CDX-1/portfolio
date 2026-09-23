"use client";

import { IconRotate360, IconLoader2 } from "@tabler/icons-react";
import { createElement, useEffect, useState } from "react";

interface Model3DProps {
    src: string;
    alt: string;
    poster?: string;
    autoRotate?: boolean;
    ar?: boolean;
    height?: string;
    background?: "transparent" | "muted";
}

export function Model3D({
    src,
    alt,
    poster,
    autoRotate = true,
    ar = false,
    height = "aspect-video max-h-[520px]",
    background = "muted",
}: Model3DProps) {
    const [ready, setReady] = useState(false);
    const [failed, setFailed] = useState(false);

    useEffect(() => {
        let cancelled = false;
        import("@google/model-viewer")
            .then(() => {
                if (!cancelled) setReady(true);
            })
            .catch((err) => {
                console.error("Failed to load model-viewer", err);
                if (!cancelled) setFailed(true);
            });
        return () => {
            cancelled = true;
        };
    }, []);

    const wrapperBg =
        background === "transparent" ? "bg-transparent" : "bg-muted/10";

    return (
        <div className="my-8 w-full">
            <div
                className={`w-full overflow-hidden rounded-xl border border-border/40 ${wrapperBg}`}
            >
                <div className={`relative w-full ${height}`}>
                    {failed ? (
                        <div className="w-full h-full flex items-center justify-center text-sm text-muted-foreground/70 px-6 text-center">
                            Couldn&apos;t load 3D viewer. Refresh to try again.
                        </div>
                    ) : ready ? (
                        createElement("model-viewer", {
                            src,
                            alt,
                            poster,
                            "camera-controls": true,
                            "touch-action": "pan-y",
                            "shadow-intensity": "1",
                            exposure: "1",
                            reveal: "auto",
                            loading: "lazy",
                            ...(autoRotate ? { "auto-rotate": true } : {}),
                            ...(ar ? { ar: true } : {}),
                            style: {
                                width: "100%",
                                height: "100%",
                                background: "transparent",
                            },
                        })
                    ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-muted-foreground/60">
                            <IconLoader2 className="size-5 animate-spin" aria-hidden />
                            <p className="text-xs font-mono uppercase tracking-[0.18em]">
                                Loading model
                            </p>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex items-center justify-center gap-2 mt-3 text-muted-foreground/70">
                <IconRotate360 className="size-4" aria-hidden />
                <p className="text-sm tracking-tight">
                    Drag to rotate · scroll to zoom
                </p>
            </div>

            {alt && (
                <p className="text-muted-foreground/80 text-center text-sm mt-1">
                    {alt}
                </p>
            )}
        </div>
    );
}
