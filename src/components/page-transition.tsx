"use client";

import { usePathname } from "next/navigation";
import { ViewTransition } from "react";

/**
 * Animates route changes. Keyed by pathname so only real navigations swap the
 * page; `router.refresh()` and other in-page transitions leave it alone.
 */
export default function PageTransition({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    return (
        <ViewTransition
            key={pathname}
            enter="page-in"
            exit="page-out"
            default="none"
        >
            {children}
        </ViewTransition>
    );
}
