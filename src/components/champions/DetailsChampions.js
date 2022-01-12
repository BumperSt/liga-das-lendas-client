import react, { useEffect, useState } from "react";
import { MaxHeigthDiv, Container , ChampName, ChampTitle, ChampHistory, SpellImg, SpellDiv, VideoHability, HabillityDiv, CollumAlign, HabilitysTitle, HabillityVideoDiv, HabilityKey, HabilityDescreption, HabilityName, VideoUndefined, VideoBlitz, UndefinedTilte} from "./DetailsChampionsStyle";
import champions_json from '../../../public/champion.json'
import axios from "axios";
import Bars from "react-loading-icons/dist/components/bars";
import theme from '../../../styles/theme.json'
import useEventListener from '@use-it/event-listener'

export default function DetailsChampions({champActive}) {
    
    const [champInfo, setChampInfo] = useState(null)
    const [spellSelected, setSpellSelected] = useState(null)
    const SkillArray = ['Q', 'W', 'E', 'R']

    useEffect(() => {
        GetChampInfo()
    }, [champActive])

    
    const GetChampInfo = () => {
        axios.get(`https://ddragon.leagueoflegends.com/cdn/12.1.1/data/pt_BR/champion/${champActive}.json`).then((response) => {
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
                                    <SpellImg active={spellSelected?.passive} onClick={() => setSpellSelected({...champInfo.passive, passive:true})} src={`https://ddragon.leagueoflegends.com/cdn/12.1.1/img/passive/${champInfo.passive.image.full}`}/>

                                    {
                                    champInfo.spells.map((spell) => (
                                        <SpellImg active={spellSelected == spell} onClick={() => setSpellSelected(spell)} src={`https://ddragon.leagueoflegends.com/cdn/12.1.1/img/spell/${spell.id}.png`}/>
                                    ))
                                    
                                    }
                                </SpellDiv>
                                {
                                    spellSelected &&
                                    <>
                                        {
                                            spellSelected.passive?
                                            <HabilityKey>Passive</HabilityKey>
                                            :
                                            <HabilityKey>{SkillArray[champInfo.spells.indexOf(spellSelected)]}</HabilityKey>
                                        }
                                        <HabilityName>{spellSelected.name}</HabilityName>
                                        <HabilityDescreption>{spellSelected.description}</HabilityDescreption>
                                    </>


                                }

                            </CollumAlign>
                    
                        {
                            <HabillityVideoDiv>
                                {   
                                    spellSelected? 
                                    spellSelected?.passive?
                                    <VideoHability  loop autoPlay muted  src={`https://d28xe8vt774jo5.cloudfront.net/champion-abilities/${champInfo.idFormated}/ability_${champInfo.idFormated}_P1.webm` || 'blitz.png'}></VideoHability>
                                    :
                                    <VideoHability loop autoPlay muted  src={`https://d28xe8vt774jo5.cloudfront.net/champion-abilities/${champInfo.idFormated}/ability_${champInfo.idFormated}_${SkillArray[champInfo.spells.indexOf(spellSelected)]}1.webm`}></VideoHability>
                                    :
                                    <Bars stroke='black' fill={theme.colors.dourado}/> 
                                }
                                {
                                    spellSelected&&
                                    <>
                                        <VideoUndefined  src={'/rifts.jpg'}/>
                                        <VideoBlitz src={'blitz.png'}/>
                                        <UndefinedTilte>VÍDEO NÃO DISPONIVEL.</UndefinedTilte>
                                    </>
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