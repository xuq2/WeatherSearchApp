import React from "react";
import { Alert } from "react-bootstrap";

function error() {
  return (
    <Alert variant="danger">
      <Alert.Heading>404 NOT FOUND!</Alert.Heading>
      <p>
        Make sure you have entered an valid city name.
      </p>
    </Alert>
  );
}

export default error;
