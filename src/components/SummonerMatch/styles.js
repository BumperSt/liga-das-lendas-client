import styled from 'styled-components'
import theme from '../../../styles/theme.json'
export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: auto;
    max-height: 100vh;
    align-self: center;
    align-self: flex-end;
`;

export const ScroolContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: auto;
    max-height: 100vh;
    align-self: center;
    @media only screen and (max-width: 900px) {
        width: 100%;
    }
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
`

export const MatchContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin-block:.5rem;
    padding:.5rem;
    width: 100%;
    @media only screen and (max-width: 900px) {
        flex-direction: column;
    }
    border-left: 8px solid ${props => props.win ? 'rgba(0,255,0,0.5)' :'rgba(255,0,0,0.5)'};
    background-color: ${props => props.win ? 'rgba(0,255,0,0.2)' :'rgba(255,0,0,0.2)'};
        -webkit-box-shadow: 10px 8px 13px 8px rgba(0,0,0,0.75);
    -moz-box-shadow: 10px 8px 13px 8px rgba(0,0,0,0.75);
    box-shadow: 10px 8px 13px 8px rgba(0,0,0,0.75);
`


export const ColumMatchContainer = styled.div`
    display: flex;
    flex-direction:column;
    min-height:100%;
    margin-inline: ${props => props.marginInline ? `${props.marginInline}` : '.5rem'};
    ${props => props.center && `justify-content:center;`}
`

export const HeaderMatch = styled(ColumMatchContainer)`
    @media only screen and (max-width: 900px) {
        width: 100%;
        flex-direction: row;
    }
`

export const ChampIcon = styled.img`
    width:6rem;
    margin-block: .5rem;
    border-radius: 50%;
    border: solid 2px;
    @media only screen and (max-width: 900px) {
        margin-left: 0;
        align-self:center;
        width:4rem;
    }
`


export const SpellIncon = styled.img`
    margin-block:.3rem;
    width:2rem;
    border-radius: 50%;
    border: solid 2px;
    @media only screen and (max-width: 900px) {
        margin-left: 0;
        align-self:center;
        width:1rem;

    }
`

export const OnlySmallScreen = styled.div`
    display:flex;
    flex-direction:row;
    align-items: center;
    width: 100%;
    justify-content: space-around;
`

export const TypeTitle = styled.h1`
    font-size:1rem;
    max-width: 5rem;
    white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
    @media only screen and (max-width: 900px) {
        font-size:1rem;
    }
`
export const CharNameAndLevel = styled.h1`
    
    font-size:1.2rem;
    @media only screen and (max-width: 900px) {
        font-size:1rem;
    }
    text-align: center;
`

export const CharKill = styled.span`
    color:#ff6e6e;
`

export const SummonerMarch = styled.h1`
    margin-top:1rem;
    font-size:.8rem;
    text-align: center;
    padding:.1rem;
    background-color:red;
    border-radius: 10px;
`