import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LocationDataLists } from '../LocationDataLists';

import { React } from 'react';

describe('LocationDataLists.jsx', () => {
  it('should display a list of locations', () => {
    const data = [
      {
        display_place: 'Krakow',
        display_address: 'Polska',
      },
      {
        display_place: 'Lublin',
        display_address: 'Polska',
      },
    ];

    render(<LocationDataLists data={data} onClick={jest.fn()} />); // ! czytaj jest.fn

    expect(screen.getByText(/Krakow, Polska/)).toBeInTheDocument();
    expect(screen.getByText(/Lublin, Polska/)).toBeInTheDocument();
  });

  // ! TODO
  // .toHaveBeenCalledWith()
  it('should onClick be triggered with item object on click on location item', () => {});
});
