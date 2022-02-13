import React from 'react';
import Submit from './Submit.js'
import { Routes, Route, Navigate, useSearchParams } from 'react-router-dom';


function App() {
  const [ searchParams ] = useSearchParams()
  
  // console.log(searchParams)
  return (
    <Routes>
       <Route
        path="/SearchByCity"
        element={<Submit query={searchParams.get("q")} />}
      />
      <Route path="/" element={<Navigate to="/SearchByCity" />} />
    </Routes>
  );
}

export default App;
