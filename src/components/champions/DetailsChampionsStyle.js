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
    align-self: center;
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

export const VideoHability = styled.video`
    width: 40rem;
    @media only screen and (max-width: 1280px) {
        width: 20rem;
    }

`

export const HabilitysTitle= styled.h1`
    font-size:5rem;
    @media only screen and (max-width: 1280px) {
        font-size:2rem;
    }
    color:white;


`

export const HabilityKey = styled.h1`
    color:${theme.colors.dourado};
`

export const HabilityDescreption = styled.h1`
    font-size:1.2rem;
    align-self: center;
    overflow: hidden;
    max-width: 90%;
    @media only screen and (max-width: 1280px) {
        min-width: 90%;


    }

`

export const HabilityName = styled.h1`
    font-size:2rem;
    max-width: 50%;
    align-self: center;
    @media only screen and (max-width: 1280px) {
        font-size:1rem;

    }
`

export const CollumAlign = styled.div`
    display:flex;
    flex-direction: column;
    color:white;
    position:relative;
    min-height:25rem;
    @media only screen and (min-width: 600px) {

        max-height:25rem;
        min-width:50vw;
        max-width:50vw;

    }
`