import styled from 'styled-components'





export const Container = styled.div`
    display: flex;
    width:100%;
    padding:1rem;
    justify-content:center;
`

export const DivLeague = styled.div`
    display:flex;
    flex-direction:column;
    background-color:white;
    width:50%;
    margin: 0 1rem 0 1rem;
    text-align:center;
    -webkit-box-shadow: 10px 8px 13px 0px rgba(0,0,0,0.75);
    -moz-box-shadow: 10px 8px 13px 0px rgba(0,0,0,0.75);
    box-shadow: 10px 8px 13px 0px rgba(0,0,0,0.75);
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
    position:absolute;
    margin-top:-0.6rem;
`

export const LeaguePdlDiv = styled.div`
  

`

export const LeagueName = styled.h3`
    margin:0;
    margin-top:1.5rem;
    background-color:#d2bf74;
`

export const PdlText = styled.h3`
    padding-right:4rem;
`

export const WinText = styled.h3`
    padding-left:4rem;
`