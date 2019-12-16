import React from 'react';
import './App.css';
import {Route} from 'react-router-dom';
import Register from './components/Register.js'

function App() {
  return (
    <div className="App">
      <Route path="/register" component={Register}/>
    </div>
  );
}

export default App;
