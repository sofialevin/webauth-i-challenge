import React from 'react';
import { Button, Form } from 'semantic-ui-react'

const Register = () => {
  return (
    <Form>
        <Form.Field>
          <label>Username</label>
          <input placeholder='Username' />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input placeholder='Password' />
        </Form.Field>
        <Button type='submit'>Register</Button>
      </Form>
  );
}
 
export default Register;