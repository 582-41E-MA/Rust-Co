import React, { useState, useEffect } from 'react';

function LangBtn(){

    const [lang, setLang] = useState(localStorage.getItem('siteLang') || 'fr');

    useEffect(() => {
        document.documentElement.lang = lang;

        localStorage.setItem('siteLang', lang);

    }, [lang]);

    const toggleLang = () => {
        setLang(prevLang => (prevLang === 'fr' ? 'en' : 'fr'))
    }


//icon
let langIcon = lang === 'fr' ? 'uk' : 'france';

    return(
        <div onClick={toggleLang}>
            <img className="w-6" src={`/icons/${langIcon}.png`} />
        </div>
    )

}

export default LangBtn;
