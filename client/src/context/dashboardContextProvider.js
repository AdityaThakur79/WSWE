import React, { createContext, useContext, useState } from 'react';
// Create the context
const StateContext = createContext();

// Create the context provider component
export const DashboardContextProvider = ({ children }) => {
    const [activeSidebar, setActiveSidebar] = useState(true);
    const [screenSize, setScreenSize] = useState(undefined)
    return (
        <StateContext.Provider value={{ activeSidebar, setActiveSidebar, screenSize, setScreenSize }}>
            {children}
        </StateContext.Provider>
    );
};

// Custom hook to use the context easily in other components
export const useDashboardContext = () => useContext(StateContext);
