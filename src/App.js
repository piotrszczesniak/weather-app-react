import './App.scss';
import { Input } from './components/Input';
import { InputContext } from './contexts/InputContext';
import { useState, useRef } from 'react';
import { useFetchLocation } from './hooks/useFetchLocation';
import { useFetchWeather } from './hooks/useFetchWeather';

function App() {
  const [inputText, setInputText] = useState('');
  const [lon, setLon] = useState(null);
  const [lat, setLat] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const { dataLocation, setDataLocation, fetchLocation } = useFetchLocation();
  const { dataWeather, fetchWeather } = useFetchWeather();
  const history = useRef([]);

  const selectItem = (item) => {
    const { lon, lat } = item;
    setLon(lon);
    setLat(lat);
    fetchWeather(lon, lat);
    setInputText('');
    setDataLocation([]);

    history.current.push(item);
  };

  const showHistory = () => {
    setDataLocation(history.current);
  };

  return (
    <InputContext.Provider value={{ inputText, setInputText, fetchLocation }}>
      <div className='App'>
        <p>
          Selected city {selectedCity} gps: {lon} : {lat}
        </p>
        <Input onClear={showHistory} />
        <ul className='locations-list'>
          {dataLocation.map((item, index) => (
            <li
              className='locations-item'
              onClick={() => {
                selectItem(item);
                setSelectedCity(item.address.name);
              }}
              key={index}
            >
              {item.display_place}, {item.display_address}
            </li>
          ))}
        </ul>
        <div className='weather-list'>
          <p>
            Current temperature in {selectedCity}: {dataWeather?.main?.temp}
          </p>
        </div>
      </div>
    </InputContext.Provider>
  );
}

export default App;
