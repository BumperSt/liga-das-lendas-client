import React, {useContext, useState, useEffect, useRef} from 'react'
import {AlingRowSmallSizeScreen, ChampIcon, CharKill, CharNameAndLevel, ColumMatchContainer, Container, HeaderMatch, MatchContainer, OnlySmallScreen, ScroolContainer, SpellIncon, SummonerMarch, TypeTitle} from './styles'
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

export default function SummonerMatch({onScrollSummonerPage , setWinsAndLostsValue, SetPreferencePositions}){


    const matchContainerRef = useRef();

    const {user} = useContext(UserContext)

    const [matchList, setmatchList] = useState(null)
    
    const [matchs, setMatchs] = useState([])
    
    const [loadingMatchs, setLoadingMatchs] = useState(true)

    const [matchAuxIndex, setMatchAuxIndex] = useState(0)

    const [CallingMatch, setCallingMatch] = useState(false)


    let matchArray = []

    const matchGetSize = 10;

    let getMatchNum = 0
    
    let preferencePosition = {}
    let wins = 0
    let losts = 0

    const callGetMatch = () => {
        setLoadingMatchs(true)
        summonerApi.getMatchList({
            puuid : user.puuid,
            startIndex: matchAuxIndex
        })
        .then(({data}) => {
            setCallingMatch(false)
            setmatchList(data)
            setMatchAuxIndex( matchAuxIndex + matchGetSize)
        })
        .catch((error) =>{
            console.error(error)
        })
    }

    useEffect(() => {
        if(user){
            setmatchList(null)
            setMatchs([])
        }
    }, [user])

    useEffect(() => {
        callGetMatch()            
    }, [])
    
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
            setLoadingMatchs(false)
        }
    }, [matchs])


    const addMatch = (matchData) =>{

        let myParticipation = matchHelper.getParticipantID(matchData.info.participants, user.puuid)

        let kda = `${myParticipation.kills}${myParticipation.deaths}${myParticipation.assists}`

        let kdaRatio = ((myParticipation.kills +  myParticipation.assists)/myParticipation.deaths).toFixed(2)

        let spells = [matchHelper.getSummonerSpellName(myParticipation.summoner1Id), matchHelper.getSummonerSpellName(myParticipation.summoner2Id)]
        
        let runes = [matchHelper.getRuneById(myParticipation.perks.styles[0].style), matchHelper.getRuneById(myParticipation.perks.styles[1].style)]

        let killedMinions = myParticipation.neutralMinionsKilled + myParticipation.totalMinionsKilled
        
        let gameDuration = Math.trunc(matchData.info.gameDuration/60)

        let killedMinionsPorMin = (killedMinions/gameDuration).toFixed(1)

        let killsSequences = myParticipation.pentaKills >= 1 && 'Penta Kill' || myParticipation.quadraKills >= 1 && 'Quadra Kill'  ||  myParticipation.tripleKills >= 1 && 'Triple Kill'  || myParticipation.doubleKills >= 1 && 'Double Kill' 


        if(preferencePosition[myParticipation.individualPosition]){
            if(myParticipation.win){
                preferencePosition[myParticipation.individualPosition] = {
                    value:(preferencePosition[myParticipation.individualPosition].value+1),
                    win:preferencePosition[myParticipation.individualPosition].win+1,
                    lost:preferencePosition[myParticipation.individualPosition].lost
                }
            }else{
                preferencePosition[myParticipation.individualPosition] = {
                    value:(preferencePosition[myParticipation.individualPosition].value+1),
                    win:preferencePosition[myParticipation.individualPosition].win,
                    lost:preferencePosition[myParticipation.individualPosition].lost+1
                }
            }
        }else{
            if(myParticipation.win){
                preferencePosition[myParticipation.individualPosition] = {
                    value:1,
                    win:1,
                    lost:0
                }
            }else{
                preferencePosition[myParticipation.individualPosition] = {
                    value:1,
                    win:0,
                    lost:1
                }
            }

        }
        if(myParticipation.win){
            wins += 1;
        }else{
            losts += 1;
        }

        matchData = {...matchData, myParticipation, kda, kdaRatio, spells, runes, gameDuration,killedMinions, killedMinionsPorMin, killsSequences}
        matchArray.push(matchData)

        
        if(matchArray.length == matchGetSize){

            console.log(`Vitorias Derrotas ${wins}: ${losts}`)
            SetPreferencePositions(preferencePosition)
            setWinsAndLostsValue(wins, losts)

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
            if (scrollTop + clientHeight >= scrollHeight - 10) {
                if(!CallingMatch){
                    callGetMatch()            
                    setCallingMatch(true)

                }
            }
        }
    };

    const getFormatedDate = (timeStamp) => {
        let matchDate = new Date(timeStamp) 
        let now = new Date()
        var difference = now.getTime() - matchDate.getTime();

        let hoursDiference  = parseInt(Math.abs(difference) / 3600000)
        var days = Math.ceil(difference / (1000 * 3600 * 24));
        if(hoursDiference <= 23){
            return `${hoursDiference} Horas atrás`
        }else{
            if(parseInt(days) == 1){
                return `${days} Dia atrás`

            }else{
                return `${days} Dias atrás`
            }
        }
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
                    <MatchContainer key={match.info.gameId} win={match.myParticipation.win} style={{color:'white'}}>
                        <HeaderMatch center={true}>
                            <TypeTitle title={matchHelper.findQueueById(match.info.queueId).name? matchHelper.findQueueById(match.info.queueId).name: matchHelper.findQueueById(match.info.queueId).description}>{matchHelper.findQueueById(match.info.queueId).name? matchHelper.findQueueById(match.info.queueId).name: matchHelper.findQueueById(match.info.queueId).description}.</TypeTitle>
                            <TypeTitle title={getFormatedDate(match.info.gameCreation)}>{getFormatedDate(match.info.gameCreation)}</TypeTitle>
                            <TypeTitle title={match.gameDuration}>{match.gameDuration} Minutos</TypeTitle> 
                        </HeaderMatch>
                        <OnlySmallScreen>
                            <ColumMatchContainer center={true} marginInline={'0px'}>
                            {   
                                    match.runes.map((rune) => (
                                        <SpellIncon key={rune.id} title={rune.name} src={`/${rune.icon.replace('png', 'webp')}`}/>

                                    ))
                                }
                            
                            </ColumMatchContainer>
                            <ColumMatchContainer center={true}>
                                <CharNameAndLevel>Nivel {match.myParticipation.champLevel}</CharNameAndLevel>
                                <ChampIcon title={champJson.data[match.myParticipation.championName].title} src={`/face/${match.myParticipation.championName}.webp`}/>
                                <CharNameAndLevel>{match.myParticipation.championName}</CharNameAndLevel>
                            </ColumMatchContainer>
                            <ColumMatchContainer center={true}  marginInline={'0px'}>
                                {   
                                    match.spells.map((spell) => (
                                        <SpellIncon key={spell.id} title={spell.name} src={`/spell/${spell.id}.webp`}/>

                                    ))
                                }
                            </ColumMatchContainer>
                            <AlingRowSmallSizeScreen>

                            <ColumMatchContainer center={true}>

                                    <CharNameAndLevel>{match.kda[0]}/<CharKill>{match.kda[1]}</CharKill>/{match.kda[2]}</CharNameAndLevel>
                                    <CharNameAndLevel>{match.kdaRatio} KDA</CharNameAndLevel>
                                    {
                                        match.killsSequences&&
                                        <SummonerMarch>{match.killsSequences}</SummonerMarch>
                                    }

                                    </ColumMatchContainer>
                                    <ColumMatchContainer center={true}>

                                    <CharNameAndLevel>{match.killedMinionsPorMin} ({match.killedMinions}) CS</CharNameAndLevel>
                                    <CharNameAndLevel>Control Wards {match.myParticipation.visionWardsBoughtInGame}</CharNameAndLevel>
                                    </ColumMatchContainer>

                            </AlingRowSmallSizeScreen>


                           

                            <ColumMatchContainer center={true}>
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