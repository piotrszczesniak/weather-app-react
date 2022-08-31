import React, { useContext, useMemo } from 'react';
import { InputContext } from '../contexts/InputContext';

import { debounce } from './debounce';

const Input = () => {
  const { inputText, setInputText, fetchLocation } = useContext(InputContext);

  const fetchLocationDebounced = useMemo(() => debounce(fetchLocation, 1000), [fetchLocation]);

  // useCallback = useMemo(() => () => ...)

  const handleChange = (e) => {
    const inputValue = e.target.value;
    setInputText(inputValue);
    // turn off useFetchLocation() when emptying the input
    if (inputValue.length > 0) fetchLocationDebounced(inputValue);
  };

  return (
    <>
      <div className='input-wrapper'>
        <input type='text' value={inputText} className='input-input' placeholder='Enter city name' onChange={handleChange} />
      </div>
    </>
  );
};

export { Input };