import React, {useContext, useState, useEffect, useRef} from 'react'
import UserContext from '../../../context/userContext'
import { useRouter } from 'next/router'
import LoadingPage from '../../../components/LoadingPage'
import SummonerLeague from '../../../components/SummonerLeague'
import SummonerMatch from '../../../components/SummonerMatch'
import SummonerExpBorder from '../../../components/SummonerExpBorder'
import champApi from '../../../api/champs'
import summonerApi from '../../../api/summoner'
import { Circles  } from 'react-loading-icons'
import champHelper from '../../../helpers/champ'
import {
    Container, Top, NickName, ProfileIcon, UserLevel, LeagueDiv, BackgroudImage, RowAlign, ContainerProfileInfo, UpdateUserButton
} from '../../../components/nickname/styles'
import Head from 'next/head'
import SelectSkinInPage from '../../../components/selectSkin/selectSkin'


export default function Summoner() {

    const summonerPageRef = useRef()
    const router = useRouter()
    const {user, setUser} = useContext(UserContext)
    const [champsMaestry, setChampsMaestry] = useState([])
    const [profileIcon, setProfileIcon] = useState('')
    const [backgroudUrl, setBackgroudUrl] = useState(null)
    const [nickInPage, setNickInPage] =useState('')
    const [level, setLevel] = useState('')
    const { nickName } = router.query
    const [matchsWins, setMatchsWins] = useState(0)
    const [matchsLosts, setMatchsLosts] = useState(0)
    const [preferencePosition, setPreferencePositionsValue] = useState()
    const [error, setError] = useState(false)
    const [updateUser, setUpdateUser] = useState(false)
    const [champSkin, setChampSkin] = useState(0)
    const [topChamp, setTopChamp] = useState(null)
    useEffect(() => {
        if(user){
            setProfileIcon(`https://ddragon.leagueoflegends.com/cdn/12.23.1/img/profileicon/${user.profileIconId}.png`)            
            setNickInPage(user.name)
            setLevel(user.summonerLevel)
            champApi.getChampsMaestry({
                encryptedSummonerId: user.id
            })
            .then(({data}) => {
                let topChamp = champHelper.findChampById(data[0].championId)
                setTopChamp(topChamp)
                setBackgroudUrl(`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${topChamp.id}_${champSkin}.jpg`)
                setChampsMaestry(data)
            })
            .catch((error) => {
                
                console.error(error)
            })    
        }
    }, [user])


    useEffect(() => {
        if(topChamp){
            setBackgroudUrl(`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${topChamp.id}_${champSkin}.jpg`)
        }
    }, [champSkin])

    const UpdateUser = () => {
        setUpdateUser(true)
        setError(false)
        summonerApi.updateSummoner({
            nickName
        }).then((response) => {
            setUser(null)
            setUser(response.data)
            setUpdateUser(false)

        }).catch((error) => {
            setError(error.response.data.error)
            setUpdateUser(false)

        })
    }

    const onScroll = () => {
        if (summonerPageRef.current) {
            const { scrollTopS, scrollHeightS, clientHeightS } = summonerPageRef.current;
        }
    };

    const SetWinsAndLostsValue = (wins, losts) => {
        setMatchsWins(matchsWins + wins)
        setMatchsLosts(matchsLosts + losts)
    }


    const SetPreferencePositions  = (positions) => {
        // let temp = {...positions, preferencePosition}
        // setPreferencePositionsValue(temp)



        
        console.log(positions)

       
        let temp = {positions}
        if(preferencePosition){
            temp = {positions, ...preferencePosition}
        }
        setPreferencePositionsValue(temp)

    }



    
    if(backgroudUrl){
        return(

            <Container ref={summonerPageRef}>
                <Head>
                    <title>{nickInPage} Status</title>
                    <meta name="description" content={`${nickInPage}/ / Lv.${level}`} />
                </Head>
                <Top >                    
                                
                <ProfileIcon src={profileIcon}></ProfileIcon>
                
                <SummonerExpBorder level={level}></SummonerExpBorder>
                
                <UserLevel>{level}</UserLevel>
    
                <NickName>{nickInPage}</NickName>
                
                <SelectSkinInPage champSkin={champSkin} setChampSkin={setChampSkin} topChamp={topChamp}/>

                {
                    updateUser &&
                    <Circles speed={.75} stroke='#8c6c36' fill='black'  fillOpacity='0.8'/>
                }
                {error&&
                    <h1>{error}</h1>
                }
                </Top>

                <LeagueDiv>
                    {user &&
                        <SummonerLeague/>
                    }
                    
                </LeagueDiv>
                <RowAlign>
                    {
                        matchsWins!=0 &&
                        <ContainerProfileInfo>
                            <h1>Total de partidas:{matchsWins + matchsLosts}</h1>
                            <h1>Vitorias: {matchsWins}</h1>
                            <h1>Derrotas: {matchsLosts}</h1>
                            <h1>WinRate: {((matchsWins/(matchsWins + matchsLosts))*100).toFixed(2)}%</h1>
                        </ContainerProfileInfo>
                    }

                    {
                        summonerPageRef.current&&
                        <SummonerMatch onScrollSummonerPage={onScroll} setWinsAndLostsValue={SetWinsAndLostsValue} SetPreferencePositions={SetPreferencePositions}/>

                    }
                </RowAlign>
            
                <BackgroudImage style={{ backgroundImage: `url(${backgroudUrl})` }}/>

            </Container>
                )
    }else{
        return(
            <LoadingPage/>

        )
    }
    
    }
        
        