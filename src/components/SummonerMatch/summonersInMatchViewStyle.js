import styled from "styled-components";
import theme from '../../../styles/theme.json'
export const Container = styled.div`
    display:flex;
    flex-direction:row;

`

export const AlignTeam = styled.div`
    display:flex;
    flex-direction:column;
`

export const AlingChampImgAndName = styled.div`
    display:flex;
    flex-direction:row;
    align-items:center;
    margin-block: .2rem;
    ${props => props.active && `
        cursor: pointer;
        color:${theme.colors.dourado};
        img{
            border: 2px solid ${theme.colors.dourado};
        }
    `}
    :hover{
        cursor: pointer;
        color:${theme.colors.dourado};
        img{
            border: 2px solid ${theme.colors.dourado};
        }
    }
`

export const ChampImg = styled.img`
    width: 1.5rem;
    height: 1.5rem;
    @media (max-width: 800px){
        width:1rem;
        height: 1rem;
    }
`

export const SummonerName = styled.h4`
    max-width: 5rem;
    margin-left: .5rem;
    overflow: hidden;
    text-overflow: ellipsis; 
    white-space: nowrap; 
    @media (min-width: 800px){
        font-size:1rem;
    }

`