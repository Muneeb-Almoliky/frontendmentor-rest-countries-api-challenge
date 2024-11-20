
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import React from "react";
import { useState } from "react";
import Countries from "./components/Countries";
import Header from "./components/Header";
import Country from "./components/Country";
import Toggle from "./components/Toggle";
import Error  from "./components/Error";

function App() {
    const [darkMode, setDarkMode] = useState(false);

    function handleDarkTheme(isDark) {
        setDarkMode(isDark);
    }

    return (
        <Router>
            <Header darkMode={darkMode} handleDarkTheme={handleDarkTheme}/>
            <Routes>
                <Route path="/" element={<Countries darkMode={darkMode}/>}/>                    
                <Route path="/:countryName" element={<Country darkMode={darkMode}/>} />
                <Route path="/Toggle" element={<Toggle />} />
                <Route path="*" element={<Error />} />
            </Routes>
        </Router>
    )
}

export default App;