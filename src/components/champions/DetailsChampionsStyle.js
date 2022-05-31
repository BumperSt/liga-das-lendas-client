import styled from "styled-components";
import theme from '../../../styles/theme.json'

export const Container = styled.div`
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
    padding: 1rem;
    padding-inline:10rem;
    align-items: center;
    display:flex;
    flex-direction: row;
    min-width:100vw;
    border-top: 3px ${theme.colors.dourado} solid;
    justify-content: space-between;
    @media (max-width: 768px) {
        flex-direction: column;

    }
`

export const SkinsDiv = styled(HabillityDiv)`
    
    justify-content: flex-start;
    padding-inline:10rem;
    margin-top:0rem;
    border-bottom:0px;
    max-width:100vw;

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
    max-width: 100%;
    @media (max-width: 1280px){
        font-size:.8rem;

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
    min-width: 40%;
    max-width: 40%;
    @media only screen and (max-width: 768px) {
        min-height:25rem;
        justify-content: center;
        max-width: 100%;

    }
`


export const ChampCardDiv = styled.div`
    position: relative;
    box-sizing: border-box;
    text-align: center;
    width: 5vw;
    :hover{
        transform: scale(1.3) translateY(8%);
        cursor: pointer;
        z-index:205;
    }

    ${props => props.active && `
        transform: scale(1.3) translateY(8%); 
        z-index:200;
    `
    }
    transition: all 0.3s;
    @media only screen and (max-width: 600px) {
        width: 20vw;
    }
`


export const ChampionsCard = styled.div`
    margin-inline:0.2rem;
    width: 5vw;
    @media only screen and (max-width: 600px) {
        width: 20vw;
    }
    span:first-child{
        border-bottom: solid 3px ${theme.colors.dourado} !important;
    }
`

export const AlignSkinCollum = styled.div`
    background-color:rgba(0,0,0,0.5);
    display:'flex';
    flex-direction:'collum';
    padding:1rem;
    
`

export const AlignSkinsRow = styled.div`
    display:flex;
    flex-direction:row;
    padding:3rem;
    max-width: 100vw;
    overflow-x: auto;
    overflow-y: hidden;
    width: 100%;
    ::-webkit-scrollbar {
        width: 12px;
    }
    /* Track */
    ::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); 
        -webkit-border-radius: 10px;
        border-radius: 10px;
    }
    /* Handle */
    ::-webkit-scrollbar-thumb {
        -webkit-border-radius: 10px;
        border-radius: 10px;
        background: rgba(140, 108, 54,0.8); 
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5); 
    }
    ::-webkit-scrollbar-thumb:window-inactive {
        background: rgba(140, 108, 54,0.4); 
    }
    @media (max-width: 768px){
        padding-inline:2rem;
        padding-block:1.5rem;

    }
`
