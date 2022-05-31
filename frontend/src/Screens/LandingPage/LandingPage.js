import React, { useEffect } from "react";
import { Button, Container, Row } from 'react-bootstrap'
import "./LandingPage.css"
import {useNavigate} from 'react-router-dom'

const LandingPage = () => {
  const history = useNavigate();
  const userInfo = localStorage.getItem('userInfo')
  useEffect(() => {
    if (userInfo) {
      history('/home');
    }
  }, [userInfo]);

  return (
    <div className="main">
      <Container>
          <Row>
          <div className="intro-text">
            <div>
              <h1 className="title">Welcome to Courier Management</h1>
              <p className="subtitle"></p>
            </div>
            <div className="buttonContainer">
              <a href ="/login">
                <Button size="lg" className="landingbutton">
                  Login
                </Button>
              </a>
              <a href="/register">
                <Button
                  variant="outline-primary"
                  size="lg"
                  className="landingbutton"
                >
                  Signup
                </Button>
              </a>
            </div>
        </div>
          </Row>
      </Container>
    </div>
  )
}

export default LandingPage
