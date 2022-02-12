import react, { useEffect, useRef, useState } from "react";
import { AlignColum, AlignSkinColum, ChampCardDiv, ChampionsCard, ChampName, Container, HorizonScroll, InputSerach } from "../../components/champions/stylePageChampions";
import champions_json from '../../../public/championFull.json'
import DetailsChampions from "../../components/champions/DetailsChampions";
import { BackgroudImage } from "../../components/nickname/styles";
import LoadingPage from '../../components/LoadingPage'
import { Input } from "../../components/searchInput/styleSerachInput";

import { AlignSkinCollum, AlignSkinsRow, CollumAlign, HabilitysTitle, MaxHeigthDiv, SkinsDiv } from "../../components/champions/DetailsChampionsStyle";
import Head from "next/head";
import BottomBar from "../../components/bottomBar";
import Image from "next/image";
import useWindowDimensions from "../../helpers/screenSize";
import { useSpring, animated } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'
import champ from "../../helpers/champ";


export default function ChampionsPage ()  {

    const [championsArray, setChampionsArray] = useState(null)
    const [champActive, setChampActive] = useState('')
    const [offSet, setOffset] = useState(393)
    const [lastIndex, setLastIndex] = useState(0)
    const [backgroudUrl, setBackgroudUrl] = useState('')
    const [champSkin, setChampSkin] = useState(0)
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
        console.log(champ)
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
        setBackgroudUrl(`/imagens/champions/centered/${champ.id}_${champSkin}.webp`)
        setOffset(offSet+calculeOffset)
        setChampSkin(0)
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
        setBackgroudUrl(`/imagens/champions/centered/${champActive}_${champSkin}.webp`)
    }, [champSkin])

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
                                        <Image priority={champActive == champ.id} width="310" height="560" src={`/imagens/champions/loading/${champ.id}_0.webp`}></Image>
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
                    {
                    champActive&&
                        <SkinsDiv>
                           <AlignColum>
                             
                                <HabilitysTitle>SKINS</HabilitysTitle>
                                <AlignSkinCollum>
                                <HabilitysTitle style={{
                                    textAlign: 'end',
                                    paddingInline:'5rem',
                                    paddingBlock:'1rem',
                                }}>Total de {champ.findChampByName(champActive).skins.length} skins</HabilitysTitle>

                                <AlignSkinsRow>
                                

                                            {
                                            
                                                champ.findChampByName(champActive).skins.map((skin) => (
                                                    <AlignSkinColum  title={skin.name} active={skin.num == champSkin}>
                                                        <ChampionsCard  hover={true} onClick={() => {
                                                            setChampSkin(skin.num)
                                                        }}>
                                                            <Image  width="310" height="560" src={`/imagens/champions/loading/${champActive}_${skin.num}.webp`}></Image>
                                                        </ChampionsCard>
                                                        <ChampName style={{
                                                            marginTop:'1rem',
                                                            marginBottom:'0rem',
                                                        }} active={skin.num == champSkin}>{skin.num == 0 ? champActive : skin.name}</ChampName>
                                                    </AlignSkinColum>
                                                ))
                                            }
                                                                            

                                </AlignSkinsRow>
                              </AlignSkinCollum>

                           </AlignColum>
                       </SkinsDiv>
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
   

