import React from 'react'
import s from './../Dialogs.module.css'

type PropsType = {
    message: string
}

const Message: React.FC<PropsType> = (props) => {
    /* let sendMessageElement = React.createRef();

    function sendMessage () {
        let sndmsg = sendMessageElement.current.value;
        alert (sndmsg)
    } */

    return (
        <div>
            {<div className={s.dialog}>{props.message}</div>}
            {/*             <div>
                <textarea ref={sendMessageElement}></textarea>
            </div>
            <div>
                <button onClick={sendMessage}>Send message</button>
            </div> */}
        </div>
    )
}

export default Message
