import React from 'react';
import {i18nLabels} from '../../../../utils/translationUtils';
import PropTypes from 'prop-types';
import Button, {BUTTON_OPTIONS} from '../../../Generic/components/Button/Button';
import CheckboxField, {CHECKBOX_TYPES} from '../../../Form/components/GenericFields/CheckboxField';
import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import RecaptchaField from '../../../Form/components/GenericFields/RecaptchaField';
import {empty} from '../../../../utils/default';

const DeactivateAccount = ({cancelDeactivateAccount, deactivateDescription, handleSubmit, recaptchaValue}) => {
	const onSubmit = () => {
		if (recaptchaValue) {
			// TODO deactivate account when solution is available
		}
	};
	return <form onSubmit={handleSubmit(onSubmit)}>
		<p className="mt-3">
			{deactivateDescription}
		</p>
		<div className="custom-checkbox my-4">
			<CheckboxField name="saveAddress" label={i18nLabels.SAVE_ADDRESS_TO_ACCOUNT} type={CHECKBOX_TYPES.WHITE} />
		</div>
		<RecaptchaField />
		<Button
			label={i18nLabels.CANCEL_CTA}
			ctaStyle={BUTTON_OPTIONS.STYLE.SECONDARY}
			action={cancelDeactivateAccount}
			isFullWidth
			className={'mx-0'}
		/>
		<Button
			label={i18nLabels.DEACTIVATE_ACCOUNT}
			ctaStyle={BUTTON_OPTIONS.STYLE.PRIMARY}
			type={BUTTON_OPTIONS.TYPE.SUBMIT}
			isFullWidth
			className={'mx-0'}
			isDisabled={!recaptchaValue}
		/>
	</form>;
};

DeactivateAccount.propTypes = {
	cancelDeactivateAccount: PropTypes.func,
	deactivateDescription: PropTypes.string,
	recaptchaValue: PropTypes.string,
};

DeactivateAccount.defaultProps = {};

const mapStateToProps = state => {
	const {recaptchaValue} = state.form.deactivateAccount?.values || empty.object;
	return {recaptchaValue};
};

export default connect(mapStateToProps, null)(reduxForm({
	form: 'deactivateAccount'
})(DeactivateAccount));
