import React from "react";
import { useState } from "react";
import '../index.css';
import {FaMoon} from "react-icons/fa"
import icon from "../icons/moon-icon.svg"

function Header({darkMode, handleDarkTheme}) {
    
    return(
        <>
            <header>
                <div className={`header-container ${darkMode==true && "dark"}`} >
                    <h1>Where in the world?</h1>
                    <div className="toggle" onClick={() => handleDarkTheme(!darkMode)}>
                            {darkMode? <FaMoon className="theme" style={{fill: "white"}}/>:<img src={icon} />}
                            <p>Dark Mode</p>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header;