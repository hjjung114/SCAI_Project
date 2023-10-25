import "./App.css";
// import Header from './components/header'

import Grid from "@mui/material/Unstable_Grid2";
import MenuBar from "./components/MenuBar";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/Pages/Home";
import AboutPage from "./components/Pages/About";
import Footer from "./components/Footer";

function App() {
  return (
    <Grid container>
      <Grid item xs={12}>
        <MenuBar />
      </Grid>
      <Grid item xs={12} alignItems="center" justifyContent="center">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </Grid>
      <Grid item xs={12}>
        <Footer />
      </Grid>
    </Grid>
  );
}
export default App;
