import type { SupabaseClient, User } from "@supabase/supabase-js";

export function isOwner(user: User | null | undefined): boolean {
    if (!user?.email) return false;
    const owner = process.env.ADMIN_OWNER_EMAIL;
    if (!owner) return false;
    return user.email.toLowerCase() === owner.toLowerCase();
}

export async function getOwnerUser(supabase: SupabaseClient): Promise<User | null> {
    const { data } = await supabase.auth.getUser();
    return isOwner(data.user) ? data.user : null;
}
