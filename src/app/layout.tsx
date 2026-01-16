import type { Metadata } from "next";
import { Geist } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const jetbrainsMono = localFont({
    src: "../fonts/JetBrainsMono-Regular.woff2",
    variable: "--font-mono"
});

const fossSerif = localFont({
    src: "../fonts/FOSSSERIF-Regular.woff2",
    variable: "--font-foss"
});

export const metadata: Metadata = {
    title: "Awsaf's Portfolio",
    description: "A collection of my past and ongoing projects",
    
    openGraph: {
        title: "Awsaf's Portfolio",
        description: "A collection of my past and ongoing projects",
        url: "https://awsaf.dev",
        siteName: "Awsaf's Portfolio",
        images: [
            {
                url: "https://awsaf.dev/landing.png",
                width: 2225,
                height: 1300,
                alt: "Awsaf's Portfolio"
            }
        ],
        type: "website"
    },

    twitter: {
        card: "summary_large_image",
        title: "Awsaf's Portfolio",
        description: "A collection of my past and ongoing projects",
        images: [
            {
                url: "https://awsaf.dev/landing.png",
                width: 2225,
                height: 1300,
                alt: "Awsaf's Portfolio"
            }
        ]
    }
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${jetbrainsMono.variable} ${fossSerif.variable} antialiased`}
                suppressHydrationWarning
            >
                <ThemeProvider
                    defaultTheme="light"
                >
                    <Navbar />
                    {children}
                    <Footer />
                </ThemeProvider>
            </body>
        </html>
    );
}
