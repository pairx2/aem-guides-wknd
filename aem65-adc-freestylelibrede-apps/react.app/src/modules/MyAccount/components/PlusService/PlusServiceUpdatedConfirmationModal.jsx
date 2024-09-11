import React from 'react';
import {connect} from 'react-redux';
import {i18nLabels} from '../../../../utils/translationUtils';
import {closeModalAction} from '../../../Modal/redux/actions/index';
import PropTypes from 'prop-types';
import Row from '../../../Generic/components/Container/Row';
import Col from '../../../Generic/components/Container/Col';
import Icon from '../../../Generic/components/Icon/Icon';
import Button, {BUTTON_OPTIONS} from '../../../Generic/components/Button/Button';
import I18n from '../../../Translation/components/I18n';
import LoadingIndicator from '../../../Generic/components/Loading/LoadingIndicator';
import {getFormattedDate} from '../../../../utils/dateUtils';

const mapStateToProps = state => {
	const {modalProps} = state.modalModuleReducer.ModalReducer;
	const {isReactivated} = state.myAccountModuleReducer.OrdersReducer;
	const {loadingOrders: isLoadingOrders} = state.myAccountModuleReducer.GetOrdersReducer;
	return {modalProps, isReactivated, isLoadingOrders};
};

const mapDispatchToProps = {
	closeModalAction
};

const PlusServiceUpdatedConfirmationModal = (props) => {
	const {closeModalAction, modalProps: {paragraph_1, paragraph_2, reactivateDeliveryDate}, isReactivated, isLoadingOrders} = props;

	return (<Row className={'d-flex justify-content-center align-items-center mt-3'}>
		<if condition={isLoadingOrders}>
			<LoadingIndicator label={i18nLabels.LOADING_MESSAGE}/>
		</if>
		<else>
			<Col md={2} xl={1} className={'text-center my-3'}>
				<Icon image={`${isReactivated ? 'round-green-check' : 'large-danger-orange'}`} size={Icon.SIZE.LARGER}/>
			</Col>
			<Col md={10} xl={11} className={'text-left'}>
				<p className={'mb-0 pl-lg-4'}><I18n text={paragraph_1}/></p>
				<p className={'pl-lg-4'}><I18n text={paragraph_2} params={[getFormattedDate(reactivateDeliveryDate)]}/></p>
			</Col>
			<Col width={12} md={12} xl={11} offsetXl={1} className='mt-4'>
				<Button
					label={i18nLabels.COUPON_CODE_CONFIRM_CTA_LABEL}
					ctaStyle={BUTTON_OPTIONS.STYLE.PRIMARY}
					action={closeModalAction}
					hasNoMargin
					isFullWidth
					className={'col-12 col-md-6 col-lg-5'}
				/>
			</Col>
		</else>
	</Row>);
};

PlusServiceUpdatedConfirmationModal.propTypes = {
	modalProps: PropTypes.shape({
		paragraph_1: PropTypes.string,
		paragraph_2: PropTypes.string,
		reactivateDeliveryDate: PropTypes.string
	}),
	closeModalAction: PropTypes.func,
	isReactivated: PropTypes.bool,
	isLoadingOrders: PropTypes.bool
};

export default connect(mapStateToProps, mapDispatchToProps)(PlusServiceUpdatedConfirmationModal);
