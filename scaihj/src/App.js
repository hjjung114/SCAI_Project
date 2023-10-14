import "./App.css";
// import Header from './components/header'

import React, { useEffect } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import MenuBar from "./components/MenuBar";
import { Routes, Route, useNavigate } from "react-router-dom";
import HomePage from "./components/Pages/Home";
import AboutPage from "./components/Pages/About";
import NewPage from "./components/Pages/Page";

function App() {
  const navigate = useNavigate();

  // Use useEffect to navigate to '/home' when the component mounts
  // useEffect(() => {
  //   navigate('/home');
  // }, [navigate]);

  return (
    <Grid container>
      <Grid item xs={12}>
        <MenuBar />
      </Grid>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/home" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/page" element={<NewPage />} />
      </Routes>
    </Grid>
  );
}
export default App;
