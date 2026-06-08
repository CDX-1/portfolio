'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const pathname = usePathname();

    const navItems = [
        { name: "Home", href: "/" },
        { name: "About Me", href: "/about" },
    ];

    return (
        <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 w-max bg-accent/80 backdrop-blur-md p-1.5 rounded-full border border-border/50 shadow-xs">
            {navItems.map((item) => {
                const isActive = pathname === item.href;
                
                return (
                    <Link
                        key={item.name}
                        href={item.href}
                        className={`px-4 py-1.5 text-sm font-medium rounded-full transition-colors ${
                            isActive
                                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                                : "text-foreground hover:bg-muted"
                        }`}
                    >
                        {item.name}
                    </Link>
                );
            })}
        </nav>
    );
}