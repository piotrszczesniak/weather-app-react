import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { LocationError } from '../LocationError';

describe('LocationError.jsx', () => {
  it('should display error message', () => {
    render(<LocationError error={'404'} />);

    // screen.debug();
    expect(screen.getByText(/Sorry, there was an error - 404/)).toBeInTheDocument();
  });
});
