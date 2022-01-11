import react, { useEffect, useRef, useState } from "react";
import { ChampCardDiv, ChampionsCard, ChampName, Container, HorizonScroll, InputSerach } from "../../components/champions/stylePageChampions";
import champions_json from '../../../public/champion.json'
import DetailsChampions from "../../components/champions/DetailsChampions";
import { BackgroudImage } from "../../components/nickname/styles";
import LoadingPage from '../../components/LoadingPage'
import { Input } from "../../components/searchInput/styleSerachInput";
import { MaxHeigthDiv } from "../../components/champions/DetailsChampionsStyle";

export default function ChampionsPage ()  {

    const [championsArray, setChampionsArray] = useState(null)
    const [champActive, setChampActive] = useState('')
    const [offSet, setOffset] = useState(390)
    const [lastIndex, setLastIndex] = useState(0)
    const [backgroudUrl, setBackgroudUrl] = useState('')
    const [serachChampion, setSearchChampion] = useState('')
    const alphabet = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'];

    const cardDiv = useRef(null);

    const objectToArray = (objects) => {
        let array = Object.keys(objects).map((key) => objects[key])
        return array
    }

    const setActive = (champ) => {

        setChampActive(champ.id)
        let actualIndex =  championsArray.indexOf(champ)

        let calculeOffset  = (actualIndex-lastIndex)*-5

        setLastIndex(actualIndex)
        setBackgroudUrl(`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champ.id}_0.jpg`)
        setOffset(offSet+calculeOffset)
        
    }
    useEffect(() => {
        if(championsArray){
            console.log(championsArray[0])
            setActive(championsArray[0])
        }
    }, [championsArray])


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
    
    if(championsArray){
        return(
            <Container>
                <InputSerach>
                    <Input value={serachChampion} onChange={(evt) => setSearchChampion(evt.target.value)} placeholder="Busque um campeão"></Input>

                </InputSerach>
                <MaxHeigthDiv>


                <HorizonScroll transaletX={offSet}>
                    {
                        championsArray?.map((champ) => (
                            <ChampCardDiv ref={cardDiv} active={champActive == champ.id}>
                                <ChampionsCard  onClick={() => 
                                {
                                    setActive(champ) 
                                    setSearchChampion('')}
                                } src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champ.id}_0.jpg`}/>
                                <ChampName >{champ.id}</ChampName>
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
   

