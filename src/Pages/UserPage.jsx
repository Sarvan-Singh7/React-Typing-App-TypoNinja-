import React, {useState} from 'react';
import { db, auth } from '../firebaseConfig';
import {useEffect} from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import TableUserData from '../Components/TableUserData';
import Graph from '../Components/Graph';

const UserPage = () => {

   const[data, setData] =useState([]);
   const[user, loading] = useAuthState(auth);             //to get current logged in user real time
   const navigate = useNavigate();
   const [graphData, setGraphData] = useState([]);       //state to hold graph data WPM vs Time
   
   const fetchUserData = () => {   //USED TO FETCH DATA
      const resultRef = db.collection('Results');     //REFERENCE given to results collection
      const { uid } = auth.currentUser;   //getting current logged in user's uid
      let tempData = [];
      let tempGraphData = [];
      resultRef.where("userId", "==", uid)
      .orderBy("timeStamp","desc")   //based on timestamp order the data in descending order
      .get().then((snapshot) => {            //to fetch all documents from results collection
        snapshot.docs.forEach((doc) => {
          tempData.push({...(doc.data())});
          tempGraphData.push([doc.data().timeStamp.toDate().toLocaleString().split(',')[0], doc.data().wpm]);  //pushing array of [time,wpm] to graph data
        });
        setData(tempData);
        setGraphData(tempGraphData.reverse());  //as we want graph data in ascending order of time so reversing it
      });
   };
   
   useEffect(() => {
     if(!loading){
        fetchUserData();     //when compoenent loads then firebase also loads data from firestore
     }
     if(!loading && !user){
      navigate('/');      //if user is not logged in then navigate to home page
     }
   },[loading])

     if(loading){
      return <CircularProgress />;
     }

  return(
    <div className="canvas">
      <Graph graphData={graphData} type ='date'/>
      <TableUserData data={data}/>
    </div>
  )
}
export default UserPage;