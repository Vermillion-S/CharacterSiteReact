import gsap from 'gsap';
import '../css/Abilities.css'
import {useGSAP} from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import {useRef, useState} from "react";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import ModalNode from "./ModalNode.jsx";
gsap.registerPlugin(useGSAP);
gsap.registerPlugin(SplitText);
gsap.registerPlugin(ScrollTrigger);


const TerminalType = ({item}) => {
    const el = useRef();
    useGSAP(() => {

        const block = el.current.querySelector('.ability-container');


            const split = SplitText.create(block, {
                type: "words, chars",
                mask: "chars",
            });

            gsap.set(block.querySelectorAll('mark'), {
                backgroundColor: 'transparent',
                color: 'var(--terminal-primary)'
            })
            gsap.set(split.chars, {
                opacity: 0,
                x: -100,
            })

            // Expand header hight to reveal
            gsap.to(split.chars, {
                delay: 0.3,
                opacity: 1,
                duration: 0.5,
                x: 0,
                stagger: 1 / split.chars.length,
                force3D: true,
                scrollTrigger: {
                    trigger: block,
                    start: "top 95%",
                    end: "bottom 15%"
                },
                onComplete: () => {
                    gsap.to(block.querySelectorAll('mark'), {
                        backgroundColor: 'var(--terminal-secondary)',
                        color: 'var(--terminal-bg)'
                    }).then(() => split.revert())
                },

                ease: "easeIn",
            })


    },{dependencies: [], scope: el});

    return (
        <div ref={el}>
            <div className="ability-container p-3">
                <h3 className="pl-1 typewriter mb-3">{item.name}</h3>
                <p className="ability-description typewriter text-xs">{item.description}</p>
            </div>
        </div>

    )
}
export default TerminalType

