import React from 'react';
import AddButton from "./AddButton.jsx";
import Modal from "./Modal.jsx";
import FormContext from "../FormContext.jsx";
import BaniBot from "./BaniBot.jsx";
import ViewReport from "./ViewReport.jsx";
function Form(props) {
    return (
        <FormContext>
            <Modal/>
            <AddButton/>
            <ViewReport/>
        </FormContext>
    );
}

export default Form;

