import React, {Component} from 'react';
import {connect} from 'react-redux';
import {acceptAddressRequest} from '../../redux/actions/verify_address.actions';
import {closeModalAction} from '../../../Modal/redux/actions';
import {ADDRESS_CHECK_SUCCESS} from '../../api/addressVerification.api';
import {i18nLabels} from '../../../../utils/translationUtils';
import PropTypes from 'prop-types';
import Button, {BUTTON_OPTIONS} from '../../../Generic/components/Button/Button';
import Row from '../../../Generic/components/Container/Row';
import Col from '../../../Generic/components/Container/Col';
import I18n from '../../../Translation/components/I18n';
import {isCheckoutPageType} from '../../../../utils/pageTypeUtils';
import {acceptCorrectedRiskCheckAddressRequest} from '../../../Payment/redux/actions/get_available_payment_methods.action';

const mapDispatchToProps = {
	acceptAddress: acceptAddressRequest,
	closeModal: closeModalAction,
	acceptCorrectedRiskCheckAddress: acceptCorrectedRiskCheckAddressRequest
};

export default (connect(null, mapDispatchToProps)(class AddressVerification extends Component {
	static propTypes = {
		closeModal: PropTypes.func,
		message: PropTypes.string,
		acceptAddress: PropTypes.func,
		section: PropTypes.string,
		addressAllowPM: PropTypes.array,
		rssResultCode: PropTypes.string,
		isBlacklisted: PropTypes.bool,
		isVerified: PropTypes.bool,
		address: PropTypes.object,
		methods: PropTypes.array,
		communicationToken: PropTypes.string,
		acceptCorrectedRiskCheckAddress: PropTypes.func,
		isOrderUpdate: PropTypes.bool
	};
	selectAddress = () => {
		const {closeModal, section, address, acceptAddress, addressAllowPM, rssResultCode, isBlacklisted, isVerified, methods, communicationToken, acceptCorrectedRiskCheckAddress, isOrderUpdate} = this.props;
		closeModal();
		if(isCheckoutPageType() || isOrderUpdate) {
			acceptCorrectedRiskCheckAddress({
				riskcheckAddress: address,
				allowSave: true,
				methods: methods,
				resultCode: rssResultCode,
				communicationToken: communicationToken,
				isBlacklisted: isBlacklisted,
				isVerified: isVerified
			});
		} else {
			acceptAddress({
				address: address,
				section: section,
				allowSave: true,
				status: ADDRESS_CHECK_SUCCESS,
				addressAllowPM: addressAllowPM,
				rssResultCode: rssResultCode,
				isBlacklisted: isBlacklisted,
				isVerified: isVerified
			});
		}
	};

	render() {
		const {message, address: {street, streetNumber, zipcode, city}} = this.props;
		return (
			<>
				<Row>
					<p className="col-12 mb-5">{message}</p>
					<Col lg={6} md={6}>
						<h6 className="font-weight-bold d-inline-block w-100"><I18n text={i18nLabels.PROPOSED_ADDRESS}/></h6>
						<div className="d-inline-block w-100">{street} {streetNumber}</div>
						<div className="d-inline-block w-100">{zipcode} {city}</div>
					</Col>
				</Row>
				<Row className="mt-5 col-6">
					<Button
						label={i18nLabels.CONTINUE_CTA_TEXT}
						ctaStyle={BUTTON_OPTIONS.STYLE.PRIMARY}
						action={this.selectAddress}
						hasNoMargin
						isFullWidth
					/>
				</Row>
			</>
		);
	}
}));
