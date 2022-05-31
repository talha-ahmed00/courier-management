import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import MainScreen from "../../components/MainScreen.js";
import axios from "axios";
import {useNavigate} from 'react-router-dom'
import "./ProfileScreen.css";

const ProfileScreen = () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const history = useNavigate();
    useEffect(() => {
      if (userInfo == null) {
       history('/login')
        
      }
    }, [userInfo]);
    
    

    const [id, setId] = useState(userInfo._id);
    const [name, setName] = useState(userInfo.name);
    const [email, setEmail] = useState(userInfo.email);
    const [username, setUsername] = useState(userInfo.username);
    const [pic, setPic] = useState(userInfo.pic);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [picMessage, setPicMessage] = useState();
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState(false);
    console.log(id)


    const submitHandler = async (e) =>{
        e.preventDefault();
        if (password !== confirmPassword) {
          setMessage("Passwords do not match");
        }
        else {
          setMessage(null)
          try{
            const config = {
              headers: {
                "Content-type":"application/json",
                Authorization : `Bearer ${userInfo.token}`,
              },
          };
    
          setLoading(true)
          const {data} = await axios.post('/api/users/profile', 
          {name, username, pic, email, password, id},userInfo._id,config)
          console.log(data)
          
          localStorage.setItem('userInfo',JSON.stringify(data));
          setLoading(false)
          setSuccess("User Updated Sucessfully");
    
    
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
        <MainScreen title="EDIT PROFILE">
          <div>
            <Row className="profileContainer">
              <Col md={6}>
                <Form onSubmit={submitHandler}>
              {loading && <Loading />}
              {success && (
                <ErrorMessage variant="success">
                  Updated Successfully
                </ErrorMessage>
              )}
              {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                  <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={name}
                      placeholder="Enter Name"
                      onChange={(e) => setName(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
    
                  <Form.Group controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      value={username}
                      placeholder="Enter Username"
                      onChange={(e) => setUsername(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      value={email}
                      placeholder="Enter Email"
                      onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      value={password}
                      placeholder="Enter Password"
                      onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group controlId="confirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      value={confirmPassword}
                      placeholder="Confirm Password"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
              <Form.Group controlId="pic" className="mb-3">
              <Form.Label>Change Profile Picture</Form.Label>
              <Form.Control 
               onChange={(e) => postDetails(e.target.files[0])}
                id="custom-file"
                type="file"
                label="Upload Profile Picture"
                custom
              
              />
              </Form.Group>
                  <Button type="submit" varient="primary">
                    Update
                  </Button>
                </Form>
              </Col>
              <Col
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                  <img src={pic} alt={name} className="profilePic" />
              </Col>
            </Row>
          </div>
        </MainScreen>
      )
  
  
}

export default ProfileScreen
