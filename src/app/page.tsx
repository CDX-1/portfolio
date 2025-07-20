'use client';

import CameraViewfinder from "@/components/camera-viewfinder";
import Hero from "@/components/hero";
import { RetroGrid } from "@/components/magicui/retro-grid";
// import { Particles } from "@/components/magicui/particles";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Home() {
	const { resolvedTheme } = useTheme();
	const [color, setColor] = useState("#ffffff");

	useEffect(() => {
		setColor(resolvedTheme === "dark" ? "#ffffff" : "#000000");
	}, [resolvedTheme]);

	return (
		<div className="relative w-full h-full min-h-screen overflow-x-hidden">
			<RetroGrid />
			<CameraViewfinder />
			<Hero />
			{/* <Particles
				className="absolute inset-0 z-0"
				quantity={50}
				ease={80}
				color={color}
				refresh
			/> */}
		</div>
	);
}