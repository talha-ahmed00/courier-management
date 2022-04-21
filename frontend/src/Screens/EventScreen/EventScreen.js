import React, { useEffect, useState } from 'react'
import MainScreen from '../../components/MainScreen'
import {Card, Button} from "react-bootstrap";
import axios from 'axios';
const EventScreen = () => {
    const[events, setEvents] = useState([])

    const fetchData = async () => {
        const {data} = await axios.get("/api/event/getevent");
        setEvents(data)
    };

    useEffect(()=>{
        fetchData();
    },[])

  return (
    <MainScreen title = 'Events'>
        {
            events.map(events=> (
            <Card style={{ width: '18rem' , margin:10 }}>
            <Card.Img variant="top" src= {events.imageThumb} />
            <Card.Body>
              <Card.Title>{events.title}</Card.Title>
              <Card.Text>
                {events.subtext}
              </Card.Text>
              <Card.Text>
                Programme Fee: 
                {events.fee}
              </Card.Text>
              <Button href={events.applyURL} variant="primary">Apply Now</Button>
              
            </Card.Body>
          </Card>))
        }

    
  </MainScreen>
  )
}

export default EventScreen
