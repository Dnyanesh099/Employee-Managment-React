import React from 'react';
import ListEmployeeComponent from './components/ListEmployeeComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import CreateEmployeeComponent from './components/CreateEmployeeComponent';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import UpdateEmployeeComponent from './components/UpdateEmployeeComponent';
import ViewEmployeeComponent from './components/ViewEmployeeComponent';

function App() {
  return (
    <div>
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          <Route path='/' exact element={<ListEmployeeComponent />} />
          <Route path="/add-employee" element={<CreateEmployeeComponent />} />
          <Route path="/update-employee/:id" element={<UpdateEmployeeComponent />} />
         <Route path="/view-employee/:id" element={<ViewEmployeeComponent />}/>
        </Routes>
        <FooterComponent />
      </BrowserRouter>
    </div>
  );
}

export default App;
