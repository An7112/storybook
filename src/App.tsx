import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Sidebar from 'component/sidebar/sidebar';
import Form from 'pages/form/form';
import Filter from 'pages/filter/filter';
function App() {

  return (
    <BrowserRouter>
      <div className='container'>
        <Sidebar />
        <div className='main'>
          <Routes>
            <Route path='/' element={<Navigate to='/form' />} />
            <Route path='/form' element={<Form />} />
            <Route path='/filter' element={<Filter />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
