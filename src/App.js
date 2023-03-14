import logo from './logo.svg';
import React, { useEffect, useState } from 'react';
import './App.css';
import ForceGraph from './ForceGraph/ForceGraph';
import { Routes, Route } from "react-router-dom";
import ProteinDetails from './ProteinDetails/ProteinDetails';
import LandingPage from './LandingPage/LandingPage';
import BodyDiagram from './BodyDiagram/BodyDiagram';
import AppContext from './services/AppContext';


function App() {
  const [focusedNode, setFocusedNode] = useState("");

  const nodeUtils = {
    focusedNode: focusedNode,
    setFocusedNode,
  }

  return (
    <AppContext.Provider value={nodeUtils}>
      <div className="App">
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/body-diagram' element={<BodyDiagram />} />
          <Route path='/PPI-graph' element={<ForceGraph />} />
          <Route path='/protein-details' element={<ProteinDetails />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
