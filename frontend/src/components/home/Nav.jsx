import React from 'react'
import useSmoothScroll from '../../hook/useSmoothScroll'
import { FiBell, FiUser } from "react-icons/fi" 
const Nav = () => {
    const navLink = ['Hero', 'Aboutme', 'Work', 'Contact']

    const scrollTo = useSmoothScroll()
    return (
        <nav>
            <ul>
                {navLink.map((nav, i) => (
                    <li key={i}>
                        <a
                            onClick={(e) => {
                                e.preventDefault()
                                scrollTo(nav)
                            }}
                            href={`#${nav}`}>
                            {nav}
                        </a>
                    </li>
                ))}
            </ul>
            <div className="icons">
                <FiBell className="icon bell" />
                <FiUser className="icon user" />
            </div>
        </nav>
    )
}

export default Nav