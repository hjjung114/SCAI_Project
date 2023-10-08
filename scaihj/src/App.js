import './App.css'; 
// import Header from './components/header'


import Grid from '@mui/material/Unstable_Grid2';
import MenuBar from "./components/MenuBar";
import { Routes,Route } from 'react-router-dom';
import HomePage from './components/Pages/Home';
import AboutPage from './components/Pages/About';
import NewPage from './components/Pages/Page';


function App() {

  
  return (
    <Grid container spacing={-2}>
      <MenuBar/>      
      <Routes>
        
        <Route path="/home" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/page" element={<NewPage />} />
        
      </Routes>
      
    </Grid>
  );
}
export default App;