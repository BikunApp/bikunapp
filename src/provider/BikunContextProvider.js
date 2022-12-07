import React, { createContext, useContext, useState } from "react";

export const BikunContext = createContext({});

export const useBikunContext = () => useContext(BikunContext);

const BikunContextProvider = ({ children }) => {

    const [choosenHalte, setChoosenHalte] = useState("");
    const [choosenJalur, setChoosenJalur] = useState("");

    const value = {

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
