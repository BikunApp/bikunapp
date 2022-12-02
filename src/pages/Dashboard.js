import React, { createRef } from "react";
import Maps from "../components/maps/Maps";
import RouteInfo from "../components/info/RouteInfo";

// Components
import {
  ResponsiveAppBar,
  CustomBottomDrawer,
  SwipeableEdgeDrawer,
} from "../components/navigation";
//import TestPage from '../components/TestPage';

let mainRef = createRef();

const Dashboard = () => {
  return (
    <>
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex w-screen lg:w-auto max-w-screen-sm font-poppins">
          <ResponsiveAppBar props={mainRef} />
          <Maps props={mainRef} />
          {/* <SwipeableEdgeDrawer /> */}
          <CustomBottomDrawer />
        </div>

        <div className="lg:flex w-1/3 justify-center items-center hidden">
          <RouteInfo />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
