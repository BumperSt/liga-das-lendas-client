import React, { useState , useEffect,useContext} from 'react'
import summonerApi from '../../api/summoner'
import UserContext from '../../context/userContext'

import {LeagueText, LeagueIcon, LeaguePdlDiv, PdlText} from './styles'

export default function SummonerLeague(){

    const [league, setLeague] = useState([]);

    const [flex, setFlex] = useState(null)

    const [soloq, setSoloq] = useState(null )

    const {user} = useContext(UserContext)


    console.log('ssssssss')

    useEffect(() =>{
        summonerApi.getLeague({
            encryptedSummonerId : user.id
        })
        .then(({data}) => {
            setLeague(data)
            console.log(data)
        })
        .catch((error) => {
            console.error(error)
        })
    },[user])
    
    useEffect(() => {
        if (league.length > 0) {
            for (let x in league) {
                if (league[x].queueType == "RANKED_SOLO_5x5") {
                    setSoloq(league[x])
                }
                if (league[x].queueType == "RANKED_FLEX_SR") {
                    setFlex(league[x])
                }
            }
        }
    }, [league])

    return(
        <>
            {
                soloq?(
                    <>
                        <h1>SOLOQ</h1>
                        <LeagueIcon src={`/ranked-emblems/Emblem_${soloq.tier}.png`}></LeagueIcon>
                        <LeaguePdlDiv>
                        <LeagueText>{soloq.tier} {soloq.rank}</LeagueText>
                        <PdlText>PDL {soloq.leaguePoints}</PdlText>
                        <PdlText>(V: {soloq.wins}/D: {soloq.losses})</PdlText>
                        </LeaguePdlDiv>
                    </>
                ) : (<>
                        <LeagueIcon src={`/ranked-emblems/Emblem_Unranked.png`}></LeagueIcon>
                        <LeaguePdlDiv>
                        <LeagueText>Unranked</LeagueText>
                        </LeaguePdlDiv>
                </>)
            }
            {
                flex?(
                    <>
                        <h1>FLEX</h1>
                        <LeagueIcon src={`/ranked-emblems/Emblem_${flex.tier}.png`}></LeagueIcon>
                        <LeaguePdlDiv>
                        <LeagueText>{flex.tier} {flex.rank}</LeagueText>
                        <PdlText>PDL {flex.leaguePoints}</PdlText>
                        <PdlText>(V: {flex.wins}/D: {flex.losses})</PdlText>
                        </LeaguePdlDiv>
                    </>
                ): (<>
                        <LeagueIcon src={`/ranked-emblems/Emblem_Unranked.png`}></LeagueIcon>
                        <LeaguePdlDiv>
                        <LeagueText>Unranked</LeagueText>
                        </LeaguePdlDiv>
                </>)
            }
        </>
    )
    
}