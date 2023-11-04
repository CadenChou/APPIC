import logo from './logo.svg';
import React, { useEffect, useState } from 'react';
import './App.css';
import ForceGraph from './ForceGraph/ForceGraph';
import { Routes, Route } from "react-router-dom";
import ProteinDetails from './ProteinDetails/ProteinDetails';
import LandingPage from './LandingPage/LandingPage';
import BodyDiagram from './BodyDiagram/BodyDiagram';
import AppContext from './services/AppContext';
import Navbar from './Navbar/Navbar';
import Acknowledgements from "./Acknowledgements/Acknowledgements";
import About from "./About/About";
import UserGuide from "./UserGuide/UserGuide";


function App() {
  // For use in HPA and HGNC tiles
  const [focusedNode, setFocusedNode] = useState("");
  // Updated in NodeInfoTile (Select API), this is so we can handle pages in ForceGraph
  const [currAPI, setCurrAPI] = useState("HPA")

  // Set default dimension plot
  const [currDimension, setCurrDimension] = useState("2D")

  const nodeUtils = {
    focusedNode: focusedNode,
    setFocusedNode,
    currAPI: currAPI,
    setCurrAPI,
    setCurrDimension,
    currDimension: currDimension,
  }

  return (
    <AppContext.Provider value={nodeUtils}>
      <div className="App">
        <Navbar></Navbar>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/body-diagram' element={<BodyDiagram />} />
          <Route path='/PPI-graph' element={<ForceGraph />} />
          <Route path='/protein-details' element={<ProteinDetails />} />
          <Route path='/acknowledgements' element={<Acknowledgements />} />
          <Route path='/about' element={<About />} />
          <Route path='/user-guide' element={<UserGuide />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
