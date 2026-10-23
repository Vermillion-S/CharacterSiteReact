import gsap from 'gsap'

import {useRef} from 'react'
import {useGSAP} from "@gsap/react";
import {SplitText} from "gsap/SplitText";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(SplitText);

const TerminalHeader = ({title}) => {
    const el = useRef(null);
    const tl = useRef();

    useGSAP(() => {
        const split = SplitText.create(".typewriter", {
            type: "lines, chars",
            mask: "chars",
        });

        tl.current = gsap.timeline()
        .from('.header-body', {
            height: 0,
            duration: 1,
            ease: 'power2.out',
        })
        .from(split.chars, {
            duration: 0.5,
            x: -100,
            stagger: 0.5 / split.chars.length,
        });

    }, {dependencies: [],scope: el});

    return (
        <div ref={el}>
            <div className="header-body flex justify-center items-center header overflow-y-hidden">
                <h2 className="pl-1 typewriter m-3 text-3xl">
                    {'>'} {title}
                </h2>
            </div>
        </div>
    )
}
export default TerminalHeader
