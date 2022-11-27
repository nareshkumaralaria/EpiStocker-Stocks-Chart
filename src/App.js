import React from 'react';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchStock from './components/SearchStock';

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
        </Routes>
      </Router>
    </>
  );
}

export default App;
