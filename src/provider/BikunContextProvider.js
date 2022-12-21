import React, { createContext, useContext, useState } from "react";
import useStateCallback from "../hooks/useStateCallback"

export const BikunContext = createContext({});

export const useBikunContext = () => useContext(BikunContext);

const BikunContextProvider = ({ children }) => {

    const [dataBikun, setDataBikun] = useStateCallback([]);
    const [choosenHalte, setChoosenHalte] = useState("");
    const [choosenJalur, setChoosenJalur] = useState("");

    const value = {

        dataBikun,
        setDataBikun,
        choosenHalte,
        setChoosenHalte,
        choosenJalur,
        setChoosenJalur

    };

    return (

        <BikunContext.Provider value={value}>{children}</BikunContext.Provider>

    );
};

export default BikunContextProvider;
