import styled from "styled-components";
import theme from '../../../styles/theme.json'

export const Container = styled.div`
    width: 100%;

    display:flex;
    background-color:rgba(0,0,0,0.8);
    border-bottom: 1px solid ${theme.colors.douradoBrilhante};
    padding: 1rem;

`


export const ButtonHeader = styled.button`
    font-size: 1.5rem;
    transition: all .5s;
    color:white;
    background-color:transparent;
    border: 0px;
    :hover{
        cursor:pointer;
        transform: scale(1.5);
    }
    margin-inline:1rem;
    ${props => props.active && `
        color:${theme.colors.douradoBrilhante};
    `
    }
`