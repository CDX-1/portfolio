"use client";

import { IconLogout, IconPlus, IconUpload, IconX } from "@tabler/icons-react";
import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

type MediaAspect = "video" | "square" | "portrait" | "wide" | "tall";
type Span = "half" | "full";

const ASPECT_OPTIONS: { label: string; value: MediaAspect }[] = [
    { label: "16:9", value: "video" },
    { label: "1:1", value: "square" },
    { label: "3:4", value: "portrait" },
    { label: "21:9", value: "wide" },
    { label: "9:16", value: "tall" },
];

export default function AdminPanel() {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [pending, setPending] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [title, setTitle] = useState("");
    const [caption, setCaption] = useState("");
    const [aspect, setAspect] = useState<MediaAspect>("video");
    const [span, setSpan] = useState<Span>("half");
    const [entryDate, setEntryDate] = useState(() =>
        new Date().toISOString().slice(0, 10),
    );

    useEffect(() => {
        if (!file) {
            setPreviewUrl(null);
            return;
        }
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
        return () => URL.revokeObjectURL(url);
    }, [file]);

    function reset() {
        setFile(null);
        setPreviewUrl(null);
        setTitle("");
        setCaption("");
        setAspect("video");
        setSpan("half");
        setEntryDate(new Date().toISOString().slice(0, 10));
        setError(null);
    }

    function pickFile(next: File | null) {
        setFile(next);
    }

    async function onSignOut() {
        const supabase = createClient();
        await supabase.auth.signOut();
        router.replace("/shenanigans");
        router.refresh();
    }

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError(null);

        if (!file) {
            setError("Pick a file.");
            return;
        }
        if (!title.trim()) {
            setError("Add a title.");
            return;
        }

        setPending(true);

        const body = new FormData();
        body.set("file", file);
        body.set("title", title.trim());
        body.set("caption", caption.trim());
        body.set("entry_date", entryDate);
        body.set("aspect", aspect);
        body.set("span", span);

        let res: Response;
        try {
            res = await fetch("/api/shenanigans/upload", {
                method: "POST",
                body,
            });
        } catch (err) {
            setPending(false);
            setError(err instanceof Error ? err.message : "Upload failed");
            return;
        }

        if (!res.ok) {
            const payload = await res.json().catch(() => null);
            setPending(false);
            setError(payload?.error ?? `Upload failed (${res.status})`);
            return;
        }

        setPending(false);
        setOpen(false);
        reset();
        router.refresh();
    }

    return (
        <>
            <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2">
                <button
                    type="button"
                    onClick={onSignOut}
                    aria-label="Sign out"
                    className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-full",
                        "bg-background/80 backdrop-blur border border-border/60",
                        "text-foreground/60 hover:text-foreground",
                        "transition-colors duration-200",
                    )}
                >
                    <IconLogout className="size-4" />
                </button>
                <button
                    type="button"
                    onClick={() => setOpen(true)}
                    className={cn(
                        "flex items-center gap-2 rounded-full",
                        "bg-foreground text-background",
                        "pl-3 pr-4 py-2 text-sm font-medium tracking-tight",
                        "shadow-[0_10px_30px_-12px_rgba(0,0,0,0.35)]",
                        "hover:opacity-90 transition-opacity duration-200",
                    )}
                >
                    <IconPlus className="size-4" />
                    Add entry
                </button>
            </div>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-background/70 backdrop-blur-sm px-4"
                        onClick={() => !pending && setOpen(false)}
                    >
                        <motion.form
                            onSubmit={onSubmit}
                            initial={{ opacity: 0, y: 12, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 12, scale: 0.98 }}
                            transition={{
                                duration: 0.25,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            onClick={(e) => e.stopPropagation()}
                            className={cn(
                                "w-full max-w-lg rounded-3xl border border-border/60 bg-background",
                                "p-6 md:p-7 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.35)]",
                                "flex flex-col gap-5 max-h-[90vh] overflow-y-auto",
                            )}
                        >
                            <div className="flex items-start justify-between gap-4">
                                <h2 className="font-bespoke text-2xl tracking-tight text-foreground">
                                    New entry
                                </h2>
                                <button
                                    type="button"
                                    onClick={() => !pending && setOpen(false)}
                                    aria-label="Close"
                                    className="rounded-full p-1.5 text-foreground/50 hover:text-foreground hover:bg-muted/40"
                                >
                                    <IconX className="size-4" />
                                </button>
                            </div>

                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className={cn(
                                    "group relative flex flex-col items-center justify-center overflow-hidden",
                                    "rounded-2xl border border-dashed border-border/60",
                                    "bg-muted/10 hover:bg-muted/20 transition-colors",
                                    "min-h-40 aspect-video",
                                )}
                            >
                                {previewUrl ? (
                                    file?.type.startsWith("video/") ? (
                                        <video
                                            src={previewUrl}
                                            className="absolute inset-0 h-full w-full object-cover"
                                            muted
                                            playsInline
                                            autoPlay
                                            loop
                                        />
                                    ) : (
                                        <img
                                            src={previewUrl}
                                            alt=""
                                            className="absolute inset-0 h-full w-full object-cover"
                                        />
                                    )
                                ) : (
                                    <div className="flex flex-col items-center gap-2 text-foreground/50">
                                        <IconUpload className="size-5" />
                                        <span className="text-sm">
                                            Drop a file, or click to browse
                                        </span>
                                    </div>
                                )}
                            </button>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*,video/*"
                                className="hidden"
                                onChange={(e) =>
                                    pickFile(e.target.files?.[0] ?? null)
                                }
                            />

                            <FieldLabel label="Title">
                                <input
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                    className={inputClass}
                                />
                            </FieldLabel>

                            <FieldLabel label="Caption">
                                <textarea
                                    value={caption}
                                    onChange={(e) => setCaption(e.target.value)}
                                    rows={3}
                                    className={cn(inputClass, "resize-none")}
                                />
                            </FieldLabel>

                            <div className="grid grid-cols-2 gap-4">
                                <FieldLabel label="Date">
                                    <input
                                        type="date"
                                        value={entryDate}
                                        onChange={(e) =>
                                            setEntryDate(e.target.value)
                                        }
                                        required
                                        className={inputClass}
                                    />
                                </FieldLabel>
                                <FieldLabel label="Aspect">
                                    <select
                                        value={aspect}
                                        onChange={(e) =>
                                            setAspect(
                                                e.target.value as MediaAspect,
                                            )
                                        }
                                        className={inputClass}
                                    >
                                        {ASPECT_OPTIONS.map((o) => (
                                            <option
                                                key={o.value}
                                                value={o.value}
                                            >
                                                {o.label}
                                            </option>
                                        ))}
                                    </select>
                                </FieldLabel>
                                <FieldLabel label="Span">
                                    <select
                                        value={span}
                                        onChange={(e) =>
                                            setSpan(e.target.value as Span)
                                        }
                                        className={inputClass}
                                    >
                                        <option value="half">Half</option>
                                        <option value="full">Full</option>
                                    </select>
                                </FieldLabel>
                            </div>

                            {error && (
                                <p
                                    role="alert"
                                    className="font-mono text-[10px] uppercase tracking-[0.18em] text-red-500/80"
                                >
                                    {error}
                                </p>
                            )}

                            <div className="flex items-center justify-end gap-2 pt-1">
                                <button
                                    type="button"
                                    onClick={() => {
                                        if (!pending) {
                                            setOpen(false);
                                            reset();
                                        }
                                    }}
                                    className="rounded-full px-4 py-2 text-sm text-foreground/60 hover:text-foreground"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={pending}
                                    className={cn(
                                        "rounded-full bg-foreground text-background",
                                        "px-4 py-2 text-sm font-medium tracking-tight",
                                        "disabled:opacity-40 hover:opacity-90 transition-opacity",
                                    )}
                                >
                                    {pending ? "Uploading…" : "Publish"}
                                </button>
                            </div>
                        </motion.form>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

const inputClass = cn(
    "w-full rounded-lg border border-border/60 bg-background/50",
    "px-3 py-2 text-sm text-foreground",
    "focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-foreground/40",
);

function FieldLabel({
    label,
    children,
}: {
    label: string;
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col gap-1.5">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/50">
                {label}
            </span>
            {children}
        </div>
    );
}
