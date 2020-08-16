import React from 'react'
import { InjectedFormProps, reduxForm } from 'redux-form'
import { maxLengthCreator, requiredField } from '../../../../utils/validators/validators'
import { createField, GetStringTypeKeys, Input } from '../../../Common/FormsControls/FormsControls'

type PropsType = {}
export type AddPostFormValuesType = {
    newPostText: string
}

type AddPostFormValuesTypeKeys = GetStringTypeKeys<AddPostFormValuesType>

const maxLength15 = maxLengthCreator(15)

const AddNewPostForm: React.FC<InjectedFormProps<AddPostFormValuesType, PropsType> & PropsType> = (
    props
) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                {createField<AddPostFormValuesTypeKeys>(
                    'newPostText',
                    "What's on your mind?",
                    [requiredField, maxLength15],
                    Input,
                    null
                )}
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}

export const AddPostForm = reduxForm<AddPostFormValuesType, PropsType>({
    form: 'ProfileAddNewPostForm'
})(AddNewPostForm)
