import React, { useState, useEffect } from 'react'
import champApi from '../api/champs'
import PageLoading from '../components/LoadingPage'
import {
    Container, Title, Top, Midle, Bottom, BottomText, DivRotation, ChampFace, DivChampFace, BackgroudImage, AlignColum
} from '../components/home/styles'
import champHelper from '../helpers/champ'
import SearchInput from '../components/searchInput'
import Image from 'next/image'
import BottomBar from '../components/bottomBar'
import Head from 'next/head'

export default function HomePage({champs}) {

    const [backgroudUrl, setBackgroudUrl] = useState(null)
    
    useEffect(() => {
        setBackgroudUrl(`/splash/${champs[0].id}.webp`)
    }, [])

    const changeBackgroud = (champ) =>{
        setBackgroudUrl(`/splash/${champ}.webp`)
    }
    
    return (
        backgroudUrl ?
        <Container>
            <Head>
                <title>Liga Das Lendas</title>
            </Head>
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
                        champs.map((champ) => (
                        
                            <DivChampFace key={champ.key}  title={champ.name} onClick={() => changeBackgroud(champ.id)} >
                                <Image alt={champ.name} width="80" height="80" src={`/face/${champ.id}.webp`} />
                            </DivChampFace>
                            
                        ))
                    }
                </DivRotation>
            </Bottom>
            <BackgroudImage style={{ backgroundImage: `url(${backgroudUrl})` }}></BackgroudImage>
            <BottomBar/>

        </Container>
        :
        <PageLoading/>

      
    )

}

export async function getStaticProps(context) {

    let {data} = await champApi.getChampsRotation()
    
    let champs = champHelper.filterRotationChamps(data.freeChampionIds)
    
    return {
        revalidate:3600*24,
        props: {champs}, // will be passed to the page component as props
    }
  }