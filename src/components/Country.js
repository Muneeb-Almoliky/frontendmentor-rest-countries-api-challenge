import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

function Country({darkMode}) {
    const [country, setCountry] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const {countryName} = useParams();

    const fetchCountry = async () => {
        try {
            const res = await fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
            const data = await res.json();
            setCountry(data);
            setIsLoading(false);
            console.log(data)
        }
        catch(error) {
            console.log(error)
        }
    }

    useEffect(() => {
        
        fetchCountry();
    }, [countryName])

    return(
        <>
            {isLoading? <h1>Loading...</h1>
                :<main className={`country-page-container ${darkMode && 'dark'}`}>
                    <Link to='/'>
                        <div className={`go-back-btn ${darkMode && 'dark'}`}>
                            <p>Back</p>
                        </div>
                    </Link>
                    <section>
                    {
                        country.map((item) => {
                            return( 
                                <article className="country-page" key={item.name.official}>
                                    <img className="country-page-flag" src={item.flags.png} alt="Country-flag"/>
                                    <div className="country-page-info">
                                        <h2 className="country-name">{item.name.official}</h2>
                                        <div className="info-list">
                                            <ul>
                                                <li>Native name: <span>{item.name.official}</span></li>
                                                <li>Population: <span>{item.population}</span></li>
                                                <li>Region: <span>{item.region}</span></li>
                                                <li>subregion: <span>{item.subregion}</span></li>
                                                <li>capital: <span>{item.capital  }</span></li>
                                            </ul>
                                            <ul>
                                            <h1>Top Level Domin: <span>{item.tld}</span></h1>
                                            {/* <h1>currencies: <span>{item.currencies.XCD.name}</span> </h1> */}
                                            <h1>languages: <span>{item.languages.eng},</span></h1>
                                            </ul>
                                        </div>
                                        <div className="border-countries">
                                            <p>Border Countries:</p>
                                        </div>
                                    </div>
                                
                            </article>                                     
                            )
                        })
                    }
                </section>
            </main>
}
        </>
    )
}

export default Country;