import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ZodError } from 'zod';
import { NextResponse } from 'next/server';
import { z } from 'zod';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function handleParseError(error: ZodError<any>) {
    return NextResponse.json(error, {
        status: 200,
        statusText: z.prettifyError(error)
    });
}

export function stripMarkdown(md: string) {
    return md
        .replace(/```[\s\S]*?```/g, "")
        .replace(/`([^`]+)`/g, "$1")
        .replace(/!\[.*?\]\(.*?\)/g, "")
        .replace(/\[(.*?)\]\(.*?\)/g, "$1")
        .replace(/^\s{0,3}#{1,6}\s+/gm, "")
        .replace(/^\s*>+\s?/gm, "")
        .replace(/^\s*([-*+]|\d+\.)\s+/gm, "")
        .replace(/(\*\*|__|\*|_)(.*?)\1/g, "$2")
        .replace(/<[^>]+>/g, "")
        .replace(/\n{2,}/g, "\n")
        .trim();
}
