import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RandomPhotos from './Components/RandomPhotos';
import MorePages from './Components/MorePages';
import Navbar from './Components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<RandomPhotos />} />
        <Route path="/about" element={<MorePages />} />
      </Routes>
    </Router>
  );
}

export default App;
