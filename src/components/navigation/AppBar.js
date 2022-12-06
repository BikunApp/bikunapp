import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import IconButton from "@mui/material/IconButton";

import AppLogo from "../../assets/app-logo.png";

import RouteInfo from "../info/RouteInfo";
import About from "../info/About";

// Material Icons
import RouteIcon from "@mui/icons-material/Route";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

export const ResponsiveAppBar = (props) => {
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
      <nav className="z-[5000] bg-white w-full max-w-screen-sm max-h-screen flex flex-col fixed shadow-2xl">
        <div className="flex justify-between gap-4">
          <div className="flex flex-row w-full justify-between items-center px-3">
            <div className="flex justify-center items-center ">
              <img src={AppLogo} alt="App Logo" width={160} />
            </div>
            <div className="">
              <div className="flex flex-row">
                <div className="lg:hidden">
                  <IconButton
                    aria-label="Informasi Rute"
                    onClick={handleInformaiRute}
                  >
                    <RouteIcon fontSize="large" style={{ color: "#5038bc" }} />
                  </IconButton>
                </div>
                <IconButton aria-label="Tentang" onClick={handleAbout}>
                  <InfoOutlinedIcon
                    fontSize="large"
                    style={{ color: "#5038bc" }}
                  />
                </IconButton>
                <IconButton
                  aria-label="Reset Tampilan"
                  onClick={handleResetView}
                >
                  <RestartAltIcon
                    fontSize="large"
                    style={{ color: "#5038bc" }}
                  />
                </IconButton>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`${
            aboutOpen
              ? "flex z-[10000] max-w-screen-sm bg-white overflow-auto"
              : "hidden"
          }`}
        >
          <div className="py-5 w-full overflow-auto">
            <About />
          </div>
        </div>
      </nav>

      <Backdrop
        sx={{ color: "#fff", zIndex: 20001 }}
        open={ruteOpen}
        onClick={handleInformasiRuteClose}
      >
        <div className="flex h-screen w-10/12 sm:w-6/12 md:w-2/5 items-center justify-center">
          <div className="py-4 w-full bg-white rounded-xl shadow-xl drop-shadow-sm">
            <RouteInfo />
          </div>
        </div>
      </Backdrop>
    </>
  );
};

export default ResponsiveAppBar;
