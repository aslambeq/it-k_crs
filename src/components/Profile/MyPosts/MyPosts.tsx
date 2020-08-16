import React from 'react'
import { AddPostForm, AddPostFormValuesType } from './AddPostForm/AddPostForm'
import s from './MyPosts.module.css'
import Post from './Post/Post'
import { PostDataType } from '../../../types/types'

export type MapStatePropsType = {
    posts: Array<PostDataType>
}
export type MapDispatchPropsType = {
    addPost: (newPostText: string) => void
}

const MyPosts: React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
    let postsElements = props.posts.map((post) => (
        <Post key={post.id} message={post.message} likesCount={post.likesCount} />
    ))

    let onAddPost = (values: AddPostFormValuesType) => {
        props.addPost(values.newPostText)
    }

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <AddPostForm onSubmit={onAddPost} />
            <div className={s.posts}>{postsElements}</div>
        </div>
    )
}

const MyPostsMemorized = React.memo(MyPosts)

export default MyPostsMemorized
