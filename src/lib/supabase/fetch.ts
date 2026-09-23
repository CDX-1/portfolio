import { Agent, fetch as undiciFetch } from "undici";

// Node builds that ship with H2-attempting undici (some current/nightly
// versions) hit ERR_HTTP2_INVALID_SESSION against Supabase. Force H1.1.
const dispatcher = new Agent({ allowH2: false });

export const h1Fetch: typeof fetch = ((input, init) => {
    return undiciFetch(input as Parameters<typeof undiciFetch>[0], {
        ...(init as Parameters<typeof undiciFetch>[1]),
        dispatcher,
    }) as unknown as Promise<Response>;
}) as typeof fetch;
