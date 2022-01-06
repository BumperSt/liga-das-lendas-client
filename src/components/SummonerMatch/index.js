import React, {useContext, useState, useEffect} from 'react'
import {ChampIcon, ColumMatchContainer, Container, MatchContainer, SpellIncon} from './styles'
import UserContext from '../../context/userContext'
import summonerApi from '../../api/summoner'
import MatchFunctions from '../MatchFunctions/index'
import matchHelper from '../../helpers/match'
import moment from 'moment'


export default function SummonerMatch(){

    const {user} = useContext(UserContext)

    const [matchList, setmatchList] = useState(null)
    
    const [matchs, setMatchs] = useState([])
    
    let matchListize = 0;

    let matchGetSize = 10;

    let getMatchNum = 0
    
    let matchArray = []


    let participantIdArray = []



    useEffect(() => {
        if(user){
            console.log(user)
            summonerApi.getMatchList({
                puuid : user.puuid

            })
            .then(({data}) => {
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
            while(getMatchNum < matchGetSize){
                MatchFunctions.getMatchById(matchList[getMatchNum], addMatch)     
                getMatchNum++
            }
        }
    }, [matchList])

    const addMatch = (matchData) =>{
        let myParticipation = matchHelper.getParticipantID(matchData.info.participants, user.puuid)
        let kda = `${myParticipation.kills}/${myParticipation.deaths}/${myParticipation.assists}`
        let kdaRatio = ((myParticipation.kills +  myParticipation.assists)/myParticipation.deaths).toFixed(2)
        matchData = {...matchData, myParticipation, kda, kdaRatio}
        matchArray.push(matchData)
        console.log(matchData)
        if(matchArray.length == 10){
            matchArray.sort(function(x, y){
                return new Date(y.info.gameCreation) - new Date(x.info.gameCreation);
            })
            setMatchs([...matchArray])
            matchArray = []
        }
    }


    const getFormatedDate = (timeStamp) => {
        let matchDate = new Date(timeStamp)
        let date = moment(matchDate, 'DD/MM/YYYY').format()
        return date.split('T')[0]
    }

    return(
        <Container>
            {
                matchs?.map((match) => (
                    <MatchContainer key={match.info.gameId} style={{color:'white'}}>
                        <ColumMatchContainer>
                            <h3>{matchHelper.findQueueById(match.info.queueId).description}</h3>
                            <h3>{getFormatedDate(match.info.gameCreation)}</h3>
                            <h3>{Math.trunc(match.info.gameDuration/60)} Minutos</h3>
                            <h3>{matchHelper.findQueueById(match.info.queueId).map}</h3>
                        </ColumMatchContainer>
                        <ColumMatchContainer>

                            <SpellIncon src={`https://ddragon.leagueoflegends.com/cdn/12.1.1/img/spell/${matchHelper.getSummonerSpellName(match.myParticipation.summoner1Id).id}.png`}/>
                            <SpellIncon src={`https://ddragon.leagueoflegends.com/cdn/12.1.1/img/spell/${matchHelper.getSummonerSpellName(match.myParticipation.summoner2Id).id}.png`}/>


                        </ColumMatchContainer>
                        <ColumMatchContainer>
                            <h3>Nivel {match.myParticipation.champLevel}</h3>
                            <ChampIcon src={`http://ddragon.leagueoflegends.com/cdn/12.1.1/img/champion/${matchHelper.getParticipantID(match.info.participants, user.puuid).championName}.png`}/>
                            <h3>{match.myParticipation.championName}</h3>

                        </ColumMatchContainer>
                        <ColumMatchContainer>
                            {console.log(matchHelper.getRuneById(match.myParticipation.perks.styles[0].style))}
                            <SpellIncon src={`https://ddragon.canisback.com/img/${matchHelper.getRuneById(match.myParticipation.perks.styles[0].style).icon}`}/>
                            <SpellIncon src={`https://ddragon.canisback.com/img/${matchHelper.getRuneById(match.myParticipation.perks.styles[1].style).icon}`}/>
                        </ColumMatchContainer>
                        <ColumMatchContainer>
                          <h2>{match.kda}</h2>
                          <h2>{match.kdaRatio}:1 KDA</h2>
                        </ColumMatchContainer>
                    </MatchContainer>
                ))
            }
        </Container>
    )
}