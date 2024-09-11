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
import {ghostOrdersDeactivate} from '../../redux/actions/get_ghost_orders.action';
import {openModalAction} from '../../../Modal/redux/actions';
import {SUBSCRIPTION_STATUS} from '../../../../utils/enums';
import LoadingIndicator from '../../../Generic/components/Loading/LoadingIndicator';

const mapStateToProps = state => {
	const {modalProps} = state.modalModuleReducer.ModalReducer;
	const {isLoading, isGhostOrdersSuccess} = state.myAccountModuleReducer.GetGhostOrdersReducer;
	const {loadingCurrentOrders: isRxLoading} = state.myAccountModuleReducer.GetOrdersReducer;

	return {modalProps, isLoading, isGhostOrdersSuccess, isRxLoading};
};

const mapDispatchToProps = {
	openModalAction,
	closeModalAction,
	ghostOrdersDeactivate
};

function DeactivateGhostOrder(props) {
	const {closeModalAction, ghostOrdersDeactivate, rxmc, isLoading, isGhostOrdersSuccess, isRxLoading} = props;
	const deactivateGhostData = {
		Status : SUBSCRIPTION_STATUS.INACTIVE,
		rxmc: rxmc,
		orderId : ''
	};
	const deactivateGhostOrderData = () => {
		ghostOrdersDeactivate({deactivateGhostData, rxmc});
	};
	return (<Row>
		<if condition={isLoading || isRxLoading}>
			<LoadingIndicator label={i18nLabels.LOADING_MESSAGE}/>
		</if>
		<elseif condition={(!isLoading || !isRxLoading) && !isGhostOrdersSuccess}>
			<Col md={2} xl={1} className={'text-center mt-4'}>
				<Icon image={'large-danger-blue'} size={Icon.SIZE.LARGER}/>
			</Col>
			<Col md={10} xl={11} className={'text-left mt-4'}>
				<p><I18n text={i18nLabels.DEACTIVATE}/></p>
				<ul>
					<li><I18n text={i18nLabels.GHOST_ORDER_DEACTIVATED_CONFIRMATION}/></li>
				</ul>
			</Col>
			<Col md={10} xl={11} offsetMd={2} offsetXl={1} className='mt-5'>
				<Button
					label={i18nLabels.ABORT_CTA_STYLE}
					ctaStyle={BUTTON_OPTIONS.STYLE.SECONDARY}
					action={closeModalAction}
					hasNoMargin
				/>
				<Button
					className={'ml-3'}
					label={i18nLabels.DEACTIVATE}
					ctaStyle={BUTTON_OPTIONS.STYLE.PRIMARY}
					action={deactivateGhostOrderData}
					hasNoMargin
				/>
			</Col>
		</elseif>
		<elseif condition={(!isLoading || !isRxLoading) && isGhostOrdersSuccess}>
			<Col md={2} xl={1} className={'text-center mt-4'}>
				<Icon image={'round-green-check'} size={Icon.SIZE.LARGER}/>
			</Col>
			<Col md={10} xl={11} className={'mt-4'}>
				<p className={'mt-3'}><I18n text={i18nLabels.REIMBURSEMENT_HAS_BEEN_DEACTIVATED}/></p>
			</Col>
			<Col width={12} sm={10} md={6} xl={5} offsetMd={2} offsetXl={1} className='mt-4'>
				<Button
					label={i18nLabels.COUPON_CODE_CONFIRM_CTA_LABEL}
					ctaStyle={BUTTON_OPTIONS.STYLE.PRIMARY}
					action={closeModalAction}
					hasNoMargin
					isFullWidth
				/>
			</Col>
		</elseif>
	</Row>);
}

DeactivateGhostOrder.propTypes = {
	modalProps: PropTypes.shape({
		serviceToDate: PropTypes.number
	}),
	closeModalAction: PropTypes.func,
	ghostOrdersDeactivate: PropTypes.func,
	rxmc: PropTypes.string,
	isLoading: PropTypes.bool,
	isGhostOrdersSuccess: PropTypes.bool,
	isRxLoading: PropTypes.bool
};

export default connect(mapStateToProps, mapDispatchToProps)(DeactivateGhostOrder);