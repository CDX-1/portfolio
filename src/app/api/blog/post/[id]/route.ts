import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(
    _: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('posts')
        .select(
            `
            slug,
            title,
            content,
            keywords,
            created_at,
            author:user_public (
                id,
                username,
                avatar_url
            )
        `
        )
        .eq('slug', id)
        .single();

    if (error || !data) {
        return NextResponse.json(
            { error: 'Failed to fetch post' },
            { status: 500 }
        );
    }

    return NextResponse.json(
        data,
        {
            headers: {
                "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300"
            },
        }
    );
}
