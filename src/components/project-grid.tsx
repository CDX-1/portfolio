import ProjectClickable from "./project-clickable";
import { getAllProjects } from "@/lib/mdx";

const projects = getAllProjects();

export default function ProjectGrid() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 md:gap-16">
            {projects.map((project) => (
                <ProjectClickable
                    key={project.slug}
                    name={project.meta.name}
                    description={project.meta.description}
                    main={project.meta.main}
                    images={project.meta.images || []}
                    type={project.meta.type}
                    slug={project.slug}
                    tags={project.meta.tags}
                />
            ))}
        </div>
    );
}