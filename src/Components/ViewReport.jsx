import React, {useContext, useEffect, useRef, useState} from 'react';
import {Button, Dialog, DialogHeader, IconButton, Textarea, Typography} from "@material-tailwind/react";
import {TrashIcon, XMarkIcon} from "@heroicons/react/24/outline";
import {_CalendarContext} from "../Context/CalendarContext.jsx";
import EmptyState from "./EmptyState.jsx";
import {CardPlacehoderSkeleton} from "./Loader.jsx";
import {doc, updateDoc, deleteDoc} from "firebase/firestore";
import {db} from "../Services/Firebase-config.js";
import {_UserContext} from "../Context/CurrentUser.jsx";

function ViewReport(props) {

    const {
        handleOpen,
        open,
        setOpen,
        selectedReport,loading,setLoading,setSelectedReport,FetchCurrentReport
    } = useContext(_CalendarContext)
    const [fetchDescription, setFetchDescription] = useState("")
    const {setRefresh} = useContext(_UserContext)
    const ImageRef = useRef()
    const [loadingImageUpdate,setLoadingImageUpdate] = useState(false)
    const [loadingUpdate,setLoadingUpdate] = useState(false)
    const  [selectedImage,setSelectedImage] = useState([])


    const UpdateReport = async () => {
        setLoadingUpdate(true)
        const docRef = doc(db, "Report", selectedReport?.[0]?.id); // Reference the document
        try {
            await updateDoc(docRef, {
                description: fetchDescription,
                images:selectedImage
            });
            setLoadingUpdate(false)
            setOpen(false)
        } catch (error) {
            console.error("Error updating document:", error);
        }
    }


    const DeleteReport = async () => {
        if (!selectedReport?.[0]?.id) {
            console.error("Invalid report ID");
            return;
        }

        const docRef = doc(db, "Report", selectedReport?.[0]?.id);
        try {
            await deleteDoc(docRef);
            setOpen(false)
            setRefresh(prev => !prev)
            setSelectedReport([])
        } catch (error) {
            console.error("Error deleting document:", error);
        }
    };


    useEffect(() => {
        setFetchDescription(selectedReport?.[0]?.description)
        setSelectedImage(selectedReport?.[0]?.images)
    }, [selectedReport]);


    function HandleInsertImage() {
        ImageRef.current.click()
    }

    const UpdateImage=async (e)=>{
        setLoadingImageUpdate(true)
        const docRef = doc(db, "Report", selectedReport?.[0]?.id); // Reference the document
        const Images = Array.from(e.target.files);
       const OldImages =selectedReport?.[0]?.images
        const formData = new FormData();
        for (let i = 0; i < Images.length; i++) {
            formData.append("files[]", Images[i]);
        }
        try {
            const response = await fetch("https://urlimage.dyipspot.com", {
                method: "POST",
                body: formData,
            });
            const data = await response.json();

            console.log(data)
            await updateDoc(docRef, {
                images: [...data?.uploaded_files, ...OldImages],
            });
            FetchCurrentReport(selectedReport?.[0]?.date.toDate())
            setLoadingImageUpdate(false)

        }catch (e) {
            setLoadingImageUpdate(false)
            console.log(e)
        }


    }

    function DeleteImage(index) {
        setSelectedImage(prevImages => prevImages.filter((_, index) => index !== 0));
    }

    return (
        <div>


            <Dialog size="lg" open={open} handler={handleOpen}
                    className="p-4 bg-[#212121] flex flex-col overflow-auto gap-5">

                {!loading ? (selectedReport.length > 0 ? <>
                            <div className={`grid grid-cols-4  gap-2`}>
                                { selectedImage?.map((image, index) => (

                                        <div key={index} className="w-full relative group">
                                            <img
                                                className="h-30 w-full rounded-lg object-cover object-center md:h-60"
                                                src={image}
                                                alt=""
                                            />
                                            <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"></div>
                                            <div className="absolute inset-0 flex items-start justify-end p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                               <IconButton onClick={()=>DeleteImage(index)} className="bg-unset">
                                                   <TrashIcon className={"h-5 w-5 hover:text-red-400"}/>
                                               </IconButton>
                                            </div>
                                        </div>


                                    ))
                                }

                            </div>
                            <p className="text-white">{new Date(selectedReport[0]?.date.toDate()).toLocaleDateString("en-US", {
                                month: "long",
                                day: "numeric",
                                year: "numeric",
                            })}</p>

                            <Textarea rows={7} color="blue" onChange={(e) => setFetchDescription(e.target.value)}
                                      value={fetchDescription} className="text-white" label="Description"/>
                            <input multiple onChange={(e)=>UpdateImage(e)} type="file" className={"hidden"}
                                   ref={ImageRef} accept={"image/*"}/>
                            <div className="w-full flex justify-between">
                                <Button onClick={DeleteReport} color={"red"}
                                        className={"bg-unset text-[9px] lg:text-[11px] p-3 hover:shadow-none shadow-none text-red-500"}>Delete</Button>
                                <div className={"w-full justify-end flex"}>
                                    <Button  className={"text-[9px] p-3 lg:text-[11px] lg:px-5"}  disabled={loadingImageUpdate} onClick={HandleInsertImage}>Insert Image</Button>
                                    <Button  className={"text-[9px] p-3 lg:text-[11px] lg:px-5"} onClick={handleOpen}>Cancel</Button>
                                    <Button  className={"text-[9px] p-3 lg:text-[11px] lg:px-5"} loading={loadingUpdate} onClick={UpdateReport}>Save</Button>
                                </div>

                            </div>
                        </> :
                        <EmptyState/>
                ) : <CardPlacehoderSkeleton/>}

            </Dialog>


        </div>
    );
}

export default ViewReport;