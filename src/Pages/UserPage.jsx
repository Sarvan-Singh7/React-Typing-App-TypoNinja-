import React, {useState} from 'react';
import { db, auth } from '../firebaseConfig';
import {useEffect} from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

const UserPage = () => {

   const[data, setData] =useState([]);
   const[user, loading] = useAuthState(auth);             //to get current logged in user real time
   const navigate = useNavigate();
   
   const fetchUserData = () => {   //USED TO FETCH DATA
      const resultRef = db.collection('Results');     //REFERENCE given to results collection
      const { uid } = auth.currentUser;   //getting current logged in user's uid
      let tempData = [];
      resultRef.where("userId", "==", uid)
      .get().then((snapshot) => {            //to fetch all documents from results collection
        snapshot.docs.forEach((doc) => {
          tempData.push({...(doc.data())});
        });
        setData(tempData);
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
    <center>Hello Success</center>
  )
}
export default UserPage;