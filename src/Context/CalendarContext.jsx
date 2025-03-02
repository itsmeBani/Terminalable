import React, {createContext, useContext, useState} from 'react';
import {collection, getDocs, query, where,Timestamp} from "firebase/firestore";
import {db} from "../Services/Firebase-config.js";
import {_UserContext} from "./CurrentUser.jsx";



export const _CalendarContext =createContext({})
function CalendarContext({children}) {
    const {activeUser}=useContext(_UserContext)




    const [open, setOpen] = React.useState(false);
    const [selectedReport,setSelectedReport] = useState([])
    const [PendingDate,setPendingDate] = useState(null)
    const handleOpen = () => {

        setOpen(!open)
        if (open){
            setSelectedReport([])
        }
    };

        const FetchCurrentReport = async (dateString) => {
            try {
                const dateObject = new Date(dateString);
                const startOfDay = Timestamp.fromDate(new Date(dateObject.setHours(0, 0, 0, 0)));
                const endOfDay = Timestamp.fromDate(new Date(dateObject.setHours(23, 59, 59, 999)));
                const q = query(
                    collection(db, "Report"),
                    where("author", "==", activeUser),
                    where("date", ">=", startOfDay),
                    where("date", "<=", endOfDay),

                );

                const querySnapshot = await getDocs(q);

                if (querySnapshot.empty) {
                    console.log("No matching documents.");
                } else {
                    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    setSelectedReport(data);
                    console.log(data)
                }
            } catch (e) {
                console.error("Error fetching report:", e);
            }
        };

    return (
        <_CalendarContext.Provider value={{handleOpen,open, setOpen,FetchCurrentReport,selectedReport,setSelectedReport,PendingDate,setPendingDate}}>

            {children}
        </_CalendarContext.Provider>

    );
}

export default CalendarContext;