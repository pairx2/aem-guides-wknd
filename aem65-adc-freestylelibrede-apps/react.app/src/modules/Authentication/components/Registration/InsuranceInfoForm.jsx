import React, {Component} from 'react';
import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import validate from './validate';
import I18n from '../../../Translation/components/I18n';
import RadioButtonReduxField from '../../../Form/components/GenericFields/RadioButtonReduxField';
import SelectFieldWithSearch from '../../../Form/components/GenericFields/SelectFieldWithSearch';
import {measurementOptions} from '../../../../utils/measureOptions';
import KVNRField from '../../../Form/components/FormFields/KVNRField';
import {i18nLabels} from '../../../../utils/translationUtils';
import {required} from '../../../Form/utils/validationRules';
import PropTypes from 'prop-types';
import {getSickfundsRequest} from '../../../SickFund/redux/actions/get_sickfunds.action';
import Button, {BUTTON_OPTIONS} from '../../../Generic/components/Button/Button';
import {empty} from '../../../../utils/default';
import Icon from '../../../Generic/components/Icon/Icon';
import {INSURANCE_KEY_TYPES, BOOLEAN_STRING} from '../../../../utils/enums';

const mapStateToProps = state => {
	const {selectInsurance} = state.form.insuranceInfoForm.values || {};
	const {sickfunds} = state.sickfundModuleReducer.SickfundReducer;
	return {selectInsurance, sickfunds};
};

const mapDispatchToProps = {
	getSickFunds: getSickfundsRequest
};

