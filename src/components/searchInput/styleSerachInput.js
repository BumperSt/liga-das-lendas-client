import styled from "styled-components";
import theme from '../../../styles/theme.json'

export const DivInput = styled.div`
    position:relative;
    width: 100%;
    
`


export const Input = styled.input`
    font-size: 1.3rem;
    color: white;
    border: ${theme.colors.dourado} solid 2px;
    background-color:black;
    height: 3rem;
    width: 100%;
    outline: none;
    text-align: start;
    padding-inline: .5rem;
    :-webkit-autofill,
   
    :-webkit-autofill:hover,
    :-webkit-autofill:focus,
    :-webkit-autofill:active {
        transition: background-color 5000s ease-in-out 0s;
        -webkit-text-fill-color: white;

    }
    @media only screen and (max-width: 600px) {
        height: 1rem;
        padding:1rem;


    }

`

export const ButtonLupa = styled.button`
    cursor: pointer;
    position:absolute;
    border: ${theme.colors.dourado} solid 2px;
    background-color:#1a2325;
    border-radius:50%;
    height:3.5rem;
    width:3.5rem;
    top:50%;
    transform:translate(0,-50%);
    right:-1rem;
    @media only screen and (max-width: 600px) {
        height:2.5rem;
        width:2.5rem;
    }
`