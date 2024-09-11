import React from 'react';
import PropTypes from 'prop-types';
import PasswordField from '../../../Form/components/FormFields/PasswordField';
import Row from '../../../Generic/components/Container/Row';
import Button, {BUTTON_OPTIONS} from '../../../Generic/components/Button/Button';
import {i18nLabels} from '../../../../utils/translationUtils';
import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {empty} from '../../../../utils/default';
import RequiredFieldsDisclaimer from '../../../Form/components/RequiredFieldsDisclaimer';
import {email, required, emailMismatch} from '../../../Form/utils/validationRules';
import Col from '../../../Generic/components/Container/Col';
import DisplayField from '../../../Form/components/DisplayFields/DisplayField';
import EmailField, { fraudDomains } from '../../../Form/components/FormFields/EmailField';
import BirthDateField from '../../../Form/components/FormFields/BirthDateField';
import {updateEmailRequest} from '../../redux/actions/edit_password.action';
import I18n from '../../../Translation/components/I18n';
import {dottedToDashed} from '../../../../utils/dateUtils';

const EmailEdit = ({cancelEmailEditState, handleSubmit, isLoading, currentUserEmail, updateEmailRequest, emailError}) => {
	const updateEmail = values => {
		const emailPayload = {
			'email':currentUserEmail,
			'newEmail': values.newEmail,
			'password': values.Password,
			'dob':dottedToDashed(values.repeatDob),
		};
		updateEmailRequest(emailPayload);
	};
	return (
		<form onSubmit={handleSubmit(updateEmail)}>
			<DisplayField label={i18nLabels.CURRENT_EMAIL} value={currentUserEmail}/>
			<EmailField
				label={i18nLabels.NEW_EMAIL}
				name={'newEmail'}
				placeholder={i18nLabels.NEW_EMAIL}
				validationRules={[required, email,fraudDomains]}
			/>
			<EmailField
				label={i18nLabels.REPEAT_NEW_EMAIL}
				name={'RepeatNewEmail'}
				placeholder={i18nLabels.REPEAT_NEW_EMAIL}
				validationRules={[required, email,fraudDomains]}
			/>
			<PasswordField
				label={i18nLabels.PASSWORD}
				placeholder={i18nLabels.PASSWORD}
				name={'Password'}
			/>
			<BirthDateField 
				isDisabled = {false}
				name={'repeatDob'}
			/>
			 <if condition={emailError}>
				<p className={'text-danger'}>
					{emailError?.status?.code ? <I18n text={i18nLabels.EMAIL_UPDATE_ERROR["emailUpdateGenericErrorCode"]+ emailError?.status?.code }/> :  <I18n text={i18nLabels.EMAIL_UPDATE_ERROR[emailError]}/>}
				</p>
			</if>
			<RequiredFieldsDisclaimer/>
			<Row className={'mt-3'}>
				<Col width={6}>
					<Button label={i18nLabels.CANCEL_CTA} ctaStyle={BUTTON_OPTIONS.STYLE.SECONDARY} action={()=> cancelEmailEditState(false)} isFullWidth hasNoMargin/>
				</Col>
				<Col width={6}>
					<Button label={i18nLabels.SAVE_CTA} ctaStyle={BUTTON_OPTIONS.STYLE.PRIMARY} type={BUTTON_OPTIONS.TYPE.SUBMIT} isDisabled={isLoading} isFullWidth hasNoMargin/>
				</Col>
			</Row>
		</form>
	);
};
EmailEdit.propTypes = {
	cancelEmailEditState: PropTypes.func,
	isLoading: PropTypes.bool,
	currentUserEmail: PropTypes.string,
	updateEmailRequest: PropTypes.func,
	emailError: PropTypes.string
};

const validateEmailMatch = (values) => {
	let errors = empty.object;
	errors = { ...errors, Password : required(values.Password) };
	errors = { ...errors, newEmail: required(values.newEmail)  || email(values.newEmail) || fraudDomains(values.newEmail) };
	errors = { ...errors, RepeatNewEmail: required(values.RepeatNewEmail)  || email(values.RepeatNewEmail) || fraudDomains(values.RepeatNewEmail) };
	if(values.newEmail !== values.RepeatNewEmail) {
			errors = {
				...errors,
				RepeatNewEmail: emailMismatch()
			}
		}
	return errors;
};

const mapStateToProps = state => {
	const {values} = state.form.updateEmailForm || {};
	const {isLoading} = state.myAccountModuleReducer.EmailUpdateReducer;
	return {formValues: values || empty.object, isLoading};
};

const mapDispatchToProps = {
	updateEmailRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
	form: 'updateEmailForm',
	validate: validateEmailMatch
})(EmailEdit));