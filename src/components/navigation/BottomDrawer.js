import React, { useState } from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import Backdrop from '@mui/material/Backdrop';

import RouteInfo from "../info/RouteInfo";

//Icons
import DirectionsIcon from '@mui/icons-material/Directions';

export default function SimpleBottomNavigation() {

    const [ruteOpen, setRuteOpen] = useState(false);

    const handleInformasiRuteClose = () => {

        setRuteOpen(false);

    };

    const handleInformaiRute = () => {

        setRuteOpen(!ruteOpen);

    };

    return (
        <>
            <div className="flex">
                <Box sx={{ width: '100vw' }}>
                    <BottomNavigation
                        showLabels
                    >
                        <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
                        <BottomNavigationAction label="Informasi Rute" onClick={handleInformaiRute} icon={<DirectionsIcon />} />
                    </BottomNavigation>
                </Box>
            </div>

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={ruteOpen}
                onClick={handleInformasiRuteClose}
            >
                <div className="flex h-screen w-11/12 items-center justify-center">
                    <div className="py-4 w-full bg-white rounded-xl shadow-xl drop-shadow-sm">

                        <RouteInfo />

                    </div>
                </div>
            </Backdrop>
        </>
    );
}
