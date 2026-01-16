import { AboutMe } from "@/components/about-me";
import { Hero } from "@/components/hero";
import { Highlight } from "@/components/highlight";

export default function Home() {
    return (
        <main>
            <Hero />
            <AboutMe className="dark" />
            <Highlight className="dark" />
        </main>
    );
}
