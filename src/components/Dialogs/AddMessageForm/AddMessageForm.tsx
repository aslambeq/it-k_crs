import React from 'react'
import { maxLengthCreator, requiredField } from '../../../utils/validators/validators'
import { Field, reduxForm, InjectedFormProps } from 'redux-form'
import { Textarea, createField } from '../../Common/FormsControls/FormsControls'
import { NewMessageFormValuesType } from '../Dialogs'

const maxLength50 = maxLengthCreator(50)

type NewMessageFormValuesTypeKeys = Extract<keyof NewMessageFormValuesType, string>
type PropsType = {}

const AddMessageForm: React.FC<
    InjectedFormProps<NewMessageFormValuesType, PropsType> & PropsType
> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                {createField<NewMessageFormValuesTypeKeys>(
                    'newMessageBody',
                    'Enter your message',
                    [requiredField, maxLength50],
                    Textarea,
                    null
                )}
                <Field
                    component={Textarea}
                    name={'newMessageBody'}
                    placeholder={'Enter your message'}
                    validate={[requiredField, maxLength50]}
                />
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
}

export default reduxForm<NewMessageFormValuesType>({ form: 'dialogAddMessageForm' })(AddMessageForm)
