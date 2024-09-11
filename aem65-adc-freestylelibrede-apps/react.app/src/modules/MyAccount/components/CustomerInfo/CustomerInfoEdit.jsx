import React, {Component} from 'react';
import {connect} from 'react-redux';
import {i18nLabels} from '../../../../utils/translationUtils';
import I18n from '../../../Translation/components/I18n';
import {Form, reduxForm} from 'redux-form';
import SalutationField from '../../../Form/components/FormFields/SalutationField';
import Row from '../../../Generic/components/Container/Row';
import Col from '../../../Generic/components/Container/Col';
import FirstNameField from '../../../Form/components/FormFields/FirstNameField';
import LastNameField from '../../../Form/components/FormFields/LastNameField';
import BirthDateField from '../../../Form/components/FormFields/BirthDateField';
import PhoneField from '../../../Form/components/FormFields/PhoneField';
import RequiredFieldsDisclaimer from '../../../Form/components/RequiredFieldsDisclaimer';
import {updateCustomerRequest, customerMobileUpdateRequest} from '../../redux/actions/customer.action';
import PropTypes from 'prop-types';
import Button, {BUTTON_OPTIONS} from '../../../Generic/components/Button/Button';
import {empty} from '../../../../utils/default';
import MobilePhoneField from '../../../Form/components/FormFields/MobilePhoneField';
import {getNumberFromString} from '../../../../utils/formUtils.js';
import validate from '../../../Form/utils/phoneNumberValidation';
import {mobilePhone, required} from '../../../Form/utils/validationRules';
import {openModalAction} from '../../../Modal/redux/actions/index';
import {measurementOptions} from '../../../../utils/measureOptions';
import RadioButtonReduxField from '../../../Form/components/GenericFields/RadioButtonReduxField';
import {DEFAULT_COUNTRY_OPTIONS, BOOLEAN_STRING,MOBILE_AND_LANDLINE_NUMBER_MAXLENGTH,} from '../../../../utils/enums';
import { setLandlineNumber, setMobileNumber } from '../../myAccountUtils';
const LS = window.localStorage;

const mapStateToProps = state => {
	const {customer, loading: isLoading, error} = state.myAccountModuleReducer.GetCustomerReducer;
	const {values: updatedCustomer} = state.form.customerEditForm || empty.object;
	const initialValues = {
		...customer
	};
	return {initialValues, updatedCustomer, isLoading, error, customer};
};

const mapDispatchToProps = {
	updateCustomer: updateCustomerRequest,
	openModalAction,
	customerMobileUpdateRequest
};


class CustomerInfoEdit extends Component {

	static propTypes = {
		cancelEditCustomerInfo: PropTypes.func,
		updateCustomer: PropTypes.func,
		isLoading: PropTypes.bool,
		error: PropTypes.string,
		updatedCustomer: PropTypes.object,
		customer: PropTypes.object,
		initialValues: PropTypes.object,
		customerMobileUpdateRequest: PropTypes.func
	};

	componentDidUpdate(prevProps) {
		if (this.propsDidChange(prevProps)) {
			this.props.cancelEditCustomerInfo();
		}
	}

	propsDidChange(prevProps) {
		return prevProps.isLoading === true && this.props.isLoading === false && !this.props.error;
	}

