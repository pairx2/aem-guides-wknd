import React from 'react';
import {PAYMENT_ICONS} from '../../../utils/enums';
import I18n from '../../Translation/components/I18n';
import {useTranslation} from '../../../utils/translationUtils';
import Icon from '../../Generic/components/Icon/Icon';
import PropTypes from 'prop-types';
import LoadingIndicator from '../../Generic/components/Loading/LoadingIndicator';

const PaymentOption = ({title, icon, index, isExpanded, isLoading, toggleOption, isLimitHeight, error, isWidgetLoading}) => {
	const translatedTitle = useTranslation(title);
	return (<div className={'adc-payment__payment-option ' + (isExpanded ? 'expanded expanded-disabled' : '') + (isWidgetLoading ? 'cursor-not-allowed' : '') + (!icon ? ' d-flex align-items-center justify-content-center' : '')}
				 onClick={!isWidgetLoading ? () => toggleOption(index) : () => false}>
		{isExpanded && <Icon image={'tick-circle'}/>}
		{isLoading && !error && <LoadingIndicator size={'small'}/>}
		<p><I18n text={title}/></p>
		{icon &&
		<img src={PAYMENT_ICONS.BASE_PATH + icon} alt={translatedTitle}
			 className={'brand' + (isLimitHeight ? ' limit-height' : '')}/>
		}
	</div>);
};

PaymentOption.propTypes = {
	title: PropTypes.string,
	icon: PropTypes.string,
	index: PropTypes.number,
	isExpanded: PropTypes.bool,
	isLoading: PropTypes.bool,
	isLimitHeight: PropTypes.bool,
	toggleOption: PropTypes.func,
	error: PropTypes.number,
	isWidgetLoading: PropTypes.bool
};

export default PaymentOption;