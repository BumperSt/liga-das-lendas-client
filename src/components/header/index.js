import { ButtonHeader, Container } from "./headerStyle";
import react, { useEffect, useState } from "react"
import { useRouter } from "next/router";

export default function Header({myUrl}){  
    const router = useRouter()

    const buttons = [
        {'name': 'Home', 'Url': '/', 'id' : 1},
        {'name' : 'Campeões', 'Url': '/-champions', 'id' : 2}
    ]

    useEffect(() => {
        let myUrl = window.location.pathname
        console.log(myUrl)
    }, [])

    return(
        <Container>
            {
                buttons.map((button) => (
                    <ButtonHeader onClick={() => router.push(button.Url)} key={button.key} active={myUrl == button.Url}>{button.name}</ButtonHeader>
                ))
            }   

        </Container>
    )
}