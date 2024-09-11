import { Component } from 'react'
import { connect } from 'formik'
import scrollToElement from 'scroll-to-element'

class Focus extends Component {
    static defaultProps = {
        offset: -30,
        align: 'top',
        focusDelay: 200,
        ease: 'linear',
        duration: 1000
    }

    getFirstError = (errors = {}) => {
        const { formName, fields: formFields = [],formError="" } = this.props;
        const fields = [{ name: formName }].concat(formFields);
        const errorKeys = Object.keys(errors);
        const errorFields = fields.filter(({ name = "" }) => {
            return errorKeys.includes(name);
        });
        return errorFields.length ? errorFields[0].name : formError? formName:"";
    }

    componentDidUpdate(prevProps) {
        const { isSubmitting, isValidating, errors } = prevProps.formik
        const name = this.getFirstError(errors) || "";

        if (name && isSubmitting && !isValidating) {
            const selector = [`[name='${name}']:not([type=hidden])`,`[data-scroll='${name}']`].find(_sel => document.querySelector(_sel) !== null);
            const errorElement = selector ? document.querySelector(selector) : null;
            if (errorElement) {
                const { offset, ease, duration, focusDelay, align } = this.props
                scrollToElement(errorElement, {
                    offset, ease, duration, align
                })

                this.timeout = setTimeout(() => errorElement.focus(), duration + focusDelay)
            }
        }
    }

    componentWillUnmount() {
        if (this.timeout) {
            clearTimeout(this.timeout)
        }
    }

    render() {
        return null
    }
}

export default connect(Focus)