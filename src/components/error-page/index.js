import react from "react";
import Bars from "react-loading-icons/dist/components/bars";
import { Container,GoHome,Text } from "./errorPageStyle";
import theme from '../../../styles/theme.json'
import { useRouter } from "next/router";

const ErrorPage = () => {
    const router = useRouter()

    return(
        <Container>
            <Text>Não Encontrado.</Text>
            <GoHome onClick={() => {router.push('/')}}>Voltar Para Pagina Inicial</GoHome>
        </Container>
    )
}

module.exports = ErrorPage