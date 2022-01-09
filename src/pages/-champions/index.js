import react, { useEffect, useState } from "react";
import { ChampCardDiv, ChampionsCard, ChampName, Container, HorizonScroll, InputSerach } from "../../components/champions/stylePageChampions";
import champions_json from '../../../public/champion.json'
import DetailsChampions from "../../components/champions/DetailsChampions";
import { BackgroudImage } from "../../components/nickname/styles";
import LoadingPage from '../../components/LoadingPage'
import { Input } from "../../components/searchInput/styleSerachInput";

export default function ChampionsPage ()  {

    const [championsArray, setChampionsArray] = useState(null)
    const [champActive, setChampActive] = useState('')
    const [offSet, setOffset] = useState(780)
    const [lastIndex, setLastIndex] = useState(0)
    const [backgroudUrl, setBackgroudUrl] = useState('')
    const [serachChampion, setSearchChampion] = useState('')
    const alphabet = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'];


    const objectToArray = (objects) => {
        let array = Object.keys(objects).map((key) => objects[key])
        return array
    }

    const setActive = (champ) => {
        console.log(champ)
        if(champ.id == champActive){
            setChampActive('')
        }else{
            setChampActive(champ.id)
            let actualIndex =  championsArray.indexOf(champ)
            console.log(actualIndex)

            let calculeOffset  = (actualIndex-lastIndex)*-10

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
        if(serachChampion != '' && championsArray){
            console.log(`My search ${serachChampion}`)
            console.log(championsArray)
            let actualIndex = championsArray.indexOf(serachChampion)

            Object.keys(championsArray).map(index => {
                if(serachChampion.length == 1){
                    if(championsArray[index].id[0].toUpperCase() == serachChampion[0].toUpperCase()){
                        setActive(championsArray[index])
                    }
                }


             });
            console.log(`My Result ${actualIndex}`)

        }
    }, [serachChampion])
    
    useEffect(() => {
        setChampionsArray(objectToArray(champions_json.data))
    }, [])
    
    if(championsArray){
        return(
            <Container>
                <InputSerach>
                    <Input value={serachChampion} onChange={(evt) => setSearchChampion(evt.target.value)} placeholder="Busque um campeão"></Input>

                </InputSerach>

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
   

