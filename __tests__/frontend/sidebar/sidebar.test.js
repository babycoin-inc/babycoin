import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Sidebar from '../../../client/src/components/Sidebar/Sidebar.jsx';


test('renders sidebar navigation', () => {
  render(<Sidebar activePage='Home' />);
  const sideNav = (screen.getByText(/market watch/i));
  expect(sideNav).toBeInTheDocument();
});
