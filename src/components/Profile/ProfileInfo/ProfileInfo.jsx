import React from 'react'
import Preloader from '../../Common/Preloader/Preloader'
import s from './ProfileInfo.module.css'
import ProfileStatus from './ProfileStatus'
import ProfileStatusHOC from './ProfileStatusHOC'

const ProfileInfo = ({profile, status, updateStatus}) => {
    if (!profile) {
        return <Preloader />
    }

    return (
        <div>
            {/* <div>
                {<img src='https://www.sciencealert.com/images/2020-04/processed/CanWeGetRonaFromPets_1024.jpg' />}
            </div> */}
            <div className={s.desriptionBlock}>
                <img className={s.avatar} src={profile.photos.large} />
                <ProfileStatusHOC status={status} updateStatus={updateStatus} />
            </div>
        </div>
    )
}

export default ProfileInfo
