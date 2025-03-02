import {createContext, useState} from "react";

export const _UserContext =createContext({})




function UserContext({children}) {
const [activeUser,setActiveUser] =useState("bani")




    const changeUsers=(author)=>{

    setActiveUser(author)
    }
    return (
    <_UserContext.Provider value={{activeUser,changeUsers}}>
        {children}
    </_UserContext.Provider>
    )
}

export default  UserContext;