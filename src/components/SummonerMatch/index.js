import React, {useContext, useState, useEffect, useRef} from 'react'
import {AlingColumCenter, AlingRowSmallSizeScreen, ChampIcon, CharKill, CharNameAndLevel, ColumMatchContainer, Container, DownArrow, HeaderMatch, MatchContainer, OnlySmallScreen, RowDivAlingSpeels, ScroolContainer, SelectType, SelectTypeDiv, SpellIncon, SummonerMarch, TypeOption, TypeTitle, UpArrow} from './styles'
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
import useWindowDimensions from '../../helpers/screenSize'

export default function SummonerMatch({onScrollSummonerPage , setWinsAndLostsValue, SetPreferencePositions}){


    const matchContainerRef = useRef();

    const {user} = useContext(UserContext)

    const [showMoreMobile, setShowMoreMobile] = useState('')

    const [matchList, setmatchList] = useState(null)
    
    const [matchs, setMatchs] = useState([])
    
    const [loadingMatchs, setLoadingMatchs] = useState(true)

    const [matchType, setMatchType] = useState('default')

    const { height, width } = useWindowDimensions();

    const [matchAuxIndex, setMatchAuxIndex] = useState(0)

    const [CallingMatch, setCallingMatch] = useState(false)


    let matchArray = []
    const matchGetSize = 10;
    
    let preferencePosition = {}
    let wins = 0
    let losts = 0

    const callGetMatch = () => {
        setLoadingMatchs(true)
        console.log(matchAuxIndex)
        summonerApi.getMatchList({
            puuid : user.puuid,
            startIndex: matchAuxIndex,
            matchType: matchType
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

        if(matchList){
            let getMatchNum = 0

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

    useEffect(() => {
        console.log(matchType)
        setMatchAuxIndex(0)
        setmatchList(null)
        setMatchs([])
    }, [matchType])

    useEffect(() => {
        if(matchAuxIndex == 0){
            callGetMatch()
        }
    },[matchAuxIndex])

    const addMatch = (matchData) =>{

        let myParticipation = matchHelper.getParticipantID(matchData.info.participants, user.puuid)

        let kda = [myParticipation.kills,myParticipation.deaths,myParticipation.assists]

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

    useEffect(() => {
        console.log(showMoreMobile)
    }, [showMoreMobile])


    return(

        <Container >
        <h1 style={{
            color: 'white',
            textAlign: 'center',
        }}>History</h1>
        <SelectTypeDiv>
            <SelectType onChange={(e) => setMatchType(e.target.value)}>
                <TypeOption value='default'>Modo de jogo</TypeOption>
                <TypeOption value='normal'>Normal</TypeOption>
                <TypeOption value='ranked'>Ranqueada</TypeOption>

            </SelectType>
        </SelectTypeDiv>
        <ScroolContainer onScroll={onScroll} ref={matchContainerRef}>
        {
                matchs?.map((match) => (
                    <MatchContainer key={match.info.gameId} win={match.myParticipation.win} style={{color:'white'}}>
                        <HeaderMatch center={true}>
                            <TypeTitle style={{
                                margin:'0px'
                            }} title={matchHelper.findQueueById(match.info.queueId).name? matchHelper.findQueueById(match.info.queueId).name: matchHelper.findQueueById(match.info.queueId).description}>{matchHelper.findQueueById(match.info.queueId).name? matchHelper.findQueueById(match.info.queueId).name: matchHelper.findQueueById(match.info.queueId).description}.</TypeTitle>
                            <TypeTitle title={match.gameDuration}>{match.gameDuration} Minutos</TypeTitle> 
                            <TypeTitle title={getFormatedDate(match.info.gameCreation)}>{getFormatedDate(match.info.gameCreation)}</TypeTitle>
                            {
                                width <= 600 && showMoreMobile && showMoreMobile == match.info.gameId ?
                                <UpArrow win={match.myParticipation.win} onClick={() => setShowMoreMobile(false)} size={25}/>
                                :
                                <DownArrow win={match.myParticipation.win} onClick={() => setShowMoreMobile(match.info.gameId ) } size={25}/>                  
                            }
                        </HeaderMatch>
                        <OnlySmallScreen>
                            <RowDivAlingSpeels>

                            
                                <ColumMatchContainer center={true} marginInline={'0px'}>
                                {   
                                        match.runes.map((rune) => (
                                            <SpellIncon key={rune.id} title={rune.name} src={`/${rune.icon.replace('png', 'webp')}`}/>

                                        ))
                                    }
                                
                                </ColumMatchContainer>
                                <ColumMatchContainer style={{
                                    minWidth:'50%'
                                }}center={true}>
                                    <CharNameAndLevel>Nivel {match.myParticipation.champLevel}</CharNameAndLevel>
                                    <ChampIcon title={champJson.data[match.myParticipation.championName]?.title} src={`https://ddragon.leagueoflegends.com/cdn/12.18.1/img/champion/${match.myParticipation.championName}.png`}/>
                                    <CharNameAndLevel>{match.myParticipation.championName}</CharNameAndLevel>
                                </ColumMatchContainer>
                                <ColumMatchContainer center={true}  marginInline={'0px'}>
                                    {   
                                        match.spells.map((spell) => (
                                            <SpellIncon key={spell.id} title={spell.name} src={`https://ddragon.leagueoflegends.com/cdn/12.18.1/img/spell/${spell.id}.png`}/>

                                        ))
                                    }
                                </ColumMatchContainer>
                            </RowDivAlingSpeels>

                            <ColumMatchContainer center={true}>
                                    <CharNameAndLevel>{match.kda[0]}/<CharKill>{match.kda[1]}</CharKill>/{match.kda[2]}</CharNameAndLevel>
                                    <CharNameAndLevel>{match.kdaRatio} KDA</CharNameAndLevel>
                            </ColumMatchContainer>
                                <ColumMatchContainer center={true}>
                                    <CharNameAndLevel>{match.killedMinionsPorMin} ({match.killedMinions}) CS</CharNameAndLevel>
                                    <CharNameAndLevel>Control Wards {match.myParticipation.visionWardsBoughtInGame}</CharNameAndLevel>
                                    {
                                        match.killsSequences&&
                                        <SummonerMarch>{match.killsSequences}</SummonerMarch>
                                    }

                                </ColumMatchContainer>


                                <ColumMatchContainer center={true}>
                                        <MatchItems myParticipation={match.myParticipation}/>
                                </ColumMatchContainer>
  
                           
                            {
                                width > 600 &&
                                <ColumMatchContainer>
                                <SummonersInMatchView match={match}/>
                            </ColumMatchContainer>
                                    
                            }

                            
               


                        </OnlySmallScreen>
                        {
                            showMoreMobile == match.info.gameId && 
                            <AlingColumCenter>                            
                                <ColumMatchContainer>
                                    <SummonersInMatchView match={match}/>
                                </ColumMatchContainer>
                            </AlingColumCenter>
                        }
                        
                        
                        {/* {
                            width >= 1280 && <>
                            {showMoreMobile == match.info.gameId ?
                            <UpArrow onClick={() => setShowMoreMobile(false)} size={25}/>
                            :
                            <DownArrow onClick={() => setShowMoreMobile(match.info.gameId ) } size={25}/>          }
                            </>        
                        } */}
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