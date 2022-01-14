import React, {useContext, useState, useEffect, useRef} from 'react'
import UserContext from '../../context/userContext'
import { useRouter } from 'next/router'
import LoadingPage from '../../components/LoadingPage'
import SummonerLeague from '../../components/SummonerLeague'
import SummonerMatch from '../../components/SummonerMatch'
import SummonerExpBorder from '../../components/SummonerExpBorder'
import champApi from '../../api/champs'
import summonerApi from '../../api/summoner'

import champHelper from '../../helpers/champ'

import {
    Container, Top, NickName, ProfileIcon, UserLevel, LeagueDiv, BackgroudImage, RowAlign, ContainerProfileInfo
} from '../../components/nickname/styles'
import Head from 'next/head'


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

    useEffect(() => {
        if(user){
            setProfileIcon("/profileicon/" + user.profileIconId + ".webp")
            setNickInPage(user.name)
            setLevel(user.summonerLevel)
            champApi.getChampsMaestry({
                encryptedSummonerId: user.id
            })
            .then(({data}) => {
                let topChamp = champHelper.findChampById(data[0].championId)
                setBackgroudUrl(`/splash/${topChamp.id}.webp`)
                setChampsMaestry(data)
            })
            .catch((error) => {
                
                console.error(error)
            })    
        }
    }, [user])

    const UpdateUser = () => {
        summonerApi.updateSummoner({
            nickName
        }).then((response) => {
            setUser(response.data)
        }).catch((error) => {

            console.log(error)
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
        console.log(positions)


    }



    
    if(backgroudUrl){
        return(

            <Container ref={summonerPageRef}>
                <title>{nickInPage} Status</title>
                <Head>
                    <meta name="description" content={`${nickInPage}/ / Lv.${level}`} />
                </Head>
                <Top >

                <ProfileIcon src={profileIcon}></ProfileIcon>
                
                <SummonerExpBorder level={level}></SummonerExpBorder>
                
                <UserLevel>{level}</UserLevel>
    
                <NickName>{nickInPage}</NickName>
                <button onClick={UpdateUser}>UpdateUser</button>
                </Top>

                <LeagueDiv>
                    {user &&
                        <SummonerLeague/>
                    }
                    
                </LeagueDiv>
                <RowAlign>
                    {/* <ContainerProfileInfo>
                        <h1>Total de partidas:{matchsWins + matchsLosts}</h1>
                        <h1>{matchsWins}</h1>
                        <h1>{matchsLosts}</h1>
                    </ContainerProfileInfo> */}
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
        
        