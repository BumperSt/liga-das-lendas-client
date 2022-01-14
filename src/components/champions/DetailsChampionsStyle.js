import styled from "styled-components";
import theme from '../../../styles/theme.json'

export const Container = styled.div`
    margin-top: 1rem;
    display: flex;
    text-align:center;
    justify-content:center;
    flex-direction:column;
`

export const ChampHistory = styled.h2`
    color:white;
    @media only screen and (max-width: 600px) {
        font-size: 1.2rem;
    }
    max-width:90vw;

    align-self: center;
    align-self: center;
`

export const ChampTitle = styled.h1`
    color:white;
    margin-bottom: 1.5rem;
`

export const ChampName = styled.h1`
    color:white;

`

export const SpellImg = styled.img`
    margin-top: 2rem;
    width:4rem;
    height:4rem;
    border-radius: 9px;
    background-color:#ffffff33;
    margin-inline: .8rem;
    z-index:200;
    transition: transform 0.5s;
    ${props=> props.active && `
        transform: scale(1.5);
        z-index:201;
        cursor:pointer;
        border:solid 2px ${theme.colors.dourado};
    `}
    :hover{
        transform: scale(1.5);
        cursor:pointer;
        border:solid 2px ${theme.colors.dourado};
        z-index:201;
    }
    @media (max-width: 1600px){
        width:3rem;
        height:3rem;
    }
`
export const SpellDiv = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 2rem;
    @media (max-width: 768px){
        justify-content: center;
    }
    

`

export const MaxHeigthDiv = styled.div`
    text-align: center;
    min-height:100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
`


export const HabillityDiv = styled.div`
    margin-top:3rem;
    background-color:rgba(0,0,0,0.3);
    justify-content: space-around;
    padding: 1rem;
    align-items: center;
    display:flex;
    flex-direction: row;
    min-width:100vw;
    @media (max-width: 768px) {
        flex-direction: column;

    }
`
export const HabillityVideoDiv = styled.div`
    min-width: 30rem;
    max-width: 30rem;
    position: relative;
    justify-content: center;
    @media (max-width: 1600px){
        max-width: 25rem;
        min-width: 25rem;
        min-height: 20rem;
    }


`

export const VideoUndefined = styled.img`
    width: 100%;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    z-index:0;
`

export const UndefinedTilte = styled.h1`
    z-index: 5;
    color:white;
    position:absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom:25%;
    width: 100%;
    font-size:1.5rem;
`

export const VideoBlitz = styled.img`
    width: 35%;
    position: absolute;
    top: 35%;
    left: 50%;
    transform: translateY(-50%)  translateX(-50%);
    z-index:0;
`


export const VideoHability = styled.video`
    position: relative;
    width: 100%;
    z-index:10;

`

export const HabilitysTitle= styled.h1`
    font-size:5rem;
    color:${theme.colors.dourado};
    @media (max-width: 1600px){
        font-size:3rem;
    }

    @media (max-width: 768px){

        text-align: center;

    }
`

export const HabilityDescreptionDiv = styled.div`
    display: flex;
    flex-direction: column;
    text-align: left;
    @media (max-width: 768px){
        align-items: center;
        text-align: center;

    }
`

export const HabilityKey = styled.h1`
    color:${theme.colors.dourado};

`

export const HabilityDescreption = styled.h1`
    font-size:1.2rem;
    overflow: hidden;
    max-width: 90%;


    @media (max-width: 768px){
        font-size:.8rem;
        max-width: 90%;

    }

`

export const HabilityName = styled.h1`
    font-size:2rem;

`

export const CollumAlign = styled.div`
    display:flex;
    flex-direction: column;
    color:white;
    text-align: left;
    position:relative;
    min-height:25rem;
    max-height:25rem;
    min-width: 40%;
    max-width: 40%;
    @media only screen and (max-width: 768px) {
        min-height:25rem;
        justify-content: center;
        max-width: 100%;

    }
`