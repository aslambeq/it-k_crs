import React from 'react';
import s from './Post.module.css';
import avatar from './img/avatar.jpg';
import like from './img/like.png';
import { AppStateType } from '../../../../redux/redux-store';

type PostPropsType = {
    message: string
    likesCount: number
}

const Post: React.FC<PostPropsType> = (props) => {
    return (
        <div className={s.item}>
            <img className={s.avatar} src={avatar} />
            { props.message }
            <div>
                <img className={s.like} src={like} /> { props.likesCount }
            </div>
        </div>
    );
}

export default Post;
