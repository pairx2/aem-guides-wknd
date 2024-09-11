import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Form, reduxForm} from 'redux-form';
import PropTypes from 'prop-types';
import I18n from '../../../Translation/components/I18n';
import {i18nLabels} from '../../../../utils/translationUtils';
import Icon from '../../../Generic/components/Icon/Icon';
import MobilePhoneField from '../../../Form/components/FormFields/MobilePhoneField';
import {mobilePhone, required} from '../../../Form/utils/validationRules';
import {updateCustomerRequest, customerMobileUpdateRequest} from '../../redux/actions/customer.action';
import Button, {BUTTON_OPTIONS} from '../../../Generic/components/Button/Button';
import {openModalAction, closeModalAction} from '../../../Modal/redux/actions/index';
import {DEFAULT_COUNTRY_OPTIONS, TAB_NAMES} from '../../../../utils/enums';
import { updateOtpModalFlag } from '../../myAccountUtils';

const mapStateToProps = state => {
	const {customer} = state.myAccountModuleReducer.GetCustomerReducer;
	const initialValues = {
		...customer
	};
	return {initialValues};
};
const mapDispatchToProps = {
	updateCustomer: updateCustomerRequest,
	closeModal: closeModalAction,
	openModalAction,
	customerMobileUpdateRequest
};
class MobileUpdateModal extends Component {
	static propTypes = {
		closeModal: PropTypes.func,
		openModalAction: PropTypes.func,
		errorCode: PropTypes.number,
		initialValues: PropTypes.object,
		updateCustomer: PropTypes.func,
		customerMobileUpdateRequest: PropTypes.func,
		isModalOpen: PropTypes.func
	};
	state={
		isErrorMessageToShow: false
	}

	componentDidMount() {
		this.ref = React.createRef();
		this.handleClickOutside =  this.handleClickOutside.bind(this);
	  	document.addEventListener('click', this.handleClickOutside, true);
	}
  
	componentWillUnmount() {
	  document.removeEventListener('click', this.handleClickOutside, true);
	}

	handleClickOutside(event) {
		if (this.ref.current && !this.ref.current.contains(event.target)) {
			updateOtpModalFlag();
			this.props.isModalOpen();
		}
	  }

	submit = (values) => {
		const {initialValues, customerMobileUpdateRequest, updateCustomer, closeModal, openModalAction, isModalOpen}=this.props;
		const updatedMobile = values.mobile_phone?.[1] ? `+${values?.mobile_phone?.[2]?.dialCode} ${values?.mobile_phone?.[1]}` : '';
		const deNumber = updatedMobile?.split(' ')[0];
		const prevMobile = initialValues?.mobile_phone;
		const prevTempMobile =  initialValues?.temporary_mobile_number;
		let mobileNumber, tempMobileNumber;
		if(deNumber == '') {
			// empty mobile num provided -> both fields should be empty
			mobileNumber = '';
			tempMobileNumber = '';
		} else if(deNumber != DEFAULT_COUNTRY_OPTIONS[0].mobile_code) {
			// non german num provided, update mobile_phone with new num and temporary_mobile_number should be empty
			mobileNumber = updatedMobile;
			tempMobileNumber = '';
		} else if (deNumber == DEFAULT_COUNTRY_OPTIONS[0].mobile_code) {
			// german num provided -> if customer has a mobile num already, update new num in temporary_mobile_number field, else update new num in mobile_phone field
			mobileNumber = !prevMobile ? updatedMobile : prevMobile;
			tempMobileNumber = prevMobile ? updatedMobile: prevTempMobile;
		}
		const updatedCustomerValues = {
			...initialValues,
			mobile_phone: mobileNumber,
			temporary_mobile_number: tempMobileNumber
		};
		updateCustomer(updatedCustomerValues);
		customerMobileUpdateRequest(true);
		closeModal();
		isModalOpen();
		updateOtpModalFlag();
		if(prevMobile !== mobileNumber && window.location.hash !== TAB_NAMES.DATA_AND_SETTINGS) {
			window.location.hash = `#${TAB_NAMES.DATA_AND_SETTINGS}`;
		}
		if(deNumber == DEFAULT_COUNTRY_OPTIONS[0].mobile_code){
			setTimeout(() => openModalAction({
				contentID: 'otpResponseModal',
				props: {
					tempMobileNumber: updatedMobile,
					isModalOpen: isModalOpen
				}
			}), 2000);
		}
	};

	modalCloseHandler = () =>{
		const { closeModal, isModalOpen } = this.props;
		closeModal();
		isModalOpen();
		updateOtpModalFlag();
	}

	render() {
		const {errorCode, handleSubmit} = this.props;
		const {isErrorMessageToShow}=this.state;
		return <Form onSubmit={handleSubmit(this.submit)}>
		 <div className="adc-modal-delete" ref={this.ref}>
				<h4 className="adc-modal-delete__heading text-left">
					<I18n
						text={i18nLabels.MOBILE_REGISTERATION_TITLE}
					/>
				</h4>
				<div className="row mt-3">
					<div className="col-12 text-center mb-3 col-md-1">
						<Icon
							image={'large-danger'}
							size={'large'}
						/>
					</div>
					<div className="col-12 col-md-11 text-left">
						<I18n text={i18nLabels.REGISTER_YOUR_MOBILE_MSG}/>
						<MobilePhoneField validationRules={[mobilePhone, required]}  name={'mobile_phone'}/>
						<if condition={errorCode && isErrorMessageToShow}>
							<h4>
								<span className="adc-form-group--error mt-3">
									<I18n text={'magento_error_code_' + errorCode}/>
								</span>
							</h4>
						</if>
					</div>
				</div>
				<div className="row mt-4">
					<div className="col-12 col-lg-8 offset-lg-1">
						<div className="row">
							<div className="col-12 col-md-6">
								<Button
									action={this.modalCloseHandler}
									ctaStyle={BUTTON_OPTIONS.STYLE.SECONDARY}
									className={'px-0 close-modal'}
									isFullWidth
									hasNoMargin
									label={'cancel_cta'}
								/>
							</div>
							<div className="col-12 col-md-6 mt-3 mt-md-0">
								<Button
									label={'otp_verify_text'}
									ctaStyle={BUTTON_OPTIONS.STYLE.PRIMARY}
									type={BUTTON_OPTIONS.TYPE.SUBMIT}
									className={'px-0'}
									hasNoMargin
									isFullWidth
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Form>;
	}
}

MobileUpdateModal = reduxForm({
	form: 'mobileUpdateForm'
})(MobileUpdateModal);


MobileUpdateModal = connect(
	mapStateToProps,
	mapDispatchToProps
)(MobileUpdateModal);

export default MobileUpdateModal;