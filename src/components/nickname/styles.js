import styled from 'styled-components'
import theme from '../../../styles/theme.json'



export const Container = styled.div`
    font-family: 'Tajawal', sans-serif;
    display:flex;
    flex-direction:column;
    margin: 0px;
    padding: 0px;
    position: relative;
    max-height: auto;
  
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
    background-size: cover;
    z-index: -1;
    transition: background-image 0.5s;
    background-color: ${theme.colors.backgroundColor};
`

export const RowAlign = styled.div`
    display:flex;
    justify-content: space-between;
    padding-inline: 2.5%;
    width: 100%;
    align-self: center;
    @media only screen and (max-width: 600px) {
        flex-direction:column;
        justify-content: center;
        width: 100%;
        padding-inline: 0%;
        text-align: center;

    }
`

export const ContainerProfileInfo = styled.div`
    display:flex;
    flex-direction: column;
    color:white;
    margin-top: 5rem;
`


export const Top = styled.header`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    

`

export const NickName = styled.h1`
    font-family: 'Tajawal', sans-serif;
    margin: 0;
    margin-top: 3rem;
    color: #fff;
    background-color: rgba(0,0,0,0.5);
    width: 100%;
`




export const ProfileIcon = styled.img`
    margin: 5rem 0 1rem;
    width:10rem;
    border-radius: 50%;
    border: solid 2px;
    @media only screen and (max-width: 900px) {
        margin-left: 0;
        align-self:center;
    }
`

export const UserLevel = styled.h2`
    margin: 0;
    margin-top: -1.6rem;
    font-family: 'Tajawal', sans-serif;
    color: #fff;
    z-index:5;
    width: 100%;
`


export const LeagueDiv = styled.div`
    display:flex;
    margin: 0;
    align-items: center;
`

export const UpdateUserButton = styled.div`
    margin-top:.5rem;
    padding:0.5rem;
    background-color:rgba(0,0,0,0.5);
    border:${theme.colors.dourado} solid 2px;
    :hover{
        transform:scale(1.2);
        border: ${theme.colors.douradoBrilhante} solid 2px;
        transition: all .2s;        
        cursor: pointer;
    }
    border-radius: 6px;
    color:white;
`