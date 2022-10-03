import { ButtonDiv, ButtonHeader, Container, InputSerchDiv, OptionLanguage, SelectLanguage } from "./headerStyle";
import react, { useEffect, useStatem, useContext } from "react"
import { useRouter } from "next/router";
import SearchInput from '../../components/searchInput'
import LanguageContext from '../../context/languageContext'

export default function Header({myUrl}){  
    const router = useRouter()

    const buttons = [
        {'name': 'Home', 'Url': '/', 'id' : 1},
        {'name' : 'Campeões', 'Url': '/champions', 'id' : 2},
        {'name' : 'Items', 'Url' : '/items', 'id' : 3},
    ]
    const { language, setLanguage } = useContext(LanguageContext)

    useEffect(() => {
        console.log(language)
        if(language == null){
            setLanguage(window.localStorage.getItem('selectLanguage'))
            console.log(window.localStorage.getItem('selectLanguage'))

        }
    }, [language])
    const languageJson = [
        "en_US",
        "cs_CZ",
        "de_DE",
        "el_GR",
        "en_AU",
        "en_GB",
        "en_PH",
        "en_SG",
        "es_AR",
        "es_ES",
        "es_MX",
        "fr_FR",
        "hu_HU",
        "id_ID",
        "it_IT",
        "ja_JP",
        "ko_KR",
        "pl_PL",
        "pt_BR",
        "ro_RO",
        "ru_RU",
        "th_TH",
        "tr_TR",
        "vn_VN",
        "zh_CN",
        "zh_MY",
        "zh_TW"
      ]

    const changeLangugage = (e) => {
        console.log(e.target.value)
        window.localStorage.setItem('selectLanguage', e.target.value)
    }

    const ClickSummoner = () => {
        let lastSearchValue = window.localStorage.getItem('lastSearch')
        if(!lastSearchValue){
            lastSearchValue = 'ToxicMachine'
        }
        router.push(`summoner/${lastSearchValue}`)
    }

    return(
        <div style={{
            backgroundColor: 'black'
        }}>
            <Container>
                <ButtonDiv>
                {
                    buttons.map((button) => (
                        <ButtonHeader  key={button.id}  onClick={() => router.push(button.Url)} active={myUrl == button.Url}>{button.name}</ButtonHeader>
                    ))
                }   
                <ButtonHeader active={myUrl.includes('/summoner')} onClick={() => ClickSummoner()}>Summoner</ButtonHeader>
                {/* <SelectLanguage onChange={(e) => changeLangugage(e)}>
                    {languageJson.map((languageHere, index) => (
                        <OptionLanguage key={index} selected={languageHere == language}>{languageHere}</OptionLanguage>
                    ))}
                </SelectLanguage> */}
                </ButtonDiv>
                
                {
                    myUrl != '/' &&
                
                    <InputSerchDiv>
                        <SearchInput inputStyle={{
                            height:'2rem',
                        }}/>

                    </InputSerchDiv>

                }
            </Container>
        </div>
    )
}