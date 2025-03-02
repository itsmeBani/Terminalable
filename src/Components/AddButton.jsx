import React, {useContext} from 'react';
import {IconButton, Tooltip} from "@material-tailwind/react";
import {PlusIcon} from "@heroicons/react/24/solid"
import FormContext, {_FormContext} from "../FormContext.jsx";
function AddButton(props) {

    const {TodayModal, open}=useContext(_FormContext)
    return (
     <div className="p-10 w-full justify-end  flex">


         <Tooltip
             content="Add Report Today" offset={10}
             className={"bg-[#212121]"}
             animate={{
                 mount: { scale: 1, y: 0 },
                 unmount: { scale: 0, y: 25 },
             }}
         >
             <IconButton onClick={TodayModal}  size={"lg"} variant={"gradient"} color={"green"}>

                 <PlusIcon className={"w-5 h-5 font-bold"}/>
             </IconButton>
         </Tooltip>


     </div>
    );
}

export default AddButton;