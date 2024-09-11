import React, {Component} from 'react';
import {connect} from 'react-redux';
import CustomerInfoDisplay from './CustomerInfoDisplay';
import {Card, CardContent} from '../../../Generic/components/Card/Card';
import CustomerInfoEdit from './CustomerInfoEdit';
import DeactivateAccount from './DeactivateAccount';
import PropTypes from 'prop-types';
import {openModalAction, closeModalAction} from '../../../Modal/redux/actions/index';
import {updateCustomerRequest, customerMobileUpdateRequest} from '../../redux/actions/customer.action';
import {BOOLEAN_STRING,DEFAULT_COUNTRY_OPTIONS} from '../../../../utils/enums';
import { completedTrainingStatus } from '../../../../utils/technicalTrainingUtils';
import { updateOtpModalFlag } from '../../myAccountUtils';
import { logOutRequest } from '../../../Authentication/redux/actions/login.action';
const LS = window.localStorage;
const SS = window.sessionStorage;

const mapStateToProps = state => {
	const {customer, temporary_mobile_number, error, isMobileChanged} = state.myAccountModuleReducer.GetCustomerReducer;
	return {customer, temporary_mobile_number, error, isMobileChanged};
};
const mapDispatchToProps = {
	openModalAction,
	closeModalAction,
	updateCustomer: updateCustomerRequest,
	customerMobileUpdateRequest,
	signOut: logOutRequest,
};
export default connect(mapStateToProps, mapDispatchToProps)(class CustomerInfo extends Component {
	static propTypes = {
		deactivateHeading: PropTypes.string,
		heading: PropTypes.string,
		error: PropTypes.string,
		isMobileChanged: PropTypes.bool,
		customer: PropTypes.object,
		deactivateDescription: PropTypes.string,
		openModalAction: PropTypes.func,
		closeModalAction: PropTypes.func,
		updateCustomer : PropTypes.func,
		customerMobileUpdateRequest : PropTypes.func,
		enableTechnicalTrainingPopUp: PropTypes.bool,
  		technicalTrainingPopUpHeading: PropTypes.string,
  		technicalTrainingPopUpMessage: PropTypes.string,
		cta: PropTypes.object,
		deactivateRedirect: PropTypes.string,
	};
	state = {
		editing: false,
		modalOpen: true,
		dataConsentModal: true
	};

	isMobileNumberVerified = (tempMobileNumber, mobileNumber, customer) => {
		let showVerifyMobileLink;
		if(tempMobileNumber) showVerifyMobileLink = true;
		else if(!tempMobileNumber && mobileNumber && mobileNumber?.split(' ')[0] == DEFAULT_COUNTRY_OPTIONS[0].mobile_code) showVerifyMobileLink = !customer?.is_mobile_verified;
		return showVerifyMobileLink;
	}

	componentDidUpdate(){
		const {customer, openModalAction, updateCustomer, enableTechnicalTrainingPopUp, technicalTrainingPopUpHeading, technicalTrainingPopUpMessage, cta, deactivateRedirect} = this.props;
		const tempMobileNumber = customer?.temporary_mobile_number;
		const mobileNumber = customer?.mobile_phone;
		if(!customer.data_processing && SS.getItem('dataConsentModal') == BOOLEAN_STRING.TRUE && this.state.dataConsentModal) {
			openModalAction({
				contentID: 'dataProcessingConsentModal',
				canModalClose: false,
				props: {
					logoutPageRedirect: deactivateRedirect,
					isModalOpen: this.handleDataConsentModal
				}
			})
		}
		if(this.isMobileNumberVerified(tempMobileNumber, mobileNumber, customer) && !this.state.editing && LS.getItem('otpModal') == BOOLEAN_STRING.TRUE && (SS.getItem('dataConsentModal') == BOOLEAN_STRING.FALSE || !SS.getItem('dataConsentModal'))){
			openModalAction({
				contentID: 'otpResponseModal',
				props: {
					tempMobileNumber:  customer.temporary_mobile_number || customer.mobile_phone,
					isModalOpen: this.handleNextModal
				}
			});
		} else if (!customer.mobile_phone && !customer.temporary_mobile_number && !customer.disable_mobile_popup && !this.state.editing && LS.getItem('otpModal') == BOOLEAN_STRING.TRUE && (SS.getItem('dataConsentModal') == BOOLEAN_STRING.FALSE || !SS.getItem('dataConsentModal'))){
			const updatedCustomerValues = {
				...customer,
				mobile_reminder: true
			};
			updateCustomer(updatedCustomerValues);
			openModalAction({
				contentID: 'mobileUpdateModal',
				props: {
					isModalOpen: this.handleNextModal
				}
			});
		} else if((SS.getItem('dataConsentModal') == BOOLEAN_STRING.FALSE || !SS.getItem('dataConsentModal')) && !this.state.editing) {
			updateOtpModalFlag();
		}
		if(customer?.technical_instructions?.filter(value => value.tech_training_reminder_popup === true).length > 0 && customer.payer_number && customer.payer_number !== null && customer.health_insurance_number && customer.health_insurance_number !== null && SS.getItem('techTrainingPopup') === BOOLEAN_STRING.TRUE && LS.getItem('otpModal') === BOOLEAN_STRING.FALSE && enableTechnicalTrainingPopUp && (SS.getItem('dataConsentModal') == BOOLEAN_STRING.FALSE || !SS.getItem('dataConsentModal'))) {
			openModalAction({
				contentID: 'popupConfirmTechnicalTraining',
				canModalClose: false,
				props: {
					technicalTrainingPopUpHeading,
					technicalTrainingPopUpMessage,
					cta
				}
			})
		}
	}
	
	handleNextModal = () => {
		this.setState({editing: false});
	}
	handleDataConsentModal = () => {
		this.setState({dataConsentModal: false});
	}
	editCustomerInfo=(isEditing)=>{
		this.setState({
			editing: isEditing
		});
		if(!isEditing) {
			this.props.closeModalAction();
		}
	}

	deactivateAccount = () => {
		this.setState({
			deactivating: true
		});
	};

	verifyMobile =()=>{
		LS.setItem('otpModal', BOOLEAN_STRING.TRUE);
		this.setState({
			editing: false
		});
	}
	cancelDeactivateAccount = () => {
		this.setState({
			deactivating: false
		});
	};

	getTitle = () => {
		return this.state.deactivating ? this.props.deactivateHeading : this.props.heading;
	};

	render() {
		const {customer, deactivateDescription, error, isMobileChanged, customerMobileUpdateRequest} = this.props;
		return <div className="adc-customer-info">
			<Card title={this.getTitle()}>
				<CardContent>
					<if condition={this.state.editing}>
						<if condition={this.state.deactivating}>
							<DeactivateAccount deactivateDescription={deactivateDescription}
											   cancelDeactivateAccount={this.cancelDeactivateAccount}/>
						</if>
						<else>
							<CustomerInfoEdit cancelEditCustomerInfo={()=>this.editCustomerInfo(false)}
											  deactivateAccount={this.deactivateAccount}/>
						</else>
					</if>
					<else>
						<CustomerInfoDisplay
							editCustomerInfo={()=>this.editCustomerInfo(true)}
							customer={customer}
							customerMobileUpdateRequest={customerMobileUpdateRequest}
							isMobileChanged={isMobileChanged}
							error={error}
							verifyMobile={this.verifyMobile}/>
					</else>
				</CardContent>
			</Card>
		</div>;
	}
});