import type { Metadata, Viewport } from "next";
import {
    Bricolage_Grotesque,
    Caveat,
    Geist,
    JetBrains_Mono,
} from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import PageTransition from "@/components/page-transition";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

// Display face for headings; its ink traps read like drafting lettering.
const bricolage = Bricolage_Grotesque({
    variable: "--font-bricolage",
    subsets: ["latin"],
    axes: ["opsz", "wdth"],
});

const jetbrainsMono = JetBrains_Mono({
    variable: "--font-jetbrains-mono",
    subsets: ["latin"],
});

const caveat = Caveat({
    variable: "--font-caveat",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
    title: "awsaf.dev",
    description: "My personal portfolio",
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    viewportFit: "cover",
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "#fbfaf7" },
        { media: "(prefers-color-scheme: dark)", color: "#111317" },
    ],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={`${geistSans.variable} ${bricolage.variable} ${jetbrainsMono.variable} ${caveat.variable} h-full antialiased`}
            suppressHydrationWarning
        >
            <body className="bg-background min-h-full flex flex-col">
                <ThemeProvider
                    attribute="class"
                    defaultTheme="light"
                    enableSystem
                    disableTransitionOnChange
                >
                    <main className="flex-1 font-sans pb-[calc(env(safe-area-inset-bottom)+5.5rem)] sm:pb-0">
                        <Navbar />
                        <PageTransition>
                            <div className="min-h-screen">{children}</div>
                        </PageTransition>
                        <Footer />
                    </main>
                    <div aria-hidden className="paper-grain" />
                </ThemeProvider>
            </body>
        </html>
    );
}
