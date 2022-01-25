import styled from 'styled-components'
import theme from '../../../styles/theme.json'

export const Container = styled.div`
    display:flex;
    flex-direction:column;
    position: relative;
    margin: 0px;
    padding: 0px;
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

export const Title = styled.h1`
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
    width: 80%;
    display:flex;
    justify-content:center;
    align-self: center;
`


    export const Bottom = styled.div`
        display:flex;
        flex-direction:column;
        margin-top: 7rem;
        @media only screen and (max-width: 900px) {
            margin-top: 0.5rem;
        }
        margin-bottom: 3rem;
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
export const AlignColum = styled.div`
    display:flex;
    flex-direction:column;
`

export const DivRotation = styled.div`  
    display:flex;
    flex-direction: row;
    flex-flow: row wrap;
    flex-wrap: wrap; 
    justify-content: center;
    max-width: 60%;
    @media (max-width: 768px) {
        max-width: 80%;
    }
    margin-top: 1rem;
`
export const DivChampFace = styled.div`
    transition: all 0.5s;
    padding: .5rem;
    span{
        border: 2px solid ${theme.colors.dourado} !important;
        border-radius: 50%;
    }
    ${({active}) => active && `
        transform: scale(1.2);
        span{
            border: 2px solid #ffa309 !important;
        }
        cursor: pointer;
    `}
    :hover{
        transform: scale(1.2);
        span{
            border: 2px solid #ffa309 !important;
        }
        cursor: pointer;
    }
`
export const ChampFace = styled.img`
    border-radius: 50%;
    border: 2px solid ${theme.colors.dourado};
    transition: border .5s;
    width:5rem;
`

export const DescreptionDiv = styled.div`
    background-color: rgba(0,0,0,0.5);
    width: 50%;
    justify-self: center;
    text-align: center;
    justify-content: center;
    display:flex;
    margin-top: 1rem;
    padding: 1rem;
`

export const ChampLore = styled.h1`
    color:white;
    font-size: 1.5rem;
    max-width: 80%;
`