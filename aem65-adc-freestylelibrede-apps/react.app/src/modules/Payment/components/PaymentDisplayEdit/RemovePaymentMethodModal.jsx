import React from 'react';
import {connect} from 'react-redux';
import {i18nLabels} from '../../../../utils/translationUtils';
import {closeModalAction} from '../../../Modal/redux/actions/index';
import PropTypes from 'prop-types';
import Row from '../../../Generic/components/Container/Row';
import Col from '../../../Generic/components/Container/Col';
import Button, {BUTTON_OPTIONS} from '../../../Generic/components/Button/Button';
import PaymentMethodInformation from './PaymentMethodInformation';
import I18n from '../../../Translation/components/I18n';
import {deleteCustomerPaymentTokenRequest} from '../../redux/actions/payment.action';
import {openModalAction} from '../../../Modal/redux/actions';

const mapStateToProps = state => {
	const {modalProps} = state.modalModuleReducer.ModalReducer;
	return {modalProps};
};

const mapDispatchToProps = {
	closeModalAction,
	openModalAction,
	deleteCustomerPaymentToken: deleteCustomerPaymentTokenRequest
};

const RemovePaymentMethodModal = (props) => {
	const {closeModalAction, openModalAction, deleteCustomerPaymentToken, modalProps: {paymentMethod}} = props;

	const removePaymentMethodAndShowConfirmation = () => {
		deleteCustomerPaymentToken({
			method: paymentMethod.method,
			token: paymentMethod.token
		});
		openModalAction({
			heading: i18nLabels.DELETE_PAYMENT_METHOD,
			contentID: 'removePaymentMethodConfirmationModal'
		});
	};

	return (<Row>
		<Col className={'mt-4'}>
			<PaymentMethodInformation paymentMethod={paymentMethod} isHideDisclaimer/>
		</Col>
		<Col>
			<p className={'text-small mb-0'}><I18n text={i18nLabels.REMOVE_PAYMENT_METHOD_DISCLAIMER_1} /></p>
			<p className={'text-small'}><I18n text={i18nLabels.REMOVE_PAYMENT_METHOD_DISCLAIMER_2} /></p>
		</Col>
		<Col className={'mt-2 col-12 col-md-12 col-lg-8'}>
			<div className="row">
				<div className="col-12 col-md-6 pr-lg-0 mb-3 ">
					<Button
						label={i18nLabels.ABORT_CTA_STYLE}
						ctaStyle={BUTTON_OPTIONS.STYLE.SECONDARY}
						action={closeModalAction}
						hasNoMargin
						className={'full-width'}
					/>
				</div>
				<div className="col-12 col-md-6">
					<Button
						className={'orange full-width'}
						label={i18nLabels.REMOVE_CONFIRMATION_CTA}
						ctaStyle={BUTTON_OPTIONS.STYLE.PRIMARY}
						action={removePaymentMethodAndShowConfirmation}
						hasNoMargin
					/>
				</div>
			</div>
		</Col>
	</Row>);
};

RemovePaymentMethodModal.propTypes = {
	modalProps: PropTypes.shape({
		paymentMethod: PropTypes.object
	}),
	closeModalAction: PropTypes.func,
	openModalAction: PropTypes.func,
	deleteCustomerPaymentToken: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(RemovePaymentMethodModal);
