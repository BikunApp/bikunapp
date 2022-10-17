import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';

import RouteInfo from "../info/RouteInfo";

//Icons
import DirectionsIcon from '@mui/icons-material/Directions';

export default function SimpleBottomNavigation() {
    const [value, setValue] = React.useState(0);

    var handleInformasiRute = (e) => {

        


    }

    return (
        <>
            <div className="flex">
                <Box sx={{ width: '100vw' }}>
                    <BottomNavigation
                        showLabels
                    >
                        <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
                        <BottomNavigationAction label="Informasi Rute" onClick={() => handleInformasiRute()} icon={<DirectionsIcon />} />
                    </BottomNavigation>
                </Box>
            </div>
        </>
    );
}
