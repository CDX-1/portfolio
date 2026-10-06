"use client";

import { IconArrowDown, IconMail } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

export const NOTES_SECTION_ID = "notes";
export const OPEN_COMPOSE_EVENT = "notes:open-compose";

function goToNotes() {
    if (typeof window === "undefined") return;
    const target = document.getElementById(NOTES_SECTION_ID);
    const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
    ).matches;

    if (target) {
        target.scrollIntoView({
            behavior: reduced ? "auto" : "smooth",
            block: "start",
        });
    }

    // wait for the scroll to settle before popping the compose modal.
    const delay = reduced ? 0 : 550;
    window.setTimeout(() => {
        window.dispatchEvent(new CustomEvent(OPEN_COMPOSE_EVENT));
    }, delay);
}

export default function LeaveNoteButton() {
    return (
        <button
            type="button"
            onClick={goToNotes}
            className={cn(
                "group inline-flex items-center gap-2 rounded-full",
                "border border-foreground/10 bg-background",
                "py-2 pl-3 pr-3.5 text-[13px] font-medium tracking-tight text-foreground/65",
                "transition-colors hover:border-foreground/20 hover:text-foreground/85",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20",
            )}
        >
            <IconMail
                className="size-4 stroke-[1.9] text-foreground/55"
                aria-hidden
            />
            Leave me a note
            <IconArrowDown
                className="size-3.5 stroke-[2] text-foreground/45 transition-transform duration-200 group-hover:translate-y-px"
                aria-hidden
            />
        </button>
    );
}
