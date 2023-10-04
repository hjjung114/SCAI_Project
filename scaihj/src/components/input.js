import React, { useEffect, useState } from "react";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';


export default function Input({ onInputSubmit }) {

    const [data, setData] = useState([]);
    const [inputValue1, setInputValue1] = useState(""); // Manage the input value in state
    const [inputValue2, setInputValue2] = useState(""); // Manage the input value in state
    const [inputValue3, setInputValue3] = useState(""); // Manage the input value in state
  
    // inputValue에는 옵션을 집어 넣음. option
    const handleSubmit = () => {
        // Call the onInputSubmit function passed as a prop and pass the input value
        onInputSubmit(inputValue1, inputValue2, inputValue3);
    };

    useEffect(() => {
        fetch(`/companylist`)
        .then((response) => response.json())
        .then((data) => {
            setData(data);
        })
        .catch((error) => {
            console.error("Fetch error:", error);
        });
    },[]);

    return (
    <Grid container spacing={4} alignItems="center" >
        <Grid container xs={9}>
            <Grid xs={12}>
                <Autocomplete
                    id="auto_input"
                    // sx={{ width: 600 }}
                    fullWidth={true}
                    size="large"
                    options={data}
                    autoHighlight
                    inputValue={inputValue1}
                    onInputChange={(event, newInputValue1) => {
                        setInputValue1(newInputValue1);
                    }}
                    getOptionLabel={(option) => `${option.stockCode}`}
                    renderOption={(props, option) => (
                        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                            {option.stockName} ({option.stockCode})
                        </Box>
                    )}
                    renderInput={(params) => (
                        <TextField
                        {...params}
                        label="종목명"
                        inputProps={{
                        ...params.inputProps,
                        autoComplete: 'new-password', // disable autocomplete and autofill
                        }}
                        />
                    )}
                />
            </Grid>
            <Grid xs={12} sm={6}>
                <Autocomplete
                    id="auto_input"
                    // sx={{ width: 300 }}
                    fullWidth={true}
                    size="small"
                    options={data}
                    autoHighlight
                    inputValue={inputValue2}
                    onInputChange={(event, newInputValue2) => {
                        setInputValue2(newInputValue2);
                    }}
                    getOptionLabel={(option) => `${option.stockCode}`}
                    renderOption={(props, option) => (
                        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                            {option.stockName} ({option.stockCode})
                        </Box>
                    )}
                    renderInput={(params) => (
                        <TextField
                        {...params}
                        label="관련종목"
                        inputProps={{
                        ...params.inputProps,
                        autoComplete: 'new-password', // disable autocomplete and autofill
                        }}
                        />
                    )}
                />
            </Grid>
            <Grid xs={12} sm={6}>
                <Autocomplete
                    id="auto_input"
                    // sx={{ width: 300 }}
                    fullWidth={true}
                    size="small"
                    options={data}
                    autoHighlight
                    inputValue={inputValue3}
                    onInputChange={(event, newInputValue3) => {
                        setInputValue3(newInputValue3);
                    }}
                    getOptionLabel={(option) => `${option.stockCode}`}
                    renderOption={(props, option) => (
                        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                            {option.stockName} ({option.stockCode})
                        </Box>
                    )}
                    renderInput={(params) => (
                        <TextField
                        {...params}
                        label="관련종목"
                        inputProps={{
                        ...params.inputProps,
                        autoComplete: 'new-password', // disable autocomplete and autofill
                        }}
                        />
                    )}
                />
            </Grid>
        </Grid>
        <Grid xs={3}>
        <Button type="submit" className="submit-button" onClick={handleSubmit} variant="outlined" fullWidth={true} height="100%">조회</Button>
        {/* <button type="submit" className="submit-button" onClick={handleSubmit}> */}
        {/* 조회</button> */}
        </Grid>
    </Grid>      
    );
  }
