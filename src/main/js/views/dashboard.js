import React, { Component } from "react";
import { NavBar, Footer } from "./Common.js";
import Col from "react-bootstrap/Col";
import "./App.scss";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import ProgressBar from "react-bootstrap/ProgressBar";
import Container from "react-bootstrap/Container";
import Check from "react-bootstrap/FormCheck";

import { FaTag } from "react-icons/fa";

class App extends Component {
    render() {
        return (
            <React.Fragment>
                <div style={{ height: "100vh", maxHeight: "100vh" }}>
                    <NavBar />
                    <Row style={{ height: "100%" }}>
                        <Col xs={4} style={{ backgroundColor: "#ddd" }}>
                            <Card
                                style={{
                                    width: "300px",
                                    borderRadius: "20px",
                                    marginLeft: "80px",
                                    marginTop: "200px",
                                }}
                                className="p-3"
                            >
                                <Card.Title>Ilene's Card</Card.Title>
                                <Card.Text>
                                    Ilene's card's text. Lorem ipsum dolor sit
                                    amet. Testing this card here now.
                                </Card.Text>
                            </Card>
                        </Col>
                        <Col xs={8}>
                            <div className="p-4">
                                <Row className="p-4 d-flex justify-content-between align-items-center">
                                    <h1 className="m-0">
                                        <b>Bella Dental</b>
                                    </h1>
                                    <div className="d-flex"><Check />Autopay: On</div>
                                </Row>
                                <hr style={{ borderColor: "#C5C5C5"}}/>
                                <Row className="p-4 d-flex justify-content-between align-items-center">
                                    <h4 className="m-0">
                                        $61.38 due on Jun. 9, 2020
                                    </h4>
                                    <Button variant="main">
                                        Make one-time payment
                                    </Button>
                                </Row>
                                <hr style={{ borderColor: "#C5C5C5"}}/>
                                <Row className="p-4 align-items-center">
                                    <FaTag size={32} className="d-inline" />
                                    <h5 className="ml-3 mb-0">
                                        PURCHASE DETAILS
                                    </h5>
                                </Row>
                                <Row className="p-4">
                                    <Container>
                                        TOTAL OF PAYMENTS
                                        <br />
                                        <b>$3241.17</b>
                                        <ProgressBar now={40} className="mt-3"/>
                                    </Container>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </div>
            </React.Fragment>
        );
    }
}

export default App;
