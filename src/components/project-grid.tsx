import { IconArrowRight } from "@tabler/icons-react";
import Link from "next/link";
import { getAllProjects } from "@/lib/mdx";
import BlueprintFill from "./blueprint-fill";
import ProjectClickable from "./project-clickable";

const allProjects = getAllProjects();

export default function ProjectGrid({
    starredOnly = false,
}: {
    starredOnly?: boolean;
}) {
    const projects = starredOnly
        ? allProjects.filter((p) => p.meta.starred)
        : allProjects;

    return (
        <section>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 md:gap-16">
                {projects.map((project, i) => (
                    <ProjectClickable
                        key={project.slug}
                        index={String(i + 1).padStart(2, "0")}
                        name={project.meta.name}
                        description={project.meta.description}
                        main={project.meta.main}
                        images={project.meta.images || []}
                        type={project.meta.type}
                        slug={project.slug}
                        tags={project.meta.tags}
                        awards={project.meta.awards}
                    />
                ))}
            </div>

            {starredOnly && allProjects.length > projects.length && (
                <div className="mt-12 sm:mt-16 flex justify-center">
                    <Link
                        href="/projects"
                        className="group relative inline-flex items-center gap-2 overflow-hidden rounded-md border border-foreground/10 bg-background py-2 pl-3.5 pr-3 text-sm font-medium tracking-tight text-foreground/70 transition-colors duration-300 hover:border-primary hover:text-white focus-visible:border-primary focus-visible:text-white focus-visible:outline-none"
                    >
                        <BlueprintFill />
                        <span className="relative">
                            View all {allProjects.length} projects
                        </span>
                        <IconArrowRight
                            className="relative size-4 stroke-[2] text-foreground/50 transition-[color,transform] duration-300 group-hover:translate-x-0.5 group-hover:text-white group-focus-visible:text-white"
                            aria-hidden
                        />
                    </Link>
                </div>
            )}
        </section>
    );
}
