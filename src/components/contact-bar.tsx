'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FaCheck, FaCopy, FaPaperPlane } from 'react-icons/fa6';
import { useState } from 'react';
const EMAIL = 'cdxlol.dev@gmail.com';

export function ContactBar() {
    const [copied, setCopied] = useState(false);

    return (
        <div className="flex space-x-8 font-mono">
            <Link href={`mailto:${EMAIL}`}>
                <Button
                    variant="secondary"
                    className="flex space-x-2 items-center !p-8 active:scale-105"
                >
                    <FaPaperPlane className="size-6" />
                    <span className="text-2xl">Send Email</span>
                </Button>
            </Link>

            <Button
                variant="outline"
                className="flex space-x-2 items-center !p-8 active:scale-105"
                onClick={() => {
                    if (copied) return;
                    navigator.clipboard.writeText(EMAIL).then(() => {
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2000);
                    });
                }}
            >
                {copied ? (
                    <FaCheck className="size-6" />
                ) : (
                    <FaCopy className="size-6" />
                )}
                <span className="text-2xl">Copy Email</span>
            </Button>
        </div>
    );
}

export function ContactButton() {
    return (
        <Link href={`mailto:${EMAIL}`}>
            <Button
                variant="link"
                className="flex items-center hover:text-accent-foreground hover:no-underline"
            >
                <span>Contact Me</span>
                <FaPaperPlane />
            </Button>
        </Link>
    );
}
