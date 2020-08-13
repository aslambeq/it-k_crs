import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Field, reduxForm, InjectedFormProps } from 'redux-form'
import { login } from '../../redux/auth-reducer'
import { requiredField } from '../../utils/validators/validators'
import { Input, createField } from '../Common/FormsControls/FormsControls'
import styles from '../Common/FormsControls/FormsControls.module.css'
import { AppStateType } from '../../redux/redux-store'

type LoginFormOwnProps = {
    captchaURL: string | null
}

const LoginForm: React.FC<
    InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps
> = ({ handleSubmit, error, captchaURL }) => {
    return (
        <form onSubmit={handleSubmit}>
            {/* createField(name, placeholder, validators, component, type, text = '') */}
            {createField<LoginFormValuesTypeKeys>('email', 'Email', [requiredField], Input, null)}
            {createField<LoginFormValuesTypeKeys>(
                'password',
                'Password',
                [requiredField],
                Input,
                'password'
            )}
            {createField<LoginFormValuesTypeKeys>(
                'rememberMe',
                undefined,
                null,
                Input,
                'checkbox',
                'remember me'
            )}

            {captchaURL && <img src={captchaURL} />}
            {captchaURL &&
                createField<LoginFormValuesTypeKeys>(
                    'captcha',
                    'insert symbols',
                    [requiredField],
                    Input,
                    {}
                )}

            {error && <div className={styles.formSummaryError}>{error}</div>}
            <div>
                <button type='submit'>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({ form: 'login' })(
    LoginForm
)

type MapStatePropsType = {
    captchaURL: string | null
    isAuth: boolean
}
type MapDispatchPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}

export type LoginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}
type LoginFormValuesTypeKeys = Extract<keyof LoginFormValuesType, string>

const Login: React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
    const onSubmitFunction = (formData: LoginFormValuesType) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
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

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    captchaURL: state.auth.captchaURL,
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, { login: login })(Login)

// mapDispatchToProps
// {login: loginTC} == {login}
// loginTC - thunk creator
// login - wrapper
