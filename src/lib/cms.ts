import fs from "fs";
import path from "path";
import matter from "gray-matter";

export function getAllProjects() {
    const projectsDir = path.join(process.cwd(), "content/projects");
    const files = fs.readdirSync(projectsDir);
    const mdxFiles = files.filter((file) => file.endsWith(".mdx"));

    return mdxFiles.map((file) => {
        const filePath = path.join(projectsDir, file);
        const raw = fs.readFileSync(filePath, "utf-8");

        const { data, content } = matter(raw);

        return {
            slug: file.replace(".mdx", ""),
            frontmatter: data,
            content,
        };
    });
}
