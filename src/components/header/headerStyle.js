import styled from "styled-components";
import theme from '../../../styles/theme.json'

export const Container = styled.div`
    width: 100%;
    display:flex;
    position: fixed;
    z-index: 100;
    transition: top 0.3s;
    top:0;
    flex-direction:row;
    background-color:rgba(0,0,0,0.8);
    border-bottom: 1px solid ${theme.colors.douradoBrilhante};
    padding: 1rem;
    justify-content: space-between;
    padding-inline:3rem;
    min-height:8vh;
    @media only screen and (max-width: 600px) {
        padding-inline:0rem;
        justify-content: center;
        flex-direction:column;

    }
`


export const ButtonDiv = styled.div`
    display:flex;
    justify-self: flex-start;
    align-items: center;
    @media only screen and (max-width: 600px) {
        justify-content: center;

    }
`
export const ButtonHeader = styled.button`
    font-size: 1.2rem;
    @media only screen and (max-width: 600px) {
        font-size: .7rem;
    }
    transition: all .5s;
    color:white;
    background-color:transparent;
    border: 0px;
    :hover{
        cursor:pointer;
        transform: scale(1.3);
    }
    margin-inline:1rem;
    ${props => props.active && `
        color:${theme.colors.douradoBrilhante};
    `
    }
    :hover{
        color:${theme.colors.douradoBrilhante};

    }
`

export const InputSerchDiv = styled.div`
    display:flex;
    width: 30%;
    background-color:red;
    justify-self: center;
    align-self: center;
    @media only screen and (max-width: 900px) {
        width: 80%;
        margin-top: 1rem;

    }
`

export const SelectLanguage = styled.select`
    background-color: black;
    color:${theme.colors.douradoBrilhante};
    border-color:${theme.colors.douradoBrilhante};
    padding-inline: .5rem;
    font-size: .8rem;
    height: 1.5rem;


`

export const OptionLanguage = styled.option`
    color:white;
    :focus{
        border-color:${theme.colors.douradoBrilhante};
    }
`