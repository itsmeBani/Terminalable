import React, {useContext, useEffect, useMemo, useState} from 'react';
import {Page, Text, View, Document, StyleSheet, PDFViewer, Image, Font, PDFDownloadLink} from '@react-pdf/renderer';
import {Button, Dialog, IconButton} from "@material-tailwind/react";
import {CloudArrowDownIcon, PrinterIcon} from "@heroicons/react/24/outline/index.js";
import useFetchReports from "../CustomHooks/useFetchReports.jsx";
import {_UserContext} from "../Context/CurrentUser.jsx";
import Logo from "../assets/logois.png"
import headerImage from "../assets/headers style.png"
import FooterImage from "../assets/fotimg.png"
import fbfont from "../assets/Derringer DB Bold.ttf"
import tb from "../assets/Times New Roman Bold.ttf"
import {Table, TR, TH, TD} from '@ag-media/react-pdf-table';

Font.register({
    family: 'Agent Fb',
    src: fbfont
})

Font.register({
    family: 'Oswald',
    src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
})

Font.register({
    family: 'TimesBold',
    src: tb
});
const styles = StyleSheet.create({
    page: {
        display: "flex",
        height: "100%",
        position: "relative",
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
        paddingHorizontal: 100,
        paddingTop: 10,
    }, subheader: {


        display: "flex",
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "center",
        gap: 0,
        paddingBottom: 4,

    }


    , description: {
        fontFamily: 'Times-Roman',
        fontSize: 11
    }, footer: {
        height: 100,

    }, headertxt: {
        fontFamily: 'TimesBold',
        fontSize: 11,
        fontWeight: 600,
        textTransform: "uppercase"
    }, address: {
        fontFamily: 'Times-Roman',
        fontSize: 10,
        textAlign: "center",
        textTransform: "uppercase"
    }, textBox: {
        alignItems: "center",
        display: "flex",
        justifyContent: "flex-end",
        height: "100%"
    }, content: {
        flex: 1,
        display: "flex",

    }, textSection: {
        padding: 10,
        paddingHorizontal: 30,
        display: "flex",
        flexDirection: "col",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        width: "100%",

    }, acc: {
        fontFamily: 'Agent Fb',
        fontSize: 30,
        color: "green",
        paddingTop: 20,
        textTransform: "uppercase"
    }, frontpagetxt: {
        fontFamily: 'TimesBold',
        fontSize: 16,
        textTransform: "uppercase"
    }, fontBold: {
        fontFamily: 'TimesBold',
    }, fontLight: {
        fontFamily: 'Times-Roman',
    }
});

