import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

import { Box } from '@mui/system';
import { FormControl, TextField, Button } from '@mui/material';

const Login = () => {
  // Email and Password state
  const [formState, setFormState] = useState({
    email: '',
    password: '',
  });

  // Set formState when email or password is entered

  const [login, { error }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = event => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async event => {
    event.preventDefault();
    console.log(formState);
    let isError;

    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      isError = true;
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });

    if (!isError) {
      window.location.replace('/profile');
    }
  };

  return (
    <Box>
      <h2>Login</h2>
      <FormControl>
        <TextField id="emailInput" name="email" placeholder="Email" onChange={handleChange} />
        <TextField
          id="passwordInput"
          name="password"
          type={'password'}
          placeholder="Password"
          onChange={handleChange}
        />
        <Button onClick={handleFormSubmit}>Submit</Button>
        {error ? `${error}` : ''}
      </FormControl>
    </Box>
  );
};

export default Login;
