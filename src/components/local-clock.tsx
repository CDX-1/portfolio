"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function LocalClock({ className }: { className?: string }) {
    const [time, setTime] = useState<string>("");

    useEffect(() => {
        const updateTime = () => {
            const formatter = new Intl.DateTimeFormat("en-US", {
                timeZone: "America/Toronto",
                hour: "numeric",
                minute: "2-digit",
                second: "2-digit",
                hour12: true,
            });
            setTime(formatter.format(new Date()));
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <span className={cn("tabular-nums", className)}>
            {time || <span className="text-foreground/30">—— : —— : ——</span>}
        </span>
    );
}
