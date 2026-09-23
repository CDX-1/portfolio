"use client";

import { IconCheck, IconLoader2, IconTrash, IconX } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Note } from "@/content/notes";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

type Action = "approve" | "reject" | "delete";

export default function NoteAdminControls({
    note,
    onDone,
}: {
    note: Note;
    onDone?: () => void;
}) {
    const router = useRouter();
    const [pending, setPending] = useState<Action | null>(null);
    const [error, setError] = useState<string | null>(null);

    async function run(action: Action) {
        if (pending) return;
        setError(null);

        if (action === "delete") {
            const ok = window.confirm(
                `Delete note from "${note.sender}"? This cannot be undone.`,
            );
            if (!ok) return;
        }

        setPending(action);
        const supabase = createClient();

        let err: { message: string } | null = null;
        if (action === "delete") {
            const res = await supabase.from("notes").delete().eq("id", note.id);
            err = res.error;
        } else if (action === "approve") {
            const res = await supabase
                .from("notes")
                .update({
                    status: "approved",
                    approved_at: new Date().toISOString(),
                })
                .eq("id", note.id);
            err = res.error;
        } else {
            const res = await supabase
                .from("notes")
                .update({ status: "rejected", approved_at: null })
                .eq("id", note.id);
            err = res.error;
        }

        if (err) {
            setPending(null);
            setError(err.message);
            return;
        }

        setPending(null);
        onDone?.();
        router.refresh();
    }

    const isApproved = note.status === "approved";

    return (
        <div className="flex items-center justify-between gap-2">
            <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-black/50">
                Owner controls · {note.status}
            </div>
            <div className="flex items-center gap-1.5">
                {!isApproved && (
                    <button
                        type="button"
                        onClick={() => run("approve")}
                        disabled={!!pending}
                        className={cn(
                            "inline-flex items-center gap-1 rounded-full px-2.5 py-1",
                            "bg-emerald-600/90 text-white hover:bg-emerald-600",
                            "font-mono text-[9px] uppercase tracking-[0.18em]",
                            "transition-colors disabled:opacity-50",
                        )}
                    >
                        {pending === "approve" ? (
                            <IconLoader2 className="size-3 animate-spin" />
                        ) : (
                            <IconCheck className="size-3" />
                        )}
                        Approve
                    </button>
                )}
                {isApproved && (
                    <button
                        type="button"
                        onClick={() => run("reject")}
                        disabled={!!pending}
                        className={cn(
                            "inline-flex items-center gap-1 rounded-full px-2.5 py-1",
                            "bg-black/10 text-black/70 hover:bg-black/20 hover:text-black",
                            "font-mono text-[9px] uppercase tracking-[0.18em]",
                            "transition-colors disabled:opacity-50",
                        )}
                    >
                        {pending === "reject" ? (
                            <IconLoader2 className="size-3 animate-spin" />
                        ) : (
                            <IconX className="size-3" />
                        )}
                        Unpublish
                    </button>
                )}
                <button
                    type="button"
                    onClick={() => run("delete")}
                    disabled={!!pending}
                    className={cn(
                        "inline-flex items-center gap-1 rounded-full px-2.5 py-1",
                        "bg-red-600/90 text-white hover:bg-red-600",
                        "font-mono text-[9px] uppercase tracking-[0.18em]",
                        "transition-colors disabled:opacity-50",
                    )}
                >
                    {pending === "delete" ? (
                        <IconLoader2 className="size-3 animate-spin" />
                    ) : (
                        <IconTrash className="size-3" />
                    )}
                    Delete
                </button>
            </div>
            {error && (
                <div
                    role="alert"
                    className="w-full pt-1 font-mono text-[9px] uppercase tracking-[0.18em] text-red-600/80"
                >
                    {error}
                </div>
            )}
        </div>
    );
}
