import React from 'react';

import { ListItem, ListItemButton, ListItemText } from '@mui/material';

const LocationDataLists = ({ data, onClick }) => {
  return (
    <>
      {data?.map((item, index) => (
        <ListItem className='locations-item' onClick={() => onClick(item)} key={index}>
          <ListItemButton>
            {/* i dont know how to rename below consts because i still need to use item above*/}
            <ListItemText primary={`${item.display_place}, ${item.display_address} `} />
          </ListItemButton>
        </ListItem>
      ))}
    </>
  );
};

export { LocationDataLists };
