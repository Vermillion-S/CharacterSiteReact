import gsap from 'gsap';
import TerminalType from '../components/TerminalType.jsx'
import TerminalHeader from '../components/TerminalHeader'
import ModalNode from "../components/ModalNode.jsx";

import '../css/Abilities.css'

import {useGSAP} from "@gsap/react";
import {useEffect, useState} from "react";
import {Draggable} from "gsap/Draggable";

gsap.registerPlugin(useGSAP, Draggable);

import { abilitiesList } from '../Data/abilities.jsx';


const Abilities = () => {
    const [buttonPositions, setButtonPositions] = useState([]);
    const [nodeContainerReady, setNodeContainerReady] = useState(false);

    useGSAP(() => {

        function osscillate(el) {
            gsap.to(el, {
                y: '+=15',
                x: '+=10',
                duration: 2,
                ease: 'sine.inOut',
                yoyo: true,
                repeat: -1,
            })
        }

        const nodes = document.querySelectorAll('.openerContainer');

        Draggable.create(nodes, {
            bounds: '.Ability-Section',
            inertia: true,
            edgeResistance: 0.75,
            onDragStart: function () {
                this.target.pause();
            },
            onDragEnd: function () {
                osscillate(this.target)
            },
            onClick: function () {
                osscillate(this.target)
            },
        })

        nodes.forEach((element) => {
            gsap.set(element, {
                x: `+=${Math.random() * 100 - 20}`,
                y: `+=${Math.random() * 100 - 20}`,
            })
        })

        gsap.from('.nodeConnector', {
            opacity: 0,
            duration: 0.5,
            ease: 'power2.out',
        })

        gsap.from('.Ability-Section', {
            delay: 0.5,
            height: 0,
            duration: 0.5,

        }).then(
            gsap.from(nodes, {
                delay: 0.5,
                opacity: 0,
                duration: 0.5,
                stagger: 0.2,
                onComplete: () => {
                    setNodeContainerReady(true);
                }
            })
        )

        gsap.from('.ability-container', {
            opacity: 0,
            y: 100,
            duration: 0.5,
            ease: 'power2.out',
            stagger: 0.2,
        })


        nodes.forEach((element, index) => {
            gsap.to(element, {
                y: '+=15',
                x: '+=10',
                duration: 2 + (index * 0.3),
                ease: 'sine.inOut',
                yoyo: true,
                repeat: -1,
            })
        })
    }, []);

    useEffect(() => {
        const updateButtonPositions = () => {
            const canvas = document.getElementById('ability-board');
            const buttons = document.querySelectorAll('.openerButton');

            if (!canvas || buttons.length === 0) return;

            const canvasRect = canvas.getBoundingClientRect();
            const positions = Array.from(buttons).map(button => {
                const rect = button.getBoundingClientRect();
                return {
                    x: rect.left + rect.width / 2 - canvasRect.left,
                    y: rect.top + rect.height / 2 - canvasRect.top
                };
            });
            setButtonPositions(positions);
        };

        setTimeout(updateButtonPositions, 100);
        window.addEventListener('resize', updateButtonPositions);

        const observer = new MutationObserver(updateButtonPositions);
        const abilitySection = document.querySelector('.Ability-Section');
        if (abilitySection) {
            observer.observe(abilitySection, {childList: true, subtree: true, attributes: true});
        }

        return () => {
            window.removeEventListener('resize', updateButtonPositions);
            observer.disconnect();
        };
    }, []);

    return (
        <div className="crt flex justify-center items-start bg-mist-900 overflow-x-hidden h-dvh">
            <div className=" p-5 items-left md:w-2/3 md:m-0 max-w-screen md:p-3">
                <TerminalHeader title={"Abilities"}/>
                {nodeContainerReady && <svg id="ability-board" className="absolute md:w-2/3 pointer-events-none" style={{top: 0, left: 0, width: '100%', height: '100%'}}>
                    {buttonPositions.map((pos, i) =>
                        buttonPositions.slice(i + 1).map((nextPos, j) => (
                            <line key={`${i}-${i + j + 1}`} className="nodeConnector" x1={pos.x} y1={pos.y} x2={nextPos.x} y2={nextPos.y} stroke="cyan" strokeWidth="2" opacity="0.3"/>
                        ))
                    )}
                </svg>}

                <div className="Ability-Section flex w-full justify-center  mt-5 bg-opaca rounded-2xl">
                    <div className="grid grid-rows-4 grid-cols-2  gap-50 items-start h-[60vh]">
                        {abilitiesList.map((item) => (
                            <ModalNode title={item.name}>
                                <TerminalType key={item.name} item={item}/>
                            </ModalNode>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Abilities
