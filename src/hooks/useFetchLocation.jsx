import { useState, useCallback } from 'react';

const API_KEY_LOCATION = 'pk.a7b94414aec29a2b93abf911a8fd75f9';

const useFetchLocation = () => {
  const [dataLocation, setDataLocation] = useState([]);
  const [errorLocation, setErrorLocation] = useState(false);
  const [loadingLocation, setLoadingLocation] = useState(false);

  const fetchLocation = useCallback(async (text) => {
    const urlParamsLocation = new URLSearchParams();
    urlParamsLocation.set('key', API_KEY_LOCATION);
    urlParamsLocation.set('q', text);

    // console.log(urlParamsLocation.toString());

    setLoadingLocation(true);
    setErrorLocation('');
    try {
      const response = await fetch(`https://api.locationiq.com/v1/autocomplete?${urlParamsLocation.toString()}`);
      // console.log(response);

      if (!response.ok) {
        throw new Error(response.status);
      }

      const json = await response.json();
      setDataLocation(json);
    } catch (error) {
      setErrorLocation(error.message);
    } finally {
      setLoadingLocation(false);
    }
  }, []);

  return { dataLocation, setDataLocation, loadingLocation, errorLocation, fetchLocation };
};

export { useFetchLocation };

// https://api.locationiq.com/v1/autocomplete?key=pk.a7b94414aec29a2b93abf911a8fd75f9&q=london
