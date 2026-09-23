import { getAllProjects } from "@/lib/mdx";
import BrandStar from "./brand-star";
import ProjectClickable from "./project-clickable";

const projects = getAllProjects();

export default function ProjectGrid() {
    return (
        <section>
            <div className="mb-8 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/40">
                    <span className="tabular-nums text-foreground/55">02</span>
                    <span className="h-px w-6 bg-foreground/15" aria-hidden />
                    Selected Work
                    <BrandStar className="ml-0.5 size-2.5 text-[#ec7042]" />
                </div>
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/40">
                    <span className="tabular-nums text-foreground/55">
                        {String(projects.length).padStart(2, "0")}
                    </span>
                    <span className="text-foreground/25 px-0.5">/</span>
                    <span>Projects</span>
                </div>
            </div>
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
        </section>
    );
}
