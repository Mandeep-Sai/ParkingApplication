import React from 'react'
import "../styles/NavBar.css"
import {RiParkingBoxFill} from "react-icons/ri"
import {Navbar,Nav,Button} from "react-bootstrap"
import {withRouter} from "react-router-dom"
import { useHistory } from 'react-router-dom';

function NavBar() {
  const history = useHistory()
    return (
        <Navbar id="nav"  expand="lg">
        <RiParkingBoxFill/>
        <Navbar.Brand href="#home">Parking</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link active href="/">Home</Nav.Link>
            <Nav.Link href="/">About us</Nav.Link>
            <Nav.Link href="/">Fees</Nav.Link>
            <Nav.Link href="/">Features</Nav.Link>
            <Nav.Link href="/">Contact Us</Nav.Link>
            <Button onClick={()=>history.push("/signin")}>Sign In</Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
}
export default withRouter(NavBar)