import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import { Box } from '@mui/system';
import { FormControl, TextField, Button } from '@mui/material';

import Auth from '../utils/auth';

const Signup = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [addUser, { error }] = useMutation(ADD_USER);

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
    let isError;

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      isError = true;
      console.error(e);
    }

    if (!isError) {
      window.location.replace('/profile');
    }
  };

  return (
    <Box>
      <h2>Signup</h2>
      <FormControl>
        <TextField
          id="usernameInput"
          name="username"
          placeholder="Username"
          onChange={handleChange}
        />
        <TextField id="emailInput" name="email" placeholder="Email" onChange={handleChange} />
        <TextField
          id="passwordInput"
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <Button onClick={handleFormSubmit}>Submit</Button>
        {error
          ? `Username or Email already in use! Please try again using a different username or email.`
          : ''}
      </FormControl>
    </Box>
  );
};

export default Signup;
