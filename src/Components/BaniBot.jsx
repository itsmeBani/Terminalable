import BaniBotImg from "../assets/me.webp"
import OpenAI from "openai";
import {Button, IconButton, Input, Popover, PopoverContent, PopoverHandler, Typography} from "@material-tailwind/react";
import {useContext, useEffect, useState} from "react";

import {GoogleGenerativeAI} from "@google/generative-ai";
import {_FormContext} from "../FormContext.jsx";


function BaniBot() {
    const genAI = new GoogleGenerativeAI("AIzaSyBLrFZFoyrioXZ6A19G-V3h5ji38eNoYRY");
    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        systemInstruction: "answer it directly no extra word"
    });
    const {handleOpen, open, description, setDescription} = useContext(_FormContext)
    const [prompt, setPrompt] = useState("")
    const [message, setMessage] = useState("")
    const [chatHistory, setChatHistory] = useState([

        {
            role: "user",
            parts: [{text: description}],
        },
        {
            role: "model",
            parts: [{text: "okay"}],
        }
        ])



    const _try = async () => {


        const chat = model.startChat({
            history: [
              chatHistory[0]
            ],
        });
        let result = await chat.sendMessage(description + prompt);
        setChatHistory([...chatHistory,
            {
                role: "user",
                parts: [{text: description + prompt }],
            },
            {
                role: "model",
                parts: [{text: result.response.text()}],
            }])
        setDescription(result.response.text())
        setPrompt("")
    }

    const HandleMessage = (e) => {

        setPrompt(e.target.value)

    }


    return (
        <div className="relative">

            <div className="flex">
                <Popover placement="right" offset={10}>
                    <PopoverHandler>
                        <button>
                            <img alt={"bot"} src={BaniBotImg} className="h-[65px]    "/>

                        </button>
                    </PopoverHandler>
                    <PopoverContent className="w-[250px] relative z-[9999] bg-unset p-0 flex border-none">

                        <div className={"flex w-full gap-3 "}>
                            <input onChange={(e) => HandleMessage(e)}
                                   value={prompt}
                                   className="flex h-full w-full rounded-md border border-[#e5e7eb] px-3 py-2 text-[11px] placeholder-[#6b7280] focus:outline-none  focus:ring-border-blue-500 disabled:cursor-not-allowed disabled:opacity-50 text-[#030712] focus-visible:ring-offset-2"
                                   placeholder="Type your message"/>
                            <IconButton onClick={_try} color={"green"} className="px-5">
                                <svg className="w-5 h-5 rotate-90" fill="currentColor" viewBox="0 0 20 20"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                                </svg>

                            </IconButton>
                        </div>


                    </PopoverContent>
                </Popover>

            </div>
        </div>
    );
}

export default BaniBot;
