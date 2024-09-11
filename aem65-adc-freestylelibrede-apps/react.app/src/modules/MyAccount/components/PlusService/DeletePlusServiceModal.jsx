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
import {deletePlusServiceRequest} from '../../redux/actions/orders.action';
import {SUBSCRIPTION_STATUS} from '../../../../utils/enums';
import LoadingIndicator from '../../../Generic/components/Loading/LoadingIndicator';

const mapStateToProps = state => {
	const {modalProps} = state.modalModuleReducer.ModalReducer;
	const {loadingOrders: isLoadingOrders} = state.myAccountModuleReducer.GetOrdersReducer;
	const {isLoading} = state.myAccountModuleReducer.OrdersReducer;
	return {modalProps, isLoadingOrders, isLoading};
};

const mapDispatchToProps = {
	closeModalAction,
	deletePlusServiceRequest
};

const DeletePlusServiceModal = (props) => {
	const {closeModalAction, deletePlusServiceRequest, orderId, isLoadingOrders, isLoading} = props;
	const cancelSubsData = {
		Status : SUBSCRIPTION_STATUS.CANCELLED
	};
	const deletePlusService = () => {
		deletePlusServiceRequest({cancelSubsData, orderId});
	};

	return (<Row>
		<if condition={isLoadingOrders || isLoading}>
			<LoadingIndicator label={i18nLabels.LOADING_MESSAGE}/>
		</if>
		<else>
			<Col md={2} xl={1} className={'text-center my-4'}>
				<Icon image={'large-danger-orange'} size={Icon.SIZE.LARGER}/>
			</Col>
			<Col md={10} xl={11} className={'text-left mt-md-4'}>
				<p className={'mb-0'}><I18n text={i18nLabels.DELETE_PLUS_SERVICE_CONFIRMATION_MESSAGE}/></p>
				<p className={'mb-0'}><I18n text={i18nLabels.DELETE_PLUS_SERVICE_INFORMATIONAL_MESSAGE}/></p>
			</Col>
			<Col md={12} xl={8} offsetXl={1} className='mt-5'>
				<div className="row">
					<div className="col-12 col-md-6 mb-3 mb-md-0 pr-md-0">
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
							label={i18nLabels.CONFIRM_DELETION}
							ctaStyle={BUTTON_OPTIONS.STYLE.PRIMARY}
							action={deletePlusService}
							hasNoMargin
						/>
					</div>
				</div>
			</Col>
		</else>
	</Row>);
};

DeletePlusServiceModal.propTypes = {
	modalProps: PropTypes.shape({}),
	closeModalAction: PropTypes.func,
	deletePlusServiceRequest: PropTypes.func,
	orderId: PropTypes.string,
	isLoadingOrders: PropTypes.bool,
	isLoading: PropTypes.bool
};

export default connect(mapStateToProps, mapDispatchToProps)(DeletePlusServiceModal);