const RenderPdf = (props) => {
const {activeUser}=props
    const {list = []} = props;

    const groupedReports = useMemo(() => {
        if (!list || list.length === 0) return [];
        const chunkSize = 5; // 5 days per week
        let weeks = [];

        for (let i = 0; i < list.length; i += chunkSize) {
            const weekDates = list.slice(i, i + chunkSize);

            weeks.push(weekDates);
        }
        console.log('Grouped Reports:', weeks);
        return weeks;
    }, [list])||[];



    const TotalHours = (items) => {
        if (!items || items.length === 0) return "0:00:00";

        let totalSeconds = items.reduce((sum, item) => {
            const decimalHours = item?.hours || 0;
            const hours = Math.floor(decimalHours);
            const minutesDecimal = (decimalHours - hours) * 100; // Handle .30 as 30 minutes
            const minutes = Math.floor(minutesDecimal);
            const seconds = Math.round((minutesDecimal - minutes) * 60);
            return sum + (hours * 3600) + (minutes * 60) + seconds;
        }, 0);

        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        return `${hours}:${minutes.toString().padStart(2, "0")} mins`;
    };

    return (
        <Document>

            <Page style={styles.page}>

                <View style={styles.header}>
                    <Image src={headerImage} style={{width: 130, height: 100, left: 0, top: 0, position: "absolute"}}/>
                    <View style={styles.subheader}>

                        <View>
                            <Image src={Logo} style={{width: 80, height: 80, objectFit: "cover"}}/>
                        </View>
                        <View style={styles.textBox}>
                            <Text style={styles.address}>Republic of the Philippines</Text>
                            <Text style={styles.headertxt}>Ilocos Sur Polytechnic State College</Text>
                            <Text style={styles.address}>College of Arts and Sciences</Text>
                            <Text style={styles.address}>Tagudin Campus</Text>
                        </View>
                    </View>

                </View>
                <View style={{width: "100%", height: 3, paddingHorizontal: 100}}>
                    <View style={{width: "100%", height: 2, backgroundColor: "black"}}/>
                </View>


                <View style={{
                    flex: 1, justifyContent: "space-between",
                    alignItems: "center",
                }}>

                    <Text style={styles.acc}> ACCOMPLISHMENT REPORT</Text>
                    <Text style={styles.frontpagetxt}>{activeUser === "bani"? "JIOVANI A. FABRO":"FRANCIS XAVIER A. RAMOS"}</Text>

                    <View style={{alignItems: "center"}}>
                        <Text style={styles.frontpagetxt}>ILOCOS SUR POLYTECHNIC STATE COLLEGE</Text>
                        <Text style={styles.frontpagetxt}>TAGUDIN CAMPUS, TAGUDIN,</Text>
                        <Text style={styles.frontpagetxt}>ILOCOS SUR</Text>
                    </View>

                    <Text style={styles.frontpagetxt}>PRCT 200 PRACTICUM/IMMERSION (486 HOURS)</Text>
                    <Text style={styles.frontpagetxt}>JUNE 2024</Text>
                </View>

                <View style={styles.footer}>
                    <Image src={FooterImage}
                           style={{width: 130, height: 100, right: 0, bottom: 0, position: "absolute"}}/>
                </View>

            </Page>


            {groupedReports?.length > 0 && groupedReports?.map((item, index) => {

                return (
                    <React.Fragment key={index}>

                        <Page key={index} size="A4" style={[styles.page,{paddingBottom:100}]}>

                            <View fixed style={styles.header}>
                                <Image src={headerImage}
                                       style={{width: 130, height: 100, left: 0, top: 0, position: "absolute"}}/>
                                <View style={styles.subheader}>
                                    <View>
                                        <Image src={Logo} style={{width: 80, height: 80, objectFit: "cover"}}/>
                                    </View>
                                    <View style={styles.textBox}>
                                        <Text style={styles.address}>Republic of the Philippines</Text>
                                        <Text style={styles.headertxt}>Ilocos Sur Polytechnic State College</Text>
                                        <Text style={styles.address}>College of Arts and Sciences</Text>
                                        <Text style={styles.address}>Tagudin Campus</Text>
                                    </View>
                                </View>
                            </View>

                            <View style={{width: "100%", height: 3, paddingHorizontal: 100}}>
                                <View style={{width: "100%", height: 2, backgroundColor: "black"}}/>
                            </View>
                            {/*<Table wrap={true}  fixed={true} style={{paddingHorizontal:80}}>*/}
                            {/*    <TH>*/}
                            {/*        <TD>Header 1</TD>*/}
                            {/*        <TD>Header 2</TD>*/}
                            {/*    </TH>*/}
                            {/*    {Array.from({length:10}).map((index)=>*/}
                            {/*        <TR fixed={true} key={index}>*/}
                            {/*            <TD>@david.kucsai/react-pdf-table. This library is designed to be used with @react-pdf/renderer. The goal behind this library is to provide a declarative way of defining tables in a PDF. To get …</TD>*/}
                            {/*            <TD>Data 2</TD>*/}
                            {/*        </TR>*/}

                            {/*    )}*/}
                            {/*</Table>*/}
                            <View style={styles.content}>
                                <View style={{
                                    width: "100%",
                                    paddingTop: 10,
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}>
                                    <Text style={[styles.description, {fontFamily: "Oswald"}]}>On-The-Job
                                        Training</Text>
                                    <Text style={styles.description}>Daily Accomplishment Report- Pictures</Text>
                                    <Text
                                        style={[styles.description, {fontSize: 13}]}>WEEK {index + 1}</Text>
                                </View>

                                <View style={[styles.section, {paddingHorizontal: 70}]}>
                                    {item.map((report, idx) => (
                                        report.images && report.images.length > 0 && report.images.map((url, imgIdx) => (
                                            <Image
                                                key={imgIdx}
                                                style={[styles.image, {
                                                    width: 130,
                                                    height: 130
                                                }]}
                                                src={url}
                                            />
                                        ))
                                    ))}
                                </View>
                            </View>


                            <Image fixed={true} src={FooterImage}
                                   style={{width: 130, height: 100, right: 0, bottom: 0, position: "absolute"}}/>

                        </Page>
                        <Page key={index} size="A4" style={[styles.page,{paddingBottom:100}]}>

                            <View style={[styles.header]} fixed={true}>
                                <Image src={headerImage}
                                       style={{width: 130, height: 100, left: 0, top: 0, position: "absolute"}}/>
                                <View style={styles.subheader}>
                                    <View>
                                        <Image src={Logo} style={{width: 80, height: 80, objectFit: "cover"}}/>
                                    </View>
                                    <View style={styles.textBox}>
                                        <Text style={styles.address}>Republic of the Philippines</Text>
                                        <Text style={styles.headertxt}>Ilocos Sur Polytechnic State College</Text>
                                        <Text style={styles.address}>College of Arts and Sciences</Text>
                                        <Text style={styles.address}>Tagudin Campus</Text>
                                    </View>
                                </View>
                            </View>

                            <View style={{width: "100%", height: 3, paddingHorizontal: 100}}>
                                <View style={{width: "100%", height: 2, backgroundColor: "black"}}/>
                            </View>

                            <View style={[styles.content, {paddingHorizontal: 50,}]}>
                                <View style={{
                                    width: "100%",
                                    paddingTop: 10,
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}>
                                    <Text style={[styles.description, {fontFamily: "Oswald"}]}>On-The-Job
                                        Training</Text>
                                    <Text style={styles.description}>Daily Accomplishment Report</Text>
                                    <Text
                                        style={[styles.description, {fontSize: 13,paddingBottom:30}]}>WEEK {index + 1}</Text>
                                </View>

                                <View style={{
                                    paddingHorizontal: 0,
                                    display: "flex",
                                    flexDirection: "column",
                                    width: "100%"
                                }}>



                                     <View style={{
                                            border: "0px solid black",
                                            display: "flex",
                                            flexDirection: "row",
                                            width: "100%",
                                         marginBottom:20,
                                        }}>

                                            <Text style={[{
                                                fontSize: 12,
                                                textAlign: "center",
                                                width: 140,
                                                border: "1px solid black",
                                                paddingHorizontal: 15,

                                            }, styles.fontBold]}>
                                               Name of Student
                                            </Text>
                                            <View style={[{
                                                display: "flex",
                                                flexDirection: "column",

                                                width: "100%",
                                                border: "1px solid black",
                                                flex: 1,
                                                paddingHorizontal: 15,

                                            }, styles.fontLight]}>
                                                <Text style={[styles.description,{fontSize: 13,}]}>{activeUser==="bani"? "JIOVANI A. FABRO":"FRANCIS XAVIER A. RAMOS"}</Text>
                                            </View>

                                        </View>


                                </View>

                                <View style={{
                                    border: "0px solid black",
                                    display: "flex",
                                    flexDirection: "row",
                                    width: "100%"
                                }}>

                                    <Text style={[{
                                        fontSize: 12,
                                        textAlign: "center",
                                        width: 100,
                                        border: "1px solid black",
                                        paddingHorizontal: 15,
                                        paddingTop: 5
                                    }, styles.fontLight]}>
                                        Day
                                    </Text>
                                    <Text style={[{
                                        fontSize: 12,
                                        width: 90,
                                        border: "1px solid black",
                                        paddingHorizontal: 15,
                                        paddingTop: 5,

                                    }, styles.fontLight]}>
                                        Date
                                    </Text>
                                    <View style={[{
                                        display: "flex",
                                        flexDirection: "column",
                                        fontSize: 12,
                                        width: "100%",
                                        border: "1px solid black",
                                        flex: 1,
                                        paddingHorizontal: 15,
                                        paddingTop: 5
                                    }, styles.fontLight]}>
                                        <Text style={styles.description}>Daily Accomplishments</Text>
                                    </View>
                                    <Text style={[{
                                        fontSize: 12,
                                        width: 110,
                                        border: "1px solid black",
                                        paddingHorizontal: 15,
                                        paddingTop: 5,
                                        textAlign:"center"
                                    }, styles.fontLight]}>No of Working Hours</Text>
                                </View>


                                <View  style={{
                                    paddingHorizontal: 0,
                                    display: "flex",
                                    flexDirection: "column",
                                    width: "100%"
                                }}>


                                    {item?.map((item, index) => {
                                        return <View  key={index} style={{
                                            border: "0px solid black",
                                            display: "flex",
                                            flexDirection: "row",
                                            width: "100%"
                                        }}>

                                            <Text style={[{
                                                fontSize: 12,
                                                textAlign: "center",
                                                width: 100,
                                                backgroundColor:"#c6c6c6",
                                                border: "1px solid black",
                                                paddingHorizontal: 15,
                                                paddingTop: 5
                                            }, styles.fontLight]}>
                                                {item?.date && (
                                                    new Date(item.date.seconds * 1000).toLocaleDateString('en-US', {
                                                        weekday: "long", // This will show only the day (e.g., "Monday")
                                                    })
                                                )}
                                            </Text>
                                            <Text style={[{
                                                fontSize: 12,
                                                width: 90,
                                                border: "1px solid black",
                                                paddingHorizontal: 15,
                                                paddingTop: 5,

                                            }, styles.fontLight]}>

                                                {item?.date && (
                                                    new Date(item.date.seconds * 1000).toLocaleDateString('en-US', {
                                                        month: "numeric",
                                                        day: "numeric",
                                                        year: "numeric",
                                                    })
                                                )}
                                            </Text>
                                            <View style={[{
                                                display: "flex",
                                                flexDirection: "column",
                                                fontSize: 12,
                                                width: "100%",
                                                border: "1px solid black",
                                                flex: 1,
                                                paddingHorizontal: 15,
                                                paddingTop: 5
                                            }, styles.fontLight]}>
                                                <Text style={[styles.description,{fontSize:9}]}>{item.description.replace(/\*/g, '• ')}</Text>
                                            </View>
                                            <Text style={[{
                                                fontSize: 12,
                                                width: 110,
                                                border: "1px solid black",
                                                paddingHorizontal: 15,
                                                paddingTop: 5,
                                                textAlign:"center"
                                            }, styles.fontLight]}>{item?.hours? item?.hours.toFixed(2): 0 }</Text>
                                        </View>

                                    })}


                                    <View style={{
                                        border: "0px solid black",
                                        display: "flex",
                                        flexDirection: "row",
                                        width: "100%"
                                    }}>

                                        <Text style={[{
                                            fontSize: 12,
                                            textAlign: "center",
                                            width: 100,
                                            border: "1px solid black",
                                            paddingHorizontal: 15,
                                            paddingTop: 5
                                        }, styles.fontLight]}>
                                            TOTAL
                                        </Text>

                                        <View style={[{
                                            display: "flex",
                                            flexDirection: "column",
                                            fontSize: 12,
                                            width: "100%",
                                            border: "1px solid black",
                                            flex: 1,
                                            paddingHorizontal: 15,
                                            paddingTop: 5
                                        }, styles.fontLight]}>
                                            <Text style={styles.description}></Text>
                                        </View>
                                        <Text style={[{
                                            fontSize: 12,
                                            width: 110,
                                            border: "1px solid black",
                                            paddingHorizontal: 15,
                                            paddingTop: 5,
                                            textAlign:"center"
                                        }, styles.fontLight]}>{TotalHours(item)}</Text>
                                    </View>

                                </View>
                                <View style={{paddingTop: 20}}>
                                    <Text style={{fontSize: 11}}>
                                        Certified by:
                                    </Text>
                                    <View style={{width: 200, height: 2,backgroundColor:"black",marginTop:20}}/>
                                    <Text style={{fontSize: 12,fontFamily:"TimesBold",paddingTop:10}}>
                                        ZEUS VINCENT B. MENDOZA, MIT
                                    </Text>
                                </View>
                            </View>

                            <Image  fixed={true} src={FooterImage}
                                   style={{width: 130, height: 100, right: 0, bottom: 0, position: "absolute"}}/>

                        </Page>
                    </React.Fragment>
                )
            })}
        </Document>
    );
};

function PrintPdf(props) {
    const [open, setOpen] = useState(false)
    const {reports, loading, error, refresh} = useFetchReports();
    const {activeUser}=useContext(_UserContext)
    return (

        <div className={"flex  gap-2 w-full place-content-end "}>
            <IconButton onClick={() => setOpen(!open)} className={"text-[10px] flex place-items-center gap-2"}
                        color={"blue"}><PrinterIcon className={"w-5 lg:w-7 lg:h-7 h-5 "}/></IconButton>

            <Dialog size="lg" open={open} handler={() => setOpen(!open)} className="p-4  h-full bg-[#212121] ">
                <PDFViewer className="h-full w-full">
                    <RenderPdf list={reports} activeUser={activeUser}/>
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