import { ButtonHeader, Container } from "./headerStyle";
import react, { useEffect, useState } from "react"
import { useRouter } from "next/router";

export default function Header({myUrl}){  
    const router = useRouter()
    const buttons = [
        {'name': 'Home', 'Url': '/', 'id' : 1},
        {'name' : 'Campeões', 'Url': '/-champions', 'id' : 2}
    ]

    const ClickSummoner = () => {
        let lastSearchValue = window.localStorage.getItem('lastSearch')
        if(!lastSearchValue){
            lastSearchValue = 'ToxicMachine'
        }
        router.push(lastSearchValue)
    }

    return(
        <div style={{
            backgroundColor: 'black'
        }}>
            <Container>
                {
                    buttons.map((button) => (
                        <ButtonHeader onClick={() => router.push(button.Url)} key={button.key} active={myUrl == button.Url}>{button.name}</ButtonHeader>
                    ))
                }   
                <ButtonHeader active={myUrl != '/' && myUrl != '/-champions'} onClick={() => ClickSummoner()}>Summoner</ButtonHeader>

            </Container>
        </div>
    )
}