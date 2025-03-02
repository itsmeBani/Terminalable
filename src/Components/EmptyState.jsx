import {useContext} from "react";
import {_CalendarContext} from "../Context/CalendarContext.jsx";
import {_FormContext} from "../FormContext.jsx";

const EmptyState = () => {

    const {handleOpen, open,selectedReport,setSelectedReport,PendingDate,setPendingDate} = useContext(_CalendarContext)
    const {handleOpen:ShowAddForm,}=useContext(_FormContext)

    return (
        <div className="w-full  py-10 flex items-center flex-wrap justify-center gap-10">
            {["text-base"].map((textSize, index) => {
                const h2 = <> There’s no Documenta</>;
                return (
                    <div key={index} className="grid gap-4 w-60">
                        <div
                            className="w-20 h-20 mx-auto bg-[#191919] rounded-full shadow-sm justify-center items-center inline-flex">
                            <svg xmlns="http://www.w3.org/2000/svg" width="33" height="32" viewBox="0 0 33 32"
                                 fill="none">
                                <g id="File Serch">
                                    <path
                                        id="Vector"
                                        d="M19.9762 4V8C19.9762 8.61954 19.9762 8.92931 20.0274 9.18691C20.2379 10.2447 21.0648 11.0717 22.1226 11.2821C22.3802 11.3333 22.69 11.3333 23.3095 11.3333H27.3095M18.6429 19.3333L20.6429 21.3333M19.3095 28H13.9762C10.205 28 8.31934 28 7.14777 26.8284C5.9762 25.6569 5.9762 23.7712 5.9762 20V12C5.9762 8.22876 5.9762 6.34315 7.14777 5.17157C8.31934 4 10.205 4 13.9762 4H19.5812C20.7604 4 21.35 4 21.8711 4.23403C22.3922 4.46805 22.7839 4.90872 23.5674 5.79006L25.9624 8.48446C26.6284 9.23371 26.9614 9.60833 27.1355 10.0662C27.3095 10.524 27.3095 11.0253 27.3095 12.0277V20C27.3095 23.7712 27.3095 25.6569 26.138 26.8284C24.9664 28 23.0808 28 19.3095 28ZM19.3095 16.6667C19.3095 18.5076 17.8171 20 15.9762 20C14.1352 20 12.6429 18.5076 12.6429 16.6667C12.6429 14.8257 14.1352 13.3333 15.9762 13.3333C17.8171 13.3333 19.3095 14.8257 19.3095 16.6667Z"
                                        stroke="#fff"
                                        strokeWidth="1.6"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </g>
                            </svg>
                        </div>
                        <div>
                            <h2 className={`text-center text-white ${textSize} font-semibold leading-relaxed pb-1`}>
                                {h2}tion
                            </h2>
                            <p className="text-center text-white/70  text-sm font-normal leading-snug pb-4">
                                Try adding documentation to keep track of your daily task. <br/>
                            </p>
                            <div className="flex gap-3">
                                <button onClick={handleOpen}
                                    className="w-full px-3 py-2 rounded-full border border-gray-300 text-white text-xs font-semibold leading-4">
                                    Close
                                </button>
                                <button onClick={()=>{
                                    handleOpen()
                                    ShowAddForm()

                                }}
                                    className="w-full px-3 py-2 bg-indigo-600 hover:bg-indigo-700 transition-all duration-500 rounded-full text-white text-xs font-semibold leading-4">
                                    Add
                                </button>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default EmptyState;
