import styled from 'styled-components'
import theme from '../../../styles/theme.json'


export const Container = styled.div`
    display:flex;
    background-color:${theme.colors.backgroundColor};
    padding: 1rem;
    *{
        ::-webkit-scrollbar {
            width: 12px;
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
            background-color: rgba(140, 108, 54,0.4); 
        }
    }

`

export const ListItemContainer = styled.div`
    display:flex;
    flex-direction:row;
`

export const ListItemByCategory = styled.div`
    display:flex;
    flex-direction:column;
    max-width: 60%;
    max-height: 100vh;

`

export const ListItemName = styled.h1`
    align-self: flex-start;
`

export const ListItemsDiv = styled.div`
    display:flex;
    flex-direction:row;
    padding: 1rem;
    flex-wrap: wrap;
    overflow-y: auto;
    height: 100%;

`

export const ItemDiv = styled.div`
    transition: all 0.2s;
    display:flex;
    flex-direction:column;
    span{
        border: 2px solid ${theme.colors.douradoBrilhante} !important;
        transition:  all .2s ease-in-out;

    }
    padding: 1rem;
    :hover{
        cursor:pointer;
    }
    ${({active}) => active && `
        span{
            
            border: 3px solid ${theme.colors.douradoBrilhante} !important;
            transform:scale(1.2);
        }
    `}
    min-width: 6rem;
    max-width: 6rem;

`

export const ItemPrice = styled.h1`
    text-align:center;
    color:#c0b185;
`

export const ActiveItemContainer = styled.div`
    display:flex;
    flex-direction:column;
    width: 100%;
    min-width: 40vw;
    max-width: 40vw;
    padding-inline: 3rem;

`

export const BuildsIntoDiv = styled.div`
    display:flex;
    flex-direction:column;
`

export const BuildsIntoTitle = styled.h1`

`

export const BuildIntosAlign = styled.div`
    display:flex;
    flex-direction:row;
    overflow:auto;
    padding-block:.5rem;
    ::-webkit-scrollbar {
           height:10px;
    }

`
export const ItemTreeContainer = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    border-top: 2px solid ${theme.colors.douradoBrilhante};

`


export const ItemFromDiv = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
`

export const AlignRow = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:space-around; 
    width:70%;
    align-self: center;
`

export const ActiveItemInformations = styled.div`
    display:flex;
    flex-direction:row;
    padding: 1rem;
    align-items: center;
    border-bottom: solid 1px ${theme.colors.douradoBrilhante};
    width: 80%;
    align-self: center;
`

export const AlignColum = styled.div`
    display:flex;
    flex-direction:column;
    margin-left: 1rem;
`

export const ActiveItemName = styled.h1`
    color:${theme.colors.douradoBrilhante};

`

export const ActiveItemPrice = styled.h1`
    font-size: 1.7rem;
`

export const ItemDescriptionDiv = styled.div`
    display:flex;
    flex-direction: column;
    max-height:100%;
    overflow:auto;
    margin-top: 5rem;
`

export const ActiveItemDescption = styled.p`
    align-self:center;
    margin-block:.25rem;
    font-size: 1.7rem;
    text-align: center;
    color:white;
    font-family: "Cormorant SC",serif;

`
