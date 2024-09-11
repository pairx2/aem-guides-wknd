import React, { useRef, useEffect, useState } from 'react';
import loadScript from 'simple-load-script';
import { ErrorMessage, useFormikContext } from "formik";

const noop = () => undefined;

const DivWrap = React.memo(({ setRef, id, sitekey, theme, type = "image", size, badge }) => <div
    id={id}
    ref={setRef}
    data-sitekey={sitekey}
    data-theme={theme}
    data-type={type}
    data-size={size}
    data-badge={badge}
/>);

const Recaptcha = ({
    label,
    name,
    type,
    value,
    sitekey,
    touched,
    onChange = noop,
    onBlur = noop,
    inherit = true,
    isolated = false,
    badge = "bottomright",
    hl = "en",
    size = "normal",
    theme = "light",
    fieldId = ""
}) => {
    if(fieldId === "" || fieldId === undefined){
        fieldId = `id-captcha-${name}-div`;
    }
    const elRef = useRef(null);
    const { submitCount, setFieldTouched, setFieldError, setFieldValue } = useFormikContext();
    const onError = (e) => {
        setFieldError(name, JSON.stringify(e));
        setFieldValue(name, "");
    };
    const onExpired = (e) => {
        console.log(e);
        setFieldError(name, "Please verify Captcha");
        setFieldValue(name, "");
    };
    const onSuccess = (e) => {
      const isENTcaptchaEnabled = jQuery("input[name=enterpriseRecaptcha]").length ? jQuery("input[name=enterpriseRecaptcha]").val() : false;
        if(isENTcaptchaEnabled){
            const res = window.grecaptcha.enterprise.getResponse();
            setFieldValue(name, res);
        } else {
            const res = window.grecaptcha.getResponse();
            setFieldValue(name, res);
        }
    }

    useEffect(() => {
        if (submitCount > 0 && !!!touched) {
            setFieldTouched(name, true);
        }
    }, [submitCount]);

    useEffect(() => {
        const recaptchaURL = document.getElementById('recaptchaURL').value;
        const isENTRecaptchaEnabled = jQuery("input[name=enterpriseRecaptcha]").length ? jQuery("input[name=enterpriseRecaptcha]").val() : false;
        const loadReCaptcha = async () => {
            loadScript({
                url: recaptchaURL,
            })
                .then(() => {
                    if(isENTRecaptchaEnabled){
                        window.grecaptcha.enterprise.ready(() => {
                            window.grecaptcha.enterprise.render(
                                document.getElementById(fieldId),
                                {
                                    "error-callback": onError,
                                    "expired-callback": onExpired,
                                    badge: badge,
                                    callback: onSuccess,
                                    isolated: isolated,
                                    sitekey: sitekey,
                                    size: size,
                                    theme: theme
                                },
                                inherit
                            );
                        });
                    } else {
                        window.grecaptcha.ready(() => {
                            window.grecaptcha.render(
                                document.getElementById(fieldId),
                                {
                                    "error-callback": onError,
                                    "expired-callback": onExpired,
                                    badge: badge,
                                    callback: onSuccess,
                                    isolated: isolated,
                                    sitekey: sitekey,
                                    size: size,
                                    theme: theme
                                },
                                inherit
                            );
                        });
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        loadReCaptcha();
    }, []);

    return (
        <fieldset
            className={`form-group similac-form-group isBlured`}
        >
            <DivWrap
                id={fieldId}
                setRef={elRef}
                badge={badge}
                sitekey={sitekey}
                theme={theme}
                size={size}
            />
            <ErrorMessage name={name} >
                {msg => (<div
                    className="invalid-feedback similac-error-group "
                    dangerouslySetInnerHTML={{ __html: msg }}
                />)}
            </ErrorMessage>
        </fieldset>
    )
}

export default Recaptcha;