import React, { useState } from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchInput } from '../SearchInput';

const Wrapper = (props) => {
  const [value, setValue] = useState('');

  return <SearchInput {...props} value={value} onChange={setValue} />;
};

const mockFetchDebounced = jest.fn();
const mockClear = jest.fn();

jest.mock('../../../utils/debounce', () => ({
  debounce: () => [mockFetchDebounced, mockClear],
}));

describe('SearchInput', () => {
  it('should input element have proper placeholder', async () => {
    render(<SearchInput onClear={jest.fn()} onChange={jest.fn()} onChangeDebounced={jest.fn()} value={''} />);

    const inputElement = screen.getByPlaceholderText(/Check the weather in your city.../);
    expect(inputElement).toBeInTheDocument();
  });

  it('should be able to type inside input', () => {
    render(<Wrapper onClear={jest.fn()} onChangeDebounced={jest.fn()} />);
    // 👆 this one pass when there in no value prop
    // 👉 fireEvent - deprecated
    const inputElement = screen.getByPlaceholderText(/Check the weather in your city.../);
    userEvent.type(inputElement, 'Zakopane');

    // screen.debug();
    // read about input event 👉 https://testing-library.com/docs/example-input-event/

    expect(inputElement).toHaveValue('Zakopane');
  });

  it('should fetch when there is a value in input', () => {
    mockFetchDebounced.mockClear();
    render(<Wrapper onClear={jest.fn()} onChangeDebounced={jest.fn()} />);

    const inputElement = screen.getByPlaceholderText(/Check the weather in your city.../);
    userEvent.type(inputElement, 'Zako');

    expect(mockFetchDebounced).toHaveBeenCalledWith('Zako');
  });

  it('should cancel fetch when a value was cleared', () => {
    const mockOnClear = jest.fn(); // => zwraca NOWA funkcje mockujaca -> onClear === "[mockFunction]"

    render(<Wrapper onClear={mockOnClear} onChangeDebounced={jest.fn()} />);
    const inputElement = screen.getByPlaceholderText(/Check the weather in your city.../);
    userEvent.type(inputElement, 'Zako');
    userEvent.clear(inputElement);

    expect(mockOnClear).toHaveBeenCalled();
    expect(mockClear).toHaveBeenCalled();
  });
});
