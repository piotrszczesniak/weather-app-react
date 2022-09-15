import React from 'react';

import { ListItem, ListItemButton } from '@mui/material';

const LocationError = ({ error }) => {
  return (
    <ListItem>
      <ListItemButton>Page not found - {error}</ListItemButton>
    </ListItem>
  );
};

export { LocationError };
