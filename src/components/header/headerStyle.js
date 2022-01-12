import styled from "styled-components";
import theme from '../../../styles/theme.json'

export const Container = styled.div`
    display:flex;
    justify-content:center;
    background-color:rgba(0,0,0,0.5);
    border-bottom: 5px solid black;
    padding: 1rem;
    position: relative;

`


export const ButtonHeader = styled.button`
    font-size: 1rem;
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