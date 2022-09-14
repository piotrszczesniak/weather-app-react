import { useState, useRef } from 'react';

import { useFetchLocation } from './hooks/useFetchLocation';
import { useFetchWeather } from './hooks/useFetchWeather';

import { SearchInput } from './components/SearchInput/SearchInput';
import { WeatherBar } from './components/WeatherBar/WeatherBar';

import { Box, Container, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import styles from './App.module.scss';

function App() {
  const [inputText, setInputText] = useState('');

  const [selectedCity, setSelectedCity] = useState(null);
  const { dataLocation, loadingLocation, errorLocation, setDataLocation, fetchLocation } = useFetchLocation();
  const { dataWeather, loadingWeather, errorWeather, fetchWeather } = useFetchWeather();
  const history = useRef([]);

  // useRef explained --> https://youtu.be/LlvBzyy-558?t=2280

  const selectItem = (item) => {
    const { lon, lat } = item;
    fetchWeather(lon, lat);
    setInputText('');
    setDataLocation([]);

    const itemID = item.place_id;
    history.current = history.current.filter((data) => data.place_id !== itemID);
    history.current.push(item);
  };

  const handleItemClick = (item) => {
    selectItem(item);
    setSelectedCity(`${item.display_place} ${item.display_address}`);
  };

  const showHistory = () => {
    setDataLocation(history.current.reverse());
  };

  // // TODO: implement loading / error
  // ? How to handle error when you enter non existing location?
  // ? What to do with {lon, lat} that are not used here but throw error?

  // if ( error ) {
  //   return <Box>Error</Box>
  // }

  // if (loading) {
  //   return <Box>Loading</Box>
  // }

  return (
    <Container maxWidth='sm'>
      <SearchInput onClear={showHistory} value={inputText} onChange={setInputText} onChangeDebounced={fetchLocation} />
      {/* ! TODO: put it into a separate component */}
      <Box className={styles.Box}>
        <List className={styles.List}>
          {loadingLocation ? (
            <ListItem>
              <ListItemButton>Loading...</ListItemButton>
              <ListItemButton>{errorLocation && 'Location not found'}</ListItemButton>
            </ListItem>
          ) : (
            dataLocation.map((item, index) => (
              <ListItem className='locations-item' onClick={() => handleItemClick(item)} key={index}>
                <ListItemButton>
                  <ListItemText primary={`${item.display_place}, ${item.display_address} `} />
                </ListItemButton>
              </ListItem>
            ))
          )}
        </List>
      </Box>
      {selectedCity && (
        <WeatherBar selectedCity={selectedCity} loading={loadingWeather} temp={dataWeather?.main?.temp} error={errorWeather} />
      )}
    </Container>
  );
}

export default App;
