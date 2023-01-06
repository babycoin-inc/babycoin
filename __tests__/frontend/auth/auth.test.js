import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginForm from '../../../client/src/components/Login/LoginForm.jsx';

afterEach(cleanup);

// test('Login form submits correctly', () => {
//   const onSubmit = jest.fn();
//   const { getByLabelText, getByText } = render(<LoginForm onSubmit={onSubmit}/>)

//   //simulate filling out the form
//   const usernameInput = getByLabelText('Username');
//   fireEvent.change(usernameInput, { target: { value: 'testuser' } });
//   const passwordInput = getByLabelText('Password');
//   fireEvent.change(passwordInput, { target: { value: 'password' } });

//   //simulate submitting the form
//   const submitButton = getByText('Log In');
//   fireEvent.click(submitButton);

//   //verifies the mock function (onSubmit) was called with the correct arguments
//   expect(onSubmit).toHaveBeenCalledWith({
//     username: 'testuser',
//     password: 'password'
//   });

// });

test('Login form is rendered correctly', () => {
  const { getByLabelText, getByText } = render(<LoginForm />);

  // check for the presence of the form inputs
  expect(getByLabelText('Username')).toBeInTheDocument();
  expect(getByLabelText('Password')).toBeInTheDocument();

  // check for the presence of the submit button
  expect(getByText('Log In')).toBeInTheDocument();
});


