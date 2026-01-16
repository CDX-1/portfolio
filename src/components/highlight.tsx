import { cn } from "@/lib/utils";
import { getAllProjects } from "@/lib/mdx";
import { ProjectSummary } from "./project-summary";
import Link from "next/link";

type HighlightProps = {
    className?: string;
};

export const Highlight = ({ className = "" }: HighlightProps) => {
    const projects = getAllProjects();
    const pinnedProjects = projects.filter((project) => project.meta.pinned);

    return (
        <section className={cn(className, "bg-background text-foreground py-12 sm:py-16 md:rounded-b-2xl md:drop-shadow-xl")}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <div className="flex items-center justify-between gap-4">
                        <h2
                            className="font-bold font-foss leading-tight"
                            style={{ fontSize: "clamp(1.6rem, 3.8vw, 3.75rem)" }}
                        >
                            Highlighted Projects
                        </h2>

                        <Link
                            href="/projects"
                            className="block sm:hidden self-start sm:self-auto font-mono uppercase tracking-tighter hover:bg-secondary/50 text-sm px-3 py-2 rounded-lg transition-colors"
                            aria-label="View all projects"
                        >
                            View all
                        </Link>
                    </div>

                    <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <p className="text-sm text-foreground/60 max-w-2xl">
                            A curated selection of recent work — pinned so you can find them quickly.
                        </p>

                        <Link
                            href="/projects"
                            className="hidden sm:block self-start sm:self-auto font-mono uppercase tracking-tighter hover:bg-secondary/50 text-sm px-3 py-2 rounded-lg transition-colors"
                            aria-label="View all projects"
                        >
                            View all
                        </Link>
                    </div>
                </div>

                {pinnedProjects.length === 0 ? (
                    <div className="py-12 text-center text-foreground/50">
                        No highlighted projects yet.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-stretch">
                        {pinnedProjects.map((project) => (
                            <Link
                                key={project.slug}
                                href={`/projects/${project.slug}`}
                                className="block h-full rounded-xl transition-shadow hover:shadow-lg focus:outline-none focus-visible:ring focus-visible:ring-primary/40"
                                aria-label={`Open project ${project.meta.title}`}
                            >
                                <div className="h-full flex flex-col">
                                    <ProjectSummary
                                        title={project.meta.title}
                                        description={project.meta.description || ""}
                                        tags={project.meta.tags}
                                        author={project.meta.author.map((a) => a.name).join(", ")}
                                        date={project.meta.date}
                                        image={project.meta.image}
                                        location={project.meta.location}
                                        github={project.meta.github}
                                    />
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};
