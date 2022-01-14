import styled from "styled-components";
import theme from '../../../styles/theme.json'
export const Container = styled.div`
    display: flex;
    flex-direction: column;
    background-color:rgba(0,0,0,0.3);
    border-radius:6px;
    align-self: center;
    justify-self: center;

`

export const AlignItems = styled.div`
    display: flex;
    flex-direction: row;
    padding: .4rem;

`

export const ItemContainer = styled.img`
    width:2rem;
    height:2rem;
    border-radius: 9px;
    background-color:#ffffff33;
    margin-inline: .2rem;
    @media only screen and (max-width: 900px) {
        width:1.5rem;
        height:1.5rem;
        border-radius: 6px;
    }
    :hover{
        cursor: pointer;
        border: solid 2px ${theme.colors.dourado};
    }
`