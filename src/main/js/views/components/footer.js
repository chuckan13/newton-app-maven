import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Logo from "../../../resources/static/img/logo.png";

import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

import "../../app.scss";

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

export default Footer;