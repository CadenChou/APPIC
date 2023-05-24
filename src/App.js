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


function App() {
  // Updated in ForceGraph 
  const [focusedNode, setFocusedNode] = useState("");
  // Updated in BodyDiagram, would be used in ComponentTiles
  const [organName, setOrganName] = useState("")
  const [subtype, setSubtype] = useState("")
  // Updated in NodeInfoTile (Select API), this is so we can handle pages in ForceGraph (Super scuffed/jank, but other ways don't work)
  const [currAPI, setCurrAPI] = useState("")

  const nodeUtils = {
    focusedNode: focusedNode,
    setFocusedNode,
    organName: organName,
    setOrganName,
    subtype: subtype,
    setSubtype,
    currAPI: currAPI,
    setCurrAPI
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
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
