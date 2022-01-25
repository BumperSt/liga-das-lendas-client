import styled from "styled-components";
import theme from '../../../styles/theme.json'

export const Container = styled.div`
   height:92vh;
   display :flex;
   align-items:center;
   overflow:hidden;
   display:flex;
   flex-direction:column;
   padding-block:10rem;
`

export const NotFoundMessage = styled.h1`
   color:${theme.colors.douradoBrilhante};
`