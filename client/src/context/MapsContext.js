import React,{createContext,useContext,useState} from 'react'

const stateContext=createContext()

export const MapsContextProvider=({children})=>{
    const [currentLocation,setCurrentLocation]=useState({lat:null,lng:null});
    const[safeLocationPoints,setSafeLocationPoints]=useState({lat:null,lng:null})
    return (
        <stateContext.Provider value={{currentLocation,setCurrentLocation,safeLocationPoints,setSafeLocationPoints}}>
            {children}
        </stateContext.Provider>
    )
}

export const useMapsContext=()=>useContext(stateContext)
