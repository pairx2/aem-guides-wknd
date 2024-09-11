import React, {Component} from 'react';
import {connect} from 'react-redux';
import GeneralInfoForm from './GeneralInfoForm';
import AccountInfoForm from './AccountInfoForm';
import ContactInfoForm from './ContactInfoForm';
import InsuranceInfoForm from './InsuranceInfoForm';
import {eApplyRequest, registrationUserRequest} from '../../redux/actions/registration.action';
import {verifyAddressRequest} from '../../../Address/redux/actions/verify_address.actions';
import {ADDRESS_CHECK_SUCCESS} from '../../../Address/api/addressVerification.api';
import {resetRegistrationError} from '../../redux/actions/login.action';
import {getUrlParameter} from '../../../../utils/getParams';
import {i18nLabels} from '../../../../utils/translationUtils';
import ProgressBar from '../../../Generic/components/ProgressBar/ProgressBar';
import Container from '../../../Generic/components/Container/Container';
import PropTypes from 'prop-types';
import {openModalAction} from '../../../Modal/redux/actions';
import {splitAddressAndNumber} from '../../../../utils/regexUtils';
import {getBluedoorCustomerRequest} from '../../redux/actions/bluedoor.action';
import {DEFAULT_COUNTRY_OPTIONS, INSURANCE_KEY_TYPES, BOOLEAN_STRING, WCM_MODE_EDIT} from '../../../../utils/enums';
import {getSickfundsRequest} from '../../../SickFund/redux/actions/get_sickfunds.action';
import {getRequiredSiteData} from '../../../../utils/siteData';
import {getCookie} from '../../../../utils/cookieUtils';
import {formSubmitSuccessSatellite, formSubmitErrorSatellite} from '../../../../utils/adobeAnalyticsUtils';
import { setLandlineNumber, setMobileNumber } from '../../../MyAccount/myAccountUtils';

const mapStateToProps = state => {
	const {values: generalInfoFormValues} = state.form.generalInfoForm || {};
	const {values: contactInfoFormValues} = state.form.contactInfoForm || {};
	const {values: insuranceInfoFormValues} = state.form.insuranceInfoForm || {};
	const {values: accountInfoFormValues} = state.form.accountInfoForm || {};
	const {verificationStatus, address, rssResultCode, isBlacklisted, isVerified} = state.addressModuleReducer.AddressReducer.addresses.registration;
	const {loading: isLoading, user: {userName, firstName: socialFirstName, lastName: socialLastName, isSocialLogin}, isRegistered, error: autherror} = state.authenticationModuleReducer;
	const {bluedoorCustomer} = state.bluedoorModuleReducer;
	const {sickfunds} = state.sickfundModuleReducer.SickfundReducer;
	const email = (isSocialLogin ? state.authenticationModuleReducer?.user?.email : accountInfoFormValues?.email) || '';
	return {
		generalInfoFormValues,
		contactInfoFormValues,
		insuranceInfoFormValues,
		accountInfoFormValues,
		verificationStatus,
		address,
		rssResultCode,
		isBlacklisted,
		isVerified,
		isLoading,
		bluedoorCustomer,
		userName,
		socialFirstName,
		socialLastName,
		email,
		sickfunds,
		isSocialLogin,
		isRegistered,
		autherror
	};
};

