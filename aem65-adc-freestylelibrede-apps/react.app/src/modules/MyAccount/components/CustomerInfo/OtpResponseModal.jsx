import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Form, reduxForm} from 'redux-form';
import PropTypes from 'prop-types';
import I18n from '../../../Translation/components/I18n';
import {i18nLabels} from '../../../../utils/translationUtils';
import Icon from '../../../Generic/components/Icon/Icon';
import {getCustomerRequest} from '../../redux/actions/customer.action';
import {otpConfirmRequest, otpResendRequest} from '../../redux/actions/otp_confirm_request.action';
import {closeModalAction} from '../../../Modal/redux/actions';
import Button, {BUTTON_OPTIONS} from '../../../Generic/components/Button/Button';
import {empty} from '../../../../utils/default';
import OtpTextField from '../../../Form/components/FormFields/OtpTextField';
import Link from '../../../Generic/components/Link/Link';
import {TAB_NAMES} from '../../../../utils/enums';
import { updateOtpModalFlag } from '../../myAccountUtils';


const mapStateToProps = state => {
	const {errorCode, isMobileVerified, isResendRequest, isRequestSent} = state.myAccountModuleReducer.OtpConfirmRequestReducer;
	const {temporary_mobile_number, customer:{otp_lock_period, otp_invalid_attempts}} = state.myAccountModuleReducer.GetCustomerReducer;
	const {values} = state.form.otpResponseForm || empty.object;
	return {errorCode, isMobileVerified, temporary_mobile_number, values, isResendRequest, isRequestSent, otp_lock_period, otp_invalid_attempts};
};
const mapDispatchToProps = {
	otpRequest: otpConfirmRequest,
	getCustomer: getCustomerRequest,
	otpResend: otpResendRequest,
	closeModal: closeModalAction
};
class OtpResponseModal extends Component {
	static propTypes = {
		closeModal: PropTypes.func,
		getCustomer: PropTypes.func,
		tempMobileNumber:PropTypes.string,
		temporary_mobile_number: PropTypes.string,
		otpRequest: PropTypes.func,
		otpResend : PropTypes.func,
		errorCode: PropTypes.number,
		isMobileVerified: PropTypes.bool,
		isResendRequest:  PropTypes.bool,
		isRequestSent: PropTypes.bool,
		otp_lock_period: PropTypes.string,
		otp_invalid_attempts: PropTypes.string,
		isModalOpen: PropTypes.func
	};
	state={
		isVertifyState: true,
		isErrorMessageToShow: false,
		isShowOtpResendMessage: false
	}
	componentDidUpdate() {
		const {isMobileVerified, temporary_mobile_number, getCustomer, closeModal} = this.props;
		const {isVertifyState} = this.state;
		if (isMobileVerified && isVertifyState){
			this.setState({isVertifyState: false});
			getCustomer();
			window.location.hash = `#${TAB_NAMES.DATA_AND_SETTINGS}`;
			closeModal();
			updateOtpModalFlag();
		}
		 else if (isMobileVerified && !temporary_mobile_number){
			closeModal();
			updateOtpModalFlag();
		}
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
		this.props.otpRequest(values.otpText);
		this.setState({isErrorMessageToShow: true, isShowOtpResendMessage: false});
	};
	resendOTP = () => {
		this.setState({isErrorMessageToShow: false, isShowOtpResendMessage: true});
		this.props.otpResend();
	}

	modalCloseHandler = () =>{
		const { closeModal, isModalOpen } = this.props;
		closeModal();
		isModalOpen();
		updateOtpModalFlag();
	}

	render() {
		const {errorCode, handleSubmit, tempMobileNumber, isResendRequest, isRequestSent, otp_lock_period, otp_invalid_attempts} = this.props;
		const {isErrorMessageToShow, isShowOtpResendMessage}=this.state;
		return <Form onSubmit={handleSubmit(this.submit)}>
		 <div className="adc-modal-delete" ref={this.ref}>
				<h4 className="adc-modal-delete__heading text-left">
					<I18n
						text={i18nLabels.OTP_VERIFY_MOBILE_NUMBER}
					/>
				</h4>
				<div className="row mt-3">
					<div className="col-12 col-md-1 text-center">
						<Icon
							image={'large-danger'}
							size={'large'}
						/>
					</div>
					<div className="col-12 col-md-11 text-left">
						<I18n text={i18nLabels.OTP_ENTER_OTP_NUMBER_MESSAGE}params={[tempMobileNumber]}/>
						<OtpTextField name={'otpText'} />
						<if condition={errorCode && isErrorMessageToShow}>
							<h4>
								<if condition={errorCode}>
									<span className="adc-form-group--error mt-3">
										<I18n text={'magento_error_code_' + errorCode} params={[otp_lock_period, otp_invalid_attempts]}/>
									</span>
								</if>
							</h4>
						</if>
						<if condition={isResendRequest && isShowOtpResendMessage}>
							<h4>
								<if condition={isRequestSent}>
									<span className="adc-form-group--error text-success mt-3">
										<I18n text={i18nLabels.OTP_RESEND_SUCCESS}/>
									</span>
								</if>
								<elseif condition={!isRequestSent && errorCode }>
									<span className="adc-form-group--error mt-3">
										<I18n text={'magento_error_code_' + errorCode} params={[otp_lock_period, otp_invalid_attempts]}/>
									</span>
								</elseif>
							</h4>
						</if>
						<div>
							<Link className={'mb-3'} label={i18nLabels.OTP_RESEND_TXT} action={() => this.resendOTP()}/>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-12 col-lg-8 offset-lg-1">
						<div className="row">
							<div className="col-12 col-md-6 mb-3 mb-md-0 pr-md-0">
								<Button
									action={this.modalCloseHandler}
									ctaStyle={BUTTON_OPTIONS.STYLE.SECONDARY}
									className={'close-modal full-width'}
									isFullWidth
									hasNoMargin
									label={'cancel_cta'}
								/>
							</div>
							<div className="col-12 col-md-6">
								<Button
									label={'otp_verify_text'}
									ctaStyle={BUTTON_OPTIONS.STYLE.PRIMARY}
									type={BUTTON_OPTIONS.TYPE.SUBMIT}
									className={'full-width'}
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


OtpResponseModal = reduxForm({
	form: 'otpResponseForm',
	enableReinitialize: true,
})(OtpResponseModal);


OtpResponseModal = connect(
	mapStateToProps,
	mapDispatchToProps
)(OtpResponseModal);

export default OtpResponseModal;