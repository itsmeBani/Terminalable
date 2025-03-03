import React, {useContext, useRef, useState} from "react";
import {
    Button,
    Dialog,
    Textarea,
    IconButton,
    Typography,
    DialogBody,
    DialogHeader,
    DialogFooter,
} from "@material-tailwind/react";
import {PhotoIcon, XMarkIcon} from "@heroicons/react/24/outline";
import {_FormContext} from "../FormContext.jsx";
import BaniBot from "./BaniBot.jsx";
import {db, storage} from "../Services/Firebase-config.js";
import {ref, uploadBytes, getDownloadURL} from "firebase/storage";

import { collection, addDoc,serverTimestamp,getDocs,query,where } from "firebase/firestore";
import {_UserContext} from "../Context/CurrentUser.jsx";
import {_CalendarContext} from "../Context/CalendarContext.jsx";

function Modal(props) {
    const {PendingDate,setPendingDate} = useContext(_CalendarContext)
    const {handleOpen, open, description, setDescription} = useContext(_FormContext)
    const {activeUser}=useContext(_UserContext)
    const ImageRef = useRef()
    const [images, setImages] = useState([])
    const PickImage = () => {
        ImageRef.current.click();
    }

    const handleImageValue = async (e) => {
        const files = Array.from(e.target.files);
        const newImages = files.map((file) => ({id: URL.createObjectURL(file), file}));
        setImages((prevImages) => [...prevImages, ...newImages]);
    }

    const RemoveImage = (index) => {
        setImages(images.filter((items) => items !== images[index]))
    }
    const AddReport = async () => {
        const formData = new FormData();
        for (let i = 0; i < images.length; i++) {
            formData.append("files[]", images[i].file);
        }
        try {
            const response = await fetch("https://urlimage.dyipspot.com", {
                method: "POST",
                body: formData,
            });
            const data = await response.json();
                await addDoc(collection(db, "Report"), {
                    description: description,
                    images:data?.uploaded_files,  // Store Base64 instead of Firebase URLs
                    date:PendingDate ? PendingDate : serverTimestamp(),
                    author: activeUser
                });
                setImages([]);
                setDescription("")
                handleOpen();
        } catch (error) {
            console.error("Error uploading files:", error);
        }

    };







    return (
        <>

            <Dialog size="lg" open={open} handler={handleOpen} className="p-4 bg-[#212121] ">
                <DialogHeader className=" m-0 block ">
                    <Typography variant="h4" color="white">
                        Terminal Report
                    </Typography>
                    <Typography className="mt-1 text-[12px] font-normal text-white/60">
                        Keep your records up-to-date and organized.
                    </Typography>
                    <Typography   className="mt-1 text-[12px] font-normal text-white">
                        {PendingDate && (new Date(PendingDate).toLocaleDateString('en-US', {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                        }))}
                    </Typography>
                    <IconButton
                        size="sm"
                        variant="text"
                        className="!absolute right-3.5 top-3.5"
                        onClick={handleOpen}
                    >
                        <XMarkIcon color={"white"} className="h-4 w-4 stroke-10"/>
                    </IconButton>
                </DialogHeader>
                <DialogBody className="space-y-4 p-0 ">

                    <div className="flex flex-row gap-2">
                        <div className="h-20 aspect-square w-20 shadow-2xl">
                            <input multiple onChange={handleImageValue} type="file" className={"hidden"}
                                   ref={ImageRef}/>
                            <Button onClick={PickImage} className="flex h-full w-full" variant="gradient">
                                <PhotoIcon className="text white " color="white"/>
                            </Button>

                        </div>
                        <div>
                            <div className="flex gap-2">

                                {images?.map((items, index) => {
                                    return (
                                        <div className="relative" key={index}>
                                            <button onClick={() => RemoveImage(index)}
                                                    className="absolute -top-2 -right-2 p-1 rounded-full bg-[#fff]">
                                                <XMarkIcon fontWeight={"bold"} className="w-3" color={"#ff3737"}/>
                                            </button>
                                            <img
                                                className="h-20 aspect-square rounded-xl w-full object-cover object-center"
                                                src={items.id}
                                                alt="nature image"
                                            />
                                        </div>

                                    )

                                })}

                            </div>

                        </div>
                    </div>
                    <div>

                        <Textarea  onChange={(e) => setDescription(e.target.value)} defaultValue={description} value={description} rows={7}
                                  color="green" className="text-white" label="Description"/>
                    </div>

                </DialogBody>
                <div className="z-[60]">
                    <BaniBot/>
                </div>
                <DialogFooter>
                    <Button className="ml-auto" disabled={!description || !images} i onClick={AddReport}>
                        Save
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );

}

export default Modal;
