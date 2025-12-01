'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FaCheck, FaCopy, FaPaperPlane } from 'react-icons/fa6';
import { useState } from 'react';
const EMAIL = 'cdxlol.dev@gmail.com';

export function ContactBar() {
    const [copied, setCopied] = useState(false);

    return (
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 font-mono">
            <Link href={`mailto:${EMAIL}`} className="w-full md:w-auto">
                <Button
                    variant="secondary"
                    className="flex space-x-2 items-center !p-6 md:!p-8 active:scale-105 w-full md:w-auto justify-center"
                >
                    <FaPaperPlane className="size-5 md:size-6" />
                    <span className="text-xl md:text-2xl">Send Email</span>
                </Button>
            </Link>

            <Button
                variant="outline"
                className="flex space-x-2 items-center !p-6 md:!p-8 active:scale-105 w-full md:w-auto justify-center"
                onClick={() => {
                    if (copied) return;
                    navigator.clipboard.writeText(EMAIL).then(() => {
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2000);
                    });
                }}
            >
                {copied ? (
                    <FaCheck className="size-5 md:size-6" />
                ) : (
                    <FaCopy className="size-5 md:size-6" />
                )}
                <span className="text-xl md:text-2xl">Copy Email</span>
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
                <span className="hidden sm:block">Contact Me</span>
                <FaPaperPlane />
            </Button>
        </Link>
    );
}