export default reduxForm({
	form: 'insuranceInfoForm',
	destroyOnUnmount: false,
	validate
})(connect(mapStateToProps, mapDispatchToProps)(class InsuranceInfoForm extends Component {

	componentDidMount(){
		const{sickfunds, getSickFunds} = this.props;
		sickfunds.length === 0 && getSickFunds();
	}

	static propTypes = {
		handleGoBack: PropTypes.func,
		selectInsurance: PropTypes.string,
		insuranceHeading: PropTypes.string,
		insuranceSubHeading: PropTypes.string,
		readerInfoText: PropTypes.string,
		insuranceBackCtaStyle: PropTypes.string,
		insuranceContinueCtaStyle: PropTypes.string,
		insuranceOptions: PropTypes.array,
		sickfunds: PropTypes.array,
		getSickFunds: PropTypes.func,
		isAccountType: PropTypes.bool,
		pristine:PropTypes.bool,
		readerInfoTextUnit: PropTypes.string
	};

	sickFundOptions = () => this.props.sickfunds ? this.props.sickfunds.map(sickFund => ({label: sickFund.insuranceName, value: {name: sickFund.insuranceName, insuranceID:sickFund.leadIKNumber, isSpecial: sickFund.isSpecialSickFund === BOOLEAN_STRING.TRUE ? true: false}})) : empty.array;

	selectInsuranceOptions = () => this.props.insuranceOptions.map(insurance => ({label: insurance.insuranceOption,	value: insurance.insuranceKey})) || empty.object;

	removedPublicInsuranceOptions = () => this.props.insuranceOptions.filter(insurance => insurance.insuranceKey !== INSURANCE_KEY_TYPES.PUBLIC).map(insurance => ({label: insurance.insuranceOption,	value: insurance.insuranceKey})) || empty.object;
	showBluedoorInsuranceOptions = () => this.props.insuranceOptions.filter(insurance => insurance.insuranceKey !== INSURANCE_KEY_TYPES.PRIVATE && insurance.insuranceKey !== INSURANCE_KEY_TYPES.CASHPAYER).map(insurance => ({label: insurance.insuranceOption, value: insurance.insuranceKey})) || empty.object;
	render() {
		const {handleGoBack, handleSubmit, insuranceHeading, insuranceSubHeading, readerInfoText, readerInfoTextUnit,  insuranceBackCtaStyle, insuranceContinueCtaStyle, selectInsurance, isAccountType, pristine} = this.props;
		const sickFundOption = this.sickFundOptions();
		return (
			<form onSubmit={handleSubmit}>
				<div className="container">
					<div className="adc-registration">
						<div className="adc-registration__heading">
							<h1 className="adc-title adc-title--blue  text-center">{insuranceHeading}</h1>
							<h5 className="adc-title adc-title--blue text-center mt-3 px-lg-0 px-sm-5">{insuranceSubHeading}</h5>
						</div>
						<div className="row align-items-center px-3 px-md-0 px-sm-0">
							<div className="col-lg-12 col-md-12 col-sm-12">
								<div className="row justify-content-md-center">
									<div className="col-lg-6 col-md-8">
										<div className="adc-form-group">
											<label className="adc-form-group__label mt-0">
												<I18n text={i18nLabels.SELECT_INSURANCE_LABEL} suffix={'*'}/>
											</label>
											<div className="btn-group adc-form-group__input-radio-group">
												<if condition = {isAccountType}>
													<RadioButtonReduxField
														name='selectInsurance'
														options={this.showBluedoorInsuranceOptions()}
														validationRules={[required]}/>
												</if>
												<else>
													<RadioButtonReduxField
														name='selectInsurance'
														options={sickFundOption.length > 0 ? this.selectInsuranceOptions() : this.removedPublicInsuranceOptions()}
														validationRules={[required]}/>
												</else>
											</div>
										</div>
										<p className="m-0 mt-2 adc-registration--required text-right">
											<I18n text={i18nLabels.MANDATORY_FIELD} prefix={'* '}/>
										</p>
										<div className="text-center mb-5 mt-4">
											<p className="m-0 adc-registration--info-2 px-5 ">{readerInfoTextUnit}
												<div className="align-top adc-wizard__tooltiptop">
													<Icon image={'info-box'} size={Icon.SIZE.SMALL} className={'align-middle ml-1 position-relative'} />
													<div className="adc-wizard__tooltiptop--content adc-registration__tooltiptop--content text-left p-2">
														<I18n text={i18nLabels.INSURANCE_READER_INFO_TEXT}/>
													</div>
												</div>
											</p>
										</div>
										<div className="adc-tab-container__grayBorderLine mb-4"/>
										<div className="adc-tab-container">
											{selectInsurance && <>
												{selectInsurance === INSURANCE_KEY_TYPES.PUBLIC && <>
													<div className="adc-form-group">
														<SelectFieldWithSearch
															options={sickFundOption}
															name="healthInsurance"
															label={i18nLabels.HEALTH_INSURANCE_LABEL}
															placeholder={i18nLabels.HEALTH_INSURANCE_PLACEHOLDER}
															validationRules={[required]}
															isDisabled={isAccountType}/>
													</div>
													<div className="adc-tab-container__grayBorderLine mb-5 mt-5"/>
												</>}
												<div className="adc-form-group">
													<label className="adc-form-group__label mt-0">
														<I18n text={i18nLabels.SELECT_MEASUREMENT_LABEL} suffix={'*'}/>
													</label>
													<div className="btn-group adc-form-group__input-radio-group">
														<RadioButtonReduxField
															name='measurementsOption'
															options={measurementOptions}
															validationRules={[required]}/>
													</div>
													<p className="m-0 mt-2 adc-registration--required text-right">
														<I18n text={i18nLabels.MANDATORY_FIELD} prefix={'* '}/>
													</p>
												</div>
												<div className="text-center mb-5 mt-4 ">
													<p className="m-0 adc-registration--info-2 px-4 ">{readerInfoText}
														<div className="align-top adc-wizard__tooltiptop">
															<Icon image={'info-box'} size={Icon.SIZE.SMALL} className={'align-middle ml-1 position-relative'} />
															<div className="adc-wizard__tooltiptop--content adc-registration__tooltiptop--content text-left p-2">
																<I18n text={i18nLabels.INSURANCE_FORM_HINT_INFO}/>
															</div>
														</div>
													</p>
												</div>
											</>}
											{selectInsurance === 'public' && <>
												<div className="adc-tab-container__grayBorderLine mb-4 mt-5"/>
												<div className="adc-form-group">
													<KVNRField isDisabled = {isAccountType}/>
												</div>
												<p className="m-0 mb-5 mt-3 adc-registration--required text-right">
													<I18n text={i18nLabels.MANDATORY_FIELD} prefix={'* '}/>
												</p>
											</>}
										</div>
										<div className="adc-registration--submit-btn">
											<div className="row">
												<div className="col-12 col-md-6">
													<Button
														label={i18nLabels.BACK_CTA_TEXT}
														ctaStyle={insuranceBackCtaStyle === BUTTON_OPTIONS.STYLE.PRIMARY ? BUTTON_OPTIONS.STYLE.PRIMARY : BUTTON_OPTIONS.STYLE.SECONDARY}
														action={handleGoBack}
														hasNoMargin
														isFullWidth
													/>
												</div>
												<div className="col-12 col-md-6 mt-3 mt-md-0">
													<Button
														label={i18nLabels.CONTINUE_CTA_TEXT}
														ctaStyle={insuranceContinueCtaStyle === BUTTON_OPTIONS.STYLE.PRIMARY ? BUTTON_OPTIONS.STYLE.PRIMARY : BUTTON_OPTIONS.STYLE.SECONDARY}
														type={BUTTON_OPTIONS.TYPE.SUBMIT}
														hasNoMargin
														isFullWidth
														isDisabled={pristine}
													/>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</form>
		);
	}
}));