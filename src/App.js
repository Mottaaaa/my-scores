import React from 'react';
import './App.css';
import NavBar from './components/Navbar'
import {DAO} from './scripts/DAO';

function App() {

  if(DAO.getCompetition() === undefined){
    DAO.createCompetition('');
  }

  return (
    <NavBar></NavBar>
  );
}

export default App;
