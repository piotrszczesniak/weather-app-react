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
