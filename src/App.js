import { useState, useRef } from 'react';

import { useFetchLocation } from './hooks/useFetchLocation';
import { useFetchWeather } from './hooks/useFetchWeather';

import { SearchInput } from './components/SearchInput/SearchInput';
import { WeatherBar } from './components/WeatherBar/WeatherBar';

import { Box, Container, List } from '@mui/material';
import styles from './App.module.scss';
import { LocationLoading } from './components/LocationLoading/LocationLoading';
import { LocationError } from './components/LocationError/LocationError';
import { LocationDataLists } from './components/LocationDataLists/LocationDataLists';

function App() {
  const [inputText, setInputText] = useState('');

  const [selectedCity, setSelectedCity] = useState(null);
  const { dataLocation, loadingLocation, errorLocation, setDataLocation, fetchLocation } = useFetchLocation();
  const { dataWeather, loadingWeather, errorWeather, fetchWeather } = useFetchWeather();
  const history = useRef([]);

  // useRef explained --> https://youtu.be/LlvBzyy-558?t=2280

  const selectItem = (item) => {
    const { lon, lat, place_id: placeID } = item;
    fetchWeather(lon, lat);
    setInputText('');
    setDataLocation([]);

    const itemID = placeID;
    history.current = history.current.filter((data) => data.place_id !== itemID);
    history.current.push(item);
  };

  const handleItemClick = (item) => {
    const { display_place: displayPlace, display_address: displayAddress } = item;
    selectItem(item);
    setSelectedCity(`${displayPlace} ${displayAddress}`);
  };

  const showHistory = () => {
    setDataLocation(history.current.reverse());
  };

  return (
    <Container maxWidth='sm'>
      <SearchInput onClear={showHistory} value={inputText} onChange={setInputText} onChangeDebounced={fetchLocation} />

      <Box className={styles.Box}>
        <List className={styles.List}>
          {loadingLocation && <LocationLoading />}
          {errorLocation && <LocationError error={errorLocation} />}
          {dataLocation && <LocationDataLists data={dataLocation} onClick={handleItemClick} />}
        </List>
      </Box>

      {selectedCity && (
        <WeatherBar selectedCity={selectedCity} loading={loadingWeather} temp={dataWeather?.main?.temp} error={errorWeather} />
      )}
    </Container>
  );
}

export default App;
