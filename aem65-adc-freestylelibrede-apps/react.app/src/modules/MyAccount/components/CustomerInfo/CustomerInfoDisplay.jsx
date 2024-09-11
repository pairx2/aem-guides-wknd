import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {i18nLabels} from '../../../../utils/translationUtils';
import Link from '../../../Generic/components/Link/Link';
import I18n from '../../../Translation/components/I18n';
import Row from '../../../Generic/components/Container/Row';
import Col from '../../../Generic/components/Container/Col';
import MessageBanner from '../../../Generic/components/MessageBanner/MessageBanner';
import {MEASUREMENT_OPTIONS, DEFAULT_COUNTRY_OPTIONS,PRODUCT_PREFERENCE_OPTIONS} from '../../../../utils/enums';
import {USER_PREFIX} from '../../../../utils/enums';

const mapStateToProps = state => {
	const {isMobileVerified} = state.myAccountModuleReducer.OtpConfirmRequestReducer;
	return {isMobileVerified};
};

const CustomerInfoDisplay = ({editCustomerInfo, isMobileVerified, verifyMobile, customer, error, isMobileChanged, customerMobileUpdateRequest}) => {
	let showVerifyMobileLink;
	const tempMobileNumber = customer?.temporary_mobile_number;
	const mobileNumber = customer?.mobile_phone;
	const productPreference = customer?.product_preference;
	if(tempMobileNumber) showVerifyMobileLink = true;
	else if(!tempMobileNumber && mobileNumber && mobileNumber?.split(' ')[0] == DEFAULT_COUNTRY_OPTIONS[0].mobile_code) showVerifyMobileLink = !customer?.is_mobile_verified;
	return (
		<Row className="mt-3">
			<if condition={isMobileVerified}>
				<MessageBanner className={'mb-5'} icon={MessageBanner.ICON.SUCCESS} color={MessageBanner.COLOR.GREEN} description={i18nLabels.OTP_VERIFIED_SUCCESSFULLY} canClose />
			</if>
			<if condition={isMobileChanged}>
				<if condition={!error}>
					<MessageBanner className={'mb-5'} icon={MessageBanner.ICON.SUCCESS} color={MessageBanner.COLOR.GREEN} description={i18nLabels.CUSTOMER_UPDATE_SUCCESS} canClose onCloseAction={()=> customerMobileUpdateRequest(false)}/>
				</if>
				<else >
					<MessageBanner className={'mb-5'} icon={MessageBanner.ICON.FAILURE} color={MessageBanner.COLOR.RED} description={i18nLabels.CUSTOMER_UPDATE_FAILURE} canClose onCloseAction={()=> customerMobileUpdateRequest(false)}/>
				</else>
			</if>

			<Col width={6} className="font-weight-600 mt-1">
				<I18n text={i18nLabels.NAME_LABEL} suffix={':'} />
			</Col>
			<Col width={6} className="mt-1 mb-1">
				{(customer?.prefix?.toLowerCase() !== USER_PREFIX.DIVERS && customer?.prefix !== USER_PREFIX.HYPHEN)&& customer?.prefix} {customer.firstname} {customer.lastname}
			</Col>

			<Col width={6} className="font-weight-600 mt-1">
				<I18n text={i18nLabels.BIRTHDATE_LABEL} suffix={':'} />
			</Col>
			<Col width={6} className="mt-1 mb-1">
				{customer.dob}
			</Col>

			<Col width={6} className="font-weight-600 mt-1">
				<I18n text={i18nLabels.PHONE_LABEL} suffix={':'} />
			</Col>
			<Col width={6} className="mt-1 mb-1">
				{customer.landline_phone}
			</Col>

			<Col width={6} className="font-weight-600 mt-1">
				<I18n text={i18nLabels.MOBILE_PHONE_LABEL} suffix={':'} />
			</Col>
			<Col width={6} className="mt-1 mb-1">
				{tempMobileNumber || mobileNumber}
			</Col>
			<Col width={6} className="font-weight-600 mt-1">
				<I18n text={'unit_of_measurement_label'} suffix={':'} />
			</Col>
			<Col width={6} className="mt-1 mb-1">
				{customer && <I18n text={MEASUREMENT_OPTIONS[customer.measurement]} />}
			</Col>
			<Col width={6} className="font-weight-600 mt-1 d-none">
				<I18n text={i18nLabels.PREFERRED_PRODUCT_LABEL} suffix={':'} />
			</Col>
			<Col width={6} className="mt-1 mb-1 d-none">
				<I18n text={PRODUCT_PREFERENCE_OPTIONS[productPreference]} />
			</Col>
			<p className="clearfix m-0" />
			<Col className="mt-5 font-weight-600 d-none">
				<I18n text={i18nLabels.DOWNLOAD_YOUR_DATA_LINK} params={['#']} />
				<i className="adc-icon adc-icon--md adc-icon--pdf-blue align-middle ml-2" />
			</Col>
			<Col className="my-3 text-right">
				<if condition={showVerifyMobileLink}>
					<Link
						action={verifyMobile}
						hasNoMargin
						icon={'phone-black'}
						label={i18nLabels.VERIFY_MOBILE}
					/>
				</if>
				<Link
					action={editCustomerInfo}
					hasNoMargin
					icon={'edit-icon'}
					label={i18nLabels.MANAGE_ACCOUNT}
				/>
			</Col>
		</Row>

	);
};
CustomerInfoDisplay.propTypes = {
	editCustomerInfo: PropTypes.func,
	customer: PropTypes.object,
	isMobileVerified: PropTypes.bool,
	verifyMobile:PropTypes.func,
	isMobileChanged: PropTypes.bool,
	error:PropTypes.string,
	customerMobileUpdateRequest:PropTypes.func
};

export default connect(mapStateToProps, null)(CustomerInfoDisplay);