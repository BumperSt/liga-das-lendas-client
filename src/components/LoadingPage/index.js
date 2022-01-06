import react from "react";
import Bars from "react-loading-icons/dist/components/bars";
import { Container } from "./loadingPageStyle";
import theme from '../../../styles/theme.json'

const LoadingPage = () => {
    return(
        <Container>
           <Bars stroke='black' fill={theme.colors.dourado}/>

        </Container>
    )
}

module.exports = LoadingPage