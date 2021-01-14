import React, {useContext, useState, useEffect} from 'react'
import UserContext from '../../context/userContext'
import { useRouter } from 'next/router'
import champApi from '../../api/champs'

import SummonerLeague from '../../components/SummonerLeague'


import {
    Container, Top, NickName, ProfileIcon, UserLevel, LeagueDiv,  ExpBorder
} from '../../components/nickname/styles'

import champHelper from '../../helpers/champ'

export default function Summoner() {

    const expEmblems = [[30,50],[50,75],[75,100],[100,125],[125,150],[150,175],[175,200],[200,225],[225,250],[250,275],[275,300],[300,325],[325,350],[350,375],[375,400],[400,425],[425,450],[450,475],[475,500],[500]]
    const router = useRouter()
    const {user} = useContext(UserContext)
    const [champsMaestry, setChampsMaestry] = useState([])
    const [profileIcon, setProfileIcon] = useState('')
    const [backgroudUrl, setBackgroudUrl] = useState([])
    const [level, setLevel] = useState('')
    const { nickName } = router.query
    const [expBorderLevel, setExpBorderLevel] = useState('')



    useEffect(() => {
        if(user){
            console.log(user)
            
            setProfileIcon("https://ddragon.leagueoflegends.com/cdn/11.1.1/img/profileicon/" + user.profileIconId + ".png")
            
            setLevel(user.summonerLevel)
            let encryptedSummonerId = user.id
            
            champApi.getChampsMaestry({
                encryptedSummonerId
            })
            .then(({data}) => {
                let topChamp = champHelper.findChampById(data[0].championId)
                setBackgroudUrl(`http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${topChamp.id}_0.jpg`)
                setChampsMaestry(data)
            })
            .catch((error) => {
                console.error(error)
            })

            
        }
    }, [user])

    useEffect(() => {
        for(let x in expEmblems){
            if(level < 500){
                if(level >= expEmblems[x][0] && level < expEmblems[x][1]){
                    setExpBorderLevel(
                        `${expEmblems[x][0]}-${expEmblems[x][1]}`
                    )
                }
            }else{
                setExpBorderLevel(
                    500
                )
            }
        }
    }, [level])
    

    return(
        <Container>
        <Top style={{ backgroundImage: `url(${backgroudUrl})` }}>

        <ProfileIcon src={profileIcon}></ProfileIcon>
        
        <ExpBorder src={`/exp-emblems/${expBorderLevel}.png`}></ExpBorder>

        <UserLevel>{level}</UserLevel>

        <NickName>{nickName}</NickName>
        </Top>
        
        <LeagueDiv>
            {user &&
                <SummonerLeague></SummonerLeague>
            }
            
        </LeagueDiv>
            </Container>
            )
        }
        
        