import styled from 'styled-components'





export const Container = styled.div`
    display: flex;
    width:100%;
    padding:1rem;
    justify-content:space-around;
    @media only screen and (max-width: 600px) {
        flex-direction:column;
    }
`

export const DivLeague = styled.div`
    display:flex;
    flex-direction:column;
    background-color:#ffffff33;
    text-align:center;
    width: 100%;
    padding-block-end:1rem;
    -webkit-box-shadow: 10px 8px 13px 0px rgba(0,0,0,0.75);
    -moz-box-shadow: 10px 8px 13px 0px rgba(0,0,0,0.75);
    box-shadow: 10px 8px 13px 0px rgba(0,0,0,0.75);
    margin: 0 1rem 0 1rem;
    @media only screen and (max-width: 600px) {
        margin: 1rem 0 1rem 0;
    }
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
    background-color: rgba(0,0,0,0.5);

`

export const PdlText = styled.h3`
`

export const WinText = styled.h3`
`