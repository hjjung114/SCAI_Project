import React, { useState } from "react";
import './App.css'; 
import LineChart from './components/Chart/linechart';
// import Test from './components/Chart/test';

import Header from './components/header'
import CompanyDetail from "./components/companydetail";


function App() {
  const [inputValue, setInputValue] = useState(""); // To store the input value

  // Function to receive input value from Header component
  const handleInputSubmit = (value) => {
    // Set the input value in the state
    setInputValue(value);
  };

  
  return (
    <div>
      <Header onInputSubmit={handleInputSubmit} />
      <LineChart inputValue={inputValue} />
      <CompanyDetail inputValue={inputValue} />
      {/* <Test/> */}

    </div>
  );
}
export default App;