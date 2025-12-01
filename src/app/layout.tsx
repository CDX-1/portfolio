import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from 'next-themes';
import Navbar from '@/components/navbar';
import {
    FaCameraRetro,
    FaFolderOpen,
    FaHouse,
    FaMessage,
    FaRocket,
} from 'react-icons/fa6';
import Footer from '@/components/footer';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: "CDX's Portfolio",
    description: 'My personal portfolio',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
                />
            </head>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased `}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <Navbar
                        items={[
                            {
                                title: 'Home',
                                icon: <FaHouse />,
                                href: '/',
                            },
                            {
                                title: 'Experience',
                                icon: <FaRocket />,
                                href: '/experience',
                            },
                            {
                                title: 'Projects',
                                icon: <FaFolderOpen />,
                                href: '/projects',
                            },
                            {
                                title: 'Blog',
                                icon: <FaMessage />,
                                href: '/blog',
                            },
                            {
                                title: 'Photography',
                                icon: <FaCameraRetro />,
                                href: '/photography',
                            },
                        ]}
                    />
                    <div className="min-h-screen">{children}</div>
                </ThemeProvider>
                <Footer />
            </body>
        </html>
    );
}