const mapDispatchToProps = {
	registerUser: registrationUserRequest,
	applyRegisterUser: eApplyRequest,
	verifyAddressRequest,
	resetRegistrationError,
	openModalAction,
	getBluedoorCustomerRequest,
	getSickFunds: getSickfundsRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(class RegistrationForm extends Component {

	static propTypes = {
		verificationStatus: PropTypes.string,
		resetRegistrationError: PropTypes.func,
		verifyAddressRequest: PropTypes.func,
		applyRegisterUser: PropTypes.func,
		registerUser: PropTypes.func,
		openModalAction: PropTypes.func,
		checkoutLink: PropTypes.string,
		rxLink: PropTypes.string,
		defaultLink: PropTypes.string,
		isEApply: PropTypes.bool,
		address: PropTypes.shape({
			street: PropTypes.string,
			streetNumber: PropTypes.string,
			zipcode: PropTypes.string,
			city: PropTypes.string,
		}),
		isLoading: PropTypes.bool,
		initialValues: PropTypes.object,
		bluedoorCustomer: PropTypes.object,
		getBluedoorCustomerRequest: PropTypes.func,
		generalInfoFormValues: PropTypes.object,
		contactInfoFormValues: PropTypes.object,
		insuranceInfoFormValues: PropTypes.object,
		accountInfoFormValues: PropTypes.object,
		isSocialLogin: PropTypes.bool,
		email: PropTypes.string,
		userName: PropTypes.string,
		firstName: PropTypes.string,
		lastName: PropTypes.string,
		socialFirstName : PropTypes.string,
		socialLastName : PropTypes.string,
		rssResultCode: PropTypes.string,
		isBlacklisted: PropTypes.bool,
		isVerified: PropTypes.bool,
		sickfunds: PropTypes.array,
		getSickFunds: PropTypes.func,
		isDisableRegistration: PropTypes.bool,
		accountLink: PropTypes.string,
		isRegistered: PropTypes.bool,
		autherror: PropTypes.object,
		isDisableSocialRegistration: PropTypes.bool
	};

	state = {
		currentStep: 1,
		steps: [
			{title: i18nLabels.REGISTRATION.PERSONAL_DATA_LABEL},
			{title: i18nLabels.REGISTRATION.CONTACT_INFO_LABEL},
			{title: i18nLabels.REGISTRATION.INSURANCE_INFO_LABEL},
			{title: i18nLabels.REGISTRATION.CONFIRMATION_LABEL},
		]
	};

	componentDidMount() {
		const {defaultLink, getSickFunds} = this.props;
		let isRegistrationAllowed = this.checkRegistrationAllowed();
		const ghac = sessionStorage.getItem('ghac');
		const rxmc = sessionStorage.getItem('rxmc');
		const health_insurance_number = sessionStorage.getItem('insurenceId');
		if (ghac && rxmc && health_insurance_number) {
			getSickFunds();
		} else if(!isRegistrationAllowed && getRequiredSiteData('wcmmode') !== WCM_MODE_EDIT){
			window.location= defaultLink;
		}
	}
	checkRegistrationAllowed  =  () => {
		const {isDisableRegistration} = this.props;
		if(!isDisableRegistration) return true;
		else if(isDisableRegistration) {
			return JSON.parse(sessionStorage.getItem('bluedoorFlow'));
		}
	}
	componentDidUpdate(prevProps) {
		const {verificationStatus, isLoading, bluedoorCustomer, accountLink, isRegistered, autherror} = this.props;
		const isLoggedIn = getCookie('isLoggedIn');
		const isSocialFlow = getUrlParameter('isSocialSignIn');
		if(isLoggedIn && !isSocialFlow) window.setTimeout(() => (window.location.href = accountLink), 2000);
		if (verificationStatus === ADDRESS_CHECK_SUCCESS && verificationStatus !== prevProps.verificationStatus) {
			this.setStep(3);
		}
		if (!prevProps.isLoading && isLoading) {
			openModalAction({
				contentID: 'registrationInProgressModal'
			});
		}
		if(prevProps.bluedoorCustomer !== bluedoorCustomer && bluedoorCustomer) {
			sessionStorage.removeItem('ghac');
			sessionStorage.removeItem('insurenceId');
			sessionStorage.removeItem('rxmc');
			sessionStorage.removeItem('bluedoorFlow');
		}
		if (isRegistered) {
			formSubmitSuccessSatellite();
		}

		if (autherror && prevProps.autherror !== autherror) {
			formSubmitErrorSatellite(autherror['Error Message']);
		}
		
	}

	setStep = step => {
		this.setState({
			currentStep: step
		}, () => {
			const  headingElement = document.getElementsByClassName('adc-registration__heading');
			headingElement?.[0]?.scrollIntoView();
		});
	};

	clearErrorsAndReturn = () => {
		this.props.resetRegistrationError();
		this.setStep(3);
	};

	checkAddress = () => {
		const {firstName, lastName, birthDate, prefix} = this.props.generalInfoFormValues;
		const {street, postcode, city} = this.props.contactInfoFormValues;
		const birthdayValues = birthDate.split('.');
		const birthDay = `${birthdayValues[2]}-${birthdayValues[1]}-${birthdayValues[0]}`;
		const streetAndNumber = splitAddressAndNumber(street);

		//Verify address before sending the form
		this.props.verifyAddressRequest({
			address: {
				street: streetAndNumber.street,
				streetNumber: streetAndNumber.streetNumber,
				zipcode: postcode,
				city: city,
				country: DEFAULT_COUNTRY_OPTIONS[0].value
			},
			user: {
				lastName: lastName,
				firstName: firstName,
				birthday: birthDay,
				salutation: prefix
			},
			section: 'registration'
		});
	};

	userRegistration = (isEApply, userDataEApply, userData, defaultLink, isCheckout) =>{
		const {applyRegisterUser, registerUser} = this.props;
		if (isEApply) {
			applyRegisterUser(userDataEApply, defaultLink, isCheckout);
		} else {
			registerUser(userData, defaultLink, isCheckout);
		}
	}
	blueDoorCallAfterLoad= () =>{
		const {getBluedoorCustomerRequest} = this.props;
		const rxmc = sessionStorage.getItem('rxmc');
		const health_insurance_number = sessionStorage.getItem('insurenceId');
		const bluedoorPayload = {
			rxmc: rxmc,
			health_insurance_number: health_insurance_number
		};
		getBluedoorCustomerRequest(bluedoorPayload);
	}

	sendForm = () => {
		const {rssResultCode, isBlacklisted, isVerified, defaultLink, isEApply, address, isSocialLogin, userName, email} = this.props;
		const {prefix, firstName, lastName, birthDate} = this.props.generalInfoFormValues;
		const {landline_phone, mobile_phone, additionalAddress} = this.props.contactInfoFormValues;
		const {kvnr, measurementsOption, selectInsurance: insuredType, healthInsurance} = this.props.insuranceInfoFormValues;
		const {password, voucher, termsConditionsConfirmation, privacyPolicyConfirmation, dataProcessingConsentConfirmation, trainingConfirmation, newsletterConfirmation, recaptchaValue} = this.props.accountInfoFormValues;
		const {street, streetNumber, zipcode, city} = address;
		const {name: sickFund} = this.props.insuranceInfoFormValues?.healthInsurance?.value || {};
		const birthdayValues = birthDate.split('.');
		const birthDay = `${birthdayValues[2]}-${birthdayValues[1]}-${birthdayValues[0]}`;
		const isCheckout = getUrlParameter('isCheckout') === BOOLEAN_STRING.TRUE;
		const landlineNumber = setLandlineNumber(landline_phone);
		const mobileNumber = setMobileNumber(mobile_phone);
		const userData = {
			username: isSocialLogin ? userName : email,
			password: password,
			prefix: prefix,
			firstname: firstName,
			lastname: lastName,
			birthdate: birthDay,
			email: email,
			recaptchaValue: recaptchaValue,
			mobile_phone: mobileNumber,
			telephone: landlineNumber,
			country_code: DEFAULT_COUNTRY_OPTIONS[0].value,
			language_code: DEFAULT_COUNTRY_OPTIONS[0].value,
			dob: birthDay,
			address: [
				{
					prefix: prefix,
					is_blacklisted: isBlacklisted ? '1': '0',
					rss_result_code: rssResultCode,
					missing_verification: isVerified ? '0' : '1',
					'firstname': firstName,
					'lastname': lastName,
					'telephone': mobileNumber,
					'street': [
						street + ' ' + streetNumber
					],
					'city': city,
					'postcode': zipcode,
					'country_id': DEFAULT_COUNTRY_OPTIONS[0].value,
					'is_default_billing': '1',
					'is_default_shipping': '1',
				}
			],
			measurement: measurementsOption,
			terms_and_condition_agreed: termsConditionsConfirmation ? '1' : '0',
			data_privacy: privacyPolicyConfirmation ? '1' : '0',
			data_processing: dataProcessingConsentConfirmation ? '1' : '0',
			insurance_number: insuredType === INSURANCE_KEY_TYPES.PUBLIC ? kvnr : '',
			payer_institution_name: insuredType === INSURANCE_KEY_TYPES.PUBLIC ? healthInsurance?.label : '',
			payer_institution: insuredType === INSURANCE_KEY_TYPES.PUBLIC ? healthInsurance?.value?.insuranceID : '',
			is_subscribed_for_vat_reduction: '0',
			training: trainingConfirmation,
			is_proactive_messaging: true,
			is_newsletter_subscribed: newsletterConfirmation,
			blueDoor: this.props.bluedoorCustomer?.account_type === 2 ? true : false,
			socialLogin: isSocialLogin || false
		};

		if (additionalAddress) userData.address[0].street.push(additionalAddress);
		const userDataEApply = {
			source: '',
			customerType: '',
			title: prefix,
			firstname: firstName,
			lastname: lastName,
			email: email,
			recaptchaValue: recaptchaValue,
			street: street,
			zipcode: zipcode,
			country: DEFAULT_COUNTRY_OPTIONS[0].value,
			dob: birthDate,
			sickFund: sickFund,
			ikNumber: '',
			insuredType: insuredType,
			kvnrNumber: kvnr,
			measurementUnit: measurementsOption,
			voucherCode: voucher,
			termsCondition: termsConditionsConfirmation ? '1' : '0',
			privacyPolicy: privacyPolicyConfirmation ? '1' : '0'
		};

		this.userRegistration(isEApply, userDataEApply, userData, defaultLink, isCheckout);
	};

	bluedoorDateFormat = () => {
		const {bluedoorCustomer} = this.props;
		if (bluedoorCustomer) {
			const bluedoorDob = bluedoorCustomer.dob.split('-');
			const bluedoorBirthDate = `${bluedoorDob[2]}.${bluedoorDob[1]}.${bluedoorDob[0]}`;
			return bluedoorBirthDate;
		}
	}

	initialTelephoneValues = () => {
		if (!this.props.contactInfoFormValues) return;
		const {landline_phone, mobile_phone} = this.props.contactInfoFormValues;
		return {
			landline_phone,
			mobile_phone
		};
	}
	getSickfund = (sickfundName) => this.props.sickfunds?.find(sickfund => sickfund?.insuranceName?.toLowerCase() === sickfundName?.toLowerCase());
	
	hideRegistration = () => {
		const {bluedoorCustomer, isDisableRegistration} = this.props;
		if(!bluedoorCustomer) {
			if(!isDisableRegistration) return false;
			else if(isDisableRegistration) return true;
			return false;
		}
	}

	handleGoBackInInsuranceForm = () => {
		this.setStep(2)
	}
	handleGoBackInContactForm = () => {
		this.setStep(1)
	}
	handleOnSubmitGeneralInfoForm = () => {
		this.setStep(2)
	}
	handleOnSubmitInsuranceForm = () => {
		this.setStep(4)
	}

	render() {
		const {steps, currentStep} = this.state;
		const {bluedoorCustomer, socialFirstName, socialLastName, email, isSocialLogin} = this.props;
		const {firstName, lastName, birthDate, prefix} = this.props.generalInfoFormValues || {};
		const initialTelephoneValues = this.initialTelephoneValues();
		let initialValues = {};
		if (bluedoorCustomer && isSocialLogin) {
			initialValues = {
				prefix: bluedoorCustomer?.prefix,
				firstName: bluedoorCustomer?.firstname,
				lastName: bluedoorCustomer?.lastname,
				birthDate: this.bluedoorDateFormat(),
				email,
				kvnr: bluedoorCustomer?.health_insurance_number,
				healthInsurance: {
					label: bluedoorCustomer?.payer_institution_name,
					value: {
						name: bluedoorCustomer.payer_institution_name,
						insuranceID:this.getSickfund(bluedoorCustomer?.payer_institution_name)?.leadIKNumber,
						isSpecial: this.getSickfund(bluedoorCustomer?.payer_institution_name)?.isSpecialSickFund
					}
				}
			};
		} else if (bluedoorCustomer) {
			initialValues = {
				prefix: bluedoorCustomer?.prefix,
				firstName: bluedoorCustomer?.firstname,
				lastName: bluedoorCustomer?.lastname,
				birthDate: this.bluedoorDateFormat(),
				kvnr: bluedoorCustomer?.health_insurance_number,
				healthInsurance: {
					label: bluedoorCustomer?.payer_institution_name,
					value: {
						name: bluedoorCustomer?.payer_institution_name,
						insuranceID:this.getSickfund(bluedoorCustomer?.payer_institution_name)?.leadIKNumber,
						isSpecial: this.getSickfund(bluedoorCustomer?.payer_institution_name)?.isSpecialSickFund
					}
				}
			};
		} else if (isSocialLogin) {
			initialValues = {
				firstName: socialFirstName,
				lastName: socialLastName,
				email,
				birthDate,
				prefix
			};
		} else {
			initialValues = {
				firstName,
				lastName,
				birthDate,
				prefix
			};
		}

		return (
			<>
			<if condition={!this.hideRegistration()}>
				<Container className={'mt-5'}>
					<ProgressBar steps={steps} currentStep={currentStep} />
				</Container>
				{currentStep === 1 &&
					<GeneralInfoForm {...this.props} isAccountType={bluedoorCustomer?.account_type === 2} onSubmit={this.handleOnSubmitGeneralInfoForm} initialValues={initialValues} bluedoorOnloadCall={this.blueDoorCallAfterLoad}/>}
				{currentStep === 2 &&
					<ContactInfoForm {...this.props} onSubmit={this.checkAddress} initialValues={initialTelephoneValues}
						handleGoBack={this.handleGoBackInContactForm} />}
				{currentStep === 3 &&
					<InsuranceInfoForm {...this.props} isAccountType={bluedoorCustomer?.account_type === 2} initialValues={initialValues} onSubmit={this.handleOnSubmitInsuranceForm}
						handleGoBack={this.handleGoBackInInsuranceForm} />}
				{currentStep === 4 &&
					<AccountInfoForm {...this.props} onSubmit={this.sendForm} initialValues={initialValues}
						handleGoBack={this.clearErrorsAndReturn} />}
			</if>
			</>
		);
	}
});
