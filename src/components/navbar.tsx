import { cn } from '@/lib/utils';
import Link from 'next/link';
import { FaEnvelope, FaGithub, FaHouse } from 'react-icons/fa6';

interface NavbarProps {
    className?: string;
}

export function Navbar({ className = '' }: NavbarProps) {
    const NAVBAR_LINKS = [
        {
            name: 'home',
            href: '/',
            icon: FaHouse,
        },
        {
            name: 'projects',
            href: '/projects',
            icon: FaHouse,
        },
        {
            name: 'playground',
            href: '/playground',
            icon: FaHouse,
        },
    ];

    const SOCIALS = [
        {
            icon: FaGithub,
            link: 'https://github.com/CDX-1',
            name: 'github',
        },
        {
            icon: FaGithub,
            link: 'https://github.com/CDX-2',
            name: 'github',
        },
        {
            icon: FaEnvelope,
            link: 'https://github.com/CDX-3',
            name: 'contact@cdx.rip',
        },
    ];

    return (
        <div className={cn('space-y-8', className)} role="button">
            <div className="space-y-2">
                {NAVBAR_LINKS.map((link) => (
                    <Link
                        key={link.href}
                        className="flex items-center group cursor-pointer"
                        href={link.href}
                    >
                        <span className="w-0 overflow-hidden opacity-0 transition-all duration-300 group-hover:w-6 group-hover:opacity-100 group-hover:mr-6">
                            <link.icon size={20} />
                        </span>

                        <p className="transition-transform duration-300 group-hover:scale-150 group-hover:font-medium">
                            {link.name}
                        </p>
                    </Link>
                ))}
            </div>

            <div className="space-y-4">
                <div className="flex w-full space-x-4">
                    {SOCIALS.map((social) => (
                        <Link
                            key={social.link}
                            href={social.link}
                            className="flex items-center space-x-2 group cursor-pointer"
                        >
                            <social.icon />
                            <p className="overflow-hidden whitespace-nowrap max-w-0 transition-all duration-300 group-hover:max-w-xs">
                                {social.name}
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
