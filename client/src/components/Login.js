import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import axios from "axios";

const Login = () => {
  const [ user, setUser ] = useState({ username: "", password: ""});
  const [ message, setMessage ] = useState({
    text: '',
    type: ''
  });

  const handleChange = (event) => {
    setUser({...user, [event.target.name]: event.target.value})
    setMessage({
      text: '',
      type: ''
    })
};

  const handleLogin = () => {
    axios.post(`http://localhost:4000/api/login`, user)
    .then(res => {
      console.log(res)
      setMessage({...message, type: 'success', text: `Welcome back ${res.data.user.username}!`})
    })
    .catch(err => {
      console.log(err.response)
      setMessage({...message, type: 'error', text: err.response.data.message})
    })
  }

  return (
    <Form onSubmit={handleLogin}>
      <Form.Field>
        <label>Username</label>
        <input
        placeholder="Username"
        name="username"
        value={user.username}
        onChange={handleChange}
        />
      </Form.Field>
      <Form.Field>
        <label>Password</label>
        <input
        placeholder="Password"
        name="password"
        value={user.password}
        onChange={handleChange}
        />
      </Form.Field>
      {message.text ? <p className={message.type === 'success' ? 'success-message' : 'error-message'}>{message.text}</p> : null}
      <Button type='submit'>Login</Button>
    </Form>
  );
}
 
export default Login;