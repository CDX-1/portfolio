import { useEffect, useState } from 'react';

export function TypewriterText({
    text,
    delay = 0,
    isExiting = false,
    onComplete,
}: {
    text: string;
    delay?: number;
    isExiting?: boolean;
    onComplete?: () => void;
}) {
    const [displayText, setDisplayText] = useState('');

    useEffect(() => {
        if (isExiting) {
            setDisplayText(text);
            let currentIndex = text.length;
            const timeout = setTimeout(() => {
                const interval = setInterval(() => {
                    if (currentIndex >= 0) {
                        setDisplayText(text.slice(0, currentIndex));
                        currentIndex--;
                    } else {
                        clearInterval(interval);
                        onComplete?.();
                    }
                }, 20);

                return () => clearInterval(interval);
            }, delay);

            return () => clearTimeout(timeout);
        } else {
            setDisplayText('');
            let currentIndex = 0;
            const timeout = setTimeout(() => {
                const interval = setInterval(() => {
                    if (currentIndex <= text.length) {
                        setDisplayText(text.slice(0, currentIndex));
                        currentIndex++;
                    } else {
                        clearInterval(interval);
                    }
                }, 30);

                return () => clearInterval(interval);
            }, delay);

            return () => clearTimeout(timeout);
        }
    }, [text, delay, isExiting, onComplete]);

    return <span>{displayText}</span>;
}
