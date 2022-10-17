import { useState, useEffect } from "react";

import Maps from "../components/maps/Maps";
import RouteInfo from "../components/info/RouteInfo";

const Dashboard = () => {


    return (
        <>
            <div className="flex flex-rows h-screen w-screen">
                <div className="lg:flex lg:w-1/3 hidden">
                    test
                </div>
                <div className="flex lg:w-1/3 w-screen">
                    <Maps />
                </div>
                <div className="lg:flex lg:w-1/3 h-screen w-screen hidden">
                    <RouteInfo />
                </div>
            </div>
        </>
    );
};

export default Dashboard;
