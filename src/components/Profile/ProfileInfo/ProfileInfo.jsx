import React from 'react'
import userPhoto from '../../../assets/images/user.jpg'
import Preloader from '../../Common/Preloader/Preloader'
import s from './ProfileInfo.module.css'
import ProfileStatusHOC from './ProfileStatusHOC'

const ProfileInfo = ({ profile, status, updateStatus, isOwner, savePhoto }) => {
    if (!profile) {
        return <Preloader />
    }

    // event handler
    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    }

    return (
        <div>
            {/* <div>
                {<img src='https://www.sciencealert.com/images/2020-04/processed/CanWeGetRonaFromPets_1024.jpg' />}
            </div> */}
            <div className={s.desriptionBlock}>
                <img className={s.avatar} src={profile.photos.large || userPhoto} />
                {isOwner && <input type={'file'} onChange={onMainPhotoSelected} />}
                <ProfileStatusHOC status={status} updateStatus={updateStatus} />
            </div>
        </div>
    )
}

export default ProfileInfo
