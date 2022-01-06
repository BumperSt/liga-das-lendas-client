import styled from 'styled-components'
import theme from '../../../styles/theme.json'

export const Container = styled.div`
    display:flex;
    flex-direction:column;
    margin: 0px;
    padding: 0px;
    height: 100%;


`
export const BackgroudImage = styled.div`
    -webkit-filter: brightness(60%);
    filter: brightness(60%);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-position: 50%;
    background-size: cover;
    z-index: -1;
    transition: background-image 0.5s;
`
    export const Top = styled.div`
        display: flex;
        width: 100%;
        padding-top: 8rem;
        @media only screen and (max-width: 900px) {
            padding-top: 4rem;
        }
        align-self:center;
        justify-content:center;
        text-align: center;
    `

export const Title = styled.a`
    color: white;
    font-size: 4rem;
    font-weight: 700;
    font-family: 'Alegreya Sans SC', sans-serif;
    @media only screen and (max-width: 900px) {
        font-size: 4rem;
    }
    :hover {
        cursor: default;
    }
    
`

export const Midle = styled.div`
    padding-top: 5rem;
    @media only screen and (max-width: 900px) {
        padding-top: 3rem;
    }
    width: 100%;
    display:flex;
    justify-content:center;
`
export const DivInput = styled.div`
    position:relative;
    width: 80%;
`
export const Input = styled.input`
    font-size: 1.3rem;
    color: white;
    padding: 1rem;
    border: ${theme.colors.dourado} solid 2px;
    background-color:black;
    height: 3rem;
    width: 100%;
    outline: none;
    text-align: center;

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
`

    export const Bottom = styled.div`
        display:flex;
        flex-direction:column;
        margin-top: 7rem;
        @media only screen and (max-width: 900px) {
            margin-top: 0.5rem;
        }

        justify-content:flex-start;
        align-items:center;
        width: 100%;
        height: 100%;
    `

export const BottomText = styled.h1`
    text-align: center;
    color: white;
    font-weight: 500;
    font-family: 'Alegreya Sans SC', sans-serif;
    font-size: 2.5rem;

`

export const DivRotation = styled.div`  
    width: 80%;
    display:flex;
    flex-direction: row;
    flex-flow: row wrap;
    flex-wrap: wrap; 
    justify-content: center;
`
export const DivChampFace = styled.div`
    transition: all 0.5s;
    width:8rem;
    padding: 1rem;
    :hover{
        width: 9rem;
        img{
            border: 5px solid #ffa309;
        }
        cursor: pointer;
    }
`
export const ChampFace = styled.img`
    width: 100%;
    border-radius: 50%;
    border: 2px solid ${theme.colors.dourado};
    transition: border .5s;
`