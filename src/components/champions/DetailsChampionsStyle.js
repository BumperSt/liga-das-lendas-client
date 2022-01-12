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
    @media only screen and (min-width: 1280px) {
       max-width: 80%;

    }
    @media only screen and (max-width: 600px) {
        font-size: 1.2rem;

    }
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
    @media only screen and (max-width: 1280px) {
        width:2.5rem;
        height:2.5rem;
        border-radius: 6px;
    }
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
`
export const SpellDiv = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 2rem;
    

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
    padding:5rem;
    @media only screen and (max-width: 600px) {
        flex-direction: column;
    }
    padding:1rem;
    justify-content: center;
    align-items: center;
    display:flex;
    flex-direction: row;

    
`
export const HabillityVideoDiv = styled.div`
    min-width: 40rem;
    min-height: 28rem;
    position: relative;
    justify-content: center;
    @media only screen and (max-width: 1280px) {
        min-width: 20rem;
        min-height: 15rem;

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
    width: 40rem;
    z-index:10;
    @media only screen and (max-width: 1280px) {
        width: 20rem;
    }

`

export const HabilitysTitle= styled.h1`
    font-size:5rem;
    color:${theme.colors.dourado};

    @media only screen and (max-width: 1280px) {
        font-size:2rem;
    }


`

export const HabilityDescreptionDiv = styled.div`
    min-width: 100%;
    align-self: center;
    display: flex;
    flex-direction: column;
    text-align: left;
`

export const HabilityKey = styled.h1`
    color:${theme.colors.dourado};
`

export const HabilityDescreption = styled.h1`
    font-size:1.2rem;
    overflow: hidden;
    max-width: 100%;
    @media only screen and (max-width: 1280px) {
        min-width: 90%;


    }

`

export const HabilityName = styled.h1`
    font-size:2rem;
    max-width: 50%;
    @media only screen and (max-width: 1280px) {
        font-size:1rem;

    }
`

export const CollumAlign = styled.div`
    display:flex;
    flex-direction: column;
    color:white;
    text-align: left;

    position:relative;
    min-height:25rem;
    @media only screen and (min-width: 600px) {

        max-height:25rem;
        min-width:50vw;
        max-width:50vw;

    }
`