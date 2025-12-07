import { NextRequest, NextResponse } from 'next/server';
import { postSchema } from '@/lib/schemas';
import { handleParseError } from '@/lib/utils';
import { createClient } from '@/lib/supabase/server';

export async function POST(req: NextRequest) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json(
            { error: "Unauthorized" },
            {
                status: 401,
                headers: { "Content-Type": "application/json" },
            }
        );
    }

    if (user.app_metadata.can_post !== true) {
        return NextResponse.json(
            { error: "Unauthorized" },
            {
                status: 401,
                headers: { "Content-Type": "application/json" },
            }
        );
    }

    let json;

    try {
        json = await req.json();
    } catch (err) {
        return NextResponse.json(
            { error: "Invalid JSON body" },
            {
                status: 400,
                headers: { "Content-Type": "application/json" },
            }
        );
    }

    const parseResult = postSchema.safeParse(json);
    if (!parseResult.success) {
        return handleParseError(parseResult.error);
    }
    const body = parseResult.data;

    const res = await supabase
        .from('posts')
        .insert({
            author: user.id,
            title: body.title,
            slug: body.slug,
            content: body.content,
            keywords: body.keywords,
        });

    if (res.error) {
        return NextResponse.json(
            { error: "Failed to create post" },
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            }
        );
    }

    return NextResponse.json({ ok: true, body: json });
}
