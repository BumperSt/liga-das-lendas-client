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

export const HorizonScroll = styled.div`
    margin-top:.5rem;
    display:flex;
    flex-direction: row;
    overflow: visible;
    align-self: center;
    transition: all 2s;
    transform: ${props => props.transaletX && `TranslateX(${props.transaletX}vw)`};
    margin-bottom: 1rem;
    z-index:99;
    
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

export const ChampName = styled.h3`
    transition: all 0.2s;
    bottom: 0;
    left:50%;
    color:white;

    @media only screen and (max-width: 600px) {
        font-size:.8rem;
        margin-bottom: 1rem;
    }
    ${props => props.active && `
        color: #ffa000; 
    `
    }
`

export const ChampionsCard = styled.div`
    
    margin-inline:0.2rem;
    @media only screen and (max-width: 600px) {
        min-width: 20vw;
    }
    


    ${({hover}) => !hover&&
    `
        span:first-child{
            border-bottom: solid 3px ${theme.colors.dourado} !important;
        }
    `

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
    text-align:center;
    margin-right:1rem;
    transition: all 0.5s;
    min-width: 10rem;
    max-width: 10rem;
    height: 100%;
    ${({active}) => active&&`
         transform:scale(1.2);
    `}
    :hover{
        transform:scale(1.2);
        cursor:pointer;
    }
    @media (max-width:600px){
        min-width: 5rem;
        max-width: 5rem;
    }

`