import { IconBrandGithubFilled, IconBrandInstagramFilled, IconBrandLinkedinFilled } from "@tabler/icons-react";
import Link from "next/link";

export default function Footer() {
    return (
        <div className="py-12 mx-auto max-w-6xl space-y-4">
            <div className="border-t border-border/80 w-full h-3" />

            <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <Link className="flex items-center space-x-1 hover:text-foreground/70 duration-300" href="https://www.linkedin.com/in/awsaf-syed/" target="_blank">
                        <IconBrandLinkedinFilled className="size-5" />
                        <span>LinkedIn</span>
                    </Link>

                    <Link className="flex items-center space-x-1 hover:text-foreground/70 duration-300" href="https://www.instagram.com/awsf__/" target="_blank">
                        <IconBrandInstagramFilled className="size-5" />
                        <span>Instagram</span>
                    </Link>

                    <Link className="flex items-center space-x-1 hover:text-foreground/70 duration-300" href="https://github.com/CDX-1" target="_blank">
                        <IconBrandGithubFilled className="size-5" />
                        <span>Github</span>
                    </Link>
                </div>

                <p className="text-foreground/70">© {new Date().getFullYear()}. Designed & developed by Awsaf Syed.</p>
            </div>
        </div>
    );
}