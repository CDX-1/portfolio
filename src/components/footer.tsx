import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <div className="py-12 mx-auto max-w-6xl space-y-8 px-4">
            <div className="flex justify-between items-start">
                <div className="flex-col space-y-2">
                    <h2 className="font-medium font-bespoke text-4xl">Connect with me.</h2>
                    <p className="text-foreground/70">
                        Thinking about working together?<br />
                        Or just want to say hi?
                    </p>
                </div>

                <div className="grid grid-cols-3 gap-4 w-full max-w-md justify-items-center">
                    <SocialButton path="/logos/instagram.svg" alt="Instagram" href="https://www.instagram.com/awsf__/" />
                    <SocialButton path="/logos/github.svg" alt="Github" href="https://github.com/CDX-1" />
                    <SocialButton path="/logos/linkedin.svg" alt="LinkedIn" href="https://www.linkedin.com/in/awsaf-syed/" />
                    <SocialButton path="/logos/cosmos.svg" alt="Cosmos" href="https://www.cosmos.so/aw.sf" />
                    <SocialButton path="/logos/youtube.svg" alt="Youtube" href="https://www.youtube.com/@rarecdx" />
                    <SocialButton path="/logos/email.svg" alt="Email" href="mailto:contact@awsaf.dev" />
                </div>
            </div>

            <div className="border-t border-border/80 w-full" />

            {/* Bottom Row */}
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
                className="group flex aspect-square w-full max-w-28 items-center justify-center rounded-xl bg-accent/40 p-3 cursor-pointer transition duration-300 hover:bg-accent"
                target="_blank"
                href={href}
            >
                <Image
                    src={path}
                    alt={alt}
                    width={40}
                    height={40}
                    className="opacity-50 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0"
                />
            </Link>
    )
}