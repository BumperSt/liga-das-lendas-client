import styled from 'styled-components'

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: auto;
    width: 100%;
    max-height: 100vh;
    align-self: center;

`;

export const ScroolContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: auto;
    width: 80vw;
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
    border: 5px solid black;
    border-left: 8px solid ${props => props.win ? 'rgba(0,255,0,0.5)' :'rgba(255,0,0,0.5)'};

    margin-block:.5rem;
    align-items: center;
    padding:1rem;
    @media only screen and (max-width: 900px) {
        width: 100%;
        flex-direction: column;

    }
    background-color: ${props => props.win ? 'rgba(0,255,0,0.2)' :'rgba(255,0,0,0.2)'} ;

`

export const ColumMatchContainer = styled.div`
    display: flex;
    flex-direction:column;
    align-items:center;
    margin-inline:1rem;
    @media only screen and (max-width: 900px) {
        margin-inline:.1rem;

    }

`

export const ChampIcon = styled.img`
    width:8rem;
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

    width:3rem;
    border-radius: 50%;
    border: solid 2px;
    @media only screen and (max-width: 900px) {
        margin-left: 0;
        align-self:center;
        width:2rem;

    }
`

export const OnlySmallScreen = styled.div`
    display:flex;
    flex-direction:row;
    align-items: center;
`

export const TypeTitle = styled.h1`
    font-size:1.5rem;
    @media only screen and (max-width: 900px) {
        font-size:1rem;
    }
`
export const CharNameAndLevel = styled.h1`
    font-size:1.5rem;
    @media only screen and (max-width: 900px) {
        font-size:1rem;
    }
    text-align: center;

`