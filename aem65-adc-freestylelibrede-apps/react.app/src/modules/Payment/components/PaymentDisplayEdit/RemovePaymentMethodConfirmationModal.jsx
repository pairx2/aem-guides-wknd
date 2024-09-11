import React from 'react';
import {connect} from 'react-redux';
import {i18nLabels} from '../../../../utils/translationUtils';
import {closeModalAction} from '../../../Modal/redux/actions/index';
import PropTypes from 'prop-types';
import Row from '../../../Generic/components/Container/Row';
import Col from '../../../Generic/components/Container/Col';
import Button, {BUTTON_OPTIONS} from '../../../Generic/components/Button/Button';
import I18n from '../../../Translation/components/I18n';
import Icon from '../../../Generic/components/Icon/Icon';
import LoadingIndicator from '../../../Generic/components/Loading/LoadingIndicator';

const mapStateToProps = state => {
	const {errorInDeletingPayment, isLoading} = state.paymentModuleReducer.PaymentReducer;
	return {errorInDeletingPayment, isLoading};
};

const mapDispatchToProps = {
	closeModalAction,
};

const RemovePaymentMethodConfirmationModal = (props) => {
	const {closeModalAction, errorInDeletingPayment, isLoading} = props;
	return (<Row>
		<if condition={isLoading}>
			<LoadingIndicator isOverlay/>
		</if>
		<else>
			<Col md={2} xl={1} className={'text-center mt-4'}>
				<Icon image={errorInDeletingPayment ? 'large-x-circle-orange' : 'round-green-check'} size={Icon.SIZE.LARGER}/>
			</Col>
			<if condition ={errorInDeletingPayment}>
				<Col md={10} xl={11} className={'text-left mt-4'}>
					<p className={'mt-3'}><I18n text={i18nLabels.YOUR_PAYMENT_METHOD_HAS_NOT_BEEN_REMOVED}/></p>
				</Col>
			</if>
			<elseif condition = {!errorInDeletingPayment}>
				<Col md={10} xl={11} className={'text-left mt-4'}>
					<p className={'mb-0'}><I18n text={i18nLabels.YOUR_PAYMENT_METHOD_HAS_BEEN_REMOVED}/></p>
					<p><I18n text={i18nLabels.PLEASE_ADD_A_NEW_PAYMENT_METHOD}/></p>
				</Col>
			</elseif>
			<Col width={12} sm={8} md={5} xl={3} offsetMd={2} offsetXl={1} className='mt-4'>
				<Button
					label={i18nLabels.COUPON_CODE_CONFIRM_CTA_LABEL}
					ctaStyle={BUTTON_OPTIONS.STYLE.PRIMARY}
					action={closeModalAction}
					hasNoMargin
					isFullWidth
				/>
			</Col>
		</else>
	</Row>);
};

RemovePaymentMethodConfirmationModal.propTypes = {
	closeModalAction: PropTypes.func,
	errorInDeletingPayment: PropTypes.number,
	isLoading: PropTypes.bool
};

export default connect(mapStateToProps, mapDispatchToProps)(RemovePaymentMethodConfirmationModal);
