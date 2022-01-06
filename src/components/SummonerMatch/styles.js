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
    width: 90%;
    align-items: center;
    padding:1rem;
    @media only screen and (max-width: 600px) {
        width: 100%;

    }

`

export const ColumMatchContainer = styled.div`
    display: flex;
    flex-direction:column;
    align-items:center;
    margin-inline:1rem;
    @media only screen and (max-width: 600px) {
        margin-inline:.1rem;
    }

`

export const ChampIcon = styled.img`
    width:8rem;
    border-radius: 50%;
    border: solid 2px;
    @media only screen and (max-width: 600px) {
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
    @media only screen and (max-width: 600px) {
        margin-left: 0;
        align-self:center;
        width:2rem;

    }
`