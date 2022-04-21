import React, { useEffect } from 'react'
import MainScreen from '../../components/MainScreen'
import axios from 'axios';
const Home = () => {

const fetchNotes = async() =>{
    const data=await axios.get('/api');
    console.log(data)
}    
useEffect(()=>{
    fetchNotes();
},[])  
    return (
    <MainScreen title = 'Welcome'>
      Home
    </MainScreen>
  )
}

export default Home
