import { useState, useEffect } from "react";

import Maps from "../components/maps/Maps";

import ruteBikun from "../assets/rute-bikun-only.png";

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
                <div className="lg:flex flex-col lg:w-1/3 hidden h-screen items-center justify-center">
                    <p className="text-lg text-center">Rute Bikun UI</p>
                    <img className="w-10/12" src={ruteBikun}></img>
                </div>

            </div>
        </>
    );
};

export default Dashboard;
