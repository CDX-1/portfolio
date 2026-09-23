import Hero from "@/components/hero";
import NotesSection from "@/components/notes/notes-section";
import PolaroidTrail from "@/components/polaroid-trail";
import ProjectGrid from "@/components/project-grid";
import Stats from "@/components/stats";
import { getAllProjects } from "@/lib/mdx";

export const dynamic = "force-dynamic";

export default function Home() {
    const projects = getAllProjects();
    const trailImages = Array.from(
        new Set(
            projects.flatMap((p) => [p.meta.main, ...(p.meta.images ?? [])]),
        ),
    ).filter(Boolean);

    return (
        <div className="py-32 px-4 sm:px-6 lg:px-8">
            <PolaroidTrail images={trailImages} />
            <div className="mx-auto max-w-6xl space-y-2">
                <div data-trail-exclude>
                    <Hero />
                </div>
                <Stats />
                <div data-trail-exclude>
                    <ProjectGrid />
                </div>
                <div data-trail-exclude>
                    <NotesSection />
                </div>
            </div>
        </div>
    );
}
