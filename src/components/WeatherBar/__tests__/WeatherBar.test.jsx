import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { WeatherBar } from '../WeatherBar';

describe('WeatherBar.tsx', () => {
  it('should display loading', () => {
    render(<WeatherBar loading={true} temp='0' error={false} selectedCity='Krakow' />);

    expect(screen.getByText('loading...')).toBeInTheDocument();
    // .not.toBeInTheDocument()
  });

  it('should display temperature', () => {});

  it('should display error message', () => {});
});

// to jest to? --> https://reactjs.org/docs/testing.html
// @testing-library
// Regular Expressions
