const ReactDOM = require('react-dom');

import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/NavBar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import Logo from "../resources/img/logo.png";
import Icon from "../resources/img/icon.png";
import Doctor from "../resources/img/doctor.png";
import Transparent from "../resources/img/transparent.svg";
import Flexible from "../resources/img/flexible.svg";
import Simple from "../resources/img/simple.svg";
import People from "../resources/img/people.png";

import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

import "./app.scss";

function Header() {
    return (
        <header className="masthead position-relative overflow-hidden text-center">
            <NavBar />
            <Col md={5} className="h-100 p-lg-5 mx-auto py-5 my-5">
                <h1 className="display-4">
                    <b>Financing that cares</b>
                </h1>
                <p className="lead">
                    Welcome to a new way of financing medical bills. We partner
                    with your provider so you can make your payment over time.
                </p>
                <Button variant="main" href="#about">
                    APPLY NOW
                </Button>
                <p className="my-4 line-link">HOW IT WORKS</p>
            </Col>
            <img
                src={Icon}
                className="mast-left d-none d-sm-block"
                alt="Newton Icon"
            ></img>
            <img
                src={Doctor}
                className="mast-right d-none d-none d-sm-block"
                alt="Doctor with patient"
            ></img>
        </header>
    );
}

function NavBar() {
    return (
        <Navbar className="mx-md-5 mt-3 align-items-center" variant="light" bg="transparent" expand="md">
            <Navbar.Brand href="#home">
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
                    <Nav.Link href="#about">How it works</Nav.Link>
                    <Nav.Link href="#providers">Our providers</Nav.Link>
                    <Nav.Link href="#contact">Contact us</Nav.Link>
                </Nav>
                <Nav className="ml-auto align-items-center">
                    <Nav.Link href="#apply" className="mr-3">Apply now</Nav.Link>
                    <Button variant="main">Sign In</Button>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

function Qualities() {
    return (
        <Container className="text-center my-5 py-1">
            <Row className="mb-5">
                <h3 className="mx-auto">
                    <b>
                        We partner with your provider to make healthcare
                        affordable.
                    </b>
                </h3>
            </Row>
            <Row xs={1} sm={3} className="mb-1">
                <Quality
                    image={Transparent}
                    alt="Checklist"
                    title="Transparent"
                    text="No fees or APR hikes, ever."
                />
                <Quality
                    image={Flexible}
                    alt="Touch"
                    title="Flexible"
                    text="Multiple options to finance your bills."
                />
                <Quality
                    image={Simple}
                    alt="Arrows"
                    title="Simple"
                    text="Monthly payments through our one-click payment portal."
                />
            </Row>
            <Row>
                <Button variant="main" href="#apply" className="mx-auto">
                    LEARN MORE
                </Button>
            </Row>
        </Container>
    );
}

function Mission() {
    return (
        <Container className="text-center my-5 py-5">
            <Row>
                <h3 className="mx-auto">
                    <b>Relieving medical debt starts with us.</b>
                </h3>
            </Row>
            <Row xs={1} sm={2} className="justify-content-md-center">
                <Col lg="4">
                    <Row>
                        <h5 className="mx-auto mb-3 mt-5">
                            For every $1 spent using our service, we will
                            relieve $1 of medical debt to reverse this vicious
                            cycle.
                        </h5>
                    </Row>
                    <Row>
                        <p className="mx-auto mb-4">
                            Learn more about our mission.
                        </p>
                    </Row>
                    <Row>
                        <Button
                            variant="main"
                            href="#about"
                            className="mx-auto"
                        >
                            ABOUT US
                        </Button>
                    </Row>
                </Col>
                <Col xs lg="4" className="mt-2">
                    <img
                        src={People}
                        height="300"
                        className="d-inline-block align-top"
                        alt="People Illustration"
                    />
                </Col>
            </Row>
        </Container>
    );
}

function Footer() {
    return (
        <div className="mx-4">
            <Row>
                <Col xs lg="4">
                    <img src={Logo} height="30" alt="Newton Logo" />
                </Col>
                <Col xs lg="4" className="justify-content-center text-center">
                    <a href="#insta"><i ><FaInstagram size={24}/></i></a>
                    <a href="#facebook"><i className="mx-2"><FaTwitter size={24} /></i></a>
                    <a href="#linkedin"><i><FaLinkedin size={24} /></i></a>
                </Col>
                <Col className="text-right" xs lg="4">
                    <p className="align-middle tiny-resize">© isaac, Inc. All rights reserved.</p>
                </Col>
            </Row>
        </div>
    );
}
function Quality(props) {
    return (
        <Col className="text-align-center mb-4">
            <img
                src={props.image}
                className="mb-2"
                height="150px"
                alt={props.alt}
            ></img>
            <div>
                <h5>
                    <b className="m-2 primary">{props.title}</b>
                </h5>
            </div>
            <p>{props.text}</p>
        </Col>
    );
}
class App extends Component {
    render() {
        return (
            <div>
                <Header />
                <Container className="px-2">
                    <Qualities />
                    <Mission />
                </Container>
                <Footer />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
