import React from 'react';
import {reduxForm} from 'redux-form';
import I18n from '../../../Translation/components/I18n';
import {i18nLabels} from '../../../../utils/translationUtils';
import TextField from '../../../Form/components/GenericFields/TextField';
import PropTypes from 'prop-types';
import Button, {BUTTON_OPTIONS} from '../../../Generic/components/Button/Button';

const CouponForm = ({handleSubmit, isError, redeemCtaStyling, isCouponInCart, onChangeHandler, isEmptyField}) => {
	return (
		<div className="col-12 form-group pb-3">
			<form onSubmit={handleSubmit}>
				<TextField
					label={i18nLabels.COUPON_CODE_LABEL}
					name='CouponCodeField'
					type='text'
					placeholder={i18nLabels.COUPON_CODE_FIELD_PLACEHOLDER}
					onChange={onChangeHandler}
				/>
				<div className="mt-1">
					{isError && <span className="adc-form-group--error mt-4">
						<I18n text={i18nLabels.COUPON_CODE_FIELD_ERROR_MESSAGE_TEXT}/>
					</span>
					}
					{isCouponInCart && <span className="adc-form-group--error mt-4">
						<I18n text={i18nLabels.COUPON_CODE_ALREADY_APPLIED}/>
					</span>}
					{isEmptyField && <span className="adc-form-group--error mt-4">
						<I18n text={i18nLabels.MANDATORY_FIELD_MESSAGE}/>
					</span>}
				</div>
				<div className="mt-3 mb-4">
					<Button
						className={'ml-0'}
						type={BUTTON_OPTIONS.TYPE.SUBMIT}
						ctaStyle={redeemCtaStyling === BUTTON_OPTIONS.STYLE.SECONDARY ? BUTTON_OPTIONS.STYLE.SECONDARY : BUTTON_OPTIONS.STYLE.PRIMARY}
						size={BUTTON_OPTIONS.SIZE.LARGE}
						isFullWidth
						hasNoMargin
						label={i18nLabels.COUPON_CODE_REDEEM_CTA_LABEL}
					/>
				</div>
			</form>
		</div>
	);
};

CouponForm.propTypes = {
	isError: PropTypes.bool,
	redeemCtaStyling: PropTypes.string,
	isCouponInCart: PropTypes.bool,
	onChangeHandler: PropTypes.func,
	isEmptyField: PropTypes.bool
};

export default reduxForm({
	form: 'couponCode',
})(CouponForm);

