import type { Metadata } from "next";
import "./globals.css";
import { Instrument_Sans } from 'next/font/google';
import Glow from "./components/Glow";
import Head from "next/head";

const instrumentSans = Instrument_Sans({
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: "CDX's Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <meta name="description" content="CDX's portfolio showcasing his work with Minecraft server development, Roblox scripting and Discord bot development." />
        <meta name="author" content="CDX" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content="CDX's Portfolio" />
        <meta property="og:description" content="CDX's portfolio showcasing his work with Minecraft server development, Roblox scripting and Discord bot development." />
        <meta property="og:url" content="https://cdx.lol" />
      </Head>
      <body>
        <main className={instrumentSans.className}>
          <Glow />
          {children}
        </main>
      </body>
    </html>
  );
}
