import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { WeatherBar } from '../WeatherBar';

describe('WeatherBar.jsx', () => {
  it('should display loading', () => {
    // we can also use test() in place of it()
    render(<WeatherBar loading={true} temp='0' error={false} selectedCity='Krakow' />);
    // screen.debug();
    expect(screen.getByText('loading...')).toBeInTheDocument();
    // expect from Jest
    // * getBy, findBy, queryBy
    // * getByRole
    // .not.toBeInTheDocument()
  });

  it('should display temperature', () => {
    render(<WeatherBar loading={false} temp='11' error={false} selectedCity='Krakow' />);
    // screen.debug();
    expect(screen.getByText(/11/)).toBeInTheDocument();
  });
  // .only() to run only one test at a time

  it('should display error message', () => {
    render(<WeatherBar loading={false} error={true} selectedCity='Krakow' />);
    expect(screen.getByText(/Something went wrong/)).toBeInTheDocument();
  });
});

// to jest to? --> https://reactjs.org/docs/testing.html
// @testing-library
// Regular Expressions
// npm run test - to start running tests
