import Hero from "@/components/hero";
import LeaveNoteButton from "@/components/leave-note-button";
import NotesSection from "@/components/notes/notes-section";
import ProjectGrid from "@/components/project-grid";
import Stats from "@/components/stats";
import { getAllProjects } from "@/lib/mdx";

export const dynamic = "force-dynamic";

const projectThumbs = getAllProjects().map((p) => p.meta.main);

export default function Home() {
    return (
        <div className="pt-14 pb-16 sm:py-32 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl space-y-2">
                <div>
                    <Hero />
                </div>
                <div className="mt-4 flex">
                    <LeaveNoteButton />
                </div>
                <Stats thumbs={projectThumbs} />
                <div>
                    <ProjectGrid starredOnly />
                </div>
                <div>
                    <NotesSection />
                </div>
            </div>
        </div>
    );
}
