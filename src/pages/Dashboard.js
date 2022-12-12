import React, { createRef } from "react";
import Maps from "../components/maps/Maps";
import RouteInfo from "../components/info/RouteInfo";

// Components
import { ResponsiveAppBar, CustomBottomDrawer } from "../components/navigation";
//import TestPage from '../components/TestPage';

let mainRef = createRef();

const Dashboard = () => {
  return (
    <>
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex w-screen lg:w-auto max-w-screen-sm font-poppins">
          <ResponsiveAppBar props={mainRef} />
          <Maps props={{ mainRef }} />
          {/* <SwipeableEdgeDrawer /> */}

          <CustomBottomDrawer props={{ mainRef }} />

        </div>

        <div className="lg:flex lg:w-1/3 w-0 justify-center items-center hidden">
          <RouteInfo />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
