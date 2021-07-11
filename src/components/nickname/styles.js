import styled from 'styled-components'



export const Container = styled.div`
    font-family: 'Tajawal', sans-serif;
    display:flex;
    flex-direction:column;
    margin: 0px;
    padding: 0px;

`

export const Top = styled.header`
    height: 25em;
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
    @media only screen and (max-width: 600px) {
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
    background-color: white;
    margin: 0;
    align-items: center;
`