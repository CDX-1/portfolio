"use client";

import { motion } from "motion/react";
import { useActionState } from "react";
import { cn } from "@/lib/utils";
import { type PortalActionState, signIn } from "./actions";

const INITIAL_STATE: PortalActionState = { error: null };

export default function PortalClient() {
    const [state, formAction, pending] = useActionState(signIn, INITIAL_STATE);

    return (
        <main className="min-h-screen flex items-center justify-center px-6">
            <motion.form
                action={formAction}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="w-full max-w-sm flex flex-col gap-5"
                autoComplete="off"
            >
                <h1 className="font-bespoke text-2xl tracking-tight text-foreground">
                    Sign in
                </h1>

                <label className="flex flex-col gap-1.5">
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/50">
                        Email
                    </span>
                    <input
                        type="email"
                        name="email"
                        required
                        autoComplete="off"
                        spellCheck={false}
                        className={cn(
                            "w-full rounded-lg border border-border/60 bg-background/50",
                            "px-3 py-2 text-sm text-foreground",
                            "focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-foreground/40",
                        )}
                    />
                </label>

                <label className="flex flex-col gap-1.5">
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/50">
                        Password
                    </span>
                    <input
                        type="password"
                        name="password"
                        required
                        autoComplete="new-password"
                        className={cn(
                            "w-full rounded-lg border border-border/60 bg-background/50",
                            "px-3 py-2 text-sm text-foreground",
                            "focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-foreground/40",
                        )}
                    />
                </label>

                {state.error && (
                    <p
                        role="alert"
                        className="font-mono text-[10px] uppercase tracking-[0.18em] text-red-500/80"
                    >
                        {state.error}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={pending}
                    className={cn(
                        "mt-1 rounded-full bg-foreground text-background",
                        "px-4 py-2 text-sm font-medium tracking-tight",
                        "transition-opacity duration-200",
                        "disabled:opacity-40",
                        "hover:opacity-90",
                    )}
                >
                    {pending ? "…" : "Continue"}
                </button>
            </motion.form>
        </main>
    );
}
