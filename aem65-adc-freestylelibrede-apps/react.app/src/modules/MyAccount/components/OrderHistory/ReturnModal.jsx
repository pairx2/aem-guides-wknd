import React from 'react';
import {connect} from 'react-redux';
import {closeModalAction} from '../../../Modal/redux/actions/index';
import Icon from '../../../Generic/components/Icon/Icon';
import I18n from '../../../Translation/components/I18n';
import {i18nLabels} from '../../../../utils/translationUtils';
import Button, {BUTTON_OPTIONS} from '../../../Generic/components/Button/Button';
import PropTypes from 'prop-types';
import {openCurrentOrderReturnFormRequest, openReturnFormRequest} from '../../redux/actions/orders.action';

const mapDispatchToProps = {
	closeModalAction,
	openReturnFormRequest,
	openCurrentOrderReturnFormRequest
};

const ReturnModal = ({closeModalAction, openReturnFormRequest, openCurrentOrderReturnFormRequest, productData, delivery, orderDetails, isCurrentOrderReturnFlow}) => {
	const confirmAndClose = () => {
		isCurrentOrderReturnFlow ?
			openCurrentOrderReturnFormRequest({
				productData,
				delivery,
				orderDetails
			})
			:
			openReturnFormRequest({
				productData,
				delivery,
				orderDetails
			});
		closeModalAction();
	};

	return <div className="row align-items-center mt-4">
		<div className="col-md-2 col-xl-1 text-center ">
			<Icon image={'large-danger'} size={Icon.SIZE.L52}/>
		</div>
		<div className="col-md-10 col-xl-10 text-left pl-4">
			<p><I18n text={i18nLabels.RETURN_WARNING} suffix={'.'}/></p>
		</div>
		<div className='col-md-4 col-xl-4 offset-md-2 offset-xl-1 text-left mt-4  pl-4'>
			<Button
				label={i18nLabels.CANCEL_CTA}
				ctaStyle={BUTTON_OPTIONS.STYLE.SECONDARY}
				type={BUTTON_OPTIONS.TYPE.BUTTON}
				action={closeModalAction}
				hasNoMargin
				isFullWidth
			/>
		</div>
		<div className='col-md-4 col-xl-4 text-left mt-4 pl-0'>
			<Button
				label={i18nLabels.CONTINUE_CTA_TEXT}
				ctaStyle={BUTTON_OPTIONS.STYLE.PRIMARY}
				type={BUTTON_OPTIONS.TYPE.BUTTON}
				action={confirmAndClose}
				hasNoMargin
				isFullWidth
			/>
		</div>
	</div>;
};

ReturnModal.propTypes = {
	closeModalAction: PropTypes.func,
	openReturnFormRequest: PropTypes.func,
	openCurrentOrderReturnFormRequest: PropTypes.func,
	productData: PropTypes.object,
	delivery: PropTypes.object,
	orderDetails: PropTypes.object,
	isCurrentOrderReturnFlow: PropTypes.bool,
};

export default connect(null, mapDispatchToProps)(ReturnModal);