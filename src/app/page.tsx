import ProjectClickable from "@/components/project-clickable";

export default function Home() {
    return (
        <div className="py-32 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl space-y-2">
                <h1 className="text-5xl font-medium tracking-tight font-bespoke">
                    Hey, I'm Awsaf
                </h1>
                <h2 className="text-4xl font-medium tracking-tight text-foreground/50 font-satoshi">
                    I'm a developer and designer
                </h2>

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