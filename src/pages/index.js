import React, { useState, useEffect } from 'react'
import champApi from '../api/champs'
import PageLoading from '../components/LoadingPage'
import {
    Container, Title, Top, Midle, Bottom, BottomText, DivRotation, DescreptionDiv, DivChampFace, BackgroudImage, AlignColum, ChampLore, ChampName, ChampTitle
} from '../components/home/styles'
import champHelper from '../helpers/champ'
import SearchInput from '../components/searchInput'
import Image from 'next/image'
import BottomBar from '../components/bottomBar'
import Head from 'next/head'
export default function HomePage({champs}) {

    const [backgroudUrl, setBackgroudUrl] = useState(null)
    const [activeChamp, setActiveChamp] = useState(null)
    const [activeChampObject, setActiveChampObject] = useState(null)
    const [champSkin, setChampSkin] = useState(0)
    const [champRotation, setChampRotation] = useState([])

    useEffect(() => {
        setActiveChamp(champs[0].id)

        axios.get(`https://ddragon.leagueoflegends.com/cdn/12.18.1/data/${language}/champion.json`).then((response) => {
            setChampRotation(response.data)

            })
    }, [])

    useEffect(() => {
        if(activeChamp != ''){
            setBackgroudUrl(`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${activeChamp}_${champSkin}.jpg`)
            setActiveChampObject(champHelper.findChampByName(activeChamp))
        }
    }, [activeChamp])


    useEffect(() => {
        console.log(activeChampObject)
    }, [activeChampObject])

    
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
                        
                            <DivChampFace active={activeChamp === champ.id} key={champ.key}  title={champ.name} onClick={() => setActiveChamp(champ.id)} >
                                <Image alt={champ.name} width="80" height="80" src={`https://ddragon.leagueoflegends.com/cdn/12.18.1/img/champion/${champ.id}.png`} />
                            </DivChampFace>
                            
                        ))
                    }
                </DivRotation>
                {activeChampObject &&
                    <>
                        <ChampName>{activeChamp}</ChampName>
                        <ChampTitle >{activeChampObject.title}</ChampTitle>

                        <DescreptionDiv>
                        
                            <ChampLore> {activeChampObject.lore}</ChampLore>
                        
                        </DescreptionDiv>
                    </>
                  }
            </Bottom>
            <BackgroudImage style={{ backgroundImage: `url(${backgroudUrl})` }}></BackgroudImage>

        </Container>
        :
        <PageLoading/>

      
    )

}

export async function getStaticProps(context) {

    let {data} = await champApi.getChampsRotation()
    
    let champs = champHelper.filterRotationChamps(data.freeChampionIds, champRotation)
    
    return {
        revalidate:3600*24,
        props: {champs}, // will be passed to the page component as props
    }
  }