import styled from 'styled-components'
import theme from '../../../styles/theme.json'



export const Container = styled.div`
    font-family: 'Tajawal', sans-serif;
    display:flex;
    flex-direction:column;
    margin: 0px;
    padding: 0px;
    max-height: auto;
    overflow: hidden;
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
    background-color: ${theme.colors.backgroundColor};
    
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

export const InputSerchDiv = styled.div`
    display:flex;
    width: 50%;
    justify-content: center;
    align-self: center;
    margin-top:1rem;
`