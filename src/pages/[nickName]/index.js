import React, {useContext, useState, useEffect} from 'react'
import UserContext from '../../context/userContext'
import { useRouter } from 'next/router'

import SummonerLeague from '../../components/SummonerLeague'
import SummonerMatch from '../../components/SummonerMatch'
import SummonerMaestry from '../../components/SummonerMaestry'
import SummonerExpBorder from '../../components/SummonerExpBorder'
import { Bars } from 'react-loading-icons'

import {
    Container, Top, NickName, ProfileIcon, UserLevel, LeagueDiv, BackgroudImage
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
            
            setProfileIcon("https://ddragon.leagueoflegends.com/cdn/12.1.1/img/profileicon/" + user.profileIconId + ".png")
            
            setLevel(user.summonerLevel)
            
        }
    }, [user])


    
    if(user){
        return(
            <Container>
                <BackgroudImage style={{ backgroundImage: `url(${backgroudUrl})` }}/>
                <Top >
    
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
                <SummonerMatch/>
            </Container>
                )
    }else{
        return(
            <Bars fill="black"/>

        )
    }
    
    }
        
        