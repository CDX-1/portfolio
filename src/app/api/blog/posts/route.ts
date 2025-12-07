import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

const limit = 10;

export async function GET(req: NextRequest) {
    const supabase = await createClient();
    const url = new URL(req.url);

    const pageParam = url.searchParams.get('page');
    const page = Number(pageParam);

    if (!pageParam || Number.isNaN(page) || page < 1) {
        return NextResponse.json(
            { error: 'Invalid page number. Must be a positive integer.' },
            { status: 400 }
        );
    }

    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data, error, count } = await supabase
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
        `,
            { count: 'exact' }
        )
        .order('created_at', { ascending: false })
        .range(from, to);

    if (error || !data || count === null) {
        return NextResponse.json(
            { error: 'Failed to fetch posts' },
            { status: 500 }
        );
    }

    return NextResponse.json(
        {
            posts: data,
            total: count,
            page,
            totalPages: Math.ceil(count / limit),
        },
        {
            headers: {
                "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300"
            },
        }
    );
}
