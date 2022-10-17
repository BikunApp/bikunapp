import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';

//Icons
import DirectionsIcon from '@mui/icons-material/Directions';

export default function SimpleBottomNavigation() {
    const [value, setValue] = React.useState(0);

    return (
        <>
            <div className="flex">
                <Box sx={{ width: '100vw' }}>
                    <BottomNavigation
                        showLabels
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                    >
                        <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
                        <BottomNavigationAction label="Informasi Rute" icon={<DirectionsIcon />} />
                    </BottomNavigation>
                </Box>
            </div>
        </>
    );
}
