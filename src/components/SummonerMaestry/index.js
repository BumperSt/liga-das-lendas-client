import React, {useContext, useState, useEffect} from 'react'
import {Container} from './styles'
import UserContext from '../../context/userContext'
import champApi from '../../api/champs'
import champHelper from '../../helpers/champ'

export default function SummonerMaestry({setChampsMaestry, setBackgroudUrl}){

    const {user} = useContext(UserContext)

    useEffect(()=>{
        if(user){
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
    },[user])

    return(
        <Container>
            
        </Container>
    )
}