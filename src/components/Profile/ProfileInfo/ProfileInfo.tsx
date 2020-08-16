import React, { useState } from 'react'
import userPhoto from '../../../assets/images/user.jpg'
import Preloader from '../../Common/Preloader/Preloader'
import s from './ProfileInfo.module.css'
import ProfileStatusWithHooks from './ProfileStatusWithHooks'
import ProfileDataForm from './ProfileDataForm'
import { ProfileType, ContactsType } from '../../../types/types'

type ProfileInfoPropsType = {
    profile: ProfileType | null
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file: File) => void
    saveProfile: (profile: ProfileType) => Promise<any>
}

const ProfileInfo: React.FC<ProfileInfoPropsType> = ({
    profile,
    status,
    updateStatus,
    isOwner,
    savePhoto,
    saveProfile
}) => {
    const [editMode, setEditMode] = useState(false)

    if (!profile) {
        return <Preloader />
    }

    // event handler
    // (e.target.files?.length)
    const onMainPhotoSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files?.length) {
            savePhoto(e.target.files[0])
        }
    }

    const onSubmit = (formData: ProfileType) => {
        saveProfile(formData).then(() => {
            setEditMode(false)
        })
    }

    return (
        <div>
            {/* <div>
                {<img
                src='https://www.sciencealert.com/images/2020-04/processed/CanWeGetRonaFromPets_1024.jpg'/>}
            </div> */}
            <div className={s.desriptionBlock}>
                <img className={s.avatar} src={profile.photos.large || userPhoto} />
                {isOwner && <input type={'file'} onChange={onMainPhotoSelected} />}
                {editMode ? (
                    <ProfileDataForm
                        initialValues={profile}
                        profile={profile}
                        onSubmit={onSubmit}
                    />
                ) : (
                    <ProfileData
                        toEditMode={() => {
                            setEditMode(true)
                        }}
                        profile={profile}
                        isOwner={isOwner}
                    />
                )}

                <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
            </div>
        </div>
    )
}

type ProfileDataPropsType = {
    profile: ProfileType
    isOwner: boolean
    toEditMode: () => void
}
const ProfileData: React.FC<ProfileDataPropsType> = ({ profile, isOwner, toEditMode }) => {
    return (
        <div>
            {isOwner && (
                <div>
                    <button onClick={toEditMode}>edit</button>
                </div>
            )}
            <div>
                <b>Full name</b>: {profile.fullName}
            </div>
            <div>
                <b>Looking for job</b>: {profile.lookingForAJob ? 'yes' : 'no'}
            </div>
            <div>
                <b>My skills</b>: {profile.lookingForAJobDescription}
            </div>
            <div>
                <b>About me</b>: {profile.aboutMe}
            </div>
            <div>
                <b>Contacts</b>:
                {Object.keys(profile.contacts).map((key) => {
                    return (
                        <Contact
                            key={key}
                            contactTitle={key}
                            contactValue={profile.contacts[key as keyof ContactsType]}
                        />
                    )
                })}
            </div>
        </div>
    )
}

type ContactPropsType = {
    contactTitle: string
    contactValue: string
}

const Contact: React.FC<ContactPropsType> = ({ contactTitle, contactValue }) => {
    return (
        <div className={s.contact}>
            <b>{contactTitle}</b>: {contactValue}
        </div>
    )
}

export default ProfileInfo
