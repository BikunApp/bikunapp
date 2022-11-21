import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';

import AppLogo from '../../assets/app-logo.png';

// Material Icons
import RouteIcon from '@mui/icons-material/Route';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

function ResponsiveAppBar() {

    return (
        <AppBar position="static" style={{ backgroundColor: 'white' }}>
            <Container>
                <Toolbar disableGutters>
                    <div className="flex flex-row w-full items-center">
                        <div className="flex justify-center items-center w-2/4 p-2">
                            <img src={AppLogo} alt="App Logo" />
                        </div>
                        <div className="absolute right-0 space-x-2">
                            <RouteIcon fontSize="large" style={{ color: '#5038bc' }} />
                            <InfoOutlinedIcon fontSize="large" style={{ color: '#5038bc' }} />
                        </div>
                    </div>

                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default ResponsiveAppBar;