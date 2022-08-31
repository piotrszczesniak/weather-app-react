import './App.scss';
import { Input } from './components/Input';
import { InputContext } from './contexts/InputContext';
import { useState } from 'react';
import { useFetchLocation } from './hooks/useFetchLocation';
import { useFetchWeather } from './hooks/useFetchWeather';

function App() {
  const [inputText, setInputText] = useState('');
  const [lon, setLon] = useState(null);
  const [lat, setLat] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const { dataLocation, setDataLocation, fetchLocation } = useFetchLocation();
  const { dataWeather, fetchWeather } = useFetchWeather();

  const selectItem = (lon, lat) => {
    setLon(lon);
    setLat(lat);
    fetchWeather(lon, lat);
    // clear input and array with fetched locations
    setInputText('');
    setDataLocation([]);
  };

  return (
    <InputContext.Provider value={{ inputText, setInputText, fetchLocation }}>
      <div className='App'>
        <p>
          Selected city {selectedCity} gps: {lon} : {lat}
        </p>
        <Input />
        <ul className='locations-list'>
          {dataLocation.map((item, index) => (
            <li
              className='locations-item'
              onClick={() => {
                selectItem(item.lon, item.lat);
                setSelectedCity(item.address.name);
              }}
              key={index}
            >
              {item.display_place}, {item.display_address}
            </li>
          ))}
        </ul>
        <ul className='weather-list'>
          <li>
            Current temperature in {selectedCity}: {dataWeather?.main?.temp}
          </li>
        </ul>
      </div>
    </InputContext.Provider>
  );
}

export default App;
