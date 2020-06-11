import React, { Component } from "react";
import NavBar from './components/navbar.js';

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import ProgressBar from "react-bootstrap/ProgressBar";
import Container from "react-bootstrap/Container";
import Check from "react-bootstrap/FormCheck";

import { FaTag } from "react-icons/fa";

import "../app.scss";

class Dashboard extends Component {
    componentDidMount() {
        fetch('https://newton-server-maven.herokuapp.com/api/users').then((response) => console.log(response));
    }

    render() {
        return (
            <React.Fragment>
                <div className="d-flex" style={{ flexFlow: "column", height: "100%" }}>
                    <NavBar simple background />
                    <Row style={{ width: "100%", height: "100%", flexGrow: "1" }}>
                        <Col xs={4} style={{ backgroundColor: "#ddd" }} className="d-flex justify-content-center align-items-center">
                            <Row>
                                <Card
                                    className="m-0 px-3 py-4"
                                    style={{
                                        borderRadius: "10px",
                                        boxShadow: "1px 1px 3px 1px #9E9E9E"
                                    }}>
                                    <h5 className="primary"><b>Account Details</b></h5>
                                    <div className="my-1"><b>John Smith</b></div>
                                    <hr style={{ borderColor: "#C5C5C5" }}></hr>
                                    <div className="mt-1"><b><i>Email</i></b></div> j.smith@gmail.com<br></br>
                                    <div className="mt-1"><b><i>Phone number</i></b></div> 732-123-4567<br></br>
                                    <a className="my-1" href="#personalInfo"><u>Edit personal information</u></a>
                                    <hr style={{ borderColor: "#C5C5C5" }}></hr>
                                    <div className="mt-1"><b><i>Bank</i></b></div> TD Bank<br></br>
                                    <div className="mt-1"><b><i>Account #</i></b></div> xxx-4120<br></br>
                                    <a className="mt-1" href="#bankInfo"><u>Edit bank information</u></a>
                                    <a className="mt-1" href="#paymentMethod"><u>Register a new payment method</u></a>
                                </Card>
                            </Row>
                            <Row className="py-2 px-5" style={{ fontSize: "11px", position: "absolute", bottom: "0px" }}>
                                <b>For further assistance:</b>
                                Give us a call at 732-987-6543 or email us at help@covered.com
                            </Row>
                        </Col>
                        <Col xs={8}>
                            <div className="p-4">
                                <Row className="p-4 d-flex justify-content-between align-items-center">
                                    <h4 className="m-0">
                                        <b>Bella Dental</b>
                                    </h4>
                                    <div className="d-flex"><Check />Autopay: On</div>
                                </Row>
                                <hr style={{ borderColor: "#C5C5C5" }} />
                                <Row className="p-4 d-flex justify-content-between align-items-center">
                                    <h5 className="m-0">
                                        <b>$61.38</b> due on <b>Jun. 9, 2020</b>
                                    </h5>
                                    <Button variant="main">
                                        Make one-time payment
                                    </Button>
                                </Row>
                                <hr style={{ borderColor: "#C5C5C5" }} />
                                <Row className="p-4 align-items-center">
                                    <FaTag size={20} className="d-inline" />
                                    <h6 className="ml-3 mb-0">
                                        PURCHASE DETAILS
                                    </h6>
                                </Row>
                                <Row className="p-4">
                                    <Container>
                                        TOTAL OF PAYMENTS
                                        <br />
                                        <b>$3241.17</b>
                                        <ProgressBar now={40} className="mt-3" />
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

export default Dashboard;
