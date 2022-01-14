import styled from "styled-components";
import theme from '../../../styles/theme.json'

export const Container = styled.div`
    width: 100%;
    display:flex;
    flex-direction:row;
    background-color:rgba(0,0,0,0.8);
    border-bottom: 1px solid ${theme.colors.douradoBrilhante};
    padding: 1rem;
    position: relative;
`


export const ButtonDiv = styled.div`
    display:flex;
    justify-self: flex-start;
`
export const ButtonHeader = styled.button`
    font-size: 1rem;
    @media only screen and (max-width: 600px) {
        font-size: .7rem;

    }
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

export const InputSerchDiv = styled.div`
    display:flex;
    width: 30%;
    background-color:red;
    justify-self: center;
    align-self: center;
`