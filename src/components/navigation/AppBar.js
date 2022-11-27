import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Backdrop from "@mui/material/Backdrop";
import IconButton from "@mui/material/IconButton";

import AppLogo from "../../assets/app-logo.png";

import RouteInfo from "../info/RouteInfo";
import About from "../info/About";

// Material Icons
import RouteIcon from "@mui/icons-material/Route";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

function ResponsiveAppBar(props) {
  let mainRef = props.props;

  const mapCenter = [-6.3594334, 106.8275797];
  const mapZoom = 15;

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
  };

  var handleResetView = (e) => {
    mainRef.current.setView(mapCenter, mapZoom);
  };

  return (
    <>
      <div className="w-full">
        <AppBar position="fixed" style={{ backgroundColor: "white" }}>
          <Container maxHeight="sm">
            <Toolbar disableGutters>
              <div className="flex flex-row w-full items-center">
                <div className="flex justify-center items-center w-2/4 p-2">
                  <img src={AppLogo} alt="App Logo" width={200} />
                </div>
                <div className="absolute right-0 space-x-2">
                  <div className="flex flex-row">
                    <div className="lg:hidden">
                      <IconButton aria-label="Informasi Rute">
                        <RouteIcon
                          fontSize="large"
                          style={{ color: "#5038bc" }}
                          onClick={handleInformaiRute}
                        />
                      </IconButton>
                    </div>
                    <IconButton aria-label="Tentang">
                      <InfoOutlinedIcon
                        fontSize="large"
                        style={{ color: "#5038bc" }}
                        onClick={handleAbout}
                      />
                    </IconButton>
                    <IconButton aria-label="Reset Tampilan">
                      <RestartAltIcon
                        fontSize="large"
                        style={{ color: "#5038bc" }}
                        onClick={handleResetView}
                      />
                    </IconButton>
                  </div>
                </div>
              </div>
            </Toolbar>
          </Container>
        </AppBar>

        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1000 }}
          open={ruteOpen}
          onClick={handleInformasiRuteClose}
        >
          <div className="flex h-screen w-10/12 sm:w-6/12 md:w-2/5 items-center justify-center">
            <div className="py-4 w-full bg-white rounded-xl shadow-xl drop-shadow-sm">
              <RouteInfo />
            </div>
          </div>
        </Backdrop>

        <div
          className={`${
            aboutOpen ? "flex" : "hidden"
          } lg:h-2/3 md:mt-16 mt-10 bg-white min-w-full`}
        >
          <div className="bg-white py-5 w-full overflow-auto">
            <About />
          </div>
        </div>
      </div>
    </>
  );
}

export default ResponsiveAppBar;
