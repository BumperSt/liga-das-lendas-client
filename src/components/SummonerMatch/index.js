import React, {useContext, useState, useEffect, useRef} from 'react'
import {ChampIcon, CharNameAndLevel, ColumMatchContainer, Container, MatchContainer, OnlySmallScreen, ScroolContainer, SpellIncon, TypeTitle} from './styles'
import UserContext from '../../context/userContext'
import summonerApi from '../../api/summoner'
import MatchFunctions from '../MatchFunctions/index'
import matchHelper from '../../helpers/match'
import moment from 'moment'
import MatchItems from './itensView'
import champJson from '../../../public/champion.json'
import { Bars , Circles} from 'react-loading-icons'

export default function SummonerMatch(){


    const matchContainerRef = useRef();

    const {user} = useContext(UserContext)

    const [matchList, setmatchList] = useState(null)
    
    const [matchs, setMatchs] = useState([])
    
    const [matchAuxIndex, setMatchAuxIndex] = useState(0)

    const [loadingMatchs, setLoadingMatchs] = useState(true)

    let matchListize = 0;

    let matchGetSize = 10;

    let getMatchNum = 0
    
    let matchArray = []


    const callGetMatch = () => {
        setLoadingMatchs(true)

        summonerApi.getMatchList({
            puuid : user.puuid,
            startIndex: matchAuxIndex
        })
        .then(({data}) => {
            setmatchList(data)
            matchListize = data.length
            setMatchAuxIndex(matchAuxIndex + 10)
        })
        .catch((error) =>{
            console.error(error)
        })
    }

    useEffect(() => {
        if(user){
            console.log(user)
            callGetMatch()            
        
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
        let spells = [matchHelper.getSummonerSpellName(myParticipation.summoner1Id), matchHelper.getSummonerSpellName(myParticipation.summoner2Id)]
        let runes = [matchHelper.getRuneById(myParticipation.perks.styles[0].style), matchHelper.getRuneById(myParticipation.perks.styles[1].style)]
        matchData = {...matchData, myParticipation, kda, kdaRatio, spells, runes}
        matchArray.push(matchData)

        if(matchArray.length == 10){
            matchArray.sort(function(x, y){
                return new Date(y.info.gameCreation) - new Date(x.info.gameCreation);
            })

            let array = matchs.concat(matchArray)
            console.log(array)

            setMatchs(array)
            matchArray = []
        }
    }

    useEffect(() => {
        if(matchs){
            setLoadingMatchs(false)
        }
    }, [matchs])

    const getFormatedDate = (timeStamp) => {
        let matchDate = new Date(timeStamp)
        let date = moment(matchDate, 'DD/MM/YYYY').format()
        return date.split('T')[0]
    }

    const onScroll = () => {
        if (matchContainerRef.current) {
          const { scrollTop, scrollHeight, clientHeight } = matchContainerRef.current;
          if (scrollTop + clientHeight === scrollHeight) {
            callGetMatch()            
          }
        }
      };

    return(

        <Container >
        <h1 style={{
            color: 'white',
            textAlign: 'center',
        }}>History</h1>
        <ScroolContainer onScroll={onScroll} ref={matchContainerRef}>
        {
                matchs?.map((match) => (
                    <MatchContainer win={match.myParticipation.win} key={match.info.gameId} style={{color:'white'}}>
                        <ColumMatchContainer>
                            <TypeTitle>{matchHelper.findQueueById(match.info.queueId).description}</TypeTitle>
                            {/* <TypeTitle>{getFormatedDate(match.info.gameCreation)}</TypeTitle>
                            <TypeTitle>{Math.trunc(match.info.gameDuration/60)} Minutos</TypeTitle> */}
                        </ColumMatchContainer>
                        <OnlySmallScreen>
                            <ColumMatchContainer>
                            {   
                                    match.runes.map((rune) => (
                                        <SpellIncon key={rune.id} title={rune.name} src={`https://ddragon.canisback.com/img/${rune.icon}`}/>

                                    ))
                                }
                            
                            </ColumMatchContainer>
                            <ColumMatchContainer>
                                <CharNameAndLevel>Nivel {match.myParticipation.champLevel}</CharNameAndLevel>
                                <ChampIcon title={champJson.data[match.myParticipation.championName].title} src={`http://ddragon.leagueoflegends.com/cdn/12.1.1/img/champion/${match.myParticipation.championName}.png`}/>
                                <CharNameAndLevel>{match.myParticipation.championName}</CharNameAndLevel>
                            </ColumMatchContainer>
                            <ColumMatchContainer>
                                {   
                                    match.spells.map((spell) => (
                                        <SpellIncon key={spell.id} title={spell.name} src={`https://ddragon.leagueoflegends.com/cdn/12.1.1/img/spell/${spell.id}.png`}/>

                                    ))
                                }
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
        {
            loadingMatchs&&
            <div style={{color:'white'}}>
                <Circles fill="white"/>

            </div>

        }
        </ScroolContainer>

        </Container>

    )
}