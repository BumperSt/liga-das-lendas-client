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
                setBackgroudUrl(`/splash/${champs[0].id}.jpg`)
            })
            .catch((error) => {
                console.error(error)
            })
    }, [])




    const changeBackgroud = (champ) =>{
        setBackgroudUrl(`/splash/${champ}.jpg`)
    }
    return (
        
        backgroudUrl ?
            <Container>
            <title>Liga Das Lendas</title>

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
                                <ChampFace src={`/face/${champ.id}.jpg`} />
                            </DivChampFace>
                        ))
                    }
                </DivRotation>
            </Bottom>
            <BackgroudImage style={{ backgroundImage: `url(${backgroudUrl})` }}></BackgroudImage>
        </Container>
        :
        <PageLoading/>

      
    )

}