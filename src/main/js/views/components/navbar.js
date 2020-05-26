import React, { Component } from "react";
import Navbar from "react-bootstrap/NavBar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";

import Logo from "../../../resources/static/img/logo.png";

import "../../app.scss";

class NavBar extends Component {
    render() {
        let border = {};
        if (this.props.background) {
            border = { borderBottom: "1px solid rgba(0,0,0,0.3)" };
        }

        return (
            <Navbar
                className="px-md-5 py-3 align-items-center text-center"
                variant="light"
                expand="md"
                bg={this.props.background ? "white" : "transparent"}
                style = {border}
            >
                <Navbar.Brand href="/">
                    <img
                        src={Logo}
                        height="30"
                        className="d-inline-block align-top"
                        alt="Newton Logo"
                    />
                </Navbar.Brand>
                <Navbar.Toggle></Navbar.Toggle>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/howitworks">How it works</Nav.Link>
                        <Nav.Link href="#providers">Our providers</Nav.Link>
                        <Nav.Link href="#contact">Contact us</Nav.Link>
                    </Nav>
                    <Nav className="ml-auto align-items-center">
                        <Nav.Link href="#apply" className="mx-3">
                            Apply now
                        </Nav.Link>
                        <Button href="/login" variant="main">Sign In</Button>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default NavBar;
