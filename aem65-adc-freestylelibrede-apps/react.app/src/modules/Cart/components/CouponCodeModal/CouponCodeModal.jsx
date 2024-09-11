import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Icon from '../../../Generic/components/Icon/Icon';
import {closeModalAction} from '../../../Modal/redux/actions';
import I18n from '../../../Translation/components/I18n';
import {i18nLabels} from '../../../../utils/translationUtils';
import Button, {BUTTON_OPTIONS} from '../../../Generic/components/Button/Button';
import {formatPrice} from '../../../../utils/pricingUtils';

const mapStateToProps = state => {
	const {modalProps} = state.modalModuleReducer.ModalReducer;
	return {modalProps};
};
const mapDispatchToProps = {
	closeModalAction,
};
const CouponCodeModal = ({closeModalAction, modalProps: {couponCode: couponCode, couponValue: couponValue, confirmCtaStyling: confirmCtaStyling}}) => {
	return (
		<div className="adc-modal-delete py-2">
			<div className="d-flex flex-column flex-sm-row align-items-center">
				<div className="flex-fill pr-md-3 pt-2">
					<Icon image={'tick-circle-green'} size={Icon.SIZE.LARGE}/>
				</div>
				<div className="flex-grow-1">
					<div>
						<I18n text={i18nLabels.COUPON_CODE_CONFIRMATION_TEXT}
							  params={[couponCode, `${formatPrice(couponValue)}`]}
							  customStylesParams="font-weight-bold"/>
					</div>
				</div>
			</div>
			<div className="d-flex flex-column justify-content-center">
				<div className="pt-3 pl-md-5 ml-md-2 text-center text-md-left">
					<Button
						label={i18nLabels.COUPON_CODE_CONFIRM_CTA_LABEL}
						type={BUTTON_OPTIONS.TYPE.BUTTON}
						ctaStyle={confirmCtaStyling === BUTTON_OPTIONS.STYLE.PRIMARY ? BUTTON_OPTIONS.STYLE.PRIMARY : BUTTON_OPTIONS.STYLE.SECONDARY}
						size={BUTTON_OPTIONS.SIZE.MEDIUM}
						action={closeModalAction}
						hasNoMargin
					/>
				</div>
			</div>
		</div>
	);
};

CouponCodeModal.propTypes = {
	modalProps: PropTypes.shape({
		couponCode: PropTypes.string,
		couponValue: PropTypes.number,
		confirmCtaStyling: PropTypes.string,
	}),
	closeModalAction: PropTypes.func,

};
export default connect(mapStateToProps, mapDispatchToProps)(CouponCodeModal);
