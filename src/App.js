import { Input } from './components/Input/Input';
import { InputContext } from './contexts/InputContext';
import { useState, useRef } from 'react';
import { useFetchLocation } from './hooks/useFetchLocation';
import { useFetchWeather } from './hooks/useFetchWeather';
import styles from './App.module.scss';

import { Alert, Box, Container, List, ListItem, ListItemButton, ListItemText, Stack } from '@mui/material';

function App() {
  const [inputText, setInputText] = useState('');
  const [lon, setLon] = useState(null);
  const [lat, setLat] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const { dataLocation, loadingLocation, errorLocation, setDataLocation, fetchLocation } = useFetchLocation();
  const { dataWeather, loadingWeather, errorWeather, fetchWeather } = useFetchWeather();
  const history = useRef([]);

  // useRef explained --> https://youtu.be/LlvBzyy-558?t=2280

  const selectItem = (item) => {
    const { lon, lat } = item;
    setLon(lon);
    setLat(lat);
    fetchWeather(lon, lat);
    setInputText('');
    setDataLocation([]);

    const itemID = item.place_id;
    history.current = history.current.filter((data) => data.place_id !== itemID);
    history.current.push(item);
  };

  const showHistory = () => {
    setDataLocation(history.current.reverse());
  };

  // // TODO: implement loading / error
  // ? How to handle error when you enter non existing location?
  // ? What to do with {lon, lat} that are not used here but throw error?

  return (
    <InputContext.Provider value={{ inputText, setInputText, fetchLocation }}>
      <Container maxWidth='sm'>
        <Input onClear={showHistory} inputText={inputText} setInputText={setInputText} fetchLocation={fetchLocation} />
        <Box className={styles.Box}>
          <List className={styles.List}>
            {loadingLocation ? (
              <ListItem>
                <ListItemButton>Loading...</ListItemButton>
                <ListItemButton>{errorLocation && 'Location not found'}</ListItemButton>
              </ListItem>
            ) : (
              dataLocation.map((item, index) => (
                <ListItem
                  className='locations-item'
                  onClick={() => {
                    selectItem(item);
                    setSelectedCity(item.address.name);
                  }}
                  key={index}
                >
                  <ListItemButton>
                    <ListItemText primary={`${item.display_place}, ${item.display_address} `} />
                  </ListItemButton>
                </ListItem>
              ))
            )}

            {}
          </List>
        </Box>
        <Stack className={styles.Stack} spacing={2}>
          <Alert severity='success'>
            Current temperature in {selectedCity}: {loadingWeather ? <span> loading...</span> : dataWeather?.main?.temp}
            {errorWeather && <span>Something went wrong</span>}
          </Alert>
        </Stack>
      </Container>
    </InputContext.Provider>
  );
}

export default App;
