import React, {createContext, useContext, useState} from "react";
import {_CalendarContext} from "./Context/CalendarContext.jsx";


export const _FormContext =createContext({})





function  FormContext({children}){

    const {setPendingDate}=useContext(_CalendarContext)

    const [open, setOpen] = React.useState(false);
    const [description,setDescription] = useState("")
    const [currentDate,setCurrentDate] =useState(null)
    const handleOpen = (date) => {

        setOpen(!open);
    }
   const TodayModal=()=>{
       setPendingDate(null)
       setOpen(true);
   }




    return (

        <_FormContext.Provider value={{handleOpen,setOpen,open,description,setDescription,TodayModal}}  >
            {children}
        </_FormContext.Provider>
    )


}

export  default  FormContext