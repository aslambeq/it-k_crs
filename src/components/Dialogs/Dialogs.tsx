import React from 'react'
import { Redirect } from 'react-router-dom'
import AddMessageForm from './AddMessageForm/AddMessageForm'
import DialogItem from './DialogItem/DialogItem'
import s from './Dialogs.module.css'
import Message from './Message/Message'
import { initialStateType } from '../../redux/dialogs-reducer'

type PropsType = {
    dialogsPage: initialStateType
    sendMessage: (messageText: string) => void
}

export type NewMessageFormValuesType = {
    newMessageBody: string
}

const Dialogs: React.FC<PropsType> = (props) => {
    const state = props.dialogsPage

    const dialogsElements = state.dialogsData.map((dialog) => (
        <DialogItem name={dialog.name} key={dialog.id} id={dialog.id} />
    ))
    const messagesElements = state.messagesData.map((msg) => (
        <Message message={msg.message} key={msg.id} />
    ))

    const addNewMessage = (values: NewMessageFormValuesType) => {
        props.sendMessage(values.newMessageBody)
    }

    // if (!props.isAuth) return <Redirect to={'/login'} />

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
    )
}

export default Dialogs
