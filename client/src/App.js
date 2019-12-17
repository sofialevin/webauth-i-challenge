import React from 'react';
import './App.css';
import {Route} from 'react-router-dom';
import Register from './components/Register.js'
import Login from './components/Login.js'

function App() {
  return (
    <div className="App">
      <Route path="/register" component={Register}/>
      <Route path="/login" component={Login}/>
    </div>
  );
}

export default App;
