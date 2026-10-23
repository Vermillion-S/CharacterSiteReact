import React from 'react'
import gsap from 'gsap';
import {useState, useRef, useLayoutEffect} from "react";
import '../css/SW.css'
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {useGSAP} from "@gsap/react";


gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

const SwCard = ({Type, Content}) => {
    const el = useRef(null);
    const containerRef = useRef(null);

    useLayoutEffect(() => {
        if (el.current && containerRef.current) {
            const contentHeight = containerRef.current.offsetHeight;
            el.current.style.minHeight = `${contentHeight + 10}px`;
        }
    }, [Content]);

    useGSAP(() => {
        const element = el.current;
        if (Type === "Strength") {
            element.classList.add('strength-card')
        } else if (Type === "Weakness") {
            element.classList.add('weakness-card')
        }
    }, [])

    return (
        <div ref={el} className="Card mx-3 w-full border-2 border-amber-50 h-full">
            <div className={`Card-shaper-${Type === "Strength" ? "right":"left"} w-1/2`}></div>
            <div ref={containerRef} className="Card-container p-4">
                <div className="Card-header mb-2">
                    <h3>{Content.name}</h3>
                </div>
                <div className="Card-body">
                    <p className="pr-1">
                        {Content.description}
                    </p>
                </div>
            </div>
        </div>
    )
}
export default SwCard
