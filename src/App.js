import './App.css';


import Header from './components/LayoutApp/Header';
import Footer from './components/LayoutApp/Footer';
import Home from './components/LayoutApp/Home';
import VegetableGarden from './components/Main/VegetableGarden';
import VegetablesList from './components/Main/VegetablesList';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import React, {useEffect,useState} from 'react';

function App() {
 
  return (
    <div className='App'>
      <Router>
        <Header />
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/vegetables-list" element={<VegetablesList />} />
            <Route path="/vegetables-list/parcelle/:veg" element={<VegetablesList />} />
            <Route path="/vegetable-garden" element={<VegetableGarden />} />
            <Route path="/vegetable-garden/parcelle/:veg" element={<VegetableGarden />} />

          </Routes>
        </div>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
