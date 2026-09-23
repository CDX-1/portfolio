"use server";

import { redirect } from "next/navigation";
import { isOwner } from "@/lib/supabase/owner";
import { createClient } from "@/lib/supabase/server";

export type PortalActionState = { error: string | null };

export async function signIn(
    _prev: PortalActionState,
    formData: FormData,
): Promise<PortalActionState> {
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    if (!email || !password) {
        return { error: "Missing credentials." };
    }

    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error || !isOwner(data.user)) {
        // Sign the fake session out so a wrong-email user isn't left with a
        // half-authed cookie.
        await supabase.auth.signOut().catch(() => {});
        return { error: "Invalid credentials." };
    }

    redirect("/shenanigans");
}
