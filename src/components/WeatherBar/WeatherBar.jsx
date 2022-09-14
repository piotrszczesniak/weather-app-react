import React from 'react';
import { Paper, Alert } from '@mui/material';

const WeatherBar = ({ selectedCity, loading, temp, error }) => {
  return (
    <Paper elevation={2}>
      <Alert severity='success'>
        Current temperature in <strong>{selectedCity}</strong> is: {loading ? <span> loading...</span> : `${temp} degress of Celcius.`}
        {/* TODO: replace span, strong with MUI component Typografy/Text */}
        {error && <span>Something went wrong</span>}
      </Alert>
    </Paper>
  );
};

export { WeatherBar };
