import React, { createContext, useContext, useState } from "react";

export const BikunContext = createContext({});

export const useBikunContext = () => useContext(BikunContext);

const BikunContextProvider = ({ children }) => {

    const [dataBikun, setDataBikun] = useState([]);
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
