import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Form, reduxForm} from 'redux-form';
import PropTypes from 'prop-types';
import Button, {BUTTON_OPTIONS} from '../../../Generic/components/Button/Button';
import BirthDateField from '../../../Form/components/FormFields/BirthDateField';
import PasswordField from '../../../Form/components/FormFields/PasswordField';
import {i18nLabels} from '../../../../utils/translationUtils';
import I18n from '../../../Translation/components/I18n';
import {confirmEmailChangeRequest} from '../../../MyAccount/redux/actions/edit_password.action';
import {dottedToDashed} from '../../../../utils/dateUtils';

const mapDispatchToProps = {
	confirmEmailChange: confirmEmailChangeRequest
};

class ChangeEmailModal extends Component {
	static propTypes = {
		confirmationDetails: PropTypes.object,
		confirmEmailChange: PropTypes.func
	};

	state = {showPopUp: true}
	submit = (values) => {
		const {confirmationDetails, confirmEmailChange}=this.props;
		const confirmEmailPayload = {
			...confirmationDetails,
			...values,
			confirmDob: dottedToDashed(values.confirmDob)
		  }
		confirmEmailChange(confirmEmailPayload);
		this.setState({showPopUp: false});
	}
	render() {
		const {handleSubmit,confirmationDetails} = this.props;
		const {showPopUp} = this.state;
		return <if condition={showPopUp}>
				<Form onSubmit={handleSubmit(this.submit)}>
					<div className="adc-modal adc-modal--small">
						<div className="adc-modal__header text-break"><I18n text={i18nLabels.CHANGE_EMAIL_MODAL_TITLE}/></div>
						<div className="adc-modal-body">
							<I18n text={i18nLabels.CHANGE_EMAIL_MODAL_TEXT}/>
							<div className="adc-login__left--inner adc-form-group">
								<div className="adc-form-group mb-3">
									<BirthDateField isDisabled = {false} name={'confirmDob'}/>
								</div>
								<if condition={parseInt(confirmationDetails.type) == 1}>
								<div className="adc-form-group mb-3">
									<PasswordField label={i18nLabels.NEW_PASSWORD} placeholder={i18nLabels.NEW_PASSWORD} name={'setNewPassword'}/>
								</div>
								</if>
							</div>
							<Button
								type={BUTTON_OPTIONS.TYPE.SUBMIT}
								ctaStyle={BUTTON_OPTIONS.STYLE.PRIMARY}
								label={i18nLabels.CHANGE_EMAIL_MODAL_SUBMIT_BUTTON} />
						</div>
					</div>
					<div className="adc-modal-overlay"></div>
				</Form>
			</if>
	}
}
ChangeEmailModal = reduxForm({
	form: 'changeEmailForm'
})(ChangeEmailModal);

ChangeEmailModal = connect(null,
	mapDispatchToProps
)(ChangeEmailModal);

export default ChangeEmailModal;