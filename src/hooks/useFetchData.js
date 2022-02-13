import React, { useState, useEffect } from "react";

const apiKey = "17f036d91324b998f5344c60c775237d";
function useFetchData(query) {
const url = `https://pro.openweathermap.org/data/2.5/forecast/daily?units=metric&cnt=16&q=${query}&APPID=${apiKey}`
    
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  //displayData: reponse data
  const [displayData, setDisplayData] = useState([]);
  const [parseData, setParseData] = useState([])
  useEffect(() => {
    let ignore = false;
    const controller = new AbortController();
    async function fetchApiData() {
      let responseData = {};
      setLoading(true);
      try {
        const response = await fetch(
          url,
          { signal: controller.signal }
        ).then((responses) => {
          if (responses.ok) {
            return responses;
          }
          // else if(responses.status == "404") {
          //   console.log(404)
          // }
        });
        responseData = await response.json();
      } catch (e) {
        if (e instanceof DOMException) {
        //   console.log("== HTTP request cancelled");
        } else {
          setError(true);
          setLoading(false);
          setDisplayData([]);
          setParseData([]);
          throw e;
        }
      }
      if (!ignore) {
        setError(false);
        setLoading(false);
        setDisplayData(responseData.list || []);
        setParseData(responseData.city || [])
      }
    }
    //while the url parameter is not empty, fetch api
    // TODO: why cannot use cityName here?
    if (query) {
    //   console.log([query]);
      fetchApiData();
    }
    return () => {
      controller.abort();
      ignore = true;
    };
  }, [query]);
  return [parseData, displayData, loading, error];
}

export default useFetchData;
