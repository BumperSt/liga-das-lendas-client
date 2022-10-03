import { createContext } from "react";

const LanguageContext = createContext({
    language:null,
    setLanguage:(language)=>{}
})

export default LanguageContext