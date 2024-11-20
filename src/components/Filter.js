import React, { useEffect, useState } from "react";
import arrowDown from '../icons/arrow-down.svg';
import arrowDownWhite from '../icons/arrow-down-white.svg';

const Filter = ({darkMode, searchCountry, handleFilterByCountry, handleFilterByRegion}) => {

    
    const [selectOpen, setSelectOpen] = useState(false);
    const [option, setOption] = useState('Filter by region');


    const options = ['Africa', 'America', 'Asia', 'Europe', 'Oceania']

    return(
        <>
            <div className="search-and-filter">
                
                <input 
                className={darkMode && 'dark'} 
                type="search" 
                name="search" 
                id="search" 
                placeholder="Search for a country..."
                value={searchCountry}
                onChange={(e) => handleFilterByCountry(e.target.value)}
                />
                <div className={`drop-down ${darkMode && 'dark'}`} >
                    <div className="select" onClick={() => setSelectOpen(!selectOpen)}>
                        <span>{option}</span>
                        <img src={darkMode? arrowDownWhite:arrowDown} className={`arrow-down ${selectOpen && "rotate"}`}/>
                    </div>
                    <ul className={`menu ${selectOpen && 'menu-open'}`}>
                        
                        {options.map((item) => {
                            return(<li onClick={() => {setOption(item); handleFilterByRegion(item)}}>{item}</li>)
                        })}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Filter;