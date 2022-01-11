import styled from "styled-components";
import theme from '../../../styles/theme.json'

export const Container = styled.div`
   width:100vw;
   height:100vh;
   justify-content:center;
   display :flex;
   flex-direction:column;

   align-items:center;
   background-color:${theme.colors.backgroundColor};
`

export const Text = styled.h1`
  color:white;
`

export const GoHome = styled.button`
  color:black;
  background-color: white;
  border-radius:6px;
  padding-inline:.8rem;
  padding-block:.5rem;
   border: 3px solid ${theme.colors.dourado};
`