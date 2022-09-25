import React from 'react';
import { LocationLoading } from '../LocationLoading';
import '@testing-library/jest-dom';
import { screen, render } from '@testing-library/react';

describe('LocationLoading.jsx', () => {
  it('should display loading information', () => {
    render(<LocationLoading />);

    const loadingElement = screen.getByText(/Loading.../);
    expect(loadingElement).toBeInTheDocument();
  });
});
