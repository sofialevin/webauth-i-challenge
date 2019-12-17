import React, { useState } from 'react';
import './App.css';
import Register from './components/Register.js';
import Login from './components/Login.js';
import { Menu } from 'semantic-ui-react'

function App() {
  const [ activeItem, setActiveItem ] = useState('home')

  const handleItemClick = (event, {name}) => {
    console.log(name)
    setActiveItem(name)
  }

  return (
    <div className="App">
      <Menu tabular>
      <Menu.Item
          name='home'
          active={activeItem === 'home'}
          onClick={handleItemClick}
        />
        <Menu.Item
          name='register'
          active={activeItem === 'register'}
          onClick={handleItemClick}
        />
        <Menu.Item
          name='login'
          active={activeItem === 'login'}
          onClick={handleItemClick}
        />
      </Menu>
      <section class="content">
        {activeItem === 'home' && <h1>Hello!</h1>}
        {activeItem === 'register' && <Register />}
        {activeItem === 'login' && <Login />}
      </section>
    </div>
  );
}




export default App;
