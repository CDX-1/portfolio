import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SideNoteProps {
    side?: "left" | "right";
    label?: string;
    children: ReactNode;
}

export function SideNote({
    side = "right",
    label = "note",
    children,
}: SideNoteProps) {
    const isLeft = side === "left";

    return (
        <aside
            className={cn(
                "not-prose group relative my-6 rounded-xl border border-border/40 bg-muted/30 backdrop-blur-[2px]",
                "px-4 py-3 text-[13px] leading-relaxed text-muted-foreground/90",
                "xl:absolute xl:my-0 xl:w-44 2xl:w-56 xl:z-10",
                isLeft
                    ? "xl:right-[calc(100%+1.5rem)] 2xl:right-[calc(100%+2.25rem)] xl:text-right"
                    : "xl:left-[calc(100%+1.5rem)] 2xl:left-[calc(100%+2.25rem)] xl:text-left",
            )}
        >
            <span
                aria-hidden
                className={cn(
                    "hidden xl:block absolute top-4 h-px w-4 bg-border/50",
                    isLeft ? "left-full" : "right-full",
                )}
            />
            <div
                className={cn(
                    "mb-1.5 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/45",
                    isLeft ? "xl:justify-end" : "xl:justify-start",
                )}
            >
                <span aria-hidden>{isLeft ? "◂" : "▸"}</span>
                <span>{label}</span>
            </div>
            <div className="[&>p]:m-0 [&>p]:text-[13px] [&>p]:leading-relaxed [&>p+p]:mt-2 [&_a]:text-foreground [&_a]:underline [&_a]:underline-offset-2">
                {children}
            </div>
        </aside>
    );
}
