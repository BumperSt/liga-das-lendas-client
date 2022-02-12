import styled from "styled-components";

export const Continaer = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    max-width: 100%;

`

export const SelectSkin = styled.div`
    display:flex;
    flex-direction:row;
    overflow-x: auto;
    overflow-y: hidden;
    max-width: 80%;
    padding-block:2rem;
    background-color: rgba(0,0,0,0.5);
    ::-webkit-scrollbar {
        width: 12px;
        height: 10px;
    }
    /* Track */
    ::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); 
        -webkit-border-radius: 10px;
        border-radius: 10px;
    }
    /* Handle */
    ::-webkit-scrollbar-thumb {
        -webkit-border-radius: 10px;
        border-radius: 10px;
        background: rgba(140, 108, 54,0.8); 
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5); 
    }
    ::-webkit-scrollbar-thumb:window-inactive {
        background: rgba(140, 108, 54,0.4); 
    }
`