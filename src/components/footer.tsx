import { FaGithub, FaYoutube } from 'react-icons/fa6';
import { TbBrandFiverr } from 'react-icons/tb';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import ViewSourceButton from '@/components/view-source';
import { ContactButton } from '@/components/contact-bar';

export default function Footer() {
    const links = [
        {
            icon: <FaGithub />,
            href: 'https://github.com/CDX-1',
        },
        {
            icon: <FaYoutube />,
            href: 'https://www.youtube.com/@rarecdx',
        },
        {
            icon: <TbBrandFiverr />,
            href: 'https://www.fiverr.com/cdxdev_',
        },
    ];

    return (
        <footer className="flex flex-col-reverse gap-4 md:flex-row justify-between items-center w-11/12 md:w-11/12 lg:w-4/5 2xl:w-3/5 bg-card dark:bg-primary-foreground py-4 px-6 mx-auto mb-6 rounded-lg text-sm text-primary">
            <span>© {new Date().getFullYear()} CDX. All rights reserved.</span>

            <div className="flex items-center divide-x divide-foreground/10">
                <ViewSourceButton />

                {links.map((link) => (
                    <Link key={link.href} href={link.href} className="px-2">
                        <Button
                            className="hover:text-accent-foreground transition-colors text-sm"
                            variant="link"
                        >
                            {link.icon}
                        </Button>
                    </Link>
                ))}

                <ContactButton />
            </div>
        </footer>
    );
}
