import React, {useContext, useState, useEffect, useRef} from 'react'
import {ChampIcon, CharNameAndLevel, ColumMatchContainer, Container, MatchContainer, OnlySmallScreen, ScroolContainer, SpellIncon, TypeTitle} from './styles'
import UserContext from '../../context/userContext'
import summonerApi from '../../api/summoner'
import MatchFunctions from '../MatchFunctions/index'
import matchHelper from '../../helpers/match'
import moment from 'moment'
import MatchItems from './itensView'
import champJson from '../../../public/champion.json'
import { Bars } from 'react-loading-icons'
import theme from '../../../styles/theme.json'
import { SummonersInMatchView } from './summonersInMatchView'

export default function SummonerMatch(){


    const matchContainerRef = useRef();

    const {user} = useContext(UserContext)

    const [matchList, setmatchList] = useState(null)
    
    const [matchs, setMatchs] = useState([])
    
    const [loadingMatchs, setLoadingMatchs] = useState(true)

    let matchArray = []

    const matchGetSize = 10;

    let getMatchNum = 0
    
    let matchAuxIndex = 0


    const callGetMatch = () => {
        setLoadingMatchs(true)

        summonerApi.getMatchList({
            puuid : user.puuid,
            startIndex: matchAuxIndex
        })
        .then(({data}) => {
            setmatchList(data)
            matchAuxIndex += 10
        })
        .catch((error) =>{
            console.error(error)
        })
    }

    useEffect(() => {
        if(user){
            setmatchList(null)
            setMatchs([])
            matchAuxIndex = 0
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

    

    useEffect(() => {
        if(matchs.length > 0) {
            console.log(matchs)
            setLoadingMatchs(false)
        }
    }, [matchs])


    const addMatch = (matchData) =>{

        let myParticipation = matchHelper.getParticipantID(matchData.info.participants, user.puuid)

        let kda = `${myParticipation.kills}/${myParticipation.deaths}/${myParticipation.assists}`

        let kdaRatio = ((myParticipation.kills +  myParticipation.assists)/myParticipation.deaths).toFixed(2)

        let spells = [matchHelper.getSummonerSpellName(myParticipation.summoner1Id), matchHelper.getSummonerSpellName(myParticipation.summoner2Id)]
        
        let runes = [matchHelper.getRuneById(myParticipation.perks.styles[0].style), matchHelper.getRuneById(myParticipation.perks.styles[1].style)]
        
        matchData = {...matchData, myParticipation, kda, kdaRatio, spells, runes}
        matchArray.push(matchData)

        if(matchArray.length == matchGetSize){

            matchArray.sort(function(x, y){
                return new Date(y.info.gameCreation) - new Date(x.info.gameCreation);
            })

            let array = matchs.concat(matchArray)

            setMatchs(array)

            matchArray = []
        }
    }

    const onScroll = () => {
        if (matchContainerRef.current) {
          const { scrollTop, scrollHeight, clientHeight } = matchContainerRef.current;
          if (scrollTop + clientHeight === scrollHeight) {
            callGetMatch()            
          }
        }
    };

    const getFormatedDate = (timeStamp) => {
        let matchDate = new Date(timeStamp)
        let date = moment(matchDate, 'DD/MM/YYYY').format()
        return date.split('T')[0]
    }


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
                                <TypeTitle>{getFormatedDate(match.info.gameCreation)}</TypeTitle>
                            {/* <TypeTitle>{Math.trunc(match.info.gameDuration/60)} Minutos</TypeTitle> */} 
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
                                <CharNameAndLevel>{match.kdaRatio} KDA</CharNameAndLevel>
                            </ColumMatchContainer>
                            <ColumMatchContainer>
                                <MatchItems myParticipation={match.myParticipation}/>
                            </ColumMatchContainer>
                            <ColumMatchContainer>
                                <SummonersInMatchView match={match}/>
                            </ColumMatchContainer>
                        </OnlySmallScreen>
                            
                    </MatchContainer>
                ))
        }
        {
            loadingMatchs&&
            <div style={{color:'white'}}>
                <Bars stroke='black' fill={theme.colors.dourado}/>
            </div>

        }
        </ScroolContainer>

        </Container>

    )
}