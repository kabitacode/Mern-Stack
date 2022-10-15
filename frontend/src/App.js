import React from 'react'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

import Home from './Pages/Home';
import Navbar from './components/Navbar';
import Buku from './Pages/Buku';


function App() {
  return (
    <div>
      <Router>
        <Navbar />

        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/manajemen-buku' element={<Buku />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
