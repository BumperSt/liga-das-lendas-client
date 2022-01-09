import react, { useEffect, useState } from "react";
import { MaxHeigthDiv, Container , ChampName, ChampTitle, ChampHistory, SpellImg, SpellDiv, VideoHability, HabillityDiv, CollumAlign, HabilitysTitle, HabillityVideoDiv, HabilityKey, HabilityDescreption, HabilityName} from "./DetailsChampionsStyle";
import champions_json from '../../../public/champion.json'
import axios from "axios";


export default function DetailsChampions({champActive}) {
    
    const [champInfo, setChampInfo] = useState(null)
    const [spellSelected, setSpellSelected] = useState(null)
    const SkillArray = ['Q', 'W', 'E', 'R']

    useEffect(() => {
        console.log(champActive)
        GetChampInfo()
    }, [champActive])

    useEffect(() => {
        console.log(spellSelected)
    }, [spellSelected])
    
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
                champInfo &&
                <>
                    <MaxHeigthDiv>
                        <ChampName>{champActive}</ChampName>

                        <ChampTitle>{champions_json.data[champActive].title}</ChampTitle>
                        <ChampHistory>{champInfo.lore}</ChampHistory>
                        <ChampHistory>{champions_json.data[champActive].blurb}</ChampHistory>
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
                                    spellSelected?.passive?
                                    <VideoHability  loop autoPlay muted  src={`https://d28xe8vt774jo5.cloudfront.net/champion-abilities/${champInfo.idFormated}/ability_${champInfo.idFormated}_P1.webm`}></VideoHability>
                                    :
                                    <VideoHability loop autoPlay muted  src={`https://d28xe8vt774jo5.cloudfront.net/champion-abilities/${champInfo.idFormated}/ability_${champInfo.idFormated}_${SkillArray[champInfo.spells.indexOf(spellSelected)]}1.webm`}></VideoHability>
                                    
                                }
                            </HabillityVideoDiv>
                        }
                        
                        </HabillityDiv>
                    </MaxHeigthDiv>
                    
                </>
                
            }

        </Container>
    )
}