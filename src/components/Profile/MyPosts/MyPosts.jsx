import React, { PureComponent } from 'react'
import s from './MyPosts.module.css'
import Post from './Post/Post'
import { Field, reduxForm } from 'redux-form'
import {
    requiredField,
    maxLengthCreator,
} from '../../../utils/validators/validators'
import { Textarea } from '../../Common/FormsControls/FormsControls'

const MyPosts = React.memo((props) => {
    let postsElements = props.posts.map((post) => (
        <Post message={post.message} likesCount={post.likesCount} />
    ))

    let onAddPost = (values) => {
        props.addPost(values.newPostText)
    }

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <AddNewPostFormRedux onSubmit={onAddPost} />
            <div className={s.posts}>{postsElements}</div>
        </div>
    )
})

/* class MyPosts extends PureComponent {
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps != this.props || nextState != this.state
    }

    render() {
        let postsElements = this.props.posts.map((post) => (
            <Post message={post.message} likesCount={post.likesCount} />
        ))

        let onAddPost = (values) => {
            this.props.addPost(values.newPostText)
        }

        return (
            <div className={s.postsBlock}>
                <h3>My posts</h3>
                <AddNewPostFormRedux onSubmit={onAddPost} />
                <div className={s.posts}>{postsElements}</div>
            </div>
        )
    }
} */

const maxLength15 = maxLengthCreator(15)

const AddNewPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field
                    placeholder={"What's on your mind?"}
                    name={'newPostText'}
                    component={Textarea}
                    validate={[requiredField, maxLength15]}
                />
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}

const AddNewPostFormRedux = reduxForm({ form: 'ProfileAddNewPostForm' })(
    AddNewPostForm
)

export default MyPosts
