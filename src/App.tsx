import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
function App() {

  return (
    <BrowserRouter>
      <div className='container'>
        <div className='main'>
          <Routes>
            <Route path='/' />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
