import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/NavBar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import Card from "react-bootstrap/Card";

import Logo from "../../resources/static/img/logo.png";
import HealthDesk from "../../resources/static/img/healthdesk.png";
import Cloud from "../../resources/static/img/cloud.png";
import ExampleLoan from "../../resources/static/img/exampleloan.png";

import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

import NavBar from "./navbar.js"

import "../app.scss";

function Footer() {
    return (
        <div className="mx-4">
            <Row>
                <Col xs lg="4">
                    <img src={Logo} height="30" alt="Newton Logo" />
                </Col>
                <Col xs lg="4" className="justify-content-center text-center">
                    <a href="#insta">
                        <i>
                            <FaInstagram size={24} />
                        </i>
                    </a>
                    <a href="#facebook">
                        <i className="mx-2">
                            <FaTwitter size={24} />
                        </i>
                    </a>
                    <a href="#linkedin">
                        <i>
                            <FaLinkedin size={24} />
                        </i>
                    </a>
                </Col>
                <Col className="text-right" xs lg="4">
                    <p className="align-middle tiny-resize">
                        © isaac, Inc. All rights reserved.
                    </p>
                </Col>
            </Row>
        </div>
    );
}

function Step(props) {
    let button;

    if (props.button) {
        button = (
            <Button variant="main" href="#providers">
                {props.button}
            </Button>
        );
    }

    const text = (
        <Col className="my-auto mx-auto" style={{ maxWidth:"90vw"}}>
            <Row>
                <h5>
                    <b>STEP {props.step}</b>
                </h5>
            </Row>
            <Row>
                <h2>
                    <b>{props.title}</b>
                </h2>
            </Row>
            <Row>
                <p>{props.body}</p>
            </Row>
            <Row className="justify-content-center">{button}</Row>
        </Col>
    );

    const image = (
        <Col className="text-align-center d-none d-md-block">
            <img
                className="mx-auto d-block"
                style={{ maxWidth: "90vw" }}
                src={props.image}
                height={props.height}
                alt={props.alt}
            ></img>
        </Col>
    );

    if (props.align === "right") {
        return (
            <Row className="py-5">
                {image}
                {text}
            </Row>
        );
    } else {
        return (
            <Row className="py-5">
                {text}
                {image}
            </Row>
        );
    }
}

function OptionCard(props) {
    return (
        <Card className="card-option my-3">
            <Card.Body>
                <Card.Title>{props.text}</Card.Title>
                <Card.Subtitle>{props.subtext}</Card.Subtitle>
                <Card.Text>{props.price}</Card.Text>
            </Card.Body>
        </Card>
    );
}

class HowItWorks extends Component {
    render() {
        return (
            <div>
                <NavBar />
                <Container className="px-2">
                    <h1 className="text-center display-3 mx-md-5 px-md-5 py-2">
                        <b>Here's how to finance with isaac.</b>
                    </h1>
                    <Step
                        step={1}
                        title="Health first, pay later."
                        body="After your physician's office bills you the out-of-pocket cost, 
                        they will send you our secure loan application so you can get a
                        decision within 2 business days."
                        button="OUR PROVIDERS"
                        image={HealthDesk}
                        alt="Health center front desk."
                        align="left"
                        height="300px"
                    />
                    <Image
                        src={Cloud}
                        className="left-list d-none d-md-block"
                    />
                    <ul className="option-list d-none d-md-block">
                        <OptionCard
                            text="75.83/mo for 6 months"
                            subtext="Interest (APR) 0%"
                            price="$0"
                        />
                        <OptionCard
                            text="51.51/mo for 9 months"
                            subtext="Interest (APR) 4.5%"
                            price="$8.57"
                        />
                        <OptionCard
                            text="39.58/mo for 12 months"
                            subtext="Interest (APR) 8%"
                            price="$19.96"
                        />
                    </ul>
                    <Step
                        step={2}
                        title="Choose how you pay."
                        body="Select the payment schedule you like best, then confirm your loan.
                         We’ll never charge more than you see up front."
                        align="right"
                        height="600px"
                    />
                    <Step
                        step={3}
                        title="Make easy monthly payments."
                        body="Just sign in at isaac.com. We'll send you email and text
                        reminders whenever a payment's coming up, or setup scheduled payments.
                        That's it!"
                        align="left"
                        image={ExampleLoan}
                        height="400px"
                    />
                </Container>
                <Footer />
            </div>
        );
    }
}

export default HowItWorks;
