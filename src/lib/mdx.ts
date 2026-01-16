import fs from "fs";
import path from "path";
import matter from "gray-matter";

const projectsDirectory = path.join(process.cwd(), "public/projects");

export type Author = {
    name: string;
    github?: string;
    linkedin?: string;
};

export type ProjectMeta = {
    title: string;
    date: string;
    author: Author[];
    tags: string[];
    pinned?: boolean;
    description?: string;
    image?: string;
    location?: string;
    github?: string;
    gallery?: { path: string; caption: string; aspectRatio?: string }[];
};

export type Project = {
    slug: string;
    meta: ProjectMeta;
    content: string;
};

export function getProjectFiles() {
    return fs.readdirSync(projectsDirectory);
}

export function getProjectBySlug(slug: string): Project {
    const realSlug = slug.replace(/\.mdx$/, "");
    const fullPath = path.join(projectsDirectory, `${realSlug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return { slug: realSlug, meta: data as ProjectMeta, content };
}

export function getAllProjects(): Project[] {
    const files = getProjectFiles();
    const projects = files
        .filter((file) => file.endsWith(".mdx"))
        .map((file) => getProjectBySlug(file));

    return projects.sort((a, b) =>
        new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime()
    );
}
