import { timingSafeEqual } from "node:crypto";
import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { isOwner } from "@/lib/supabase/owner";
import { createClient } from "@/lib/supabase/server";
import PortalClient from "./portal-client";

export const metadata: Metadata = {
    title: "Not found",
    robots: { index: false, follow: false, nocache: true },
};

export const dynamic = "force-dynamic";

function keysMatch(provided: string, expected: string): boolean {
    const a = Buffer.from(provided);
    const b = Buffer.from(expected);
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
}

export default async function PortalPage({
    params,
}: {
    params: Promise<{ key: string }>;
}) {
    const { key } = await params;
    const expected = process.env.ADMIN_PORTAL_KEY;

    if (!expected || !keysMatch(key, expected)) {
        notFound();
    }

    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (isOwner(user)) {
        redirect("/shenanigans");
    }

    return <PortalClient />;
}
