import { useState, useEffect } from "react";

import Gmaps from "../components/Gmaps";

const Dashboard = () => {


    return (
        <>
            <div className="flex flex-rows w-screen">
                <div className="lg:flex lg:w-1/3 hidden">
                    Test
                </div>
                <div className="flex lg:w-1/3 w-screen">
                    <Gmaps />
                </div>
                <div className="lg:flex lg:w-1/3 hidden">
                    Two
                </div>

            </div>
        </>
    );
};

export default Dashboard;
