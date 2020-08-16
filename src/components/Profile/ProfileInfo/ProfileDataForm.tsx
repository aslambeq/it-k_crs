import React from 'react'
import { Form, InjectedFormProps, reduxForm } from 'redux-form'
import { ProfileType } from '../../../types/types'
import {
    createField,
    GetStringTypeKeys,
    Input,
    Textarea
} from '../../Common/FormsControls/FormsControls'
import styles from '../../Common/FormsControls/FormsControls.module.css'
import s from './ProfileInfo.module.css'

type ProfileDataFormPropsType = {
    profile: ProfileType
}

type ProfileTypeKeys = GetStringTypeKeys<ProfileType>

const ProfileDataForm: React.FC<
    InjectedFormProps<ProfileType, ProfileDataFormPropsType> & ProfileDataFormPropsType
> = ({ handleSubmit, profile, error }) => {
    // {createField(name, placeholder, validators, component, type, text = '')}
    return (
        <Form onSubmit={handleSubmit}>
            <div>
                <button>save</button>
            </div>
            {error && <div className={styles.formSummaryError}>{error}</div>}
            <div>
                <b>Full name</b>:{' '}
                {createField<ProfileTypeKeys>(
                    'fullName',
                    'Full Name',
                    null,
                    Input,
                    null,
                    undefined
                )}
            </div>
            <div>
                <b>Looking for job</b>:{' '}
                {createField<ProfileTypeKeys>(
                    'lookingForAJob',
                    undefined,
                    null,
                    Input,
                    'checkbox',
                    undefined
                )}
            </div>
            <div>
                <b>My skills</b>:{' '}
                {createField<ProfileTypeKeys>(
                    'lookingForAJobDescription',
                    'My skills',
                    null,
                    Textarea,
                    null,
                    undefined
                )}
            </div>

            <div>
                <b>About me</b>:{' '}
                {createField<ProfileTypeKeys>(
                    'aboutMe',
                    'About me',
                    null,
                    Textarea,
                    null,
                    undefined
                )}
            </div>
            <div>
                <b>Contacts</b>:
                {Object.keys(profile.contacts).map((key) => {
                    return (
                        <div key={key} className={s.contact}>
                            <b>
                                {key}: {/* todo: add type */}
                                {createField(
                                    'contacts.' + key,
                                    key,
                                    null,
                                    Textarea,
                                    null,
                                    undefined
                                )}
                            </b>
                        </div>
                    )
                })}
            </div>
        </Form>
    )
}

// HOC reduxForm
const ProfileDataReduxForm = reduxForm<ProfileType, ProfileDataFormPropsType>({
    form: 'edit_profile'
})(ProfileDataForm)

export default ProfileDataReduxForm
