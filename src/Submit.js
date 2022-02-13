import {
  Card,
  Container,
  Row,
  Col,
  Button,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
// import useFetchData from "./hooks/useFetchData";
import { useSearchParams } from "react-router-dom";
import Spinner from "./helperComponents/Spinner";
import Error from "./helperComponents/Error";
import useFetchData from "./hooks/useFetchData";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWind, faCloudRain, faTemperatureLow, faTemperatureHigh } from '@fortawesome/free-solid-svg-icons'
import {Global, css} from '@emotion/react'
import './Submit.css'
import Navigation from "./Navigation";

/*
 * query: url parameter/search query in url. ex: ?q=Dalian
 */
function Submit({ query }) {
  // if already input an param in url then pass is to cityName, otherwise, define in .
  const [cityName, setCityName] = useState(query || "");
  const [searchParams, setSearchParams] = useSearchParams();
  const [parseData, displayData, loading, error] = useFetchData(query);
  
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const dateSum = []
  displayData.forEach(data => {
    dateSum.push(new Date(data.dt*1000+(parseData.timezone*1000)).toLocaleDateString("en-US",options))
  });

  var zip = displayData.map(function(e, i) {
    return [e, dateSum[i]];
  });
  // console.log(zip)
  const globalStyles = css`
  @import url('https://fonts.googleapis.com/css2?family=Raleway&display=swap');
  body {
    font-family: 'Raleway', sans-serif;
  }
  `;
  // TODO: not working
  const weatherIcon = css`
    background-image: url(https://openweathermap.org/img/wn/50d@4x.png);
  `
  console.warn = () => {};
  return (
    <>
    <Global styles={globalStyles}/>
      <Navigation />
      <Container className="justify-content-md-center">
        <Row className="justify-content-md-center">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSearchParams({ q: cityName });
            }}
          >
            <InputGroup className="mb-3" size="lg" hasValidation>
              <FormControl
                value={cityName}
                onChange={(e) => setCityName(e.target.value)}
                placeholder="City's Name"
                aria-label="City's Name"
                aria-describedby="basic-addon2"
              />
              <Button
                variant="outline-secondary"
                id="button-addon2"
                type="submit"
              >
                Search
              </Button>
            </InputGroup>
          </form>
        </Row>
        <Row className="justify-content-md-center">
          {loading ? (
            <Spinner />
          ) : (
          <Row sm={1} xs={1} md={2} lg={3} xl={3} xxl={4} className="g-4">
          {zip.map((data) => (
            <Col >
              <Card border="success" style={{ width: "18rem" }} bg="Success">
                <Card.Header css={weatherIcon}>{data[1]}</Card.Header>
                <Card.Body>
                  <Card.Title>{data[0].weather[0].description.toUpperCase()}</Card.Title>
                  <Card.Text>
                    <p><FontAwesomeIcon icon={faTemperatureHigh} size="xl" fixedWidth beat/> {data[0].temp.max} °C</p>
                    <p><FontAwesomeIcon icon={faTemperatureLow} size="xl" fixedWidth swapOpacity/> {data[0].temp.min} °C</p>
                    <p><FontAwesomeIcon icon={faCloudRain} size="xl" fixedWidth fade={data[0].pop}/> {(data[0].pop*100).toFixed(0)} %</p>
                    <p><FontAwesomeIcon icon={faWind} size="xl" fixedWidth/> {data[0].clouds} m/s</p>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
          )}
        </Row>
        {/* TODO: 黑白主题, 背景 */}
        <Row>{error && <Error />}</Row>
      </Container>
    </>
  );
}

export default Submit;
