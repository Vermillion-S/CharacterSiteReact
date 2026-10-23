import '../css/Abilities.css'
import gsap from 'gsap';
import SwCard from "../components/swCard.jsx";

import {useEffect, useState} from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

import {cardList} from '../Data/strength-weak.jsx';


const StrengthWeak = () => {
    const [index, setIndex] = useState(0);
    const [transitionActive, setTransitionActive] = useState(false)

    {/* Slide Controller*/}
    const prevSlide = () => {
        if (transitionActive) return;

        setIndex((index - 1 + cardList.length) % cardList.length);
    }
    const nextSlide = () => {
        if (transitionActive) return;

        setIndex((index + 1) % cardList.length);
    }

    useGSAP(() => {
        const cards = document.querySelectorAll('.Card');
        setTransitionActive(true)

        {/*Slide in on index change*/}
        cards.forEach((card) => {
            const isStrength = card.classList.contains('strength-card');
            gsap.set(card, {
                opacity: 0,
                x: isStrength ? -300 : 300,
            })

            gsap.to(card, {
                opacity: 1,
                x: 0,
                duration: 0.75,
                ease: 'power3.out',
                onComplete: () => setTransitionActive(false),
            })
        })
    }, [index])

    return (
        <div className="crt overflow-x-hidden h-dvh scrollbar-none">

            <div className="flex flex-col w-full h-full">
                <div className="gap-5 h-full w-full flex flex-col sm:justify-around md:justify-evenly items-center">
                    <button className="gradient-button-top fixed top-0 w-full h-10 z-20" onClick={prevSlide}></button>

                    <SwCard Type={"Strength"} Content={cardList[index].Strength}/>
                    <SwCard Type={"Weakness"} Content={cardList[index].Weakness}/>

                    <button className="gradient-button-bottom w-full fixed bottom-0 z-20 h-10 transition-all duration-75 ease-out" onClick={nextSlide}></button>
                </div>
            </div>

        </div>
    )
}

export default StrengthWeak
