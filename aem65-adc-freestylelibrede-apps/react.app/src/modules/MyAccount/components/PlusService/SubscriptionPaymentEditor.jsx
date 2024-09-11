import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {i18nLabels} from '../../../../utils/translationUtils';
import {empty} from '../../../../utils/default';
import {verifyAddressRequest} from '../../../Address/redux/actions/verify_address.actions';
import AddressEdit from './AddressEdit';
import {reduxForm} from 'redux-form';
import Row from '../../../Generic/components/Container/Row';
import Col from '../../../Generic/components/Container/Col';
import Button, {BUTTON_OPTIONS} from '../../../Generic/components/Button/Button';
import I18n from '../../../Translation/components/I18n';
import {splitAddressAndNumber} from '../../../../utils/regexUtils';
import {ADDRESS_CHECK_ERROR, ADDRESS_CHECK_SUCCESS} from '../../../Address/api/addressVerification.api';
import {updatePlusServicePaymentRequest} from '../../redux/actions/orders.action';
import {Card, CardContent} from '../../../Generic/components/Card/Card';

const mapStateToProps = state => {
	const {customer} = state.myAccountModuleReducer.GetCustomerReducer;
	const {values: formValues} = state.form.editSubscriptionPaymentForm || empty.object;
	const {verificationStatus, address: verifiedAddress} = state.addressModuleReducer.AddressReducer.addresses.plus_service;
	return {customer, formValues, verificationStatus, verifiedAddress};
};

const mapDispatchToProps = {
	verifyAddressRequest,
	updatePlusServicePayment: updatePlusServicePaymentRequest
};

export default reduxForm({
	form: 'editSubscriptionPaymentForm',
	destroyOnUnmount: false,
	enableReinitialize: true
})(connect(mapStateToProps, mapDispatchToProps)(class SubscriptionEditor extends Component {
	static propTypes = {
		close: PropTypes.func,
		customer: PropTypes.object,
		updatePlusServicePayment: PropTypes.func,
		verificationStatus: PropTypes.string,
		verifiedAddress: PropTypes.shape({}),
		verifyAddressRequest: PropTypes.func
	};

	componentDidUpdate(prevProps) {
		const {verificationStatus, close} = this.props;
		if (this.propsDidChange(prevProps)) {
			if (verificationStatus !== prevProps.verificationStatus && verificationStatus === ADDRESS_CHECK_SUCCESS) {
				this.submitForm();
				close();
			} else if (verificationStatus === ADDRESS_CHECK_ERROR) {
				//TODO
			}
		}
	}

	propsDidChange(prevProps) {
		return this.props.verificationStatus !== prevProps.verificationStatus;
	}

	checkAddress = () => {
		const {street, postcode, city, firstname, lastname, prefix,country_name, verifyAddressRequest} = this.props.formValues;
		const {customer} = this.props;
		if (customer) {
			const {dob: birthDate, email} = customer;
			const birthdayValues = birthDate.split('.');
			const birthDay = `${birthdayValues[2]}-${birthdayValues[1]}-${birthdayValues[0]}`;
			const streetAndNumber = splitAddressAndNumber(street);

			//Verify address before sending the form
			verifyAddressRequest({
				address: {
					street: streetAndNumber.street,
					streetNumber: streetAndNumber.streetNumber,
					zipcode: postcode,
					city: city,
					country: country_name.value
				},
				user: {
					lastName: lastname,
					firstName: firstname,
					birthday: birthDay,
					email: email,
					salutation: prefix
				},
				section: 'plus_service'
			});
		}
	};

	submitForm = () => {
		const {formValues, verifiedAddress, updatePlusServicePayment} = this.props;
		updatePlusServicePayment({
			prefix: formValues?.prefix,
			firstname: formValues?.firstname,
			lastname: formValues?.lastname,
			address: verifiedAddress
		});
	};

	render() {
		const {close, handleSubmit} = this.props;

		return (
			<form onSubmit={handleSubmit(this.checkAddress)}>
				<Card title={i18nLabels.ADD_A_NEW_PAYMENT_METHOD}>
					<CardContent>
						<div className="row">
							<div className="col-12 col-lg">
								<h6 className="mt-4"><I18n text={i18nLabels.PLEASE_ENTER_ALTERNATIVE_PAYMENT_METHOD}
														   suffix={':'}/></h6>
								<p>{'Payment component is being updated, we will therefore implement this part of the designs once that has been completed.'}</p>
							</div>
							<div className="col-12 col-lg offset-lg-1">
								<h6 className="mt-4"><I18n text={i18nLabels.PLEASE_ENTER_BILLING_ADDRESS} suffix={':'}/>
								</h6>
								<AddressEdit/>
							</div>
							<div className="col-12 mt-3">
								<Row className='mt-5 justify-content-center'>
									<Col md={6} lg={4}>
										<Button
											type={BUTTON_OPTIONS.TYPE.BUTTON} label={i18nLabels.CANCEL_CTA} isFullWidth
											ctaStyle={BUTTON_OPTIONS.STYLE.SECONDARY} hasNoMargin action={close}/>
									</Col>
									<Col md={6} lg={4}>
										<Button
											type={BUTTON_OPTIONS.TYPE.SUBMIT} label={i18nLabels.SAVE_CTA} isFullWidth
											ctaStyle={BUTTON_OPTIONS.STYLE.PRIMARY} hasNoMargin className={'mb-3'}
											isDisabled={close}/>
									</Col>
								</Row>
							</div>
						</div>
					</CardContent>
				</Card>
			</form>
		);
	}
}));