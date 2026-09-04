import PageBlock from "../Block/PageBlock";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { textHoverObject } from "../Data/TextHoverObject"
import { p9boons } from "../Data/P9BoonObj";
import { useRef } from "react";
import Background from "../Comp/Background";

import { playerTags } from "../Data/PlayerTag";

gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger);

function getWordOfDay(wordA, wordB) {
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
    return dayOfYear % 2 === 0 ? wordA : wordB;
}

const word = getWordOfDay("Typhon", "Chronos");


export default function Template() {
    const container = useRef(null);
    const containerRef = useRef(null);
    const lastSpawn = useRef(0);

    useGSAP(
        () => {
            gsap.to(".my-text", {
                backgroundPosition: "300% 0%",
                duration: 4,
                repeat: -1,
                ease: "none",
            });

            const eggs = gsap.utils.toArray(".egg"); // whatever your actual class is
            eggs.forEach((egg) => {
                gsap.to(egg, {
                    rotation: gsap.utils.random(-10, 10),
                    x: gsap.utils.random(-2, 2),
                    duration: gsap.utils.random(0.5, 1.5),
                    ease: "sine.inOut",
                    yoyo: true,
                    repeat: -1,
                    repeatDelay: gsap.utils.random(0.2, 0.6),
                    transformOrigin: "50% 100%",
                    delay: gsap.utils.random(0, 1.5),
                });

                gsap.to(egg, {
                    x: gsap.utils.random(-10, 10),
                    duration: 0.5,
                    yoyo: true,
                    repeat: -1,
                    delay: 1,
                });

                gsap.to(egg, {
                    scaleY: 0.8,
                    scaleX: 1.1,
                    y: 5,
                    duration: gsap.utils.random(0.05, 0.1),
                    ease: "power2.in",
                    yoyo: true,
                    repeat: -1,
                    repeatDelay: gsap.utils.random(1.0, 2.5), // longer pause between bounces
                    transformOrigin: "50% 100%",
                    delay: gsap.utils.random(0.5, 1),
                    onRepeat() {
                        // on the way back up, overshoot slightly
                        gsap.to(egg, {
                            scaleY: 1.1,
                            scaleX: 0.92,
                            y: -6,
                            duration: 0.15,
                            ease: "power2.out",
                            yoyo: true,
                            repeat: 1,
                        });
                    },
                });
            });
        },
        { scope: container, dependencies: [] },
    );

    const handleMouseMove = (e) => {
        const now = Date.now();
        if (now - lastSpawn.current < 50) return; // ← ms between spawns, higher = slower
        lastSpawn.current = now;

        if (!containerRef.current) return;

        // const icons = [...textHoverObject];
        const icons = [...Object.keys(p9boons)];
        const randomIcon = icons[Math.floor(Math.random() * icons.length)];
        const img = document.createElement("img");
        // img.src = `./hover/${randomIcon}.png`;
        img.src = `./P9/${randomIcon}.png`;
        img.classList.add("absolute", "w-8", "h-8", "pointer-events-none");

        const rect = containerRef.current.getBoundingClientRect();
        img.style.left = `${e.clientX - rect.left}px`;
        img.style.top = `${e.clientY - rect.top}px`;

        containerRef.current.appendChild(img);
        const tl = gsap.timeline({ onComplete: () => img.remove() });

        // Use gsap directly (not useGSAP) inside event handlers
        tl.fromTo(
            img,
            {
                opacity: 1,
                scale: gsap.utils.random(0.8, 1.4),
                y: 0,
                x: 0,
                rotation: gsap.utils.random(-30, 30),
            },
            {
                // Stage 1: shoot up
                duration: gsap.utils.random(0.8, 1.4),
                y: gsap.utils.random(-80, -200), // ← negative = upward
                x: gsap.utils.random(-50, 50),
                rotation: gsap.utils.random(-90, 90),
                opacity: 1,
                ease: "power2.out", // decelerates as it rises
            },
        ).to(img, {
            // Stage 2: fall down and fade
            duration: gsap.utils.random(0.8, 1.4),
            y: gsap.utils.random(80, 140), // ← positive = downward (relative to stage 1 end)
            x: gsap.utils.random(-30, 30),
            rotation: gsap.utils.random(-180, 180),
            opacity: 0,
            ease: "power4.in", // accelerates as it falls (gravity feel)
        });
    };


    return (
        <main
            className="h-full min-h-lvh relative text-[12px] md:text-[14px] font-[Ale] select-none overflow-x-hidden"
            ref={container}
        >
            <Background />
            <div className="parentBox">

                <div className="min-h-screen flex justify-center items-center relative" ref={containerRef}>
                    <div className="relative overflow-visible inline-block">
                        <div
                            onMouseMove={handleMouseMove}
                            className="hover-target font-bold text-[50px] sm:text-[58px] md:text-[64px] uppercase cursor-default select-none font-[Sr] gap-4 gap-x-4 my-text flex flex-col md:flex-row justify-center items-center bg-[linear-gradient(90deg,#ff0080,#7928ca,#2afadf,#ff0080)] bg-[length:300%_100%] bg-clip-text text-transparent"
                        >
                            <div>Death</div>
                            <div>To</div>
                            <div>{word}</div>
                        </div>
                    </div>
                </div>

            </div>
        </main>
    );
}
