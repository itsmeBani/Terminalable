import React, {useContext, useEffect, useState} from 'react';
import {Page, Text, View, Document, StyleSheet, PDFViewer, Image, Font, PDFDownloadLink} from '@react-pdf/renderer';
import {Button, Dialog, IconButton} from "@material-tailwind/react";
import {CloudArrowDownIcon, PrinterIcon} from "@heroicons/react/24/outline/index.js";
import useFetchReports from "../CustomHooks/useFetchReports.jsx";
import {_UserContext} from "../Context/CurrentUser.jsx";
import Logo from "../assets/LogoWhiteSmall.png"

Font.register({
    family: 'Oswald',
    src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
});

const styles = StyleSheet.create({
    page: {
        display: "flex",
        height: "100%",
        justifyContent: "space-between",
    },
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
        width: 250,
        height: 150,
        borderRadius: 10,// Fixed height to maintain aspect ratio
        objectFit: "cover", // Ensure the image scales properly
    }, header: {

        backgroundColor: "white",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
    }, subheader: {


        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        paddingBottom:4,
        borderBottom: "2px solid black "

    }


    , description: {
        fontFamily: 'Times-Roman',

        fontSize: 11
    }, footer: {
        height: 100,
backgroundColor:"grey"
    }, headertxt: {
        fontFamily: 'Times-Roman',
        fontSize: 14,
        fontWeight:600,
        textTransform:"uppercase"
    },address: {
        fontFamily: 'Times-Roman',
        fontSize: 11,
textAlign:"center",
        textTransform:"uppercase"
    },textBox:{
        alignItems:"center",
        display:"flex"
    },content:{
      flex:1,
        paddingTop:20
    }
});


const RenderPdf = (props) => {

    const {list} = props
    return (
        <Document>
            {list?.map((item) => {
                return (
                    <Page key={item.id} size="A4" style={styles.page}>


                        <View style={styles.header}>
                            <View style={styles.subheader}>

                                <View>
                                    <Image src={Logo} style={{width: 50, height:50, objectFit: "cover"}}/>
                                </View>
                                <View style={styles.textBox}>
                                    <Text style={styles.headertxt}>Ilocos Sur Polytechnic State College</Text>
                                    <Text style={styles.address}>Tagudin Campus, Tagudin, Ilocos Sur</Text>
                                </View>
                            </View>

                        </View>

                        <View style={styles.content}>
                            <View style={styles.section}>
                                {item?.images.map((url, index) =>
                                    <Image cache={true} key={index}
                                           style={[styles.image,
                                               {
                                                   width: item?.images.length <= 1 ? 400 : 230,
                                                   height: item?.images.length <= 1 ? 270 : 200
                                               }
                                           ]}
                                           src={url}
                                    />
                                )}
                            </View>
                            <View style={styles.section}>
                                <Text style={styles.description}>{item.description || "No Description"}</Text>
                            </View>


                        </View>

                        <View style={styles.footer}></View>
                    </Page>
                )
            })}

        </Document>
    )
}

function PrintPdf(props) {
    const [open, setOpen] = useState(false)
    const {reports, loading, error, refresh} = useFetchReports();


    return (

        <div className={"flex  gap-2 w-full place-content-end "}>
            <IconButton onClick={() => setOpen(!open)} className={"text-[10px] flex place-items-center gap-2"}
                        color={"blue"}><PrinterIcon className={"w-5 lg:w-7 lg:h-7 h-5 "}/></IconButton>

            <Dialog size="lg" open={open} handler={() => setOpen(!open)} className="p-4  h-full bg-[#212121] ">
                <PDFViewer className="h-full w-full">
                    <RenderPdf list={reports}/>
                </PDFViewer>

            </Dialog>
            <PDFDownloadLink document={<RenderPdf list={reports}/>} fileName="report.pdf">
                {({blob, url, loading, error}) => <IconButton disabled={loading} color="green"><CloudArrowDownIcon
                    className={"w-5 lg:w-7 lg:h-7 h-5 "}/></IconButton>
                }
            </PDFDownloadLink>
            <div>

            </div>

        </div>

    );
}

export default PrintPdf;