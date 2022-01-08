import react, { useEffect, useState } from "react";
import { ChampCardDiv, ChampionsCard, ChampName, Container, HorizonScroll } from "../../components/champions/stylePageChampions";
import champions_json from '../../../public/champion.json'
import DetailsChampions from "../../components/champions/DetailsChampions";
import { BackgroudImage } from "../../components/nickname/styles";
import LoadingPage from '../../components/LoadingPage'

export default function ChampionsPage ()  {

    const [championsArray, setChampionsArray] = useState(null)
    const [champActive, setChampActive] = useState('')
    const [offSet, setOffset] = useState(780)
    const [lastIndex, setLastIndex] = useState(0)
    const [backgroudUrl, setBackgroudUrl] = useState('')

    const objectToArray = (objects) => {
        let array = Object.keys(objects).map((key) => objects[key])
        return array
    }


    const setActive = (champ) => {
        if(champ.id == champActive){
            setChampActive('')
        }else{
            setChampActive(champ.id)
            let actualIndex =  championsArray.indexOf(champ)
            let calculeOffset 
            if(actualIndex > lastIndex){
                calculeOffset = (actualIndex-lastIndex)*-10
            }else{
                calculeOffset =  (lastIndex-actualIndex)*10
            }
            setLastIndex(actualIndex)
            setBackgroudUrl(`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champ.id}_0.jpg`)

            setOffset(offSet+calculeOffset)
        }
    }
    useEffect(() => {
        if(championsArray){
            console.log(championsArray[0])
            setActive(championsArray[0])
        }
    }, [championsArray])
    
    useEffect(() => {
        setChampionsArray(objectToArray(champions_json.data))
    }, [])
    if(championsArray){
        return(
            <Container>
                <HorizonScroll transaletX={offSet}>
                    {
                        championsArray?.map((champ) => (
                            <ChampCardDiv active={champActive == champ.id}>
                                <ChampionsCard  onClick={() => setActive(champ)} src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champ.id}_0.jpg`}/>
                                <ChampName >{champ.id}</ChampName>
                            </ChampCardDiv>
                        ))
                    }
    
                </HorizonScroll>
                {
                        champActive&&
                        <DetailsChampions champActive={champActive}/>
                    }
                <BackgroudImage style={{ backgroundImage: `url(${backgroudUrl})` }}/>
            </Container>
        )
    }else{
        return(
            <LoadingPage/>
        )
    }
    }
   

