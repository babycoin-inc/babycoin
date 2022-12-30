import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../../../client/src/components/App.jsx';
import Home from '../../../client/src/components/Home/Home.jsx';


test('renders the home component', () => {
  render(<App />);
});
