import React from 'react';
import { connect } from 'react-redux';
import { i18nLabels } from '../../../../utils/translationUtils';
import { closeModalAction } from '../../../Modal/redux/actions/index';
import PropTypes from 'prop-types';
import Row from '../../../Generic/components/Container/Row';
import Col from '../../../Generic/components/Container/Col';
import Icon from '../../../Generic/components/Icon/Icon';
import Button, { BUTTON_OPTIONS } from '../../../Generic/components/Button/Button';
import I18n from '../../../Translation/components/I18n';
import { deactivatePlusServiceRequest } from '../../redux/actions/orders.action';
import { openModalAction } from '../../../Modal/redux/actions';
import { SUBSCRIPTION_STATUS } from '../../../../utils/enums';
import LoadingIndicator from '../../../Generic/components/Loading/LoadingIndicator';

const mapStateToProps = state => {
	const { modalProps } = state.modalModuleReducer.ModalReducer;
	const { isLoading, deactivateError } = state.myAccountModuleReducer.OrdersReducer;
	return { modalProps, isLoading, deactivateError };
};

const mapDispatchToProps = {
	openModalAction,
	closeModalAction,
	deactivatePlusServiceRequest
};

const DeactivatePlusServiceModal = (props) => {
	const { closeModalAction, modalProps, deactivatePlusServiceRequest, orderId, isLoading, deactivateError } = props;
	const deactivateSubsData = {
		Status: SUBSCRIPTION_STATUS.INACTIVE
	};
	const deactivatePlusService = () => {
		deactivatePlusServiceRequest({ deactivateSubsData, orderId });
	};

	return (<Row>
		<if condition={isLoading}>
			<LoadingIndicator label={i18nLabels.LOADING_MESSAGE} />
		</if>
		<else>
			<Col md={2} xl={1} className={'text-center my-4'}>
				<Icon image={'large-danger-blue'} size={Icon.SIZE.LARGER} />
			</Col>
			<Col md={10} xl={11} className={'text-left mt-md-4 text-break pl-xl-5'}>
				<p><I18n text={i18nLabels.DEACTIVATE_PLUS_SERVICE_CONFIRMATION_MESSAGE} /></p>
				<ul className='p-0'>
					<li><I18n text={i18nLabels.DEACTIVATE_PLUS_SERVICE_INFORMATIONAL_MESSAGE_1} /></li>
					<li><I18n text={i18nLabels.DEACTIVATE_PLUS_SERVICE_INFORMATIONAL_MESSAGE_2} params={[modalProps.serviceToDate]} /></li>
					<li><I18n text={i18nLabels.DEACTIVATE_PLUS_SERVICE_INFORMATIONAL_MESSAGE_3} /></li>
				</ul>
				<if condition={deactivateError}>
					<div className="mt-1">
						<span className="adc-form-group--error mt-4">
							<I18n text={'magento_error_code_' + deactivateError} />
						</span>
					</div>
				</if>
			</Col>

			<Col md={12} xl={10} offsetXl={1} className='mt-5'>
				<div className="row">
					<div className="col-12 col-md-5 mb-3 mb-md-0 pr-md-0">
						<Button
							label={i18nLabels.ABORT_CTA_STYLE}
							ctaStyle={BUTTON_OPTIONS.STYLE.SECONDARY}
							action={closeModalAction}
							hasNoMargin
							className={'full-width'}
						/>
					</div>
					<div className="col-12 col-md-7">
						<Button
							className={'full-width'}
							label={i18nLabels.DEACTIVATE_PLUS_SERVICE}
							ctaStyle={BUTTON_OPTIONS.STYLE.PRIMARY}
							action={deactivatePlusService}
							hasNoMargin
						/>
					</div>
				</div>
			</Col>
		</else>
	</Row>);
};

DeactivatePlusServiceModal.propTypes = {
	modalProps: PropTypes.shape({
		serviceToDate: PropTypes.number
	}),
	closeModalAction: PropTypes.func,
	deactivatePlusServiceRequest: PropTypes.func,
	orderId: PropTypes.string,
	isLoading: PropTypes.bool
};

export default connect(mapStateToProps, mapDispatchToProps)(DeactivatePlusServiceModal);
