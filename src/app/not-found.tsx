'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NotFound() {
    const pathname = usePathname();
    const effectivePath = pathname.length > 50 ? pathname.slice(0, 47) + '...' : pathname;

    return (
        <div className="flex flex-col items-center justify-center h-screen space-y-2">
            <h1 className="text-6xl font-bold font-mono text-accent">404</h1>
            <p className="text-2xl">
                Doesn&apos;t seem like{' '}
                <span className="text-accent">{effectivePath}</span>{' '}
                exists...
            </p>
            <Link className="font-mono text-lg text-accent hover:text-accent-foreground transition-colors duration-100" href="/">
                return home?
            </Link>
        </div>
    );
}
