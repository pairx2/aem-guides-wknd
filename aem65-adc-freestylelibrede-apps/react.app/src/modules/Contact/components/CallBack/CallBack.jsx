import React, {Component} from 'react';
import {connect} from 'react-redux';
import I18n from '../../../Translation/components/I18n';
import {reduxForm} from 'redux-form';
import CheckboxField from '../../../Form/components/GenericFields/CheckboxField';
import SelectFieldWithSearch from '../../../Form/components/GenericFields/SelectFieldWithSearch';
import DatePickerField from '../../../Form/components/GenericFields/DatePickerField';
import RecaptchaField from '../../../Form/components/GenericFields/RecaptchaField';

import FirstNameField from '../../../Form/components/FormFields/FirstNameField';
import LastNameField from '../../../Form/components/FormFields/LastNameField';
import PhoneField from '../../../Form/components/FormFields/PhoneField';
import {required} from '../../../Form/utils/validationRules';
import PropTypes from 'prop-types';
import Button, {BUTTON_OPTIONS} from '../../../Generic/components/Button/Button';
import SalesforceForm from '../SalesforceForm/SalesforceForm';
import {empty} from '../../../../utils/default';
import {getFormattedDate} from '../../../../utils/dateUtils';
const mapStateToProps = state => {
	const {values, syncErrors} = state.form.callBack || {};
	const {customer} = state.myAccountModuleReducer.GetCustomerReducer;
	return {values, syncErrors, customer};
};

export default reduxForm({
	form: 'callBack',
	destroyOnUnmount: false,
	initialValues: {
		callDate: getFormattedDate(new Date())
	}
})(connect(mapStateToProps, null)(class CallBack extends Component {
	static propTypes = {
		values: PropTypes.object,
		syncErrors: PropTypes.object,
		callTimeID: PropTypes.string,
		heading: PropTypes.string,
		salesforceURL: PropTypes.string,
		salesforceOrgId: PropTypes.string,
		privacyPolicy: PropTypes.string,
		firstNameID: PropTypes.string,
		lastNameID: PropTypes.string,
		customerID: PropTypes.string,
		callBackCaseID: PropTypes.string,
		customer: PropTypes.shape({
			id: PropTypes.string
		}),
		retURL: PropTypes.string,
		submitCtaStyle: PropTypes.string
	};

	state = {
		callDate: new Date(),
		selectedDate: new Date(),
		isCalendarOpen: false
	};

	handleConfirm = (e) => {
		e.stopPropagation();
		const {selectedDate} = this.state;
		const {change, callTimeID} = this.props;
		change([callTimeID], selectedDate);
		change('callDate', selectedDate);
		this.setState({
			callDate: selectedDate,
			isCalendarOpen: false
		});
	};

	handleChange = (date, e) => {
		e.stopPropagation();
		this.setState({
			selectedDate: date
		});
	};

	toggleCalendar = () => {
		this.setState({
			isCalendarOpen: !this.state.isCalendarOpen
		});
	};

	createTimeOptions = () => {
		const options = [];
		let hour = 8;
		while (hour <= 17) {
			options.push({
				label: `${hour < 10 ? '0' : ''}${hour}:00 Uhr bis ${hour + 1 < 10 ? '0' : ''}${hour + 1}:00 Uhr`,
				value: hour
			});

			++hour;
		}
		return options;
	};

	getFormattedCallTime = () => {
		const {callDate} = this.state;
		const {values} = this.props;

		const callDateTime = callDate;
		callDateTime.setHours(parseInt(values?.callTime?.value) || 0, 0, 0, 0);
		const formattedDate = new Intl.DateTimeFormat('de-DE', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit'
		}).format(callDateTime);
		const formattedTime = new Intl.DateTimeFormat('de-DE', {
			hour: '2-digit',
			minute: '2-digit'
		}).format(callDateTime);

		return `${formattedDate} ${formattedTime}`;
	};

	canSubmit = () => {
		const {values, syncErrors} = this.props;
		return values && !syncErrors;
	};

	render() {
		const {handleSubmit, values, callTimeID, heading, salesforceURL, salesforceOrgId, privacyPolicy, firstNameID, lastNameID, customerID, callBackCaseID, customer, retURL, submitCtaStyle} = this.props;
		const {callDate, selectedDate, isCalendarOpen} = this.state;

		return (
			<SalesforceForm handleSubmit={handleSubmit} canSubmit={this.canSubmit()} salesforceURL={salesforceURL}>
				<div className="container">
					<div className="adc-registration">
						<div className="adc-registration__heading">
							<h1 className="adc-title adc-title--blue text-center">{heading}</h1>
						</div>
						<div className="row justify-content-md-center">
							<div className="col-md-8">
								<div className="adc-registration__left pb-2 pb-md-2 pb-lg-0 position-relative">
									<div className="adc-form-group">
										<div className="row">
											<div className="col-md-6">
												<FirstNameField name={firstNameID} validationRules={[required]} />
											</div>
											<div className="col-md-6">
												<LastNameField name={lastNameID} validationRules={[required]} />
											</div>
										</div>
									</div>
									<div className="adc-form-group">
										<PhoneField validationRules={[required]} />
									</div>
									<div className="adc-form-group">
										<DatePickerField name="callDate" selectedDate={selectedDate}
											confirmedDate={callDate} onChange={this.handleChange}
											handleConfirm={this.handleConfirm}
											toggleCalendar={this.toggleCalendar}
											isCalendarOpen={isCalendarOpen}
											label="date_picker_label" validationRules={[required]} />
									</div>
									<div className="adc-form-group">
										<SelectFieldWithSearch className="adc-form-group__label"
											options={this.createTimeOptions()} name="callTime"
											label="time_picker_label" validationRules={[required]} />
									</div>
									<input type="hidden" name={callTimeID} value={this.getFormattedCallTime()} />
									<input type="hidden" name={customerID} value={customer?.id} />
									<input type="hidden" name={callBackCaseID} value="1" />
									<input type="hidden" name="orgid" value={salesforceOrgId} />
									<input type="hidden" name="retURL"
										value={retURL + `?firstName=${values && values[firstNameID]}&lastName=${values && values[lastNameID]}&callTime=${callDate && callDate.getTime()}`} />
									<div className="adc-checkboxList my-4">
										<CheckboxField
											name="privacyPolicy"
											label="privacy_policy_link_label"
											params={[privacyPolicy || '#']}
											validationRules={[required]}
										/>
									</div>
									<div className="row">
										<div className="col-12 col-md-8 mb-4">
											<RecaptchaField />
										</div>
										<div className="col-12 col-md-4">
											<p className="adc-registration--required mt-3 mb-4 text-right"><I18n
												text={'required_key'} /></p>
										</div>
										<div className="col-12 col-lg-8">
											<Button
												label={'submit_button_text'}
												ctaStyle={submitCtaStyle ? BUTTON_OPTIONS.STYLE[submitCtaStyle] : BUTTON_OPTIONS.STYLE.PRIMARY}
												type={BUTTON_OPTIONS.TYPE.SUBMIT}
												isFullWidth
												hasNoMargin
												action={empty.function}
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</SalesforceForm>
		);
	}
}));
