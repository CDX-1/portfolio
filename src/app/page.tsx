import Hero from "@/components/hero";
import ProjectGrid from "@/components/project-grid";
import Stats from "@/components/stats";

export default function Home() {
    return (
        <div className="py-32 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl space-y-2">
                <Hero />
                <Stats />
                <ProjectGrid />
            </div>
        </div>
    );
}