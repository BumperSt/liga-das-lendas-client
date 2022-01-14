import Image from "next/image";
import { Container, IconDiv } from "./bottomBarStyled";

export default function BottomBar(){
    return(
        <Container>
            <a 
                rel='noreferrer'
                href="https://twitter.com/_ligadaslendas"  
                target="_blank"
            >

            <IconDiv>
                <Image title="Ícone do twitter" alt='Abrir twitter' width="32" height="32" src={'/twitter.webp'}></Image>
            </IconDiv>
            </a>
        </Container>
    )
}