import React from "react";
import { Redirect } from "react-router-dom";
import AddMessageForm from "./AddMessageForm/AddMessageForm";
import DialogItem from "./DialogItem/DialogItem";
import s from "./Dialogs.module.css";
import Message from "./Message/Message";

const Dialogs = (props) => {
    let state = props.dialogsPage;

    /* let dialogsElements = dialogsData.map((dialog) => {
        return (
            <DialogItem name={dialog.name} id={dialog.id} />
        )
    }); */

    let dialogsElements = state.dialogsData.map((dialog) => (
        <DialogItem name={dialog.name} key={dialog.id} id={dialog.id} />
    ));
    let messagesElements = state.messagesData.map((msg) => (
        <Message message={msg.message} key={msg.id} />
    ));

    let newMessageBody = state.newMessageBody;

    let addNewMessage = (values) => {
        props.sendMessage(values.newMessageBody);
    };

    if (!props.isAuth) return <Redirect to={"/login"} />;

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>{dialogsElements}</div>
            <div className={s.messages}>
                <div>{messagesElements}</div>
                <div>
                    <AddMessageForm onSubmit={addNewMessage} />
                </div>
            </div>
        </div>
    );
};

export default Dialogs;
