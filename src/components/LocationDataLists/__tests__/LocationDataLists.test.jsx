import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LocationDataLists } from '../LocationDataLists';

import { React } from 'react';

// test suite ⤵︎
describe('LocationDataLists.jsx', () => {
  // test case ⤵︎
  it('should display a list of locations', async () => {
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

    render(<LocationDataLists data={data} onClick={jest.fn()} />); // ? read: jest.fn

    // assertions ⤵︎
    // expect(await screen.findByText(/Krakow, Polska/)).toBeInTheDocument(); - findBy used for async assertions
    // expect(screen.queryByText(/Krakowwwww, Polska/)).not.toBeInTheDocument();
    expect(screen.getByText(/Krakow, Polska/)).toBeInTheDocument();
    expect(screen.getByText(/Lublin, Polska/)).toBeInTheDocument();
  });

  // ? read: https://www.robinwieruch.de/react-testing-library/

  // ! TODO
  // .toHaveBeenCalledWith()
  // it('should onClick be triggered with item object on click on location item', () => {});
});

// ? watch this tutorial: https://www.youtube.com/watch?v=Yghw9FkNGsc&list=PL4cUxeGkcC9gm4_-5UsNmLqMosM-dzuvQ&index=5
