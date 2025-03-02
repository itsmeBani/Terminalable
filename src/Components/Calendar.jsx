import React, {useContext, useEffect, useState} from 'react';
import {DayPicker} from "react-day-picker";
import "react-day-picker/style.css";
import classNames from "react-day-picker/style.module.css";
import { useDayPicker } from "react-day-picker";
import ViewReport from "./ViewReport.jsx";
import {_CalendarContext} from "../Context/CalendarContext.jsx";
import {collection, getDocs, query, where} from "firebase/firestore";
import {db} from "../Services/Firebase-config.js";
import {formats} from "openai/internal/qs/index.js";
import useFetchReports from "../CustomHooks/useFetchReports.js";
import {_UserContext} from "../Context/CurrentUser.jsx";
function Calendar(props) {

    const {handleOpen,open,FetchCurrentReport,setPendingDate}=useContext(_CalendarContext)
    const {activeUser}=useContext(_UserContext)
    const  [dailyReport, setDailyReport]=useState(null)
    const { reports, loading, error } = useFetchReports();
    const formatedDate = reports?.map((item,index)=>{

      return  {id:item?.id, date:item.date?.toDate().toLocaleDateString('en-CA')}
    });

    return (
        <div className="flex w-full place-items-center justify-center h-full">
            <div className="   rounded-xl scale-100 ">
                <DayPicker mode="multiple"


                           onDayClick={(date, modifiers) => {
                               FetchCurrentReport(date)
                               handleOpen()
                               if (!modifiers.selected){
                                   setPendingDate(date)
                           }}}
                           onSelect={(e)=>console.log(e)}
                         selected={formatedDate?.map((item)=>item?.date)}
                />


            </div>
        </div>


    );
}

export default Calendar;




