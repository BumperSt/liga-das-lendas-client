import react, { useEffect, useRef, useState } from "react";
import { AlignColum, AlignSkinColum, ChampCardDiv, ChampionsCard, ChampName, Container, HorizonScroll, InputSerach, ScrollDrag, ScrollSection } from "../../components/champions/stylePageChampions";
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
import champ from "../../helpers/champ";
import { createRef } from "react/cjs/react.production.min";


export default function ChampionsPage ()  {
    const scrollDragRef = useRef()
    const [championsArray, setChampionsArray] = useState(null)
    const [champActive, setChampActive] = useState('')
    const [backgroudUrl, setBackgroudUrl] = useState('')
    const [champSkin, setChampSkin] = useState(0)
    const [serachChampion, setSearchChampion] = useState('')
    const { height, width } = useWindowDimensions();
    
    const objectToArray = (objects) => {
        let array = Object.keys(objects).map((key) => objects[key])
        return array
    }  

    const setActive = (champ) => {
        setChampActive(champ.id)
        setBackgroudUrl(`/imagens/champions/centered/${champ.id}_${champSkin}.webp`)
        setChampSkin(0)
    }
    
    useEffect(() => {
        if(championsArray){
            setActive(championsArray[0])
        }
    }, [championsArray])

+
    useEffect(() => {
        let value = 0
        if(width <= 600){
            value = 100
        }else if (width <= 1280){
            value = 90
        }else{
            value = 115
        }
        if(serachChampion != '' && championsArray){
            const waitSearch = setTimeout(() => {
                Object.keys(championsArray).map(champIndex => {
                    for (let index = 1; index <= serachChampion.length; index++) {
                        if(serachChampion.length == index ){
                            if(championsArray[champIndex].id.substring(0,index).toUpperCase() == serachChampion.substring(0,index).toUpperCase()){
                                setActive(championsArray[champIndex])
                                scrollDragRef.current.scrollLeft =  champIndex*value
                            }
                        }
                    }
                });
            }, 250)
        }

        return () => clearTimeout(waitSearch)
    }, [serachChampion])
    
    useEffect(() => {
        setBackgroudUrl(`/imagens/champions/centered/${champActive}_${champSkin}.webp`)
    }, [champSkin])

    useEffect(() => {
        setChampionsArray(objectToArray(champions_json.data))
    }, [])

    const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }))

    const scrollRef = createRef();


    const enableKeyboardCursorToScroll = () => {
      if (scrollRef.current) {
        scrollRef.current.focus();
      }
    };

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
                    <ScrollDrag innerRef={scrollDragRef} horizontal={true} vertical={false} >
                        <ScrollSection className="tiles" onFocus={enableKeyboardCursorToScroll} ref={scrollRef}>
                        {
                                championsArray?.map((champ) => (
                                    <ChampCardDiv key={champ.key} active={champActive == champ.id}>
                                        <ChampionsCard  onClick={() => 
                                        {
                                            setActive(champ) 
                                            setSearchChampion('')}
                                        }>
                                            <Image priority={champActive == champ.id} layout="fill" src={`/imagens/champions/loading/${champ.id}_0.webp`}></Image>
                                        </ChampionsCard>
                                        <ChampName active={champActive == champ.id}>{champ.id}</ChampName>
                                    </ChampCardDiv>
                                ))
                            }
                        </ScrollSection>
                    </ScrollDrag>                               
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
                                <HabilitysTitle>Total de {champ.findChampByName(champActive).skins.length} skins</HabilitysTitle>

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
                                                    maxWidth:'50%'
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
   

