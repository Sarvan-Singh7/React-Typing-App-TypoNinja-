import { createGlobalStyle } from 'styled-components';
export const GlobalStyle = createGlobalStyle`

*{box-sizing : border-box;
margin :0;
padding :0;
 overflow-x: hidden;   this will be useful so that screen gets on its own position
}

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
    // display:flex;          //THIS IS A OLD CSS
    // flex-direction: column;
    align-self: end;
    // width :1000px;
    // margin-left:auto;
    // margin-right:auto;
    display: flex;
    justify-content: space-between;
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

   .header{
    display: flex;
    justify-content: space-between;
    width :1000px;
    margin-left:auto;
    margin-right:auto;}

    .user-profile{
    width: 1000px;
    margin: auto;
    display: flex;
    min-height: 15rem;
    background: ${({theme})=>theme.typeBoxText};
    color: ${({theme})=>theme.background};
    border-radius: 20px;
    justify-content: center;
    align-text: center;
}

.user{
    width: 50%;
    display: flex;
    margin-top: 30px;
    margin-bottom: 30px;
    font-size: 1.5rem;
    padding: 1rem;
    // border-right: 2px solid;   used to add line between info and picture
    // border-color: ${({theme}) => theme.background};
}

.info{
    width: 60%;
    padding: 1rem;
    margin-top: 1rem;
}
.picture{
    width: 40%;
}
.total-tests{
    width: 50%;
    font-size: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
}
  .graph-user-page, .table{
    width: 1000px;
    margin: auto;
}  

  .center-of-screen{
    display:flex;
    min-height:100vh;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 3rem;
}
`;
