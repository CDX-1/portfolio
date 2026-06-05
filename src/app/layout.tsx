import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import localFont from "next/font/local";
import Footer from "@/components/footer";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const karma = localFont({
    src: "./fonts/Karma-Variable.woff2",
    variable: "--font-karma",
});

const bespoke = localFont({
    src: "./fonts/BespokeSerif-Variable.woff2",
    variable: "--font-bespoke",
});

const satoshi = localFont({
    src: "./fonts/Satoshi-Variable.woff2",
    variable: "--font-satoshi"
});

export const metadata: Metadata = {
    title: "awsaf.dev",
    description: "My personal portfolio",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={`${geistSans.variable} ${geistMono.variable} ${bespoke.variable} ${satoshi.variable} h-full antialiased`}
            suppressHydrationWarning
        >
            <body className="bg-background min-h-full flex flex-col">
                <ThemeProvider
                    attribute="class"
                    defaultTheme="light"
                    enableSystem
                    disableTransitionOnChange
                >
                    <main className="flex-1">
                        {children}
                        <Footer />
                    </main>
                </ThemeProvider>
            </body>
        </html>
    );
}
