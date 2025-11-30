'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FaCodePullRequest } from 'react-icons/fa6';
import { useEffect, useState } from 'react';

export default function ViewSourceButton() {
    const [hash, setHash] = useState('View Source');

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(
                'https://api.github.com/repos/CDX-1/portfolio/commits'
            );

            res.json().then((data) => {
                if (Array.isArray(data) && data.length > 0) {
                    const latestCommit = data[0];
                    const shortHash = latestCommit.sha.substring(0, 7);
                    setHash(shortHash);
                }
            });
        };

        fetchData();
    }, []);

    return (
        <Link href="https://github.com/CDX-1/portfolio" target="_blank">
            <Button
                className="flex items-center hover:no-underline hover:text-accent-foreground"
                variant="link"
            >
                <FaCodePullRequest />
                <span>{hash}</span>
            </Button>
        </Link>
    );
}
