import React, {useContext, useState, useEffect} from 'react'
import {ChampIcon, CharNameAndLevel, ColumMatchContainer, Container, MatchContainer, OnlySmallScreen, SpellIncon, TypeTitle} from './styles'
import UserContext from '../../context/userContext'
import summonerApi from '../../api/summoner'
import MatchFunctions from '../MatchFunctions/index'
import matchHelper from '../../helpers/match'
import moment from 'moment'
import MatchItems from './itensView'


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
                            <TypeTitle>{matchHelper.findQueueById(match.info.queueId).description}</TypeTitle>
                            {/* <TypeTitle>{getFormatedDate(match.info.gameCreation)}</TypeTitle>
                            <TypeTitle>{Math.trunc(match.info.gameDuration/60)} Minutos</TypeTitle> */}
                        </ColumMatchContainer>
                        <OnlySmallScreen>
                            <ColumMatchContainer>
                                {console.log(matchHelper.getRuneById(match.myParticipation.perks.styles[0].style))}
                                <SpellIncon src={`https://ddragon.canisback.com/img/${matchHelper.getRuneById(match.myParticipation.perks.styles[0].style).icon}`}/>
                                <SpellIncon src={`https://ddragon.canisback.com/img/${matchHelper.getRuneById(match.myParticipation.perks.styles[1].style).icon}`}/>
                            </ColumMatchContainer>
                            <ColumMatchContainer>
                                <CharNameAndLevel>Nivel {match.myParticipation.champLevel}</CharNameAndLevel>
                                <ChampIcon src={`http://ddragon.leagueoflegends.com/cdn/12.1.1/img/champion/${matchHelper.getParticipantID(match.info.participants, user.puuid).championName}.png`}/>
                                <CharNameAndLevel>{match.myParticipation.championName}</CharNameAndLevel>
                            </ColumMatchContainer>
                            <ColumMatchContainer>
                                <SpellIncon src={`https://ddragon.leagueoflegends.com/cdn/12.1.1/img/spell/${matchHelper.getSummonerSpellName(match.myParticipation.summoner1Id).id}.png`}/>
                                <SpellIncon src={`https://ddragon.leagueoflegends.com/cdn/12.1.1/img/spell/${matchHelper.getSummonerSpellName(match.myParticipation.summoner2Id).id}.png`}/>
                            </ColumMatchContainer>
                            <ColumMatchContainer>
                                <CharNameAndLevel>{match.kda}</CharNameAndLevel>
                                <CharNameAndLevel>{match.kdaRatio}:1 KDA</CharNameAndLevel>
                            </ColumMatchContainer>
                            <ColumMatchContainer>
                                <MatchItems myParticipation={match.myParticipation}/>
                            </ColumMatchContainer>
                        </OnlySmallScreen>

                    </MatchContainer>
                ))
            }
        </Container>
    )
}