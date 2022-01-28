import { ButtonDiv, ButtonHeader, Container, InputSerchDiv } from "./headerStyle";
import react, { useEffect, useState } from "react"
import { useRouter } from "next/router";
import SearchInput from '../../components/searchInput'

export default function Header({myUrl}){  
    const router = useRouter()
    const buttons = [
        {'name': 'Home', 'Url': '/', 'id' : 1},
        {'name' : 'Campeões', 'Url': '/champions', 'id' : 2},
        {'name' : 'Items', 'Url' : '/items', 'id' : 3},
    ]

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
                </ButtonDiv>
            
                {
                    myUrl != '/' &&
                
                    <InputSerchDiv>
                        <SearchInput inputStyle={{
                            height:'2rem',
                            padding: '0rem',
                        }}/>

                    </InputSerchDiv>

                }
            </Container>
        </div>
    )
}