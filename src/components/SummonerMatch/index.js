import React, {useContext, useState, useEffect} from 'react'
import {Container} from './styles'
import UserContext from '../../context/userContext'
import summonerApi from '../../api/summoner'
import MatchFunctions from '../MatchFunctions/index'
import matchHelper from '../../helpers/match'

export default function SummonerMatch(){

    const {user} = useContext(UserContext)

    const [matchList, setmatchList] = useState(null)
    
    const [matchs, setMatchs] = useState(null)
    
    const [particpantID, setParticipantId] = useState(null)

    let matchListize = 0;

    let matchGetSize = 10;

    let getMatchNum = 0
    
    let matchArray = []

    let participantIdArray = []



    useEffect(() => {
        if(user){

            summonerApi.getMatchList({
                encryptedAccountId : user.accountId
            })
            .then(({data}) => {
                setmatchList(data.matches)
                matchListize = data.totalGames
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
                MatchFunctions.getMatchById(matchList[getMatchNum].gameId, addMatch)     
                getMatchNum++
            }
        }
    }, [matchList])

    const addMatch = (matchData) =>{
        matchArray.push(matchData)
        setMatchs(matchArray.concat([matchData]))
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
                    <>
                        
                        <h3>{matchHelper.findQueueById(match.queueId).description}</h3>
                        <h3>{Math.trunc(match.gameDuration/60)} Minutos</h3>
                        <h3>{matchHelper.findQueueById(match.queueId).map}</h3>

                    </>
                ))
            }
        </Container>
    )
}