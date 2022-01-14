import styled from "styled-components";

export const Container = styled.div`
    min-width:100%;
    display:flex;
    flex-direction:row;
    background-color:rgba(0,0,0,0.5);
    border-top: solid 1px black;
    padding:.5rem;
    position: absolute;
    bottom:0;
    justify-content:center;
`

export const IconDiv = styled.div`
    img{
        border-radius:60px;
        
    }
    :hover{
        cursor: pointer;
        transform:scale(1.2);
    }
`

