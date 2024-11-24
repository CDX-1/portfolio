import type { Metadata } from "next";
import "./globals.css";
import { Instrument_Sans } from 'next/font/google';
import Glow from "./components/Glow";

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
      <body>
        <main className={instrumentSans.className}>
          <Glow/>
          {children}
        </main>
      </body>
    </html>
  );
}
