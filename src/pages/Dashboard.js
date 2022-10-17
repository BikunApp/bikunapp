import { useState, useEffect } from "react";

import Maps from "../components/maps/Maps";

const Dashboard = () => {


    return (
        <>
            <div className="flex flex-rows w-screen">
                <div className="lg:flex lg:w-1/3 hidden">
                    test
                </div>
                <div className="flex lg:w-1/3 w-screen">
                    <Maps />
                </div>
                <div className="lg:flex lg:w-1/3 hidden">
                    Two
                </div>

            </div>
        </>
    );
};

export default Dashboard;
