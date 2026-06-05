import ProjectClickable from "./project-clickable";
import { getAllProjects } from "@/lib/mdx";

const projects = getAllProjects();

export default function ProjectGrid() {
    return (
        <div className="grid grid-cols-3 gap-16">
            {projects.map((project) => (
                <ProjectClickable
                    key={project.slug}
                    name={project.meta.name}
                    description={project.meta.description}
                    images={project.meta.images || []}
                    color={project.meta.color}
                    slug={project.slug}
                />
            ))}
        </div>
    );
}