import { useCallback, useState } from 'react';

const API_KEY_WEATHER = 'c22d18f993dee18b792a2a1ea616d908';

const useFetchWeather = () => {
  const [dataWeather, setDataWeather] = useState([]);
  const [loadingWeather, setLoadingWeather] = useState(false);
  const [errorWeather, setErrorWeather] = useState(false);

  const fetchWeather = useCallback(async (lon, lat) => {
    try {
      const units = 'metric';
      const urlParamsWeather = new URLSearchParams();
      urlParamsWeather.set('lat', lat);
      urlParamsWeather.set('lon', lon);
      urlParamsWeather.set('appid', API_KEY_WEATHER);
      urlParamsWeather.set('units', units);

      // console.log(urlParamsWeather.toString());

      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?${urlParamsWeather.toString()}`);

      const json = await response.json();
      setDataWeather(json);
      setLoadingWeather(false);
    } catch (error) {
      setLoadingWeather(false);
      setErrorWeather(error);
    }
  }, []);

  return { dataWeather, loadingWeather, errorWeather, fetchWeather };
};

export { useFetchWeather };

// https://api.openweathermap.org/data/2.5/weather?lat=52.5170365&lon=13.3888599&appid=c22d18f993dee18b792a2a1ea616d908&units=metric