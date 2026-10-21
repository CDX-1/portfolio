import type { NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function proxy(request: NextRequest) {
    return updateSession(request);
}

export const config = {
    // Only routes that read the Supabase session; everything else stays static.
    matcher: ["/", "/portal/:path*", "/shenanigans/:path*", "/api/:path*"],
};
