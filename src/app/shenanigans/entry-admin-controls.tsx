"use client";

import { IconLoader2, IconTrash } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

const BUCKET = "shenanigans";
const STORAGE_MARKER = `/storage/v1/object/public/${BUCKET}/`;

function extractStoragePath(publicUrl: string): string | null {
    const idx = publicUrl.indexOf(STORAGE_MARKER);
    if (idx === -1) return null;
    return decodeURIComponent(publicUrl.slice(idx + STORAGE_MARKER.length));
}

export default function EntryAdminControls({
    entryId,
    title,
    mediaSrc,
}: {
    entryId: string;
    title: string;
    mediaSrc: string;
}) {
    const router = useRouter();
    const [pending, setPending] = useState(false);

    async function onDelete() {
        if (pending) return;
        const ok = window.confirm(`Delete "${title}"? This cannot be undone.`);
        if (!ok) return;

        setPending(true);
        const supabase = createClient();

        const storagePath = extractStoragePath(mediaSrc);
        if (storagePath) {
            const { error: storageError } = await supabase.storage
                .from(BUCKET)
                .remove([storagePath]);
            if (storageError) {
                setPending(false);
                window.alert(`Storage: ${storageError.message}`);
                return;
            }
        }

        const { error } = await supabase
            .from("shenanigans")
            .delete()
            .eq("id", entryId);

        if (error) {
            setPending(false);
            window.alert(error.message);
            return;
        }

        router.refresh();
    }

    return (
        <div className="pointer-events-none absolute inset-0 z-10">
            <button
                type="button"
                onClick={onDelete}
                disabled={pending}
                aria-label={`Delete ${title}`}
                className={cn(
                    "pointer-events-auto absolute top-2 right-2",
                    "flex h-8 w-8 items-center justify-center rounded-full",
                    "bg-background/80 backdrop-blur border border-border/60",
                    "text-foreground/70 hover:text-red-500 hover:border-red-500/40",
                    "opacity-0 group-hover:opacity-100 focus-visible:opacity-100",
                    "transition-[opacity,color,border-color] duration-200",
                    "disabled:opacity-100 disabled:text-foreground/40",
                )}
            >
                {pending ? (
                    <IconLoader2 className="size-4 animate-spin" />
                ) : (
                    <IconTrash className="size-4" />
                )}
            </button>
        </div>
    );
}
