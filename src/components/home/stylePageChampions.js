import styled from "styled-components";
import theme from '../../../styles/theme.json'
export const Container = styled.div`
    width:100vw;
    height:100vh;
    overflow-x:hidden;
    display: flex;
    flex-direction: column;

`

export const HorizonScroll = styled.div`
    display:flex;
    flex-direction: row;
    overflow: visible;
    align-self: center;
    transition: all 2s;
    transform: ${props => props.transaletX && `TranslateX(${props.transaletX}vw)`};

`
export const ChampCardDiv = styled.div`
    position: relative;
    box-sizing: border-box;
    width: 10vw;
    :hover{
        transform: scale(1.2) translateY(5%);
        cursor: pointer;
        z-index:205;
    }

    ${props => props.active && `
        transform: scale(1.2) translateY(5%); 
        z-index:200;
    `
    }
    transition: all 0.3s;
    border-bottom: solid 3px ${theme.colors.dourado};

`

export const ChampName = styled.h3`
    position: absolute;
    transition: all 0.2s;
    bottom: 0;
    color:white;
`

export const ChampionsCard = styled.img`
    background-color:blue;
    margin-inline:0.2rem;
    width: 100%;
    height: 100%;
`
