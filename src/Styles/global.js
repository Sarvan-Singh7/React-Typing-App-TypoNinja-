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
    display: grid;
    min-height: 100vh;
    grid-auto-flow: row;
    grid-template-row: auto 1fr auto;
    gap: 0.5rem;
    padding:2rem;
    width:100vw;
    text-align: center;
    align-items: center;
}

.type-box{
    display:block;
    max-width: 1000px;
    height: 140px;
    margin-left:auto;
    margin-right:auto;
    // overflow: hidden;
}

.words{
    font-size: 32px;
    display: flex;
    flex-wrap: wrap;  
}
.word{
    margin:5px;
    padding-right:2px;
`;

