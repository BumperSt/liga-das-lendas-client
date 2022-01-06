import styled from 'styled-components'

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const MatchContainer = styled.div`
    display: flex;
    flex-direction: row;
    border: 5px solid black;
    margin-block:1rem;
    align-items: center;
    padding:1rem;
    @media only screen and (max-width: 900px) {
        width: 100%;
        flex-direction: column;

    }
    background-color:  rgba(0,0,0,0.5);

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