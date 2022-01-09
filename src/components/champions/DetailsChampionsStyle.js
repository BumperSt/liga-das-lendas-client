import styled from "styled-components";
import theme from '../../../styles/theme.json'

export const Container = styled.div`
    margin-top: 5rem;
    display: flex;
    text-align:center;
    justify-content:center;
    flex-direction:column;
`

export const ChampHistory = styled.h2`
    color:white;
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
    @media only screen and (max-width: 900px) {
        width:1.5rem;
        height:1.5rem;
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
    height:100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
`


export const HabillityDiv = styled.div`
    margin-top:3rem;
    background-color:rgba(0,0,0,0.3);
    padding:5rem;
    max-width: 90vw;
    display:flex;
    flex-direction: row;
    justify-content: space-around;
    @media only screen and (max-width: 1280px) {
        flex-direction: column;
    }
    
`
export const HabillityVideoDiv = styled.div`
    min-width: 10rem;
`

export const VideoHability = styled.video`
    width: 40rem;
`

export const HabilitysTitle= styled.h1`
    font-size:5rem;
    @media only screen and (max-width: 900px) {
        font-size:3rem;
    }
    color:white;

`

export const HabilityKey = styled.h1`
    color:${theme.colors.dourado};
`

export const HabilityDescreption = styled.h1`
    font-size:1rem;
    align-self: center;
    overflow: hidden;


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
    max-height:25rem;
    min-width:50vw;
    max-width:50vw;
`