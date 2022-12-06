import * as React from "react";
import { Global } from "@emotion/react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { Button, useTheme } from "@mui/material";
import { grey } from "@mui/material/colors";
import { CustomTabs } from "../elements";

const drawerBleeding = 56;

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: "#5038BC",
}));

const Puller = styled(Button)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === "light" ? grey[300] : grey[900],
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 36px)",
}));

export const SwipeableEdgeDrawer = (props) => {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <>
      <Global
        styles={{
          [theme.breakpoints.down("md")]: {
            ".MuiDrawer-root > .MuiPaper-root": {
              height: `calc(24% - ${drawerBleeding}px)`,
              overflow: "visible",
            },
          },
          [theme.breakpoints.down("sm")]: {
            ".MuiDrawer-root > .MuiPaper-root": {
              height: `calc(28% - ${drawerBleeding}px)`,
              overflow: "visible",
            },
          },
          [theme.breakpoints.up("sm")]: {
            ".MuiDrawer-root > .MuiPaper-root": {
              height: `calc(32% - ${drawerBleeding}px)`,
              overflow: "visible",
            },
          },
        }}
      />

      <SwipeableDrawer
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding + 56}
        disableSwipeToOpen={false}
        disableBackdropTransition={false}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          zIndex: 200099,
        }}
      >
        <StyledBox
          sx={{
            position: "absolute",
            top: -drawerBleeding - 56,
            height: "80%",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            visibility: "visible",
            right: 10,
            left: 10,
            zIndex: 20000,
          }}
        >
          <Puller />
          <Typography sx={{ p: 2, color: "#5038BC" }}>Bikun Tracker</Typography>
          <Box sx={{ p: "0px 12px" }}>
            <select className="w-full p-2 rounded-lg">
              <option>Halte Fakultas Teknik</option>
            </select>
          </Box>
        </StyledBox>

        <StyledBox
          sx={{
            position: "absolute",
            px: 2,
            pb: 2,
            height: "100%",
            overflow: "auto",
            right: 10,
            left: 10,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              height: "100%",
              alignItems: "center",
            }}
          >
            <CustomTabs />
          </Box>
        </StyledBox>
      </SwipeableDrawer>
    </>
  );
};

export default SwipeableEdgeDrawer;
