import React from 'react';
import PropTypes from 'prop-types';
import PasswordField from '../../../Form/components/FormFields/PasswordField';
import Row from '../../../Generic/components/Container/Row';
import Button, {BUTTON_OPTIONS} from '../../../Generic/components/Button/Button';
import {i18nLabels} from '../../../../utils/translationUtils';
import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {empty} from '../../../../utils/default';
import PasswordStrengthFinder from '../../../Form/components/PasswordStrengthFinder/PasswordStrengthFinder';
import RequiredFieldsDisclaimer from '../../../Form/components/RequiredFieldsDisclaimer';
import {required, passwordMismatch} from '../../../Form/utils/validationRules';
import {editPasswordRequest} from '../../redux/actions/edit_password.action';
import Col from '../../../Generic/components/Container/Col';
import {validatePassword} from '../../../Form/components/PasswordStrengthFinder/PasswordStrengthFinderValidation';
import I18n from '../../../Translation/components/I18n.jsx';
import {formFieldValidationRegexes} from '../../../../utils/regexUtils';

const PasswordEdit = ({passwordEditState, handleSubmit, editPasswordRequest, isLoading, passwordError}) => {
	const changePassword = values => {
		const passwordPayload = {
			'PreviousPassword': values.currentPassword,
			'ProposedPassword': values.password,
		};
		editPasswordRequest(passwordPayload);
	};
	return (
		<form onSubmit={handleSubmit(changePassword)}>
			<PasswordField
				label={i18nLabels.CURRENT_PASSWORD}
				placeholder={i18nLabels.CURRENT_PASSWORD}
				name={'currentPassword'}/>
			<PasswordStrengthFinder isAccountPasswordEdit/>
			<RequiredFieldsDisclaimer/>
			<if condition={passwordError}>
				<p className={'text-danger'}>
					{passwordError?.status?.code ? <I18n text={i18nLabels.PASSWORD_UPDATE_ERROR["passwordUpdateGenericErrorCode"] + passwordError?.status?.code} /> : <I18n text={i18nLabels.PASSWORD_UPDATE_ERROR[passwordError]} />}
				</p>
			</if>
			<Row className={'mt-3'}>
				<Col width={6}>
					<Button label={i18nLabels.CANCEL_CTA} ctaStyle={BUTTON_OPTIONS.STYLE.SECONDARY} action={() => passwordEditState(false)} isFullWidth hasNoMargin/>
				</Col>
				<Col width={6}>
					<Button label={i18nLabels.SAVE_CTA} ctaStyle={BUTTON_OPTIONS.STYLE.PRIMARY} type={BUTTON_OPTIONS.TYPE.SUBMIT} isDisabled={isLoading} isFullWidth hasNoMargin/>
				</Col>
			</Row>
		</form>

	);
};
PasswordEdit.propTypes = {
	passwordEditState: PropTypes.func,
	editPasswordRequest: PropTypes.func,
	isLoading: PropTypes.bool,
	passwordError: PropTypes.string
};

PasswordEdit.defaultProps = {};

const validateNewPasswordMatch = (values) => {
	let errors = empty.object;
	if(required(values.currentPassword)) {
		errors = {
			...errors,
			currentPassword: required(values.currentPassword)
		};
	}
	if(required(values.password)) {
		errors = {
			...errors,
			password: required(values.password)
		};
	} else if (formFieldValidationRegexes.PASSWORD.VALID_CHAR.test(values.password)) {
		errors = {
			...errors,
			password: <I18n text={i18nLabels.INVALID_CHAR_ERROR_MESSAGE}/>
		};
	} else if (!validatePassword(values.password)) {
		errors = {
			...errors,
			password: <I18n text={i18nLabels.MANDATORY_FIELD_SUGGESTION}/>
		};
	}
	if(required(values.retypepassword)) {
		errors = {
			...errors,
			retypepassword: required(values.retypepassword)
		};
	} else if(values.password !== values.retypepassword) {
		errors = {
			...errors,
			retypepassword: passwordMismatch()
		};
	}

	return errors;
};

const mapStateToProps = state => {
	const {values} = state.form.editPasswordForm || {};
	return {formValues: values || empty.object};
};

const mapDispatchToProps = {
	editPasswordRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
	form: 'editPasswordForm',
	validate: validateNewPasswordMatch
})(PasswordEdit));