import react, { useEffect, useRef, useState } from "react";
import { ChampCardDiv, ChampionsCard, ChampName, Container, HorizonScroll, InputSerach } from "../../components/champions/stylePageChampions";
import champions_json from '../../../public/champion.json'
import DetailsChampions from "../../components/champions/DetailsChampions";
import { BackgroudImage } from "../../components/nickname/styles";
import LoadingPage from '../../components/LoadingPage'
import { Input } from "../../components/searchInput/styleSerachInput";

import { MaxHeigthDiv } from "../../components/champions/DetailsChampionsStyle";
import Head from "next/head";
import BottomBar from "../../components/bottomBar";
import Image from "next/image";
import useWindowDimensions from "../../helpers/screenSize";
import { useSpring, animated } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'


export default function ChampionsPage ()  {

    const [championsArray, setChampionsArray] = useState(null)
    const [champActive, setChampActive] = useState('')
    const [offSet, setOffset] = useState(393)
    const [lastIndex, setLastIndex] = useState(0)
    const [backgroudUrl, setBackgroudUrl] = useState('')
    const [serachChampion, setSearchChampion] = useState('')
    const alphabet = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'];
    const { height, width } = useWindowDimensions();
    const [firstLoad, setFirstLoad] = useState(true)

    const cardDiv = useRef(null);
    const horizonScrollRef = useRef(null);

    const objectToArray = (objects) => {
        let array = Object.keys(objects).map((key) => objects[key])
        return array
    }  

    useEffect(() => {
        if(firstLoad){
            if(width <= 600){
                setOffset(offSet*4)
            }
            setFirstLoad(false)
        }
      
    }, [width])


    const setActive = (champ) => {

        setChampActive(champ.id)
        let actualIndex =  championsArray.indexOf(champ)
        let value = 0
        if(width <= 600){
            value = 20
        }else{
            value = 5
        }
        let calculeOffset  = (actualIndex-lastIndex)*-value
        setLastIndex(actualIndex)
        setBackgroudUrl(`/splash/${champ.id}.webp`)
        setOffset(offSet+calculeOffset)
        
    }
    useEffect(() => {
        if(championsArray){
            setActive(championsArray[0])
        }
    }, [championsArray])

    const mouseMouve = (evt) => {
        // let mousePosX = evt.pageX
        // if(mousePosX <= 50){
        //     setInterval(() => {

        //     }, 500)
        //     console.log("Voltar")
        // }else if(mousePosX >= (width-50)){
        //     setInterval(() => {

        //     }, 500)
        //     console.log("Avançar")
        // }
        // console.log(width)
        // console.log(evt.pageX)
    }

    useEffect(() => {
        if(serachChampion != '' && championsArray){
            Object.keys(championsArray).map(champIndex => {
                for (let index = 1; index <= serachChampion.length; index++) {
                    if(serachChampion.length == index ){
                        if(championsArray[champIndex].id.substring(0,index).toUpperCase() == serachChampion.substring(0,index).toUpperCase()){
                            setActive(championsArray[champIndex])
                        }
                    }
                }
             });
        }
    }, [serachChampion])
    
    useEffect(() => {
        setChampionsArray(objectToArray(champions_json.data))
    }, [])

    const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }))

    const bind = useDrag(({ down, movement: [mx, my] }) => {
        console.log(mx)
        api.start({ x: down ? mx : 0, y: down ? my : 0, immediate: down })
    })
    
    if(championsArray){
        return(
            <Container>
                
                <Head>
                    <title>{champActive} Detalhes</title>
                    <meta name="description" content={"League Of Legends, Habilidades Campeões, Skills Campeões"} />
                </Head>
                <InputSerach>
                    <Input value={serachChampion} onChange={(evt) => setSearchChampion(evt.target.value)} placeholder="Busque um campeão"></Input>

                </InputSerach>
                <MaxHeigthDiv>



                    
                
                <HorizonScroll  {...bind()} style={{
                    transform: `transaletX(${x})`
                }} onMouseMove={(e) => mouseMouve(e)} transaletX={offSet}>
                    
                    {
                        championsArray?.map((champ) => (
                            <ChampCardDiv key={champ.key} ref={cardDiv} active={champActive == champ.id}>
                                <ChampionsCard  onClick={() => 
                                {
                                    setActive(champ) 
                                    setSearchChampion('')}
                                }>
                                    <Image priority={champActive == champ.id} width="310" height="560" src={`/loading/${champ.id}.webp`}></Image>
                                </ChampionsCard>
                                <ChampName active={champActive == champ.id}>{champ.id}</ChampName>
                            </ChampCardDiv>
                        ))
                    }
    
                </HorizonScroll>
                {
                    champActive&&
                    <DetailsChampions champActive={champActive}/>
                }
                                </MaxHeigthDiv>

                <BackgroudImage style={{ backgroundImage: `url(${backgroudUrl})` }}/>
            </Container>
        )
    }else{
        return(
            <LoadingPage/>
        )
    }
    }
   

