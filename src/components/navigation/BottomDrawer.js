import * as React from 'react';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';

const drawerBleeding = 56;

const StyledBox = styled(Box)(({ theme }) => ({
    backgroundColor: '#5038BC',
}));

function SwipeableEdgeDrawer(props) {

    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen) => () => {

        setOpen(newOpen);

    };

    return (
        <>

            <Global
                styles={{
                    '.MuiDrawer-root > .MuiPaper-root': {
                        height: `calc(20% - ${drawerBleeding}px)`,
                        overflow: 'visible',
                    },
                }}
            />

            <SwipeableDrawer
                anchor="bottom"
                open={open}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
                swipeAreaWidth={drawerBleeding}
                disableSwipeToOpen={false}
                disableBackdropTransition={true}
                ModalProps={{
                    keepMounted: true,
                }}
            >

                <StyledBox
                    sx={{
                        position: 'absolute',
                        top: -drawerBleeding,
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        visibility: 'visible',
                        right: 10,
                        left: 10,
                    }}
                >
                    <Typography sx={{ p: 2, color: 'white' }}>51 results</Typography>
                </StyledBox>

                <StyledBox
                    sx={{
                        position: 'absolute',
                        px: 2,
                        pb: 2,
                        height: '100%',
                        overflow: 'auto',
                        right: 10,
                        left: 10
                    }}
                >
                    <Skeleton variant="rectangular" height="100%" />
                </StyledBox>
            </SwipeableDrawer>
        </>
    );
}

export default SwipeableEdgeDrawer;