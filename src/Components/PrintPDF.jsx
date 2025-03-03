import React, {useContext, useEffect, useState} from 'react';
import {Page, Text, View, Document, StyleSheet, PDFViewer, Image} from '@react-pdf/renderer';
import {Button, Dialog, IconButton} from "@material-tailwind/react";
import {PrinterIcon} from "@heroicons/react/24/outline/index.js";
import useFetchReports from "../CustomHooks/useFetchReports.js";
import {_UserContext} from "../Context/CurrentUser.jsx";

const styles = StyleSheet.create({
    section: {
        padding: 10,
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
    },
    image: {
        width: 200,
        height: 200,
        borderRadius:10,// Fixed height to maintain aspect ratio
        objectFit: "cover", // Ensure the image scales properly
    }
});


const RenderPdf=(props)=>{

const {list}=props
    return (
        <Document>
            {props?.list?.map((item) => {
                return(
                    <Page key={item.id} size="A4"  style={styles.page}>
                        <View      style={styles.section}>
                            {item?.images.map((url,index)=>
                                <Image  cache={true} key={index}
                                       style={styles.image}
                                       src={url}
                                />

                            )}
                        </View>
                        <View style={styles.section}>
                            <Text>{item.description || "No Description"}</Text>
                        </View>
                    </Page>
                ) })}

        </Document>
    )
}
function PrintPdf(props) {
    const [open,setOpen]=useState(false)
    const { reports, loading, error } = useFetchReports();


    return (

        <div className={"flex   w-full place-content-end "}>
            <IconButton onClick={()=>setOpen(!open)} className={"text-[10px] flex place-items-center gap-2"} color={"blue"}><PrinterIcon className={"w-7 h-7"}/></IconButton>

            <Dialog size="lg" open={open}  handler={()=>setOpen(!open)} className="p-4  h-full bg-[#212121] ">
                <PDFViewer className="h-full w-full">
                    <RenderPdf list={reports} />
                </PDFViewer>

            </Dialog>



        </div>

    );
}

export default PrintPdf;