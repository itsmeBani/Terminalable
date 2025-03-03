import './App.css'
import Calendar from "./Components/Calendar.jsx";
import Navigation from "./Components/Navigation.jsx";

import {PDFViewer} from "@react-pdf/renderer";
import {Button, IconButton} from "@material-tailwind/react";
import AddButton from "./Components/AddButton.jsx";
import Modal from "./Components/Modal.jsx";
import Form from "./Components/Form.jsx";
import BaniBot from "./Components/BaniBot.jsx";
import React, {useContext, useEffect, useRef} from "react";
import CalendarContext from "./Context/CalendarContext.jsx";
import {doc, getDoc} from "firebase/firestore";
import {db} from "./Services/Firebase-config.js";
import PrintPDF from "./Components/PrintPDF.jsx";
import {_UserContext} from "./Context/CurrentUser.jsx";





function App() {



const {changeUsers,activeUser}=useContext(_UserContext)
    return (
        <div className="h-[100dvh] p-3 lg:p-20 bg-[#191919]">
            <CalendarContext>

            <div
                className=" h-full place-items-center flex justify-between flex-col pt-10 bg-[#292929] relative rounded-xl shadow-md ">
                <div className={" flex    flex-col "}>


                 <div className="gap-1 flex">
                     <Button onClick={()=>changeUsers("xavier")}  className="text-[10px] lg:text-[12px] px-3 py-2 lg:px-4 lg:py-3"    variant={activeUser === "xavier" ? "gradient" : "outlined"} color={"indigo"}>Xavier</Button>
                     <Button onClick={()=>changeUsers("bani")} className="text-[10px] lg:text-[12px] px-3 py-2 lg:px-4 lg:py-3"   variant={activeUser === "bani" ? "gradient" : "outlined"}  color="indigo">Bani</Button>
                 </div>
                    <PrintPDF/>

                        <Calendar/>


                </div>
                <Form/>
            </div>
            </CalendarContext>

        </div>
    )
}

export default App
