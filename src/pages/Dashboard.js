import { useState, useEffect } from "react";

import Gmaps from "../components/Gmaps";

const Dashboard = () => {


    return (
        <>
            <div className="flex flex-rows w-screen">
                <div className="lg:flex md:w-screen hidden">
                    Test
                </div>
                <div className="flex w-screen">
                    <Gmaps />
                </div>
                <div className="lg:flex md:w-screen hidden">
                    Two
                </div>

            </div>
        </>
    );
};

export default Dashboard;
