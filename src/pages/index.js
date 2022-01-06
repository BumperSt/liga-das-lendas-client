import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import champApi from '../api/champs'

import {
    Container, Title, Input, DivInput, Top, Midle, ButtonLupa, Bottom, BottomText, DivRotation, ChampFace, DivChampFace, BackgroudImage
} from '../components/home/styles'

import champHelper from '../helpers/champ'


export default function HomePage() {
    const router = useRouter()

    const [nickName, setNickName] = useState('')
    const [champRotation, setChampRotation] = useState([])
    const [backgroudUrl, setBackgroudUrl] = useState([])
    const [mouseOverChamp, setMouseOverChamp] = useState('')
    
    useEffect(() => {
        champApi.getChampsRotation()
            .then(({ data }) => {
                let champs = champHelper.filterRotationChamps(data.freeChampionIds)
                setChampRotation(champs)
                console.log(champs)
                setBackgroudUrl(`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champs[0].id}_0.jpg`)
            })
            .catch((error) => {
                console.error(error)
            })
    }, [])

    const sendNickName = (event) => {
        event.preventDefault()
        router.push(nickName)
    }


    const changeBackgroud = (champ) =>{
        setBackgroudUrl(`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champ}_0.jpg`)
    }

    return (
        <>
            <Container>
                <Top>
                    <Title>Liga das Lendas</Title>
                </Top>
                <Midle>
                    <DivInput>
                        <form method='POST' onSubmit={sendNickName}>
                            <Input value={nickName} onChange={(evt) => setNickName(evt.target.value)} placeholder="Digite seu usuário, invocador"></Input>
                            <ButtonLupa>
                                <Image src="/svg/lupa.svg" width="32" height="32"></Image>
                            </ButtonLupa>
                        </form>
                    </DivInput>
                </Midle>
                <Bottom>
                    <BottomText>Rotação De Campeões</BottomText>
                    <DivRotation>
                        {
                            champRotation.map((champ) => (
                                <DivChampFace title={champ.name} key={champ.id} onClick={() => changeBackgroud(champ.id)} >
                                    <ChampFace src={`http://ddragon.leagueoflegends.com/cdn/12.1.1/img/champion/${champ.id}.png`} />
                                </DivChampFace>
                            ))
                        }
                    </DivRotation>
                </Bottom>
                <BackgroudImage style={{ backgroundImage: `url(${backgroudUrl})` }}></BackgroudImage>
            </Container>
        </>
    )
}