"use client";

import { AnimatePresence, motion, useDragControls } from "motion/react";
import { type ReactNode, useEffect } from "react";
import { useMediaQuery } from "@/lib/use-media-query";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Bottom sheet on phones, centered dialog from `sm` up. The sheet can be
 * dragged down by its handle to dismiss; body scroll is locked while open.
 */
export default function Sheet({
    open,
    onClose,
    label,
    dismissible = true,
    className,
    children,
}: {
    open: boolean;
    onClose: () => void;
    label: string;
    dismissible?: boolean;
    className?: string;
    children: ReactNode;
}) {
    const desktop = useMediaQuery("(min-width: 640px)");
    const dragControls = useDragControls();

    useEffect(() => {
        if (!open) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        function onKey(e: KeyboardEvent) {
            if (e.key === "Escape" && dismissible) onClose();
        }
        window.addEventListener("keydown", onKey);
        return () => {
            document.body.style.overflow = prev;
            window.removeEventListener("keydown", onKey);
        };
    }, [open, dismissible, onClose]);

    const close = () => dismissible && onClose();

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    key="sheet"
                    className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center sm:p-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <div
                        aria-hidden
                        className="absolute inset-0 bg-black/25 backdrop-blur-[3px] dark:bg-black/50"
                        onClick={close}
                    />
                    <motion.div
                        role="dialog"
                        aria-modal="true"
                        aria-label={label}
                        className={cn(
                            "relative flex w-full flex-col overflow-hidden bg-background",
                            "max-h-[92dvh] rounded-t-[28px] pb-[env(safe-area-inset-bottom)]",
                            "sm:max-h-[86dvh] sm:rounded-[24px] sm:pb-0",
                            "shadow-[0_-8px_40px_-16px_rgba(0,0,0,0.25)] sm:shadow-[0_24px_60px_-24px_rgba(0,0,0,0.35)]",
                            "ring-1 ring-black/5 dark:ring-white/10",
                            className,
                        )}
                        initial={
                            desktop
                                ? { opacity: 0, y: 12, scale: 0.98 }
                                : { y: "100%" }
                        }
                        animate={
                            desktop ? { opacity: 1, y: 0, scale: 1 } : { y: 0 }
                        }
                        exit={
                            desktop
                                ? { opacity: 0, y: 12, scale: 0.98 }
                                : { y: "100%" }
                        }
                        transition={{
                            duration: desktop ? 0.25 : 0.35,
                            ease: EASE,
                        }}
                        drag={desktop || !dismissible ? false : "y"}
                        dragControls={dragControls}
                        dragListener={false}
                        dragConstraints={{ top: 0, bottom: 0 }}
                        dragElastic={{ top: 0, bottom: 0.6 }}
                        onDragEnd={(_, info) => {
                            if (info.offset.y > 110 || info.velocity.y > 600) {
                                onClose();
                            }
                        }}
                    >
                        {!desktop && (
                            <div
                                aria-hidden
                                onPointerDown={(e) => dragControls.start(e)}
                                className="absolute inset-x-0 top-0 z-20 flex h-6 touch-none justify-center pt-2"
                            >
                                <span className="h-1 w-9 rounded-full bg-foreground/15" />
                            </div>
                        )}
                        {children}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
