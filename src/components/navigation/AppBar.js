import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Backdrop from '@mui/material/Backdrop';

import AppLogo from '../../assets/app-logo.png';

import RouteInfo from "../info/RouteInfo";
import About from '../info/About';

// Material Icons
import RouteIcon from '@mui/icons-material/Route';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

function ResponsiveAppBar() {

    const [ruteOpen, setRuteOpen] = useState(false);
    const [aboutOpen, setAboutOpen] = useState(false);

    const handleInformaiRute = () => {

        setRuteOpen(!ruteOpen);

    };

    const handleInformasiRuteClose = () => {

        setRuteOpen(false);

    };

    const handleAbout = () => {

        setAboutOpen(!aboutOpen);

    }

    const handleAboutClose = () => {

        setAboutOpen(false);

    }

    return (

        <>
            <div className="">
                <AppBar position="static" style={{ backgroundColor: 'white' }}>
                    <Container maxHeight="sm">
                        <Toolbar disableGutters>
                            <div className="flex flex-row w-full items-center">
                                <div className="flex justify-center items-center w-2/4 p-2">
                                    <img src={AppLogo} alt="App Logo" />
                                </div>
                                <div className="absolute right-0 space-x-2">
                                    <div className="flex flex-row">
                                        <div className="lg:hidden">
                                            <RouteIcon fontSize="large" style={{ color: '#5038bc' }} onClick={handleInformaiRute} />
                                        </div>
                                        <InfoOutlinedIcon fontSize="large" style={{ color: '#5038bc' }} onClick={handleAbout} />
                                    </div>
                                </div>
                            </div>
                        </Toolbar>
                    </Container>
                </AppBar>

                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={ruteOpen}
                    onClick={handleInformasiRuteClose}
                >
                    <div className="flex h-screen w-10/12 sm:w-4/5 md:w-3/5 items-center justify-center">
                        <div className="py-4 w-full bg-white rounded-xl shadow-xl drop-shadow-sm">

                            <RouteInfo />

                        </div>
                    </div>
                </Backdrop>

                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={aboutOpen}
                    onClick={handleAboutClose}
                >

                    <div className="flex h-2/3 items-center justify-center">
                        <div className="bg-white py-5 w-11/12 sm:w-3/5 md:w-3/6 lg:w-3/5 rounded-xl shadow-xl drop-shadow-sm">

                            <About />
                        </div>

                    </div>


                </Backdrop>
            </div>
        </>

    );
}

export default ResponsiveAppBar;