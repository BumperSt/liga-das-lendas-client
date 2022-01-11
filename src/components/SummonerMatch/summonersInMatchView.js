import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import summoner from "../../api/summoner"
import {AlignTeam, AlingChampImgAndName, ChampImg, Container, SummonerName} from './summonersInMatchViewStyle'
export const SummonersInMatchView = ({match}) => {

    const [particpants, setParticipants] = useState(null)
    const [myTeam, setMyTeam] = useState(null)
    const [enemyTeam, setEnemyTeam] = useState(null)
    const router = useRouter()

    useEffect(() => {
        if(match){
            setParticipants(match.info.participants)
        }
    },[match])

    useEffect(() => {
        if(particpants){
            let myTeam = []
            let enemyTeam = []
            particpants.forEach(participant => {

                if(participant.win == match.myParticipation.win){
                    myTeam.push(participant)
                }else{
                    enemyTeam.push(participant)
                }

            });
            setMyTeam(myTeam)
            setEnemyTeam(enemyTeam)
        }
   
    },[particpants])


    

    return(
        <Container>
            <AlignTeam>
            {
                myTeam?.map((participant) => (
                    <AlingChampImgAndName onClick={() => router.push(participant.summonerName)}>
                        <ChampImg title={participant.championName} src={`http://ddragon.leagueoflegends.com/cdn/12.1.1/img/champion/${participant.championName}.png`}/>
                        <SummonerName>{participant.summonerName}</SummonerName>

                    </AlingChampImgAndName>
                ))
            }
            </AlignTeam>
            <AlignTeam>
            {
                enemyTeam?.map((participant) => (
                    <AlingChampImgAndName onClick={() => router.push(participant.summonerName)}>
                        <ChampImg title={participant.championName} src={`http://ddragon.leagueoflegends.com/cdn/12.1.1/img/champion/${participant.championName}.png`}/>
                        <SummonerName>{participant.summonerName}</SummonerName>

                    </AlingChampImgAndName>
                ))
            }
            </AlignTeam>
        </Container>
    )
}