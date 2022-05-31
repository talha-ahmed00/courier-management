import React, { useState, useEffect } from 'react'
import MainScreen from '../../components/MainScreen'
import {Card, Button} from "react-bootstrap";
import axios from 'axios';
import { Accordion, Badge} from "react-bootstrap";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import {useNavigate} from 'react-router-dom'
const Home = () => {
  const history = useNavigate();
  
    const[orders, setOrders] = useState([])
    
    const Auth = JSON.parse(localStorage.getItem("isAuthenticated"));
    useEffect(() => {
      if (Auth == false) {
        history('/login');
      }
    }, []);
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const [cid, setCId] = useState(userInfo._id);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);




    const cancelHandler = async (id, status) => {

      if(status != 'Booked'){
        (window.confirm("Your order is already picked up, It cannot be cancelled now"))

      }
      else{
      if(window.confirm("Are you sure?")) {
        const config = {
          headers: {
            "Content-type":"application/json"
          },
        }
        const {data} = await axios.post('/api/orders/updateorder', 
          {id, status},config)
          console.log(data)
          setSuccess("Order Cancelled Sucessfully");

      }
    }
    };

    const fetchData = async () => {
      const config = {
        headers: {
          "Content-type":"application/json",
        },
    };

    
    const {data} = await axios.post('/api/orders/getorder', {cid},config)
    console.log(data)
    setOrders(data)
    
    }

    useEffect(()=>{
        fetchData();
    },[])

  return (
    <MainScreen title = 'Home'>
        
        <a href="/orders">


        <Button style={{ margin: 10, marginBottom: 6 }} size="lg">
        New Order
        </Button>
        </a>
        
        {success && (
                <ErrorMessage variant="success">
                  {success}
                </ErrorMessage>
              )}

        {!orders && (
          <div>
            You have not placed any order yet
          </div>
        )}
          
        {

          
          orders.map(orders=>(
          
            <Accordion defaultActiveKey={["0"]}>
          <Accordion.Item eventkey="0">
              <Card style={{ margin: 10 }}>
            <Card.Header style={{ display: "flex" }}>
              <span
              style={{
               color: "black",
               textDecoration: "none",
               flex: 1,
               cursor: "pointer",
               alignSelf: "center",
               fontSize: 18,}}
               >
                   <Accordion.Button as={Card.Text} variant="link">
                    Order No: {orders._id} From {orders.pickupcity} To {orders.deliverycity}
                  </Accordion.Button>
                 
                  </span>
              
              <div>
                <Button href={`/order/${orders._id}` } disabled = {orders.status != "Booked"}>Update </Button>
                
                <Button variant = 'danger' className = 'mx-2' disabled = {orders.status == "Cancelled"}onClick={() => cancelHandler(orders._id,orders.status)}>Cancel</Button>
                
                </div>

            </Card.Header>
            <Accordion.Collapse>
            <Card.Body>
            <Card.Body>
                     <h4>
                       <Badge variant="Success">
                         Status - {orders.status}
                       </Badge>
                     </h4>
                     <blockquote className="blockquote mb-0">

                       <p>Pickup Address: {orders.pickupaddress} </p>
                       <p>Delivery Address: {orders.deliveryaddress }</p>
                       <p>Delivery Charges: {orders.cost}</p>
                       <footer className="blockquote-footer">
                         Booked on{" "}
                         <cite title="Source Title">
                           {orders.createdAt.substring(0, 10)}
                         </cite>
                       </footer>
                     </blockquote>
                   </Card.Body>
            </Card.Body>
            
            </Accordion.Collapse>
          </Card>
          </Accordion.Item>
          </Accordion>
          

            

          ))
              
        }
      
       
         

    
  </MainScreen>
  )
}

export default Home
