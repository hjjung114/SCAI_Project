import React from "react";
import CompanyDetail from "../CompanyDetail";
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import ChartComponent from "../Chart/Chart";


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(-2),
    textAlign: 'center',
    width: '100%',
    color: theme.palette.text.secondary,
  }));

const HomePage = () => {

    return (
        <Grid container xs={12} padding={2}>
            <Grid item xs={12} sm={9}>
            <ChartComponent selectedChart={'chart'} />
            </Grid>
            <Grid item xs={12} sm={3}>
                <Item>
                    <CompanyDetail inputValue1={'005930'}/>
                    <CompanyDetail inputValue1={'039030'}/>
                    <ChartComponent selectedChart={'KOSPI'} />
                </Item>
            </Grid>
        </Grid>
    )
}

export default HomePage;