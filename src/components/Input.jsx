import React, { useContext, useMemo } from 'react';
import { InputContext } from '../contexts/InputContext';
import { InputBase, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

// import Paper from '@mui/material/Paper';

import { debounce } from '../utils/debounce';

const Input = ({ onClear }) => {
  // bring vars from the context
  // TODO: remove context - use props instead
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

  // TODO: add classNames and remove sx
  return (
    <Paper sx={{ p: '2px 4px', m: '16px 0', display: 'flex', alignItems: 'center', justifyContent: 'start', width: '100%' }}>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder='Check the weather in your city...'
        inputProps={{ 'aria-label': 'check the weather' }}
        value={inputText}
        onChange={handleChange}
      />
      <SearchIcon sx={{ p: '10px' }} />
    </Paper>
  );
};

export { Input };

// Fetch --> POST, Delete, Patch -- methods
// https://github.com/kasivivekkasivivek/Todo-Application-nodejs
// https://jsonplaceholder.typicode.com/guide/
