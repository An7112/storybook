import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Sidebar from 'component/sidebar/sidebar';
function App() {

  return (
    <BrowserRouter>
      <div className='container'>
        <Sidebar />
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
