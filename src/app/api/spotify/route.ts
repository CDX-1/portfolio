import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const formData = new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: process.env.SPOTIFY_REFRESH_TOKEN!,
        client_id: process.env.SPOTIFY_CLIENT_ID!,
        client_secret: process.env.SPOTIFY_CLIENT_SECRET!,
    });

    const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
    });

    let tokenData;
    try {
        tokenData = await tokenRes.json();
    } catch {
        return NextResponse.json(
            { error: 'Failed to get access token' },
            { status: 500 }
        );
    }

    if (!tokenData.access_token) {
        return NextResponse.json(
            { error: 'No access token received' },
            { status: 401 }
        );
    }

    const accessToken = tokenData.access_token;

    const playerRes = await fetch('https://api.spotify.com/v1/me/player', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    if (playerRes.status === 204) {
        return NextResponse.json({ message: 'No track currently playing' });
    }

    let playerData;
    try {
        playerData = await playerRes.json();
    } catch {
        return NextResponse.json(
            { error: 'Failed to fetch player data' },
            { status: 500 }
        );
    }

    if (!playerData.item) {
        return NextResponse.json({ message: 'No track currently playing' });
    }

    try {
        const artist = playerData.item.artists
            .map((artist: any) => artist.name)
            .join(', ');
        const song = playerData.item.name;
        const album = playerData.item.album.name;
        const albumArtUrl = playerData.item.album.images[0].url;
        const progressMs = playerData.progress_ms;
        const durationMs = playerData.item.duration_ms;
        const url = playerData.item.external_urls.spotify;

        return NextResponse.json({
            artist,
            song,
            album,
            albumArtUrl,
            progressMs,
            durationMs,
            url,
        });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to parse track data' },
            { status: 500 }
        );
    }
}
