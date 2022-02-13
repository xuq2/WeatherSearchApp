/**
 * The page is to show the navigation of the web. Include: Weather Icon; Name.
 */
import React from "react";
import "./Navigation.css";
import {Container, Row, Col } from "react-bootstrap";

function Navigation() {
  return (
    <>
    <Container className="justify-content-md-center">
        <Row >
            <Col>
            <svg
            className="sun"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 64 64"
          >
            <defs>
              <linearGradient
                id="a"
                x1="26.75"
                x2="37.25"
                y1="22.91"
                y2="41.09"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stop-color="#fbbf24" />
                <stop offset=".45" stop-color="#fbbf24" />
                <stop offset="1" stop-color="#f59e0b" />
              </linearGradient>
            </defs>
            <circle
              cx="32"
              cy="32"
              r="10.5"
              fill="url(#a)"
              stroke="#f8af18"
              stroke-miterlimit="10"
              stroke-width=".5"
            />
            <path
              fill="none"
              stroke="#fbbf24"
              stroke-linecap="round"
              stroke-miterlimit="10"
              stroke-width="3"
              d="M32 15.71V9.5m0 45v-6.21m11.52-27.81l4.39-4.39M16.09 47.91l4.39-4.39m0-23l-4.39-4.39m31.82 31.78l-4.39-4.39M15.71 32H9.5m45 0h-6.21"
            >
              <animateTransform
                attributeName="transform"
                dur="5s"
                repeatCount="indefinite"
                type="rotate"
                values="0 32 32; 360 32 32"
              />
            </path>
          </svg>   
            </Col>
            <Col xs={8} className="txt">
            A Weather Search App
            </Col>
        </Row>
    </Container>
      
    </>
  );
}

export default Navigation;
