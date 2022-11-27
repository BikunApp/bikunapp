import React, { createRef } from "react";
import Maps from "../components/maps/Maps";
import RouteInfo from "../components/info/RouteInfo";

// Components
import BottomDrawer from "../components/navigation/BottomDrawer";
import AppBar from "../components/navigation/AppBar";
//import TestPage from '../components/TestPage';

let mainRef = createRef();

const Dashboard = () => {
  return (
    <>
      <div className="flex justify-center min-h-screen">
        <div className="flex flex-col min-h-screen w-full max-w-screen-sm font-poppins">
          <AppBar props={mainRef} />
          <Maps props={mainRef} />

          {/* <div className="flex lg:w-1/3 w-screen justify-center">
          <div className="absolute z-[5001] lg:w-1/3 w-full"></div>

          <div className="absolute lg:hidden bottom-0 ">
            <BottomDrawer />
          </div>
        </div>
        <div className="lg:flex lg:w-1/3 h-screen w-screen hidden">
          <RouteInfo />
        </div> */}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
