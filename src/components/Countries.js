import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import '../index.css';
import Filter from './Filter'

function Countries({darkMode}) {
    const [countries, setCountries] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [searchCountry, setSearchCountry] = useState("");
    const [selectedRegion, setSelectedRegion] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const fetchCountries = async() => {
        try{
                if(selectedRegion){
                    const res = await fetch(`https://restcountries.com/v3.1/region/${selectedRegion}`)
                    const data = await res.json();
                    setCountries(data);
                    setIsLoading(false);
                }
                else {
                    const res = await fetch('https://restcountries.com/v3.1/all');
                    const data = await res.json();
                    setCountries(data);
                    setIsLoading(false);
                }
            
        }
        catch(error) {
            console.error('Error Fetching The Data: ', error)
        }
    }
    useEffect(() => {
        fetchCountries();
    }, [selectedRegion])

    const handleFilterByCountry = (searchInput) => {
        setSearchCountry(searchInput);
                        
        if(searchInput){
            const filteredCountries = countries.filter((item) => 
                item.name.official.toLowerCase().includes(searchInput.toLowerCase())
                )
                
            setFiltered(filteredCountries);
        }
        else {
            setFiltered(countries);
        }
        }

    const handleFilterByRegion = (regionSelected) => {
        setSelectedRegion(regionSelected);
        }

    return(
             <>
                <main className={`container ${darkMode==true && "dark"}`}>
                    <Filter darkMode={darkMode} searchCountry={searchCountry} handleFilterByCountry={handleFilterByCountry} handleFilterByRegion={handleFilterByRegion}/>
                    {isLoading? <h1>loading...</h1>:
                    <section className="countries-container">
                        {console.log(countries)}                
                        {(searchCountry)? 
                        filtered.map((item) => 
                        {   
                            
                                    return(
                                        
                                        <Link to={`/${item.name.official}`} key={item.name.official} >
                                            <article className={`country-container ${darkMode==true && "dark"}`} key={item.name.official}>
                                            <img className="country-flag" src={item.flags.png} alt="Country-flag"/>
                                            <div className="country-info">
                                            <h2 className="country-name">{item.name.official}</h2>
                                            <ul role="list">
                                                <li>Population: {item.population}</li>
                                                <li>Region: {item.region}</li>
                                                <li>capital: {item.capital}</li> 
                                            </ul>
                                            </div>
                                        
                                        </article>
                                        </Link>
                                    
                            )
                            
                        }
                    ): 
                    countries.map((item) => 
                            {   
                                return(
                                      <Link to={`/${item.name.official}`} key={item.name.official} >
                                                <article className={`country-container ${darkMode==true && "dark"}`} key={item.name.common}>
                                                <img className="country-flag" src={item.flags.png} alt="Country-flag"/>
                                                <div className="country-info">
                                                <h2>{item.name.common}</h2>
                                                <ul role="list">
                                                    <li>Population: {item.population}</li>
                                                    <li>Region: {item.region}</li>
                                                    <li>capital: {item.capital}</li> 
                                                    
                                                </ul>
                                                </div>
                                            
                                            </article>
                                            </Link>
                                        
                                )
                                
                            }
                        )}  
                    </section>}
                </main>
            </>
    )
}

export default Countries;