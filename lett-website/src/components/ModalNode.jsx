import gsap from 'gsap';
import {useGSAP} from "@gsap/react"
import '../css/Abilities.css'
import {useState, useEffect, useRef} from "react";
import '../pages/Abilities.jsx'
import {Draggable} from "gsap/Draggable";

gsap.registerPlugin(useGSAP, Draggable);

const ModalNode = ({children, title}) => {
    const [isOpen, setIsOpen] = useState(false);
    const buttonRef = useRef(null);
    const modalRef = useRef(null);

    const handleOpen = () => {
        setIsOpen(!isOpen);
    }

    useGSAP(() => {

        gsap.from('.modal', {
            opacity: 0,
        })
        gsap.fromTo('.modal-body', {
            opacity: 0,
            y: 100,
        }, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power2.out'
        })
    }, [isOpen], modalRef)

    useEffect(() => {

    }, [isOpen]);


    return (
        <div>
            <div ref={buttonRef} className="openerContainer w-fit flex flex-col justify-center items-center gap-2">
                <button className="bg-teal-700 border-amber-50 border-2 openerButton rounded-2xl w-5 h-5 hover:w-7 hover:h-7 transition-all duration-75" onClick={handleOpen}></button>
                <p className="text-xs w-2/3 text-center">{title.toUpperCase()}</p>
            </div>

            {isOpen &&
                <dialog ref={modalRef} className="modal z-10 fixed top-0 left-0 w-full h-full flex justify-center items-center">
                    <div className="modal-body absolute bg-mist-900 shadow-cyan-400  w-2/3">
                        <form method="dialog" className="modal-backdrop absolute w-full flex justify-end items-end z-10 ">
                            <button onClick={handleOpen} className="mr-6 text-gray-600 hover:text-white transition-colors duration-300">x</button>
                        </form>
                        {children}
                    </div>

                </dialog>}
        </div>
    )
}
export default ModalNode
