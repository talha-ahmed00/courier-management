import React from 'react'
import { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import MainScreen from "../../components/MainScreen";
import Loading from "../../components/Loading";
import "./LoginScreen.css";
import axios from "axios";
import ErrorMessage from '../../components/ErrorMessage';
import {useNavigate} from 'react-router-dom'
const LoginScreen = () => {

  const history = useNavigate();


    
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  
  const userInfo = localStorage.getItem('userInfo')
  useEffect(() => {
    if (userInfo) {
      history('/home');
    }
  }, [userInfo]);

  const submitHandler = async (e) => {
    setError(false)
    e.preventDefault();

    try{
      const config = {
        headers: {
          "Content-type":"application/json"
        }
      }

      setLoading(true)
      const {data} = await axios.post('/api/users/login', {username,password},config)
      console.log(data)
      if (data == "Wrong Credentials"){
        setError(data)
        setLoading(false)
      }
      else{
      localStorage.setItem("isAuthenticated", "true");

      localStorage.setItem('userInfo',JSON.stringify(data));
      if(data.isAdmin == true)
      {history('/admin')
      }
      }
      setLoading(false)
    } catch(error){
        setError(error.response.data.message)
        setLoading(false)
    }
      
  };

  return (
    <MainScreen title="LOGIN">
      <div className="loginContainer">
        {error && <ErrorMessage variant ='danger'> {error} </ErrorMessage>}
        {loading && <Loading />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="username"
              value={username}
              placeholder="Enter Username"
              onChange={(e) => setUsername(e.target.value)}
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

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <Row className="py-3">
          <Col>
            New Customer ? <Link to="/register">Register Here</Link>
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
  
}

export default LoginScreen
