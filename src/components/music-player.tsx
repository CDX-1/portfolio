'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import Link from 'next/link';

interface Player {
    artist: string;
    song: string;
    album: string;
    albumArtUrl: string;
    progressMs: number;
    durationMs: number;
    url: string;
}

export default function MusicPlayer() {
    const [player, setPlayer] = useState<Player>({
        artist: 'None',
        song: 'Not Currently Playing',
        album: 'None',
        albumArtUrl: '/no-song.png',
        progressMs: 0,
        durationMs: 0,
        url: '',
    });

    const msToMinutesSeconds = (ms: number) => {
        const totalSeconds = Math.floor(ms / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    useEffect(() => {
        const load = async () => {
            const res = await fetch('/api/spotify');
            if (res.status !== 200) {
                return;
            }

            let data;
            try {
                data = await res.json();
            } catch {
                return;
            }

            if (
                !data.artist ||
                !data.song ||
                !data.album ||
                !data.albumArtUrl ||
                !data.progressMs ||
                !data.durationMs ||
                !data.url
            ) {
                return;
            }

            setPlayer({
                artist: data.artist,
                song: data.song,
                album: data.album,
                albumArtUrl: data.albumArtUrl,
                progressMs: data.progressMs,
                durationMs: data.durationMs,
                url: data.url,
            });
        };

        load();

        const interval = setInterval(load, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            {player && (
                <div className="w-full">
                    <div className="relative w-full h-64 rounded-lg overflow-hidden">
                        <Image
                            src={player.albumArtUrl}
                            alt={player.song}
                            fill
                            className="object-cover"
                        />
                    </div>

                    <div className="flex flex-col items-center space-y-4 mt-4">
                        <div className="flex justify-between w-full items-center">
                            <div className="flex flex-col">
                                <h2 className="font-semibold">{player.song}</h2>
                                <p className="text-sm">{player.artist}</p>
                            </div>

                            <div role="button">
                                <Button className="rounded-2xl cursor-pointer">
                                    <Link href={player.url}>Listen</Link>
                                </Button>
                            </div>
                        </div>

                        <div className="flex items-center space-x-2 w-full justify-between">
                            <p className="text-xs">
                                {msToMinutesSeconds(player.progressMs)}
                            </p>
                            <div className="w-full h-1 bg-foreground rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-accent transition-all duration-200"
                                    style={{
                                        width: `${(player.progressMs / player.durationMs) * 100}%`,
                                    }}
                                ></div>
                            </div>
                            <p className="text-xs">
                                {msToMinutesSeconds(player.durationMs)}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
