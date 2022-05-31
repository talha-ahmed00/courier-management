import React from 'react'
import MainScreen from '../../components/MainScreen'
import { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import axios from "axios";
import {useNavigate} from 'react-router-dom'
import "./NewOrder.css";

const NewOrder = () => {
    const history = useNavigate();
    
    useEffect(() => {
      const Auth = JSON.parse(localStorage.getItem('isAuthenticated'));
      console.log(Auth)
      if (Auth === 'false') {
       history('/login')
        
      }
    }, []);
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    
    const [pickupcity, setPickupCity] = useState("");
    const [pickupaddress, setPickupAddress] = useState("");
    const [deliverycity, setDeliveryCity] = useState("");
    const [deliveryaddress, setDeliveryAddress] = useState();
    const [packagetype, setPackageType] = useState("");
    const [cid, setCID] = useState(userInfo._id);
    const [weight, setWeight] = useState(null);
    const [length, setLength] = useState("");
    const [height, setHeight] = useState("");
    const [width, setWidth] = useState();
    const [cost, setCost] = useState("");
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
  
  

    const costCalculate = () =>{
      let deliverycost = 0
      
      if(pickupcity === deliverycity){
        deliverycost = deliverycost + 80
      }
      else{
        deliverycost = deliverycost + 180
      }
      if(weight < 5){
        deliverycost += 10 
      }
      else if(weight < 10){
        deliverycost += 30
      }
      else{
        deliverycost += 50
      }
      if(packagetype == 'Silver'){
        deliverycost += 0
      }
      else if(packagetype == 'Gold'){
        deliverycost += 50
      }
      else if(packagetype == 'Platinum'){
        deliverycost += 100
      }
      setCost(deliverycost)
      
     
    }
  
    const SubmitHandler = async (e) =>{
      costCalculate();
      e.preventDefault();
    if(pickupaddress == "" || pickupcity == "None" || deliveryaddress == "" || deliverycity == "None" || weight == "" || length == "" || height == "" || width == "" || packagetype == "None" ){
        setMessage("Please fill all the fields")
    }
    else{
      setMessage(null);
      
      await costCalculate();


        
      
    }
    localStorage.setItem('order',JSON.stringify({cost,cid,pickupcity, pickupaddress, deliverycity, deliveryaddress, weight, length, height, width, packagetype}))

  }
    
    
    return (
      <MainScreen title="Order Details">
      <div className="loginContainer">
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
        {loading && <Loading />}
        <Form onSubmit = {SubmitHandler}>
          <Form.Group controlId="Pickup Address">
            <Form.Label>Pickup Address</Form.Label>
            <Form.Control
              type="address"
              value={pickupaddress}
              placeholder="Enter Your Pickup Address"
              onChange={(e) => setPickupAddress(e.target.value)}
            
            />
          </Form.Group>
  
          
          <Form.Select aria-label="Pickup City" value={pickupcity}  onChange={(e) => setPickupCity(e.target.value)}>
          <option value="None">Select Pickup City</option>
          <option value="Karachi">Karachi</option>
          <option value="Lahore">Lahore</option>
          <option value="Islamabad">Islamabad</option>
          </Form.Select>
          
  
          <Form.Group controlId="Delivery Address">
              <Form.Label>Delivery Address</Form.Label>
              <Form.Control
                type="address"
                value={deliveryaddress}
                placeholder="Enter Delivery Address"
                onChange={(e) => setDeliveryAddress(e.target.value)}
              />
            </Form.Group>
            
          <Form.Select aria-label="Delivery City" value={deliverycity}  onChange={(e) => setDeliveryCity(e.target.value)}>
          <option value="None">Select Delivery City</option>
          <option value="Karachi">Karachi</option>
          <option value="Lahore">Lahore</option>
          <option value="Islamabad">Islamabad</option>
          </Form.Select>
  
          <Form.Group controlId="weight">
            <Form.Label>Weight</Form.Label>
            <Form.Control
              type= 'number'
              value={weight}
              placeholder="Enter Weight in KG"
              onChange={(e) => setWeight(e.target.value)}

            />
          </Form.Group>
          <Form.Group controlId="height">
            <Form.Label>Height</Form.Label>
            <Form.Control
              type="height"
              value={height}
              placeholder="Enter Height in cm"
              onChange={(e) => setHeight(e.target.value)}

            />
          </Form.Group>

          <Form.Group controlId="length">
            <Form.Label>length</Form.Label>
            <Form.Control
              type="length"
              value={length}
              placeholder="Enter Length in cm"
              onChange={(e) => setLength(e.target.value)}

            />
          </Form.Group>
          <Form.Group controlId="width">
            <Form.Label>width</Form.Label>
            <Form.Control
              type="width"
              value={width}
              placeholder="Enter Width in cm"
              onChange={(e) => setWidth(e.target.value)}

            />
          </Form.Group>
          
          

          <Form.Select aria-label="Package Type"  value={packagetype}  onChange={(e) => setPackageType(e.target.value)}>
          <option value="None">Select Package Type</option>
          <option value="Silver">Silver (5 Days Delivery) </option>
          <option value="Gold">Gold (2 Days Delivery) </option>
          <option value="Platinum">Platinum (1 Day Delivery)</option>
          </Form.Select>

          <Button variant="primary" type="submit">
            Confirm
          </Button>

          
        </Form>
        
      </div>
    </MainScreen>
    );
}

export default NewOrder
