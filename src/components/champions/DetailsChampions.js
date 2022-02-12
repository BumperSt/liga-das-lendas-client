import react, { useEffect, useState } from "react";
import {ChampCardDiv, ChampionsCard, MaxHeigthDiv, Container , ChampName, ChampTitle, ChampHistory, SpellImg, SpellDiv, VideoHability, HabillityDiv, CollumAlign, HabilitysTitle, HabillityVideoDiv, HabilityKey, HabilityDescreption, HabilityName, VideoUndefined, VideoBlitz, UndefinedTilte, HabilityDescreptionDiv, SkinsDiv, AlignSkinsRow} from "./DetailsChampionsStyle";
import champions_json from '../../../public/champion.json'
import axios from "axios";
import Bars from "react-loading-icons/dist/components/bars";
import theme from '../../../styles/theme.json'
import Image from "next/image";
import { AlignColum } from "./stylePageChampions";

export default function DetailsChampions({champActive}) {
    
    const [champInfo, setChampInfo] = useState(null)
    const [spellSelected, setSpellSelected] = useState(null)
    const [videoLoad, setVideoLoad] = useState(true)
    const [errorLoad, setErrorLoad] = useState(true)
    const [videoResponse, setResponse] = useState(null)

    const SkillArray = ['Q', 'W', 'E', 'R']

    useEffect(() => {
        GetChampInfo()
    }, [champActive])

    
    const GetChampInfo = () => {
        axios.get(`/jsons/${champActive}.json`).then((response) => {
            let champInfo = response.data.data[champActive]
            let champKey = champInfo.key

            if(champKey.length == 1) {
                champKey = `000${champKey}`
            }else if(champKey.length == 2) {
                champKey = `00${champKey}`
            }else if(champKey.length == 3) {
                champKey = `0${champKey}`
            }

            champInfo = {...champInfo, idFormated:champKey}
            setChampInfo(champInfo)
            setSpellSelected({...champInfo.passive, passive:true})
        })
    }     
    
    
    useEffect(() => {
        if(spellSelected){
            setVideoLoad(true)
            setErrorLoad(false)

            if(spellSelected.passive){
                axios.get(`https://d28xe8vt774jo5.cloudfront.net/champion-abilities/${champInfo.idFormated}/ability_${champInfo.idFormated}_P1.mp4`).then((response) => {

                }).catch((error) => {
                    setErrorLoad(true)
                })
    
            }else{
                axios.get(`https://d28xe8vt774jo5.cloudfront.net/champion-abilities/${champInfo.idFormated}/ability_${champInfo.idFormated}_${SkillArray[champInfo.spells.indexOf(spellSelected)]}1.mp4`).then((response) => {

                }).catch((error) => {
                    setErrorLoad(true)
                })
    
            }
        }
      
    }, [spellSelected])




    return(
        <Container>

            {
                champInfo ?
                <>
                        <ChampTitle>{champions_json.data[champActive].title}</ChampTitle>
                        <ChampHistory>{champInfo.lore}</ChampHistory>
                        <HabillityDiv>
                            <CollumAlign>
                                <HabilitysTitle>HABILIDADES</HabilitysTitle>

                                <SpellDiv>
                                    <SpellImg active={spellSelected?.passive} onClick={() => setSpellSelected({...champInfo.passive, passive:true})} src={`/passive/${champInfo.passive.image.full.replace('png', 'webp')}`}/>

                                    {
                                    champInfo.spells.map((spell) => (
                                        <SpellImg key={spell.id} active={spellSelected == spell} onClick={() => setSpellSelected(spell)} src={`/spell/${spell.id}.webp`}/>
                                    ))
                                    
                                    }
                                </SpellDiv>
                                {
                                    spellSelected &&
                                    <HabilityDescreptionDiv>
                                        {
                                            spellSelected.passive?
                                            <HabilityKey>Passive</HabilityKey>
                                            :
                                            <HabilityKey>{SkillArray[champInfo.spells.indexOf(spellSelected)]}</HabilityKey>
                                        }
                                        <HabilityName>{spellSelected.name}</HabilityName>
                                        <HabilityDescreption>{spellSelected.description.replaceAll(/<[^>]*>/g, "")}</HabilityDescreption>
                                    </HabilityDescreptionDiv>


                                }

                            </CollumAlign>
                    
                        {
                            <HabillityVideoDiv>
                                {   
                                    videoLoad&&
                                        errorLoad?
                                        <>
                                            <VideoUndefined  src={'/rifts.webp'}/>
                                            <VideoBlitz src={'blitz.webp'}/>
                                            <UndefinedTilte>VÍDEO NÃO DISPONIVEL.</UndefinedTilte>
                                        </>
                                        :
                                        <Bars style={{
                                            position: "absolute",
                                            top:"50%",
                                            transform: "translateY(-50%) translateX(-50%)",
                                            left:"50%",
                                        }} stroke='black' fill={theme.colors.dourado}/> 
                                }
                                {
                                    spellSelected&&
                                    spellSelected?.passive?
                                    <VideoHability  loop autoPlay muted  src={`https://d28xe8vt774jo5.cloudfront.net/champion-abilities/${champInfo.idFormated}/ability_${champInfo.idFormated}_P1.mp4`}  onLoadedData={() => setVideoLoad(false)}/>
                                    :
                                    <VideoHability loop autoPlay muted  src={`https://d28xe8vt774jo5.cloudfront.net/champion-abilities/${champInfo.idFormated}/ability_${champInfo.idFormated}_${SkillArray[champInfo.spells.indexOf(spellSelected)]}1.mp4`} onLoadedData={() => setVideoLoad(false)}/>                                  
                                }
                          

                            </HabillityVideoDiv>
                        }
                        
                        </HabillityDiv>
                       

                </>
                :
                <Bars stroke='black' fill={theme.colors.dourado}/>

                
            }

        </Container>
    )
}