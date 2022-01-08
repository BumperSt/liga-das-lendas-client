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
    width:5rem;
    height:5rem;
    border-radius: 9px;
    background-color:#ffffff33;
    margin-inline: .2rem;
    transition: all 0.5s;
    @media only screen and (max-width: 900px) {
        width:1.5rem;
        height:1.5rem;
        border-radius: 6px;
    }
    ${props=> props.active && `
        width:6rem;
        height:6rem;
        cursor:pointer;
        border:solid 5px ${theme.colors.dourado};
    `}
    :hover{
        width:6rem;
        height:6rem;
        cursor:pointer;
        border:solid 5px ${theme.colors.dourado};

    }
`
export const SpellDiv = styled.div`
    display: flex;
    flex-direction: row;
    align-self: center;
`

export const MaxHeigthDiv = styled.div`
    height:100vh;

`


export const HabillityDiv = styled.div`
    display:flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    @media only screen and (max-width: 900px) {
        flex-direction: column;
    }
    position: relative;
    padding: 5rem;
    
`
export const HabillityVideoDiv = styled.div`
    min-width: 40rem;
`

export const VideoHability = styled.video`
      
    height:30rem;   

`

export const HabilitysTitle= styled.h1`
    font-size:5rem;
    @media only screen and (max-width: 900px) {
        font-size:3rem;

    }
    top:0;
    position: absolute;
    color:white;
    left:50%;
    transform: translateX(-50%);
`

export const CollumAlign = styled.div`
    display:flex;
    flex-direction: column;
    justify-content: center;
    color:white;
    min-height:30rem;
    min-width:70rem;

    position:relative;
    background-color:rgba(0,0,0,0.3);

`