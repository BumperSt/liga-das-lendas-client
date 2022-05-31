import styled from "styled-components";
import theme from '../../../styles/theme.json'
export const Container = styled.div`
    display: flex;
    flex-direction: column;
    background-color:rgba(0,0,0,0.3);
    border-radius:6px;
    align-self: center;
    justify-self: center;
    @media only screen and (max-width: 900px) {
        padding:.5rem;
    }
    @media only screen and (max-width: 600px) {
        padding:.25rem;

    }

`

export const AlignItems = styled.div`
    display: flex;
    flex-direction: row;
    padding: .4rem;
    @media (max-width: 900px) {
        padding: 0.1rem;
    }
`

export const ItemContainer = styled.img`
    width:2rem;
    height:2rem;
    border-radius: 9px;
    background-color:#ffffff33;
    margin-inline: .2rem;
    @media (max-width: 600px) {
        width:1.5rem;
        height:1.5rem;
    }
    :hover{
        cursor: pointer;
        border: solid 2px ${theme.colors.dourado};
    }
`