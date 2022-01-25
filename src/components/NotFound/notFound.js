import react from 'react';
import { BackgroudImage } from '../home/styles';
import SearchInput from '../searchInput';
import { Input } from '../searchInput/styleSerachInput';
import { Container, NotFoundMessage } from './notPageSTYLE';


const NotFoundPage = () => {
    
    return(
        <Container>
            <NotFoundMessage>Summoner não encontrado, tente outro.</NotFoundMessage>
            <div style={{
                width: '50%',
                marginTop: '1rem',
            }}>
                <SearchInput/>
            </div>
       
            <BackgroudImage style={{ backgroundImage: `url(/notFoundBackground.webp)` }}/>
        </Container>
    )

}

export default NotFoundPage;