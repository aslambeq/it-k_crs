import React from 'react'
import { Field, WrappedFieldProps, WrappedFieldMetaProps } from 'redux-form'
import { FieldValidatorType } from '../../../utils/validators/validators'
import styles from './FormsControls.module.css'

type FormControlPropsType = {
    meta: WrappedFieldMetaProps
}

const FormControl: React.FC<FormControlPropsType> = ({ meta, children }) => {
    const showError = meta.touched && meta.error
    return (
        <div className={styles.formControl + ' ' + (showError ? styles.error : '')}>
            <div>{children}</div>
            {showError && <span>{meta.error}</span>}
        </div>
    )
}

export const Textarea: React.FC<WrappedFieldProps> = (props) => {
    // const { input, meta, child, ...restProps } = props
    const { input, meta, ...restProps } = props
    return (
        <FormControl {...props}>
            <textarea {...input} {...restProps} />
        </FormControl>
    )
}

export const Input: React.FC<WrappedFieldProps> = (props) => {
    // const { input, meta, child, ...restProps } = props
    const { input, meta, ...restProps } = props
    return (
        <FormControl {...props}>
            <input {...input} {...restProps} />
        </FormControl>
    )
}


export function createField<FormKeysType extends string>(
    name: FormKeysType,
    placeholder: string | undefined,
    validators: Array<FieldValidatorType> | null,
    component: React.FC<WrappedFieldProps>,
    type: any,
    text = ''
) {
    return (
        <div>
            <Field
                name={name}
                placeholder={placeholder}
                validate={validators}
                component={component}
                type={type}
            />
            {text}
        </div>
    )
}
