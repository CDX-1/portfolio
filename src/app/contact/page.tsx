"use client";

import { FadeText } from "@/components/ui/fade-text";
import { Separator } from "@/components/ui/separator";
import RetroGrid from "@/components/ui/retro-grid";
import { Navbar } from "@/components/navbar";

export default function Contact() {
    return (
        <div className="mx-auto mb-16 max-w-5xl px-5 py-24 sm:px-8">
            <Navbar/>

            <div className="mb-16 mt-6 sm:mb-8 sm:mt-12 w-full relative text-center">
                <div className="absolute inset-0 flex justify-center items-center -z-10">
                    <RetroGrid />
                </div>
                <FadeText
                    className="text-5xl font-bold"
                    text="Contact"
                    direction="down"
                    framerProps={{
                        show: { transition: { delay: 0.2 } },
                    }}
                />
                <div className="pt-2">
                    <FadeText
                        className="text-l text-silent"
                        text="Get in touch!"
                        direction="left"
                        framerProps={{
                            show: { transition: { delay: 0.2 } },
                        }}
                    />
                </div>
            </div>

            <Separator orientation="horizontal" />

            
        </div>
    );
}
