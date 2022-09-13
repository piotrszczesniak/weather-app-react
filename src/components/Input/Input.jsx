import React, { useMemo } from 'react';
import { InputBase, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import styles from './Input.module.scss';

import { debounce } from '../../utils/debounce';

const Input = ({ onClear, inputText, setInputText, fetchLocation }) => {
  //
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
    <Paper className={styles.Paper}>
      <InputBase
        className={styles.InputBase}
        placeholder='Check the weather in your city...'
        inputProps={{ 'aria-label': 'check the weather' }}
        value={inputText}
        onChange={handleChange}
      />
      <SearchIcon className={styles.SearchIcon} />
    </Paper>
  );
};

export { Input };

// Fetch --> POST, Delete, Patch -- methods
// https://github.com/kasivivekkasivivek/Todo-Application-nodejs
// https://jsonplaceholder.typicode.com/guide/
