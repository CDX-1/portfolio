import Hero from "@/components/hero";
import ProjectClickable from "@/components/project-clickable";

export default function Home() {
    return (
        <div className="py-32 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl space-y-2">
                <Hero />

                <div className="grid grid-cols-3 gap-16 mt-16">
                    <ProjectClickable
                        name="Ralph"
                        description="An autonomous robot guide dog for the visually impaired"
                        images={[
                            "/projects/ralph/wiring.png",
                            "/projects/ralph/demo.png",
                            "/projects/ralph/assembled.png"
                        ]}
                        color="red"
                        slug="#"
                    />
                    <ProjectClickable name="Project" description="Some project" images={[]} color="purple" slug="#" />
                    <ProjectClickable name="Project" description="Some project" images={[]} color="blue" slug="#" />
                    <ProjectClickable name="Project" description="Some project" images={[]} color="green" slug="#" />
                    <ProjectClickable name="Project" description="Some project" images={[]} color="yellow" slug="#" />
                </div>
            </div>
        </div>
    );
}