import type { Metadata } from "next";
import ProjectGrid from "@/components/project-grid";

export const metadata: Metadata = {
    title: "Projects — awsaf.dev",
    description: "Everything Awsaf Syed has built and shipped.",
};

export default function ProjectsPage() {
    return (
        <main className="min-h-screen pt-14 sm:pt-24 md:pt-32 lg:pt-40 pb-16 md:pb-24 lg:pb-32 px-4 sm:px-6 lg:px-8 relative">
            <div className="mx-auto max-w-6xl">
                <header className="mb-16 md:mb-24">
                    <h1 className="text-3xl md:text-5xl font-semibold tracking-tighter font-heading">
                        Projects
                    </h1>
                    <p className="text-base md:text-lg text-foreground/55 max-w-2xl mt-4 leading-relaxed">
                        Apps, hardware, and hackathon builds I've shipped.
                    </p>
                </header>
                <ProjectGrid />
            </div>
        </main>
    );
}
