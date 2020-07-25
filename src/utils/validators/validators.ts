export type FieldValidatorType = (value: string) => string | undefined

export const requiredField: FieldValidatorType = (value) => {
    if (value) return undefined
    return 'field is required'
}

export const maxLengthCreator = (maxLength: number): FieldValidatorType => (value: string) => {
    if (value.length > maxLength) return `max length is ${maxLength} symbols`;
    return undefined
}
