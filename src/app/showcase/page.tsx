"use client";

import { Navbar } from "@/components/navbar";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";

const projects = [
    {
        title: "Minecraft Dodgeball",
        description: "A recreation of the classic Dodgeball game has been brought to life in Minecraft using advanced mechanics like display entities and armor stands. Players can dodge and throw 'balls' in a custom arena while utilizing abilities such as dashing and double-jumping, adding strategy and excitement to the fast-paced gameplay.",
        video: "https://www.youtube.com/embed/7ForVYNWmaE?si=FdXLKwNbT057s6q6",
        source: "https://github.com/CDX-1/BonusRound"
    },
    {
        title: "Minecraft City Building",
        description: "A recreation of the classic Dodgeball game has been brought to life in Minecraft using advanced mechanics like display entities and armor stands. Players can dodge and throw 'balls' in a custom arena while utilizing abilities such as dashing and double-jumping, adding strategy and excitement to the fast-paced gameplay.",
        video: "https://www.youtube.com/embed/pmZ80PSPUEQ?si=npJACFXye_tNnbmT",
    }
]

export default function Showcase() {
    return (
        <div className="mx-auto mb-16 max-w-5xl px-5 py-24 sm:px-8">
            <Navbar />
            <PageHeader
                title="Showcase"
                description="Cool things I have made"
            />
            {projects.map((project, i) => {
                return (
                    <div className="flex space-x-6 py-4 m-4" key={i}>
                        {i % 2 != 0 && <><div className="w-1/2 m-2 text-right">
                            <h2 className="font-semibold text-2xl pb-4">{project.title}</h2>
                            <p className="pb-2">{project.description}</p>
                            {project.source && <a href={project.source} target="_blank"><Badge variant="outline">Open Source</Badge></a>}
                        </div><iframe
                            width="560"
                            height="315"
                            src={project.video}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        ></iframe>
                        </>}
                        {i % 2 != 1 && <><iframe
                            width="560"
                            height="315"
                            src={project.video}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        ></iframe>
                            <div className="w-1/2 m-2">
                                <h2 className="font-semibold text-2xl pb-4">{project.title}</h2>
                                <p className="pb-2">{project.description}</p>
                                {project.source && <a href={project.source} target="_blank"><Badge variant="outline">Open Source</Badge></a>}
                            </div></>}
                    </div>
                )
            })}
        </div>
    );
}
