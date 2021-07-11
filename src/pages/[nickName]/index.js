import React, {useContext, useState, useEffect} from 'react'
import UserContext from '../../context/userContext'
import { useRouter } from 'next/router'

import SummonerLeague from '../../components/SummonerLeague'
import SummonerMatch from '../../components/SummonerMatch'
import SummonerMaestry from '../../components/SummonerMaestry'
import SummonerExpBorder from '../../components/SummonerExpBorder'

import {
    Container, Top, NickName, ProfileIcon, UserLevel, LeagueDiv
} from '../../components/nickname/styles'


export default function Summoner() {

    const router = useRouter()
    const {user} = useContext(UserContext)
    const [champsMaestry, setChampsMaestry] = useState([])
    const [profileIcon, setProfileIcon] = useState('')
    const [backgroudUrl, setBackgroudUrl] = useState([])
    const [level, setLevel] = useState('')
    const { nickName } = router.query


    useEffect(() => {
        if(user){
            
            setProfileIcon("https://ddragon.leagueoflegends.com/cdn/11.1.1/img/profileicon/" + user.profileIconId + ".png")
            
            setLevel(user.summonerLevel)
            
        }
    }, [user])


    

    return(
        <Container>
            <Top style={{ backgroundImage: `url(${backgroudUrl})` }}>

            <ProfileIcon src={profileIcon}></ProfileIcon>
            
            <SummonerExpBorder level={level}></SummonerExpBorder>
            
            <UserLevel>{level}</UserLevel>

            <NickName>{nickName}</NickName>
            </Top>
            
            <LeagueDiv>
                {user &&
                    <SummonerLeague></SummonerLeague>
                }
                
            </LeagueDiv>
            <SummonerMaestry setChampsMaestry={setChampsMaestry} setBackgroudUrl={setBackgroudUrl} ></SummonerMaestry>
            <SummonerMatch></SummonerMatch>
        </Container>
            )
        }
        
        