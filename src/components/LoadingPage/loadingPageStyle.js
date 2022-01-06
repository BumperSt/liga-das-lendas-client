import styled from "styled-components";
import theme from '../../../styles/theme.json'

export const Container = styled.div`
   width:100vw;
   height:100vh;
   justify-content:center;
   display :flex;
   align-items:center;
   background-color:${theme.colors.backgroundColor};
`