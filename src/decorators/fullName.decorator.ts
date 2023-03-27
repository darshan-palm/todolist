import { registerDecorator, ValidationOptions } from "class-validator";

export function IsFullName(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'isFullName',
            propertyName,
            target: object.constructor,
            constraints: [],
            options: {
                ...validationOptions,
            },
            validator: {
                validate(value: string, validationArguments) {
                    const validateFullname = (fullName: string) => {
                        const fullNameRegEx = /^[A-Za-z ]+$/
                        return fullNameRegEx.test(fullName)
                    };
                    return value ? validateFullname(value) : false
                },
                defaultMessage(validationArguments) {
                    return "FullName is invalid."
                },
            }
        })
    }
}