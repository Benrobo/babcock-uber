import React, {createContext, useState} from 'react'

const DataContext = createContext()

export default DataContext
 

export function DataContextProvider({children}) {
    return (
        <DataContextProvider.Provider>
            {children}
        </DataContextProvider.Provider>
    )
}

 
