import React from 'react';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchStock from './components/SearchStock';
import About from './components/About';

function App() {
  return (
    // Created Routes using REACT-ROUTER_DOM
    <>
      <Router >
        <Header />
        <Routes>
          {/* Home Route */}
          <Route path='/' exact element={<Home />} />
          {/* Search Route */}
          <Route path='/searchstock' element={<SearchStock />} />
          {/* About Route */}
          <Route path='/about' element={<About />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
