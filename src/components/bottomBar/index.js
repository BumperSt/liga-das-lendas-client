import Image from "next/image";
import { Container, IconDiv } from "./bottomBarStyled";

export default function BottomBar(){
    return(
        <Container>
            <a href="https://twitter.com/_ligadaslendas"  target="_blank">

            <IconDiv>
                <Image width="32" height="32" src={'/twitter.png'}></Image>
            </IconDiv>
            </a>
        </Container>
    )
}