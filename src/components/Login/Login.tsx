import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { InjectedFormProps, reduxForm } from 'redux-form'
import { login } from '../../redux/auth-reducer'
import { AppStateType } from '../../redux/redux-store'
import { requiredField } from '../../utils/validators/validators'
import { createField, GetStringTypeKeys, Input } from '../Common/FormsControls/FormsControls'
import styles from '../Common/FormsControls/FormsControls.module.css'

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

export type LoginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}
type LoginFormValuesTypeKeys = GetStringTypeKeys<LoginFormValuesType>

export const Login: React.FC = (props) => {
    // state hook
    const captchaURL = useSelector((state: AppStateType) => state.auth.captchaURL)
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)

    // dispatch hook
    const dispatch = useDispatch()

    const onSubmitFunction = (formData: LoginFormValuesType) => {
        dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha))
    }

    if (isAuth) {
        return <Redirect to='/profile' />
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmitFunction} captchaURL={captchaURL} />
        </div>
    )
}
