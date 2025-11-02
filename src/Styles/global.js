import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`

*{box-sizing : border-box;}

  body {
    background-color: green;
    color : white;
    margin :0;
    padding :0;
    transition : all 0.25s linear;
  }

  .canvas{
  display : grid;
  grid-template-rows : auto 1fr auto;
  min-height : 100vh;
  grid-auto-flow : row;
  gap : 0.5rem;
  padding : 2 rem;
  width 100vw;
  align-items : center;
  text-align : center;}
`;
