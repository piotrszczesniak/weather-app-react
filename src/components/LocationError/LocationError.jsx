import React from 'react';

import { ListItem, ListItemButton } from '@mui/material';

const LocationError = ({ error }) => {
  return (
    <ListItem>
      <ListItemButton>Sorry, there was an error - {error}</ListItemButton>
    </ListItem>
  );
};

export { LocationError };
