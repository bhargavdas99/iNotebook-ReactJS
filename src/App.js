import './App.css';
import { Home } from './components/Home';
import About from './components/About';
import React from "react";
import Navbar from './components/Navbar';
import Alert from './components/Alert';
import NoteState from './context/notes/NoteState';
import Login from './components/Login';
import Signup from './components/Signup';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { useState } from 'react';


function App() {
  const [alert,setAlert]= useState(null)
  const showAlert=(message,type)=>{
    setAlert({
      message:message,
      type:type
    })
    setTimeout(()=>{
      setAlert(null);
    },4000)
  }

  //THEME CODE
  const [mode, setMode] = useState('light');
  const [text, setText] = useState('Enable Dark Mode');

  if(mode=='light'){
    document.body.style.backgroundColor = '#f7fcf8';
  }

  const toggle =()=>{
    if(mode=='light'){
      document.body.style.backgroundColor = '#140230';
      setMode('dark');
      setText('Enable Light Mode');
    }
    else{
      document.body.style.backgroundColor = '#f7fcf8';
      setMode('light');
      setText('Enable Dark Mode');
    }
  }

  return (
    <>
    <NoteState>
    <Router>
      <Navbar text={text} mode={mode} toggle={toggle}/>
      <Alert alert={alert}/>
      
      <Routes>
        <Route exact path='/' element={<><Home showAlert={showAlert} mode={mode}/></>} />
        <Route exact path='/about' element={<><About mode={mode}/></>} />
        <Route exact path='/login' element={<><Login showAlert={showAlert}/></>} />
        <Route exact path='/signup' element={<><Signup showAlert={showAlert}/></>} />
      </Routes>
      
    </Router>
    </NoteState>
    
    </>
  );
}

export default App;
