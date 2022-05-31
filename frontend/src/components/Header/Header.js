import React from 'react'
import {Container,Button, Form, FormControl, Nav, Navbar, NavDropdown} from 'react-bootstrap'
import {Link, useNavigate} from 'react-router-dom'
const Header = () => {
  let name = 'user';
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if(userInfo){
    name = userInfo.name;
  }

  const history = useNavigate();

  return (
      <Navbar bg="primary" expand="lg" variant="dark">
  <Container>
    <Navbar.Brand >
        <Link to='/'>
        Courier Management
        </Link></Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      {userInfo ? <Nav className="me-auto">
        <Nav.Link >
            <Link to="/home">
            Home
            </Link>
            </Nav.Link>
        <NavDropdown title={name} id="basic-nav-dropdown">
            
          <NavDropdown.Item href="/profile">My Profile</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item onClick = {()=>{
            localStorage.removeItem("userInfo");
            localStorage.setItem("isAuthenticated", "false");
            history("/login");
          }}>Logout</NavDropdown.Item>
        </NavDropdown>
      </Nav>: <Nav><Nav.Link >
            <Link to="/login">
            Login
            </Link>
            </Nav.Link></Nav>}
    </Navbar.Collapse>
  </Container>
</Navbar>
  )
}

export default Header
