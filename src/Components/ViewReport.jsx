import React, {useContext} from 'react';
import {Button, Dialog, DialogHeader, IconButton, Textarea, Typography} from "@material-tailwind/react";
import {XMarkIcon} from "@heroicons/react/24/outline";
import {_CalendarContext} from "../Context/CalendarContext.jsx";
import EmptyState from "./EmptyState.jsx";

function ViewReport(props) {

    const {handleOpen, open,selectedReport,setSelectedReport} = useContext(_CalendarContext)
    return (
        <div>


            <Dialog   size="lg" open={open} handler={handleOpen} className="p-4 bg-[#212121] flex flex-col overflow-auto gap-5">

                {selectedReport.length > 0 ?   <><div className={`grid grid-cols-3 gap-2`}>
                        {selectedReport?.map((item, index) => (
                            item?.images.map((image, index) =>(

                                <div key={index} className="w-full">
                                    <img
                                        className="h-30 w-full rounded-lg object-cover object-center md:h-60"
                                        src={image}
                                        alt=""
                                    />
                                </div>
                            ))

                        ))}
                    </div>
                        <p className="text-white">{ new Date(selectedReport[0]?.date.toDate()).toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                        })}</p>

                        <Textarea  rows={7} color="blue" onChange={()=>console.log("e")} value={selectedReport[0]?.description} className="text-white" label="Description"/>

                        <div className="w-full flex justify-end">
                            <Button onClick={handleOpen}>Close</Button>
                            <Button>Save</Button>
                        </div> </>:
                  <EmptyState/>
                }
            </Dialog>


        </div>
    );
}

export default ViewReport;