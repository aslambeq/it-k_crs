import React from 'react'
import styles from './FormsControls.module.css'
import { Field } from 'redux-form'

const FormControl = ({ input, meta, child, ...props }) => {
    const showError = meta.touched && meta.error
    return (
        <div className={styles.formControl + ' ' + (showError ? styles.error : '')}>
            <div>{props.children}</div>
            {showError && <span>{meta.error}</span>}
        </div>
    )
}

export const Textarea = (props) => {
    const { input, meta, child, ...restProps } = props
    return (
        <FormControl {...props}>
            <textarea {...input} {...restProps} />
        </FormControl>
    )
}

export const Input = (props) => {
    const { input, meta, child, ...restProps } = props
    return (
        <FormControl {...props}>
            <input {...input} {...restProps} />
        </FormControl>
    )
}

export const createField = (name, placeholder, validators, component, type, text = '') => {
    return (
        <div>
            <Field
                name={name}
                placeholder={placeholder}
                validate={validators}
                component={component}
                type={type}
            />{text}
        </div>
    )
}
