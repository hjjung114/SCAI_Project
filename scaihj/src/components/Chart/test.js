import React, { useState } from "react";
import './App.css'; 
import Header from './components/header'
import CompanyDetail from "./components/companydetail";
import ChartData from "./components/Chart/data";
import ChartComponent from "./components/Chart/chart";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import Input from "./components/input";
import LineChart from "./components/Chart/linechart";
import GaugeChart from "./components/Chart/gaugechart";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function App() {
  const [inputValue1, setInputValue1] = useState("");
  const [inputValue2, setInputValue2] = useState("");
  const [inputValue3, setInputValue3] = useState(""); // To store the input value

  // Function to receive input value from Header component
  const handleInputsSubmit = (value1, value2, value3) => {
    setInputValue1(value1);
    setInputValue2(value2);
    setInputValue3(value3);
  };

  const [chartData, setChartData] = useState({
    labels: [],
    data1: [],
    data2: [],
    data3: [],
    correlationdata: [],
  });

  const onDataFetched = (data) => {
    setChartData({
      labels: data.Date,
      data1: data.High[inputValue1],
      data2: data.High[inputValue2],
      data3: data.High[inputValue3],
      correlationdata: data.Correlation
    });
  };

  
  return (
    <Grid container spacing={2}>
      <Grid container xs={12} sm={9}>

        <Grid xs={12}>
          <Item>
            {/* <Header onInputSubmit={handleInputsSubmit} /> */}
            <Input onInputSubmit={handleInputsSubmit} />
          </Item>
        </Grid>

        <Grid xs={12}>
          <Item>
            {/* <LineChart inputValue1={inputValue1} inputValue2={inputValue2} inputValue3={inputValue3}/> */}
            {chartData.labels.length > 0 ? (
            <ChartComponent labels={chartData.labels} data={chartData.data1}/>
            ) : (
              <div></div>
            )}
          </Item>
        </Grid>

        <Grid xs={6}>
          <Item>
            {chartData.labels.length > 0 ? (
            <ChartComponent labels={chartData.labels} data={chartData.data2}/>
            ) : (
              <div></div>
            )}
          </Item>

        </Grid>

        <Grid xs={6}>
          <Item>
            {chartData.labels.length > 0 ? (
            <ChartComponent labels={chartData.labels} data={chartData.data3}/>
            ) : (
              <div></div>
            )}
          </Item>

        </Grid>

      </Grid>
      <Grid xs={12} sm={3}>
        <Grid>
          <Item><CompanyDetail data={chartData.data3} inputValue1={inputValue1}/></Item>
        </Grid>
        <Grid>
          <Item><GaugeChart/></Item>
        </Grid>
      </Grid>

      <ChartData
        inputValue1={inputValue1}
        inputValue2={inputValue2}
        inputValue3={inputValue3}
        onDataFetched={onDataFetched}
        />
      
    </Grid>
  );
}
export default App;