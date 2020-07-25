import React from 'react'
import { Form, reduxForm } from 'redux-form'
import { createField, Input, Textarea } from '../../Common/FormsControls/FormsControls'
import { savePhoto } from '../../../redux/profile-reducer'
import s from './ProfileInfo.module.css'
import styles from '../../Common/FormsControls/FormsControls.module.css'

const ProfileDataForm = ({ handleSubmit, profile, error }) => {
    // {createField(name, placeholder, validators, component, type, text = '')}
    return (
        <Form onSubmit={handleSubmit}>
            <div>
                <button>save</button>
            </div>
            {error && <div className={styles.formSummaryError}>{error}</div>}
            <div>
                <b>Full name</b>: {createField('fullName', 'Full Name', null, Input, null, null)}
            </div>
            <div>
                <b>Looking for job</b>:{' '}
                {createField('lookingForAJob', null, null, Input, 'checkbox', null)}
            </div>
            <div>
                <b>My skills</b>:{' '}
                {createField('lookingForAJobDescription', 'My skills', null, Textarea, null, null)}
            </div>

            <div>
                <b>About me</b>: {createField('aboutMe', 'About me', null, Textarea, null, null)}
            </div>
            <div>
                <b>Contacts</b>:
                {Object.keys(profile.contacts).map((key) => {
                    return (
                        <div key={key} className={s.contact}>
                            <b>
                                {key}:{' '}
                                {createField('contacts.' + key, key, null, Textarea, null, null)}
                            </b>
                        </div>
                    )
                })}
            </div>
        </Form>
    )
}

// HOC reduxForm
const ProfileDataReduxForm = reduxForm({ form: 'edit_profile' })(ProfileDataForm)

export default ProfileDataReduxForm
