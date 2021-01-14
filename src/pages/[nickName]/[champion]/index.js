import React, {useContext, useState, useEffect} from 'react'
import UserContext from '../../../context/userContext'
import champHelper from '../../../helpers/champ'
import champApi from '../../../api/champs'
import summonerApi from '../../../api/summoner'

import { useRouter } from 'next/router'

export default function SummonerChampion() {

    const router = useRouter()
    const {user, setUser} = useContext(UserContext)
    const {champion } = router.query
    const [Champ, setChamp] = useState([])
    const [champMatchs, setChampMatchs] = useState()
    const [playerTime, setplayerTime] = useState("")
    let playerTimeaux = 0
    let totalGames = 0
    let beginIndex = 0
    let champsArrayMatch = []

    let gameNum = 0

    function myLoop() {        
        setTimeout(function() {   
            gameNum++;             
            if (gameNum < champMatchs[0].length) {   
                getMatch(champMatchs[0][gameNum].gameId)        
                myLoop();           
            }                   
        }, 500)
      }
                     

    useEffect(() => {
        if(user){
            setChamp(champHelper.findChampByName(champion))
        }       
    }, [user])

    useEffect(() => {
        if(user){
            getChampMatch(beginIndex)
        }
    }, [Champ])

    useEffect(() => {
        if(champMatchs){
            console.log( champMatchs)
            myLoop()
        }
    }, [champMatchs])

    const Loop = ()=>{
        if(beginIndex+100 < totalGames){
            beginIndex += 100
            getChampMatch(beginIndex)
        }else{
            setChampMatchs(champsArrayMatch)
        }

    }

    const getChampMatch = () =>{
        champApi.getChampsMatch({
            encryptedAccountId: user.accountId,
            championID:Champ.key,
            beginIndex
        })
            .then(({data}) => {
                champsArrayMatch.push(data.matches)
                totalGames = data.totalGames
                Loop()
            })
            .catch((error) => {
                console.log(error)
            })
    }
    const  getMatch = (matchId) =>{
        summonerApi.getMatch({
            matchId
        })
        .then(({data}) => {
            playerTimeaux += data.gameDuration
        })
        .catch((error) => {
            console.log(error)
        })
    }

    return(
        <>
            <h1>{champion}</h1>
            <h1>PLAY TIME {playerTime/3600}</h1>
        </>
    )

}