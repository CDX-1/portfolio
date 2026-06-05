'use client';

import { useState, useEffect } from 'react';

export default function LocalClock({ className }: { className?: string }) {
    const [time, setTime] = useState<string>('');

    useEffect(() => {
        const updateTime = () => {
            const formatter = new Intl.DateTimeFormat('en-US', {
                timeZone: 'America/Toronto',
                hour: 'numeric',
                minute: '2-digit',
                second: '2-digit',
                hour12: true,
            });
            setTime(formatter.format(new Date()));
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);

        return () => clearInterval(interval);
    }, []);

    if (!time) return <span className="animate-pulse">Loading...</span>;

    return <span className={className}>{time}</span>;
}