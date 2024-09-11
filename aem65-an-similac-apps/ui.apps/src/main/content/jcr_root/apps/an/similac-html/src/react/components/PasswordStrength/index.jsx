import React, { useState, useRef, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik";
const PasswordStrength = ({
    passwordStrength,
    label,
    name,
    type,
    value,
    error,
    touched,
    isShowPass,
    fieldId,
    maxLength,
    disabled,
    iconClickable = false,
    onChange = () => null,
    onBlur = () => null,
    onClick = () => null,
    validator,
    rules = "",
    subComponent = null,
    onFocus = () => null,
    getNode = () => null,
    icon,
}) => {
    const id = "react-form-field-" + name;

    const { submitCount, setFieldTouched, ...props } = useFormikContext();
    useEffect(() => {
        if (submitCount > 0 && !!!touched) {
            setFieldTouched(name, true);
        }
    }, [submitCount]);


    const [isFocused, setFocus] = useState(false);
    const [hide, setHide] = useState(false);
    const [strength, setStrength] = useState(passwordStrength.rules.empty);

    const textInput = useRef(null);

    const handleAutoFill = (e) => {
        if (e.animationName === "onAutoFillStart") {
            setHide(true);
        }
    };

    useEffect(() => {
        getNode(textInput);
    }, [isShowPass]);

    useEffect(() => {

        const strengthIndicator = (value) => {

            let strengths = passwordStrength.rules.empty;
            let isStrong = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(value);
            if (value.length >= 1 && !isStrong) {
                strengths = passwordStrength.rules.weak;
            }
            if (value.length === 8 && isStrong) {
                strengths = passwordStrength.rules.medium;
            }
            if (value.length >= 9 && isStrong) {
                strengths = passwordStrength.rules.strong;
                if (/(.)(.*\1){4}/.test(value)) {
                    strengths = passwordStrength.rules.medium;
                }
            }
            if (value.length >= 11 && isStrong) {
                strengths = passwordStrength.rules.veryStrong;
                if (/(.)(.*\1){4}/.test(value)) {
                    strengths = passwordStrength.rules.medium;
                }
            }
            setStrength(strengths);
        }
        strengthIndicator(value || "");
    }, [value]);

    return (
        <fieldset id={fieldId}
            className={`form-group similac-form-group ${isFocused ? "isFocused" : "isBlured"
                } ${((hide || value) && "input-contents") || ""}`}
        >
            <label htmlFor={id} className="similac-label-floating">
                {label}
            </label>

            <input
                ref={textInput}
                type={type || "text"}
                className={`form-control ${(error && touched && "is-invalid") || ""}`}
                id={id}
                name={name}
                disabled={disabled}
                maxLength={maxLength || 999}
                onChange={(e) => onChange && onChange(e) & setHide(false)}
                onClick={onClick}

                value={value}
                onAnimationStart={handleAutoFill}
                onFocus={() => setFocus(true) & setHide(false) & onFocus(true)}
                onBlur={(e) => setFocus(false) & setHide(false) & onBlur(e)}
            />
            <span className={`input-icon ${iconClickable ? 'clickable' : ''}`}>{icon}</span>
            {subComponent}

            <div className={`password-${strength.value}`}>
                <div className="password-strength-meter">
                    {passwordStrength.label} <span>{strength.label}</span>
                </div>
            </div>


            <ErrorMessage name={name} >
                {msg => (<div
                    className="invalid-feedback similac-error-group "
                    dangerouslySetInnerHTML={{ __html: msg }}
                />)}
            </ErrorMessage>
        </fieldset>
    );
};

export default PasswordStrength;
