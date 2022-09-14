import React, { useMemo } from 'react';
import { InputBase, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import styles from './SearchInput.module.scss';

import { debounce } from '../../utils/debounce';

const SearchInput = ({ onClear, value, onChange, onChangeDebounced }) => {
  //
  const [fetchLocationDebounced, cancelDebounce] = useMemo(() => debounce(onChangeDebounced, 1000), [onChangeDebounced]);

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

    onChange(inputValue);
  };

  return (
    <Paper elevation={3} className={styles.Paper}>
      <InputBase
        className={styles.InputBase}
        placeholder='Check the weather in your city...'
        inputProps={{ 'aria-label': 'check the weather' }}
        value={value}
        onChange={handleChange}
      />
      <SearchIcon className={styles.SearchIcon} />
    </Paper>
  );
};

export { SearchInput };

// Fetch --> POST, Delete, Patch -- methods
// https://github.com/kasivivekkasivivek/Todo-Application-nodejs
// https://jsonplaceholder.typicode.com/guide/
