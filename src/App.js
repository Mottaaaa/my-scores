import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Navbar } from 'reactstrap'
import NavBar from './components/Navbar';


function App() {

  return (
    <div style={{ backgroundColor: "#f5f5f5", width: "100%", height: "100%" }}>
      <NavBar></NavBar>
    </div>
  );
}

/*
*/

export default App;
