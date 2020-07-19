import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form'
import { login } from '../../redux/auth-reducer'
import { requiredField } from '../../utils/validators/validators'
import { Input, createField } from '../Common/FormsControls/FormsControls'
import styles from '../Common/FormsControls/FormsControls.module.css'

const LoginForm = ({ handleSubmit, error, captchaURL }) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField('email', 'Email', [requiredField], Input, null)}
            {createField('password', 'password', [requiredField], Input, 'password')}
            {createField('rememberMe', null, null, Input, 'checkbox', 'remember me')}

            {captchaURL && <img src={captchaURL} />}
            {captchaURL && createField('captcha', 'insert symbols', [requiredField], Input, {})}

            {error && <div className={styles.formSummaryError}>{error}</div>}
            <div>
                <button type='submit'>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm)

const Login = (props) => {
    const onSubmitFunction = (formData) => {
        props.login(formData.email, formData.password, formData.remebmerMe, formData.captcha)
    }

    if (props.isAuth) {
        return <Redirect to='/profile' />
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmitFunction} captchaURL={props.captchaURL} />
        </div>
    )
}

const mapStateToProps = (state) => ({
    captchaURL: state.auth.captchaURL,
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, { login: login })(Login)

// mapDispatchToProps
// {login: loginTC} == {login}
// loginTC - thunk creator
// login - wrapper
