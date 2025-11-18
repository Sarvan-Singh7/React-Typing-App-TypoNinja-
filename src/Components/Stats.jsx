import React, {useEffect} from 'react'
import Graph from './Graph'
import { db,auth } from '../firebaseConfig';
import { toast, Bounce } from 'react-toastify';

const Stats = (
  { wpm,
    accuracy,
    correctChars,
    incorrectChars,
    missedChars,
    extraChars,
    graphData 
  }
  
) => {

    let timeSet = new Set();   ///GRAPH (creater set so that i get unique value of time for graph)
    const newGraph = graphData.filter(i => {
      if(!timeSet.has(i[0])){
        timeSet.add(i[0]);
        return i;
      }
    })

    const pushDataToDB = () => {   //reference to results collection in firebase and this function will push data to firebase
      if(isNaN(accuracy) || isNaN(wpm)){   //like if i typed not a full word so accuracy or wpm will be nan and i will not push that data to db
        toast.error('Invalid Test', {
         position: "top-right",
         autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
            draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
      });
        return;   //if accuracy or wpm is nan then we will not push data to db
      }
      const resultsRef = db.collection('Results');
      const {uid} = auth.currentUser;  //as each user is unique we will store data according to uid
      resultsRef.add({
        wpm : wpm,
        accuracy : accuracy,
        timeStamp : new Date(),
        Characters: `${correctChars}/${incorrectChars}/${missedChars}/${extraChars}`,
        userId : uid,//to identify which user this data belongs to
      }).then((res) => {
        toast.success('Data Saved To DB', {
         position: "top-right",
         autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
            draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
      });
      }).catch((err) => {
        toast.error('Not Able To save Result', {
         position: "top-right",
         autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
            draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
      });
      })
    }

    useEffect(() => {
     if(auth.currentUser){   //only if user is logged in we will push data to db
        pushDataToDB();
     }
     else{
        toast.warning('Login TO save Result', {
         position: "top-right",
         autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
            draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
      });
     }
    },[])



  return(
       <div className="stats-box">
            <div className="left-stats">
               <div className="title">WPM</div>
               <div className="subtitle">{wpm}</div>
               <div className="title">Accuracy</div>
               <div className="subtitle">{accuracy}</div>
               <div className="title">Characters</div>
               <div className="subtitle">{correctChars}/{incorrectChars}/{missedChars}/{extraChars}</div>

            </div>
            <div className="right-stats">
                 {/*Graph will go here */}
                 <Graph graphData = {newGraph}/>

            </div>
       </div>
  )
}
export default Stats;