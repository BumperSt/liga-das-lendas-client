import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;

`

export const AlignItems = styled.div`
    display: flex;
    flex-direction: row;
    padding: .4rem;

`

export const ItemContainer = styled.img`
    width:3rem;
    height:3rem;
    border-radius: 9px;
    background-color:#ffffff33;
    margin-inline: .2rem;
    @media only screen and (max-width: 900px) {
        width:1.5rem;
        height:1.5rem;
        border-radius: 6px;
    }
`