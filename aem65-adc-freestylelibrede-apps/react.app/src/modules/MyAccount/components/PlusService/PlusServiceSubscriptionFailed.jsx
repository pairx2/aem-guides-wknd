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

const mapStateToProps = state => {
	const {modalProps} = state.modalModuleReducer.ModalReducer;
	const {loadingOrders: isLoadingOrders} = state.myAccountModuleReducer.GetOrdersReducer;
	return {modalProps, isLoadingOrders};
};

const mapDispatchToProps = {
	closeModalAction
};

const PlusServiceSubscriptionFailed = (props) => {
	const {closeModalAction, modalProps: {paragraph_1}, isLoadingOrders} = props;

	return (<Row>
		<if condition={isLoadingOrders}>
			<LoadingIndicator isOverlay/>
		</if>
		<else>
			<Col md={2} xl={1} className={'text-center my-4'}>
				<Icon image={'large-danger-orange'} size={Icon.SIZE.LARGER}/>
			</Col>
			<Col md={10} xl={11} className={'text-left pt-md-4'}>
				<p className={'mb-0 pl-4 pt-xl-4'}><I18n text={paragraph_1}/></p>
			</Col>
			<Col width={12} sm={10} md={6} xl={5} offsetMd={2} offsetXl={1} className='mt-4 pl-4'>
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

PlusServiceSubscriptionFailed.propTypes = {
	modalProps: PropTypes.shape({
		paragraph_1: PropTypes.string,
	}),
	closeModalAction: PropTypes.func,
	isLoadingOrders: PropTypes.bool
};

export default connect(mapStateToProps, mapDispatchToProps)(PlusServiceSubscriptionFailed);

