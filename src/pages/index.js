import React, { useState, useEffect } from 'react'
import champApi from '../api/champs'
import PageLoading from '../components/LoadingPage'
import {
    Container, Title, Top, Midle, Bottom, BottomText, DivRotation, ChampFace, DivChampFace, BackgroudImage
} from '../components/home/styles'

import champHelper from '../helpers/champ'
import SearchInput from '../components/searchInput'


export default function HomePage() {

    const [champRotation, setChampRotation] = useState([])
    const [backgroudUrl, setBackgroudUrl] = useState(null)
    
    useEffect(() => {
        champApi.getChampsRotation()
            .then(({ data }) => {
                let champs = champHelper.filterRotationChamps(data.freeChampionIds)
                setChampRotation(champs)
                console.log(champs)
                setBackgroudUrl(`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champs[0].id}_0.jpg`)
            })
            .catch((error) => {
                console.error(error)
            })
    }, [])




    const changeBackgroud = (champ) =>{
        setBackgroudUrl(`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champ}_0.jpg`)
    }
    if(backgroudUrl){
        return (
                <Container>
                    <Top>
                        <Title>Liga das Lendas</Title>
                    </Top>
                    <Midle>
                      <SearchInput/>
                    </Midle>
                    <Bottom>
                        <BottomText>Rotação De Campeões</BottomText>
                        <DivRotation>
                            {
                                champRotation.map((champ) => (
                                    <DivChampFace title={champ.name} key={champ.id} onClick={() => changeBackgroud(champ.id)} >
                                        <ChampFace src={`http://ddragon.leagueoflegends.com/cdn/12.1.1/img/champion/${champ.id}.png`} />
                                    </DivChampFace>
                                ))
                            }
                        </DivRotation>
                    </Bottom>
                    <BackgroudImage style={{ backgroundImage: `url(${backgroudUrl})` }}></BackgroudImage>
                </Container>
        )
    }else{
        return(
            <PageLoading/>
        )
    }
   
}