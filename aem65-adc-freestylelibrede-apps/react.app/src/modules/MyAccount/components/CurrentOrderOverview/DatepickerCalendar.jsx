import React from 'react';
import Icon from '../../../Generic/components/Icon/Icon';
import {i18nLabels} from '../../../../utils/translationUtils';
import I18n from '../../../Translation/components/I18n';

const DatepickerCalendar = (isCalendarOpen, toggleCalendar, handleConfirm, selectedDate, deliveryDate, isFullWidth) => ({children}) => {
	let pendingChanges;
	if (selectedDate && deliveryDate) pendingChanges = selectedDate.setHours(0, 0, 0, 0) !== deliveryDate.setHours(0, 0, 0, 0);
	const formattedDeliveryDate = new Intl.DateTimeFormat('de-DE', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit'
	}).format(deliveryDate);

	return (
		<div className={'adc-datepicker__wrapper mb-4' + (isCalendarOpen ? ' open' : '')}>
			<div className={'adc-datepicker' + (isCalendarOpen ? ' open' : '') + (isFullWidth ? ' full-width' : '')}>
				<input className="adc-datepicker__input" type="text" autoComplete="off" onClick={toggleCalendar}
					   placeholder={formattedDeliveryDate}/>
				<Icon className="adc-datepicker__desktop-content"
					  image={isCalendarOpen ? 'arrow-up-blue' : 'arrow-down-blue'} size={Icon.SIZE.MEDIUM}/>
				<Icon className="adc-datepicker__mobile-closed-icon" image="edit-icon" size={Icon.SIZE.MEDIUM}/>
				{isCalendarOpen &&
				<div className={'adc-datepicker__content ' + (pendingChanges ? 'adc-datepicker__pending-changes' : '')}>
					<div className="adc-datepicker__calendar">
						{children}
					</div>
					<div className="adc-datepicker__delivery-info">
						<p className="adc-datepicker__delivery-label"><I18n text={i18nLabels.MORE_INFO_CTA_TEXT} suffix={':'}/></p>
						<p className="adc-datepicker__delivery-value">{formattedDeliveryDate}</p>
					</div>
					<button
						className={'adc-button mt-3 mb-4 ml-0 mr-0 adc-button--block ' + (pendingChanges ? 'adc-button-secondary' : 'adc-button-primary')}
						onClick={() => handleConfirm(selectedDate)}><I18n text={i18nLabels.COUPON_CODE_CONFIRM_CTA_LABEL}/>
					</button>
				</div>
				}
			</div>
		</div>
	);
};

export default DatepickerCalendar;