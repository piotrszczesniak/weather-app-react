import React, { useContext, useMemo } from 'react';
import { InputContext } from '../contexts/InputContext';
import { InputBase, Paper, Container } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

// import Paper from '@mui/material/Paper';

import { debounce } from './debounce';

const Input = ({ onClear }) => {
  // bring vars from the context
  const { inputText, setInputText, fetchLocation } = useContext(InputContext);

  const [fetchLocationDebounced, cancelDebounce] = useMemo(() => debounce(fetchLocation, 1000), [fetchLocation]);

  // useCallback = useMemo(() => () => ...)

  const handleChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue.length > 0) {
      fetchLocationDebounced(inputValue);
    } else {
      // turn off useFetchLocation() when emptying the input
      cancelDebounce();
      onClear();
    }

    setInputText(inputValue);
  };

  return (
    <>
      <div className='input-wrapper'>
        <Container maxWidth='sm' sx={{ display: 'flex', justifyContent: 'center' }}>
          <Paper component='form' sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}>
            <InputBase
              sx={{ p: 1, ml: 1, flex: 1 }}
              placeholder='Check the weather in your city...'
              inputProps={{ 'aria-label': 'check the weather' }}
              type='text'
              value={inputText}
              className='input-input'
              onChange={handleChange}
            />
            <SearchIcon sx={{ p: '10px' }} />
          </Paper>
        </Container>
      </div>
    </>
  );
};

export { Input };
