import React, { useState, useEffect } from 'react'
import champApi from '../api/champs'
import PageLoading from '../components/LoadingPage'
import {
    Container, Title, Top, Midle, Bottom, BottomText, DivRotation, ChampFace, DivChampFace, BackgroudImage, AlignColum
} from '../components/home/styles'
import champHelper from '../helpers/champ'
import SearchInput from '../components/searchInput'
import Image from 'next/image'

export default function HomePage() {

    const [champRotation, setChampRotation] = useState([])
    const [backgroudUrl, setBackgroudUrl] = useState(null)
    
    useEffect(() => {
        champApi.getChampsRotation()
            .then(({ data }) => {
                let champs = champHelper.filterRotationChamps(data.freeChampionIds)
                setChampRotation(champs)
                setBackgroudUrl(`/splash/${champs[0].id}.webp`)
            })
            .catch((error) => {
                console.error(error)
            })
    }, [])




    const changeBackgroud = (champ) =>{
        setBackgroudUrl(`/splash/${champ}.webp`)
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
                        
                            <DivChampFace key={champ.key}  title={champ.name} onClick={() => changeBackgroud(champ.id)} >
                                <Image alt={champ.name} width="80" height="80" src={`/face/${champ.id}.webp`} />
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