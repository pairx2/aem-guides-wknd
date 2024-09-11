import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import I18n from '../../../Translation/components/I18n';
import {Field} from 'redux-form';
import Icon from '../../../Generic/components/Icon/Icon';
import DatePicker, {registerLocale} from 'react-datepicker';
import de from 'date-fns/locale/de';
import {i18nLabels} from '../../../../utils/translationUtils';
import {isRequired} from '../../utils/validationRules';
import {getFormattedDate} from '../../../../utils/dateUtils';

registerLocale('de', de);

const mapStateToProps = state => {
	const {dictionary} = state.translationModuleReducer.translationReducer;
	return {dictionary};
};
const CalendarContainer = (input, isCalendarOpen, toggleCalendar, handleConfirm, selectedDate, confirmedDate, icon) => ({children}) => {
	const pendingChanges = selectedDate?.setHours(0, 0, 0, 0) !== confirmedDate?.setHours(0, 0, 0, 0);
	const placeholder = getFormattedDate(confirmedDate);
	return (
		<div onClick={toggleCalendar} className="adc-datepicker__wrapper compact">
			<div className={'adc-datepicker w-100 ' + (isCalendarOpen ? 'open' : '')}>
				<input className="adc-datepicker__input" name={input.name} type="text" autoComplete="off" value={placeholder} />
				<Icon className="adc-datepicker__desktop-content"
					image={icon || (isCalendarOpen ? 'arrow-up-blue' : 'arrow-down-blue')} size={Icon.SIZE.MEDIUM} />
				<Icon className="adc-datepicker__mobile-closed-icon" image="edit-icon" size={Icon.SIZE.MEDIUM} />
				{isCalendarOpen &&
					<div className={'adc-datepicker__content ' + (pendingChanges ? 'adc-datepicker__pending-changes' : '')}>
						<div className="adc-datepicker__calendar">
							{children}
						</div>
						<button className={'adc-button mt-3 mb-4 ml-0 mr-0 adc-button--block ' + (pendingChanges ? 'adc-button-secondary' : 'adc-button-primary')} onClick={handleConfirm}>
							<I18n text={i18nLabels.COUPON_CODE_CONFIRM_CTA_LABEL} />
						</button>
					</div>
				}
			</div>
		</div>
	);
};
const DateField = ({name, label, type, selectedDate, confirmedDate, isCalendarOpen, onChange, handleConfirm, toggleCalendar, validationRules, minDate, icon}) => {
	return (
		<Field
			name={name}
			label={label}
			type={type}
			mandatory={isRequired(validationRules)}
			validate={validationRules}
			component={({input, mandatory, meta: {touched, error}}) => (
				<>
					<label className="adc-form-group__label adc-datepicker__label" htmlFor={input.name}>
						<I18n text={label} suffix={mandatory ? '*' : ''} />
					</label>
					<DatePicker id={input.name} selected={selectedDate < minDate ? minDate: selectedDate}
						onChange={onChange}
						dateFormat="dd.MM.yyyy"
						minDate={minDate || new Date()}
						inline
						locale="de"
						calendarContainer={CalendarContainer(input, isCalendarOpen, toggleCalendar, handleConfirm, selectedDate, confirmedDate, icon)}
						renderCustomHeader={({date, decreaseMonth, increaseMonth}) => {
							const decreaseMonthStopPropagation = (e) => {
								e.stopPropagation();
								decreaseMonth();
							};
							const increaseMonthStopPropagation = (e) => {
								e.stopPropagation();
								increaseMonth();
							};
							const formattedHeader = new Intl.DateTimeFormat('de-DE', {
								year: 'numeric',
								month: 'long'
							}).format(date);
							return (
								<div className="adc-datepicker__header">
									<button className="adc-datepicker__mobile-content"
										onClick={decreaseMonthStopPropagation}>
										<Icon image={'arrow-left'} size={Icon.SIZE.MEDIUM} />
									</button>
									<p className="adc-datepicker__current-month">{formattedHeader}</p>
									<button className="adc-datepicker__mobile-content"
										onClick={increaseMonthStopPropagation}>
										<Icon image={'arrow-right'} size={Icon.SIZE.MEDIUM} />
									</button>
									<div
										className="adc-datepicker__header-buttons adc-datepicker__desktop-content">
										<button onClick={decreaseMonthStopPropagation}>
											<Icon image={'arrow-left'} size={Icon.SIZE.MEDIUM} />
										</button>
										<button onClick={increaseMonthStopPropagation}>
											<Icon image={'arrow-right'} size={Icon.SIZE.MEDIUM} />
										</button>
									</div>
								</div>
							);
						}}
					/>
					{touched && (error && <span className="adc-error adc-form-group--error">{error}</span>)}
				</>
			)}
		/>
	);
};

DateField.propTypes = {
	validationRules: PropTypes.array,
	name: PropTypes.string,
	label: PropTypes.string,
	type: PropTypes.string,
	selectedDate: PropTypes.instanceOf(Date),
	confirmedDate: PropTypes.instanceOf(Date),
	isCalendarOpen: PropTypes.bool,
	onChange: PropTypes.func,
	handleConfirm: PropTypes.func,
	toggleCalendar: PropTypes.func,
	minDate: PropTypes.number,
	icon: PropTypes.string
};
export default connect(mapStateToProps, null)(DateField);
