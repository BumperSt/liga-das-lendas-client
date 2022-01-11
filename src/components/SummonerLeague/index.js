
import React, { useState, useEffect, useContext } from 'react'
import summonerApi from '../../api/summoner'
import UserContext from '../../context/userContext'

import { LeagueText, LeagueIcon, LeaguePdlDiv, PdlText, DivLeague, Container, DivRow , WinText, LeagueName} from './styles'

export default function SummonerLeague() {

    const [league, setLeague] = useState([]);

    const [flex, setFlex] = useState(null)

    const [soloq, setSoloq] = useState(null)

    const { user } = useContext(UserContext)



    useEffect(() => {
        console.log(`LEAGUE ${user.leagues}`)
        if(user.leagues.length == 0){
            console.log("VAZIA")
            setLeague([])
            setSoloq(null)
            setFlex(null)
        }else{
            setLeague(user.leagues)

           
        }
    }, [user])

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

    return (
        <Container>
            {
                soloq ? (
                    <DivLeague>
                        <LeagueName>SOLO</LeagueName>
                        <LeagueText>{soloq.tier} {soloq.rank}</LeagueText>

                        <DivRow>
                            <PdlText>PDL {soloq.leaguePoints}</PdlText>
                            <LeagueIcon src={`/ranked-emblems/Emblem_${soloq.tier[0].toUpperCase() + soloq.tier.substr(1).toLowerCase()}.png`}></LeagueIcon>
                            <WinText>{soloq.wins}V {soloq.losses}D</WinText>

                        </DivRow>
                    </DivLeague>
                ) : (
                    <DivLeague>

                        <LeagueName>SOLO</LeagueName>
                        

                        <LeagueText>Unranked</LeagueText>
                
                        <DivRow>
                            <LeagueIcon src={`/ranked-emblems/Emblem_Unranked.png`}></LeagueIcon>

                        </DivRow>
                    </DivLeague>
                )
            }
            {
                flex ? (
                    <DivLeague>

                        <LeagueName>FLEX</LeagueName>
                        <LeagueText>{flex.tier} {flex.rank}</LeagueText>
                        <DivRow>
                            <PdlText>PDL {flex.leaguePoints}</PdlText>
                            <LeagueIcon src={`/ranked-emblems/Emblem_${flex.tier[0].toUpperCase() + flex.tier.substr(1).toLowerCase()}.png`}></LeagueIcon>

                            <WinText>{flex.wins}V {flex.losses}D</WinText>
                        </DivRow>

                    </DivLeague>
                ) : (
                    <DivLeague>

                        <LeagueName>FLEX</LeagueName>

                        <LeagueText>Unranked</LeagueText>

                        <DivRow>
                            <LeagueIcon src={`/ranked-emblems/Emblem_Unranked.png`}></LeagueIcon>

                        </DivRow>
                    </DivLeague>
                )
            }
        </Container>
    )

}