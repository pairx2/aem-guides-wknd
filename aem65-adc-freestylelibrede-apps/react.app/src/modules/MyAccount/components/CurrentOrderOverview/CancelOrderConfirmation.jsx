import React from 'react';
import PropTypes from 'prop-types';
import {i18nLabels} from '../../../../utils/translationUtils';
import I18n from '../../../Translation/components/I18n';
import Button, {BUTTON_OPTIONS} from '../../../Generic/components/Button/Button';
import Icon from '../../../Generic/components/Icon/Icon';

export const CancelOrderConfirmation = ({closeCancelConfirmation, isAccountOverviewTab}) => {
	return (
		<div className="pb-3 col-12">
			<div className="row">
				<div className={!isAccountOverviewTab ? 'col-1' : 'col-2'}>
					<Icon image={'tick-circle-green'} size={Icon.SIZE.LARGE} className='mr-4'/>
				</div>
				<div className={'check-content  align-items-center ' + !isAccountOverviewTab ? 'col-10' : 'col-9'}>
					<p className="m-0 pl-4 pl-lg-0"><I18n text={i18nLabels.ORDER_CANCELLED} suffix={'.'}/></p>
				</div>
			</div>
			<div className={!isAccountOverviewTab ? 'mt-2 pl-md-0 col-md-6 col-lg-3 offset-md-1' : 'mt-2 pl-md-0 col-md-6 col-lg-6 offset-md-2'}>
				<Button
					type={BUTTON_OPTIONS.TYPE.BUTTON}
					label={i18nLabels.BACK_CTA_TEXT}
					ctaStyle={BUTTON_OPTIONS.STYLE.SECONDARY} hasNoMargin isFullWidth
					action={closeCancelConfirmation}
				/>
			</div>
		</div>
	);
};

CancelOrderConfirmation.propTypes = {
	closeCancelConfirmation: PropTypes.func,
	isAccountOverviewTab: PropTypes.bool
};