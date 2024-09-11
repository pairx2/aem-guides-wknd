import React, { Component } from 'react';
import Image from '../../../Generic/components/Image/Image';
import Button, { BUTTON_OPTIONS } from '../../../Generic/components/Button/Button';
import { reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import KVNRField from '../../../Form/components/FormFields/KVNRField';
import TextField from '../../../Form/components/GenericFields/TextField';
import { kvnr, required } from '../../../Form/utils/validationRules';
import { i18nLabels } from '../../../../utils/translationUtils';
import I18n from '../../../Translation/components/I18n';
import { Card, CardAction, CardContent } from '../../../Generic/components/Card/Card';
import Col from '../../../Generic/components/Container/Col';
import { connect } from 'react-redux';
import { getBluedoorCustomerRequest } from '../../redux/actions/bluedoor.action';
import { Title } from '../../../Generic/components/Title/Title';
import { logOutRequest } from '../../redux/actions/login.action';
import { getCookie } from '../../../../utils/cookieUtils';
import RecaptchaField from '../../../Form/components/GenericFields/RecaptchaField';
import { RECAPTCHA_VALIDATION_ERROR_CODE } from '../../../../utils/enums';

const mapDispatchToProps = {
	getBluedoorCustomerRequest,
	signOut: logOutRequest
};

const mapStateToProps = (state) => {
	const { values: bluedoorValues } = state.form.BluedoorLogin || {};
	const { errorCode, bluedoorCustomer } = state.bluedoorModuleReducer;
	const { loggedIn: isLoggedIn } = state.authenticationModuleReducer;
	return { errorCode, bluedoorCustomer, bluedoorValues, isLoggedIn };
};

export default reduxForm({
	form: 'BluedoorLogin',
})(connect(mapStateToProps, mapDispatchToProps)(class BluedoorLogin extends Component {

	static propTypes = {
		getBluedoorCustomerRequest: PropTypes.func,
		heading: PropTypes.string,
		instruction: PropTypes.string,
		blueDoorImage: PropTypes.string,
		buttonText: PropTypes.string,
		information: PropTypes.string,
		loginSuccessLink: PropTypes.string,
		errorCode: PropTypes.number,
		bluedoorCustomer: PropTypes.object,
		bluedoorValues: PropTypes.object,
		isLoggedIn: PropTypes.bool,
		signOut: PropTypes.func
	};

	bluedoorSubmit = async (values) => {
		await window?.grecaptcha?.enterprise?.execute().then((token) => {
			const bluedoorPayload = {
				rxmc: values.receiptId,
				health_insurance_number: values.kvnr
			};
			this.props.getBluedoorCustomerRequest(bluedoorPayload);
		});
	}

	componentDidMount() {
		const { signOut } = this.props;
		const isLoggedIn = getCookie('isLoggedIn');
		isLoggedIn && signOut();
	}

	componentDidUpdate(prevProps) {
		const { loginSuccessLink, bluedoorCustomer, bluedoorValues, isLoggedIn, signOut } = this.props;
		if (prevProps.bluedoorCustomer !== bluedoorCustomer && bluedoorCustomer) {
			sessionStorage.setItem('ghac', bluedoorCustomer?.ghac);
			sessionStorage.setItem('insurenceId', bluedoorValues?.kvnr);
			sessionStorage.setItem('rxmc', bluedoorValues?.receiptId);
			sessionStorage.setItem('bluedoorFlow', true);
			window.location = loginSuccessLink;
		}

		isLoggedIn && signOut();
	}

	render() {
		const { heading, handleSubmit, instruction, blueDoorImage, buttonText, information, errorCode } = this.props;

		return (
			<form onSubmit={handleSubmit(this.bluedoorSubmit)} className="col-12 col-lg-6 offset-lg-3 col-md-10 offset-md-1">
				<Card title={heading} size={Title.SIZE.H1} hasTitleBorder={false} hasTitleCentered isCardSize borderCheck={'remove-card-action-top'}>
					<CardContent>
						<h3 className="adc-title adc-title--blue text-center adj-h3">{instruction}</h3>
						<div className="text-center d-flex justify-content-center"><Image className={'img-fix'} src={blueDoorImage} /></div>
						<Col lg={10} md={9} className={'offset-lg-1 offset-md-1 mt-3'}>
							<KVNRField
								placeholder={i18nLabels.ENTER_iNSURENCE_NUMBER}
							/>
							<TextField
								label={i18nLabels.RECEIPT_CODE}
								name="receiptId"
								placeholder={i18nLabels.ENTER_RECEIPT_CODE}
								type="text"
								className={'mt-4'}
								validationRules={[required]}
							/>
						</Col>
						<if condition={errorCode && errorCode !== RECAPTCHA_VALIDATION_ERROR_CODE}>
							<div className="mt-4">
								<p className="text-danger text-center"><I18n text={i18nLabels.BLUEDOOR_ERROR_CODE} /></p>
							</div>
						</if>
						<if condition={errorCode && errorCode === RECAPTCHA_VALIDATION_ERROR_CODE}>
							<div className="mt-4">
								<p className="text-danger text-center"><I18n text={i18nLabels.RECAPTCHA_VALIDATION_ERROR} /></p>
							</div>
						</if>
					</CardContent>
					<CardAction >
						<Col lg={10} md={9} className={'offset-lg-1 offset-md-1 pt-3'}>
							<Button
								label={buttonText}
								type={BUTTON_OPTIONS.TYPE.SUBMIT}
								size={BUTTON_OPTIONS.SIZE.LARGE}
								ctaStyle={BUTTON_OPTIONS.STYLE.PRIMARY}
								hasNoMargin
								isFullWidth
							/>
							<div className="mt-4 pb-1">
								<p className="text-center">{information}</p>
							</div>

						</Col>
						<Col lg={10} md={9} className={' offset-lg-1 text-left'}>
							<RecaptchaField />
						</Col>
					</CardAction>
				
				</Card>
			</form>
		);
	}
}));