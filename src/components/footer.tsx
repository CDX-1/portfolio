import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <div className="py-12 md:py-16 mx-auto max-w-6xl space-y-8 px-4 sm:px-6">
            <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 md:gap-4">
                <div className="flex-col space-y-2 text-center md:text-left w-full md:w-auto">
                    <h2 className="font-medium font-bespoke text-3xl md:text-4xl">Connect with me.</h2>
                    <p className="text-foreground/70 text-sm md:text-base">
                        Thinking about working together?<br className="hidden md:block" />
                        <span className="md:hidden"> </span>Or just want to say hi?
                    </p>
                </div>

                <div className="grid grid-cols-3 gap-4 sm:gap-6 w-max mx-auto md:mx-0">
                    <SocialButton path="/logos/instagram.svg" alt="Instagram" href="https://www.instagram.com/awsf__/" />
                    <SocialButton path="/logos/github.svg" alt="Github" href="https://github.com/CDX-1" />
                    <SocialButton path="/logos/linkedin.svg" alt="LinkedIn" href="https://www.linkedin.com/in/awsaf-syed/" />
                    <SocialButton path="/logos/cosmos.svg" alt="Cosmos" href="https://www.cosmos.so/aw.sf" />
                    <SocialButton path="/logos/youtube.svg" alt="Youtube" href="https://www.youtube.com/@rarecdx" />
                    <SocialButton path="/logos/email.svg" alt="Email" href="mailto:contact@awsaf.dev" />
                </div>
            </div>

            <div className="border-t border-border/80 w-full" />

            <div className="flex flex-col w-full md:flex-row justify-end items-center gap-4">
                <p className="text-foreground/70 text-sm text-center md:text-left">
                    © {new Date().getFullYear()}. Designed & developed by Awsaf Syed.
                </p>
            </div>
        </div>
    );
}

function SocialButton({ path, href, alt }: { path: string, alt: string, href: string }) {
    return (
        <Link
            className="group flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-2xl sm:rounded-3xl bg-accent/40 cursor-pointer transition duration-300 hover:bg-accent hover:scale-105 active:scale-95"
            target="_blank"
            href={href}
        >
            <Image
                src={path}
                alt={alt}
                width={40}
                height={40}
                className="opacity-50 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0 sm:w-[48px] sm:h-[48px]"
            />
        </Link>
    )
}