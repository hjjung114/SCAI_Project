import React, { useState } from "react";
import Grid from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';


export default function Header({ onInputSubmit }) {
  const [inputValue1, setInputValue1] = useState(""); // Manage the input value in state
  const [inputValue2, setInputValue2] = useState(""); // Manage the input value in state
  const [inputValue3, setInputValue3] = useState(""); // Manage the input value in state

  const handleSubmit = () => {
    // Call the onInputSubmit function passed as a prop and pass the input value
    onInputSubmit(inputValue1, inputValue2, inputValue3);
  };

  return (
    <div>
      <Grid container spacing={2}>
        <Grid container xs={8}>
          <Grid xs={12}>
            <input
              type="text"
              name="name"
              className="company-input"
              placeholder="종목명"
              value={inputValue1}
              onChange={(e) => setInputValue1(e.target.value)}
              required
            />
          </Grid>
          <Grid xs={12} sm={6}>
            <input
              type="text"
              name="name1"
              className="sub-input1"
              placeholder="관련 종목"
              value={inputValue2}
              onChange={(e) => setInputValue2(e.target.value)}
              required
            />
          </Grid>
          <Grid xs={12} sm={6}>
            <input
              type="text"
              name="name2"
              className="sub-input2"
              placeholder="관련 종목"
              value={inputValue3}
              onChange={(e) => setInputValue3(e.target.value)}
              required
            />
          </Grid>
        </Grid>
        <Grid xs={4}>
          <Button type="submit" className="submit-button" onClick={handleSubmit} variant="outlined" fullWidth="true">조회</Button>
          {/* <button type="submit" className="submit-button" onClick={handleSubmit}> */}
            {/* 조회</button> */}
        </Grid>
      </Grid>
    </div>
  );
};
