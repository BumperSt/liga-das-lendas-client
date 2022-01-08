import styled from 'styled-components'
import theme from '../../../styles/theme.json'





export const Container = styled.div`
    display: flex;
    width:100%;
    padding:1rem;
    justify-content:space-around;
    @media only screen and (max-width: 900px) {
        flex-direction:column;
    }
`

export const DivLeague = styled.div`
    display:flex;
    flex-direction:column;
    background-color:  rgba(0,0,0,0.5);
    text-align:center;
    min-width: 30vw;
    padding-block-end:1rem;
    -webkit-box-shadow: 10px 8px 13px 0px rgba(0,0,0,0.75);
    -moz-box-shadow: 10px 8px 13px 0px rgba(0,0,0,0.75);
    box-shadow: 10px 8px 13px 0px rgba(0,0,0,0.75);
    margin: 0 1rem 0 1rem;
    @media only screen and (max-width: 900px) {
        margin: 1rem 0 1rem 0;
    }
    color:white;

`

export const DivRow = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:center;
`

export const LeagueText = styled.h3`
    margin:0.6rem 0 0.6rem 0;

`

export const LeagueIcon = styled.img`
    width: 7rem;
    height: 7rem;
    margin-top:-0.6rem;
    margin-inline: 1rem;

`

export const LeaguePdlDiv = styled.div`
  

`

export const LeagueName = styled.h3`
    margin:0;
    margin-top:1.5rem;
    background-color: ${theme.colors.dourado};

`

export const PdlText = styled.h3`
`

export const WinText = styled.h3`
`