import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';

import Maps from "../components/maps/Maps";
import RouteInfo from "../components/info/RouteInfo";
import BottomDrawer from "../components/navigation/BottomDrawer";

const Dashboard = () => {


    return (
        <>
            <div className="flex flex-rows h-screen w-screen">
                <div className="lg:flex lg:w-1/3 hidden">
                    test
                </div>
                <div className="flex lg:w-1/3 w-screen">
                    <Maps />

                    <div className="lg:hidden absolute bottom-0 z-[2000]">
                        <BottomDrawer />
                    </div>

                </div>
                <div className="lg:flex lg:w-1/3 h-screen w-screen hidden">
                    <RouteInfo />
                </div>
            </div>
        </>
    );
};

export default Dashboard;
