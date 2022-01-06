import React, {useContext, useState, useEffect} from 'react'
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
    Container, Top, NickName, ProfileIcon, UserLevel, LeagueDiv, BackgroudImage
} from '../../components/nickname/styles'


export default function Summoner() {

    const router = useRouter()
    const {user, setUser} = useContext(UserContext)
    const [champsMaestry, setChampsMaestry] = useState([])
    const [profileIcon, setProfileIcon] = useState('')
    const [backgroudUrl, setBackgroudUrl] = useState(null)
    const [level, setLevel] = useState('')
    const { nickName } = router.query

    useEffect(() => {
        if(user){
            
            setProfileIcon("https://ddragon.leagueoflegends.com/cdn/12.1.1/img/profileicon/" + user.profileIconId + ".png")
            
            setLevel(user.summonerLevel)
            
            champApi.getChampsMaestry({
                encryptedSummonerId: user.id
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

    const UpdateUser = () => {
        summonerApi.updateSummoner({
            nickName
        }).then((response) => {
            console.log(response)
            setUser(response.data)
        }).catch((error) => {

            console.log(error)
        })
    }


    
    if(backgroudUrl){
        return(

      
            <Container>
                <Top >
    
                <ProfileIcon src={profileIcon}></ProfileIcon>
                
                <SummonerExpBorder level={level}></SummonerExpBorder>
                
                <UserLevel>{level}</UserLevel>
    
                <NickName>{nickName}</NickName>
                <button onClick={UpdateUser}>UpdateUser</button>
                </Top>
                
                <LeagueDiv>
                    {user &&
                        <SummonerLeague></SummonerLeague>
                    }
                    
                </LeagueDiv>
                <SummonerMatch/>
                <BackgroudImage style={{ backgroundImage: `url(${backgroudUrl})` }}/>

            </Container>
                )
    }else{
        return(
            <LoadingPage/>

        )
    }
    
    }
        
        