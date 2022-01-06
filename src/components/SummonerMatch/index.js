import React, {useContext, useState, useEffect} from 'react'
import {Container} from './styles'
import UserContext from '../../context/userContext'
import summonerApi from '../../api/summoner'
import MatchFunctions from '../MatchFunctions/index'
import matchHelper from '../../helpers/match'

export default function SummonerMatch(){

    const {user} = useContext(UserContext)

    const [matchList, setmatchList] = useState(null)
    
    const [matchs, setMatchs] = useState([])
    
    const [particpantID, setParticipantId] = useState(null)

    let matchListize = 0;

    let matchGetSize = 10;

    let getMatchNum = 0
    
    let matchArray = []


    let participantIdArray = []



    useEffect(() => {
        if(user){
            summonerApi.getMatchList({
                puuid : user.puuid

            })
            .then(({data}) => {
                console.log(data)
                setmatchList(data)
                matchListize = data.length
            })
            .catch((error) =>{
                console.error(error)
            })
        }
    }, [user])
    
    useEffect(() => {
        if(matchList){
            console.log(matchList)
            while(getMatchNum < matchGetSize){
                MatchFunctions.getMatchById(matchList[getMatchNum], addMatch)     
                getMatchNum++
            }
        }
    }, [matchList])

    const addMatch = (matchData) =>{
        console.log(matchData)
        matchArray.push(matchData)
        if(matchArray.length == 10){
            setMatchs([...matchArray])
            matchArray = []
        }
    }

    useEffect(() => {
        console.log(matchs)
        if(matchs){
            matchs.map((match) => {
                getParticipantID(match)
            })
        }
    }, [matchs])

    useEffect(() => {
        console.log(particpantID)
    },[particpantID])


    const getParticipantID = (match) =>{
        for(let x in match.participantIdentities){
            if(match.participantIdentities[x].player.accountId == user.accountId){
                participantIdArray.push(match.participantIdentities[x].participantId)
                setParticipantId(participantIdArray)
            }
        }
    }

    return(
        <Container>
            {
                matchs?.map((match) => (
                    <div key={match.info.gameId} style={{color:'white'}}>
                        
                        <h3>{matchHelper.findQueueById(match.info.queueId).description}</h3>
                        <h3>{Math.trunc(match.info.gameDuration/60)} Minutos</h3>
                        <h3>{matchHelper.findQueueById(match.info.queueId).map}</h3>

                    </div>
                ))
            }
        </Container>
    )
}