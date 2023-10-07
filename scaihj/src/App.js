import React, { useState } from "react";
import './App.css'; 
// import Header from './components/header'
import CompanyDetail from "./components/companydetail";
import ChartData from "./components/Chart/data";
import ChartComponent from "./components/Chart/chart";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import GaugeChart from "./components/Chart/gaugechart";
import MenuBar from "./components/menubar";


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  width: '100%',
  color: theme.palette.text.secondary,
}));

function App() {
  const [period, setPeriod] = useState('month');

  const [chartData, setChartData] = useState({
    labels: [],
    data1: [],
    data2: [],
    correlationdata: [],
  });

  const onDataFetched = (data) => {
    setChartData({
      labels: data.Date || [],
      data1: data.Close?.['005930'] || [],
      data2: data.Close?.['039030'] || [],
      correlationdata: data.Correlation || []
    });
  };
  
  return (
    <Grid container spacing={-2}>
      <Grid container xs={12}>
        <MenuBar/>
      </Grid>
      <Grid container xs={12} sm={9}>
        <Item>
          <ChartComponent labels={chartData.labels} data1={chartData.data1} data2={chartData.data2} onChangePeriod={(newPeriod) => setPeriod(newPeriod)}/>
        </Item>
      </Grid>
      <Grid container xs={12} sm={3}>
        <Grid xs={12}>
          <Item><CompanyDetail inputValue1={'005930'}/></Item>
        </Grid>
        <Grid xs={12}>
          <Item><GaugeChart data={chartData.correlationdata} var1={'005930'} var2={'039030'}/></Item>
        </Grid>
      </Grid>

      <ChartData period={period} onDataFetched={onDataFetched} />
      
    </Grid>
  );
}
export default App;