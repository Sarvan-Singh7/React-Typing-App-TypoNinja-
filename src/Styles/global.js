import { createGlobalStyle } from 'styled-components';
export const GlobalStyle = createGlobalStyle`

*{box-sizing : border-box;}

  body {
    background-color:${({theme})=>theme.background}; /*ye theme App.js ke theme provider se ayi hai yahan*/
    color : ${({theme}) => theme.textColor};
    margin :0;
    padding :0;
    transition : all 0.25s linear;
    overflow-y: scroll;
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
    overflow: hidden;
}

.words{
    font-size: 32px;
    display: flex;
    flex-wrap: wrap; 
     align-content:center;
    color : ${({theme}) => theme.typeBoxText} 
}
.word{
    margin:5px;
    padding-right:2px;
}
    .hidden-input{
        opacity : 0;
    }
.current{
    border-left: 1px solid;
    animation: blinkingLeft 2s infinite;
    animation-timing-function: ease;
    @keyframes blinkingLeft{
        0% {border-left-color:${({theme}) => theme.textColor};}
        25% {border-left-color:${({theme}) => theme.background};}
        50% {border-left-color:${({theme}) => theme.textColor};}
        75% {border-left-color:${({theme}) => theme.background};}
        100% {border-left-color:${({theme} )=> theme.textColor};}
    }
}

.right-current{
    border-right: 1px solid;
    animation: blinkingRight 2s infinite;
    animation-timing-function: ease;
    @keyframes blinkingRight{
        0% {border-right-color:${({theme}) => theme.textColor};}   /*also make this work dynamic*/
        25% {border-right-color:${({theme}) => theme.background};}
        50% {border-right-color:${({theme}) => theme.textColor};}
        75% {border-right-color:${({theme}) => theme.background};}
        100% {border-right-color:${({theme}) => theme.textColor};}
    }
}
.correct{
    color : ${({theme}) => theme.textColor };  
}
.incorrect{
    color : red;
}

.upperMenu{     
  display : flex;
  width :1000px;
  margin-left:auto;
  margin-right: auto;
  justify-content: space-between;  /*by this 15 side mein and options to choose time ek side pe*/
  font-size: 1.35rem;
  padding: 0.5rem
}
.modes{       /*This is also for uppermenu ke bhi andar jo 3 options hai unke liyr*/
  display : flex;
  gap : 0.4rem;

}
  .time-mode:hover{  /*add this hover effect to other nodes also*/
      color: green;
      cursor: pointer;
  }

.footer{
    display:flex;
    flex-direction: column;
    align-self: end;
    width :1000px;
    margin-left:auto;
    margin-right:auto;
}
    .actual-footer{
    display: flex;
    justify-content: space-between;
}
    .stats-box{
     display : flex;
     width : 1000px;
     height : auto;
     margin-left: auto;
     margin-right: auto;
    }
     .left-stats{
         width : 30%;
         padding: 30px;
     }
    .right-stats{
    width: 70%;
    }

    .title{
        font-size: 20px;
        color: ${({theme}) => theme.typeBoxText};
        }

    .subtitles{
       font-size: 30px;
    }
    
`;
