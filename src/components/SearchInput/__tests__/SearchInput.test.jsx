import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { SearchInput } from '../SearchInput';

describe('SearchInput', () => {
  it('should render input element', async () => {
    render(<SearchInput onClear={jest.fn()} onChange={jest.fn()} onChangeDebounced={jest.fn()} value={''} />);

    const inputElement = screen.getByPlaceholderText(/Check the weather in your city.../);
    expect(inputElement).toBeInTheDocument();
  });

  it('should be able to type inside input', () => {
    render(<SearchInput onClear={jest.fn()} onChange={jest.fn()} onChangeDebounced={jest.fn()} value={''} />);
    // 👆 this one pass when there in no value prop

    const inputElement = screen.getByPlaceholderText(/Check the weather in your city.../);
    fireEvent.change(inputElement, { target: { value: 'Zakopane' } });

    // screen.debug();

    // read about input event 👉 https://testing-library.com/docs/example-input-event/

    expect(inputElement.value).toBe('Zakopane');
  });
});