	submit = () => {
		const {updatedCustomer, initialValues, customerMobileUpdateRequest, updateCustomer} = this.props;
		const updatedMobile = setMobileNumber(updatedCustomer?.mobile_phone);
		const updatedLandline = setLandlineNumber(updatedCustomer.landline_phone);
		const prevMobile = initialValues?.mobile_phone;
		const deNumber = updatedMobile?.split(' ')[0];
		const prevTempMobile =  initialValues?.temporary_mobile_number;
		let mobileNumber, tempMobileNumber;
		if(deNumber == '') {
			// empty mobile num provided -> both fields should be empty
			mobileNumber = '';
			tempMobileNumber = '';
		} else if(deNumber != DEFAULT_COUNTRY_OPTIONS[0].mobile_code) {
			// non german num provided -> update mobile_phone with new num and temporary_mobile_number should be empty
			mobileNumber = updatedMobile;
			tempMobileNumber = '';
		} else if (deNumber == DEFAULT_COUNTRY_OPTIONS[0].mobile_code) {
			// german num provided -> if customer has a mobile num already, update new num in temporary_mobile_number field, else update new num in mobile_phone field
			mobileNumber = !prevMobile ? updatedMobile : prevMobile;
			tempMobileNumber = prevMobile ? updatedMobile: prevTempMobile;
		}
		const updatedCustomerValues = {
			...updatedCustomer,
			mobile_phone: mobileNumber,
			temporary_mobile_number: tempMobileNumber,
			landline_phone: updatedLandline,
			product_preference :  updatedCustomer?.product_preference?.value == undefined ? initialValues?.product_preference : updatedCustomer?.product_preference?.value 
		};
		if(prevMobile != updatedMobile && prevTempMobile != updatedMobile){
			LS.setItem('otpModal', BOOLEAN_STRING.TRUE);
		}	
		updateCustomer(updatedCustomerValues);
		customerMobileUpdateRequest(true);
	};


	render() {
		const {cancelEditCustomerInfo, handleSubmit, customer} = this.props;
		const landlineNumber = customer?.landline_phone && getNumberFromString(customer?.landline_phone);
		const mobileNumber = customer?.temporary_mobile_number ? getNumberFromString(customer?.temporary_mobile_number) : getNumberFromString(customer?.mobile_phone);
		return <Form onSubmit={handleSubmit(this.submit)}>
			<SalutationField />
			<Row>
				<Col md={6}>
					<FirstNameField name={'firstname'} />
				</Col>
				<Col md={6}>
					<LastNameField name={'lastname'} />
				</Col>
			</Row>
			<BirthDateField name={'dob'} />
			<PhoneField defaultValue={landlineNumber ? landlineNumber.nationalNumber : ''} defaultCountry={landlineNumber ? landlineNumber.countryCode : DEFAULT_COUNTRY_OPTIONS[0].country_code} defaultMaxLength={MOBILE_AND_LANDLINE_NUMBER_MAXLENGTH}/>
			<MobilePhoneField validationRule={[mobilePhone]} defaultValue={mobileNumber ? mobileNumber.nationalNumber : ''} defaultCountry={mobileNumber ? mobileNumber.countryCode : DEFAULT_COUNTRY_OPTIONS[0].country_code} defaultMaxLength={MOBILE_AND_LANDLINE_NUMBER_MAXLENGTH}/>
			<div className="adc-form-group">
				<label className="adc-form-group__label mt-0">
					<I18n text={'unit_of_measurement_label'} suffix={':'} />
				</label>
				<div className="btn-group adc-form-group__input-radio-group">
					<RadioButtonReduxField
						name='measurement'
						options={measurementOptions}
						validationRules={[required]} />
				</div>
			</div>
			
			<RequiredFieldsDisclaimer />
			<Row className="pb-3">
				<Col md={6} className="mb-3 mb-md-0">
					<Button
						label={i18nLabels.CANCEL_CTA}
						ctaStyle={BUTTON_OPTIONS.STYLE.SECONDARY}
						action={cancelEditCustomerInfo}
						isFullWidth
						hasNoMargin
					/>
				</Col>
				<Col md={6}>
					<Button
						label={i18nLabels.SAVE_CTA}
						ctaStyle={BUTTON_OPTIONS.STYLE.PRIMARY}
						type={BUTTON_OPTIONS.TYPE.SUBMIT}
						isFullWidth
						hasNoMargin
					/>
				</Col>
			</Row>
		</Form>;
	}
}

CustomerInfoEdit = reduxForm({
	form: 'customerEditForm',
	enableReinitialize: true,
	validate
})(CustomerInfoEdit);

CustomerInfoEdit = connect(
	mapStateToProps,
	mapDispatchToProps
)(CustomerInfoEdit);

export default CustomerInfoEdit;

