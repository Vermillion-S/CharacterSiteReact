import React, {useRef, useState} from 'react'
import {Link} from "react-router-dom";
import {useGSAP} from "@gsap/react";
import gsap from "gsap";
import '../css/Navbar.css'

const Navbar = () => {
    const navContainerRef = useRef(null);
    const menuRef = useRef(null);
    const [menuActive, setMenuActive] = useState(false);

    const toggleMenu = () => {
        setMenuActive(!menuActive);
    };

    useGSAP(() => {
        if (menuActive) {
            gsap.to(menuRef.current, {
                duration: 0.5,
                width: 'auto',
                opacity: 1,
                display: 'block',
                ease: 'power2.out'
            });
        } else {
            gsap.to(menuRef.current, {
                duration: 0.5,
                width: 0,
                opacity: 0,
                display: 'none',
                ease: 'power2.in'
            });
        }
    }, [menuActive]);

    return (
        <div ref={navContainerRef} className="fixed top-2 right-4 z-50 transition-all duration-700 ">
            <header className={`w-fit bg-black/50 hover:bg-black/75 backdrop-blur-md ${menuActive ? 'rounded-lg bg-black/75' : 'rounded-full '} border-2 border-white/10 hover:border-white/20`}>
                <nav className="flex items-center justify-between p-4 sm:px-6 lg:px-4">
                    {/* Desktop Menu */}
                    <div ref={menuRef} className="overflow-hidden" style={{ width: 0, opacity: 0}}>
                        <ul className="flex items-center justify-between gap-6 pr-6">
                            <li><Link to="/" className="nav-link" onClick={toggleMenu}>Home</Link></li>
                            <li><Link to="/abilities" className="nav-link" onClick={toggleMenu}>Abilities</Link></li>
                            <li><Link to="/equipment" className="nav-link" onClick={toggleMenu}>Equipment</Link></li>
                            <li><Link to="/strength-weakness" className="nav-link" onClick={toggleMenu}>S/W</Link></li>
                        </ul>
                    </div>
                    {/* Hamburger Button */}
                    <button
                        className="flex flex-col justify-center items-center w-8 h-8 gap-1.5 z-50 cursor-pointer"
                        onClick={toggleMenu}
                        aria-label="Toggle Menu"
                    >
                        <span className={`w-6 h-0.5 bg-white transition-transform duration-300 ${menuActive ? 'rotate-45 translate-y-2' : ''}`}></span>
                        <span className={`w-6 h-0.5 bg-white transition-opacity duration-300 ${menuActive ? 'opacity-0' : ''}`}></span>
                        <span className={`w-6 h-0.5 bg-white transition-transform duration-300 ${menuActive ? '-rotate-45 -translate-y-2' : ''}`}></span>
                    </button>


                </nav>
            </header>
        </div>
    )
}
export default Navbar
