import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import MainScreen from "../../components/MainScreen.js";
import axios from "axios";
import {useNavigate} from 'react-router-dom'


const RegisterScreen = () => {
  const history = useNavigate();
  const userInfo = localStorage.getItem('userInfo')
  useEffect(() => {
    if (userInfo) {
      history('/home');
    }
  }, [userInfo]);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [username, setUserame] = useState("");
  const [pic, setPic] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );


  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [picMessage, setPicMessage] = useState(null);
  
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);



  const SubmitHandler = async (e) =>{
    e.preventDefault();
    if (password !== confirmpassword) {
      setMessage("Passwords do not match");
    }
    else {
      setMessage(null)
      try{
        const config = {
          headers: {
            "Content-type":"application/json"
          },
      };

      setLoading(true)
      const {data} = await axios.post('/api/users/', 
      {name, username, pic, email, password},config)
      console.log(data)
      
      setLoading(false)
      setMessage("User Created Sucessfully");
      history('/login')


      }
      catch (error) {
        setMessage("Username already Taken");
        setLoading(false)
        setError(error.response.data.message)
      }
    }
  }

  const postDetails = (pics) =>{
    if(!pics){
      return setPicMessage("Please Select an Image");
    }
    setPicMessage(null)

    if(pics.type === 'image/jpeg' | pics.type === 'image/png'){

      const dataa = new FormData();
      dataa.append('file',pics)
      dataa.append('upload_preset', 'couriermanagement')
      dataa.append('cloud_name', 'ddsyynz27')
      fetch("https://api.cloudinary.com/v1_1/ddsyynz27/image/upload/", {
        method: "post",
        body: dataa,
      })
      .then((res) => res.json())
      .then ((dataa) => {
        console.log(dataa);
        setPic(dataa.url.toString());
      })
      .catch((err) =>{
        console.log(err);
      })

    }

    else {
      return setPicMessage("Please Select an Image")
    }
  }
  
  return (
    <MainScreen title="Register">
    <div className="loginContainer">
    {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
      {loading && <Loading />}
      <Form onSubmit = {SubmitHandler}>
        <Form.Group controlId="Name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="name"
            value={name}
            placeholder="Enter Your name"
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="Username">
          <Form.Label> Username </Form.Label>
          <Form.Control
            type="username"
            value={username}
            placeholder="Enter Your Username"
            onChange={(e) => setUserame(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              value={email}
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            value={confirmpassword}
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {picMessage && (
            <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
          )}
        </Form.Group>
          <Form.Group controlId="pic" className="mb-3">
          <Form.Label>Profile Picture</Form.Label>
          <Form.Control 
           onChange={(e) => postDetails(e.target.files[0])}
            id="custom-file"
            type="file"
            label="Upload Profile Picture"
            custom
          
          />
          </Form.Group>


        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <Row className="py-3">
        <Col>Have an Account ? <Link to="/login">Login</Link>
        </Col>
      </Row>
    </div>
  </MainScreen>
  );
  
}

export default RegisterScreen

