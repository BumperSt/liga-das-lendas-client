import styled from "styled-components";
import theme from '../../../styles/theme.json'
import ScrollContainer from 'react-indiana-drag-scroll'

export const Container = styled.div`
    display: flex;
    overflow:hidden;
    flex-direction: column;
    margin-top:1rem;
    position: relative;
`

export const InputSerach = styled.div`
    width:80%;
    align-self: center;
`

export const ScrollDrag = styled(ScrollContainer)`
    display: flex;
    align-items: flex-start;
    width: 100%;
    transition: all 2s;
    scroll-behavior: smooth;
    overflow: hidden !important;
    overflow-x: scroll !important;
    margin-block: 1rem;
    z-index:99;
    @media only screen and (max-width: 600px) {
        width: 100%;
    }
`

export const ScrollSection = styled.section`
    padding: 0px;
    margin: 0px;
    display: flex;
    transition: all 2s;
    padding-top: 1rem;
    padding-bottom: 4rem;
    width: 100%;
    align-items: center;
    @media only screen and (max-width: 1280px) {
        padding-bottom: 3rem;

    }
`

export const ChampCardDiv = styled.div`
    position: relative;
    box-sizing: border-box;
    scroll-snap-align: start;
    text-align: center;
    align-items: center;
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


`

export const ChampName = styled.h3`
    transition: all 0.2s;
    bottom: 0;
    left:50%;
    margin-top: .5rem;
    color:white;
    @media only screen and (max-width: 1280px) {
        font-size:.8rem;
    }
    ${props => props.active && `
        color: #ffa000; 
    `
    }
`

export const ChampionsCard = styled.div`
    position: relative;
    width: 6vw;
    height: 12rem;
    margin-inline:0.2rem;
    ${({hover}) => !hover&&
    `
        span:first-child{
            border-bottom: solid 3px ${theme.colors.dourado} !important;
        }
    `}

    @media only screen and (max-width: 1280px) {
        width: 7vw;
        height: 10rem;
    }
    @media only screen and (max-width: 600px) {
        width: 25vw;

    }
`

export const AlignColum = styled.div`
    display:flex;
    flex-direction: column;
    text-align:start;
    min-width: 100%;
`


export const AlignSkinColum = styled.div`
    display:flex;
    flex-direction: column;
    width: 10rem;
    text-align:center;
    align-items: center;
    transition: all 0.5s;
    height: 100%;
    ${({active}) => active&&`
         transform:scale(1.2);
    `}
    :hover{
        transform:scale(1.2);
        cursor:pointer;
    }
    @media (max-width:600px){
        margin-inline: .5rem;

    }

`