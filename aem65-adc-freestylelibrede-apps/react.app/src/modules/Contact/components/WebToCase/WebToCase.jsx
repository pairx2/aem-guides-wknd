import React, {Component} from 'react';
import {connect} from 'react-redux';
import I18n from '../../../Translation/components/I18n';
import TextField from '../../../Form/components/GenericFields/TextField';
import {reduxForm} from 'redux-form';
import CheckboxField from '../../../Form/components/GenericFields/CheckboxField';
import EmailField, { fraudDomains } from '../../../Form/components/FormFields/EmailField';
import SelectFieldWithSearch from '../../../Form/components/GenericFields/SelectFieldWithSearch';
import RecaptchaField from '../../../Form/components/GenericFields/RecaptchaField';

import FirstNameField from '../../../Form/components/FormFields/FirstNameField';
import LastNameField from '../../../Form/components/FormFields/LastNameField';
import PostCodeField from '../../../Form/components/FormFields/PostCodeField';
import CityField from '../../../Form/components/FormFields/CityField';
import StreetField from '../../../Form/components/FormFields/StreetField';
import PhoneField from '../../../Form/components/FormFields/PhoneField';
import SalutationField from '../../../Form/components/FormFields/SalutationField';
import KVNRField from '../../../Form/components/FormFields/KVNRField';
import SalesforceForm from '../SalesforceForm/SalesforceForm';
import PropTypes from 'prop-types';

import {email, kvnr, required} from '../../../Form/utils/validationRules';
import Button, {BUTTON_OPTIONS} from '../../../Generic/components/Button/Button';
import {empty} from '../../../../utils/default';
import {i18nLabels} from '../../../../utils/translationUtils';

const mapStateToProps = state => {
	const {values, syncErrors} = state.form.webToCase || empty.object;
	const {dictionary} = state.translationModuleReducer.translationReducer;
	const {customer} = state.myAccountModuleReducer.GetCustomerReducer;

	return {values, syncErrors, dictionary, customer};
};

export default reduxForm({
	form: 'webToCase',
	destroyOnUnmount: false
})(connect(mapStateToProps, null)(class WebToCase extends Component {

	static propTypes = {
		values: PropTypes.object,
		syncErrors: PropTypes.object,
		productCategoryTags: PropTypes.array,
		heading: PropTypes.string,
		salesforceURL: PropTypes.string,
		salesforceOrgId: PropTypes.string,
		privacyPolicy: PropTypes.string,
		salutationID: PropTypes.string,
		firstNameID: PropTypes.string,
		lastNameID: PropTypes.string,
		kvnrID: PropTypes.string,
		customerID: PropTypes.string,
		emailID: PropTypes.string,
		zipcodeID: PropTypes.string,
		streetID: PropTypes.string,
		cityID: PropTypes.string,
		productCategoryID: PropTypes.string,
		contactCategoryID: PropTypes.string,
		contactReasonID: PropTypes.string,
		retURL: PropTypes.string,
		callBackCaseID: PropTypes.string,
		customer: PropTypes.object
	};

	level2TagSelected = (level, selectedTagL1) =>{
		if (level > 2) {
			const selectedTagL2 = selectedTagL1.children && selectedTagL1.children.find(tag => tag.value === values?.contactCategory.value);

			if (selectedTagL2) {
				return selectedTagL2.children && selectedTagL2.children.map(tag => ({
					label: tag.label,
					value: tag.value
				}));
			}
		} else {
			return selectedTagL1.children && selectedTagL1.children.map(tag => ({
				label: tag.label,
				value: tag.value
			}));
		}
	}

	buildFilterOptions = (level) => {
		const {values, productCategoryTags} = this.props;

		if (productCategoryTags) {
			if (level > 1) {
				const selectedTagL1 = productCategoryTags.find(tag => tag.value === values?.productCategory.value);
				if (selectedTagL1) {
					this.level2TagSelected(level, selectedTagL1)
				}
			} else {
				return productCategoryTags.map(tag => ({label: tag.label, value: tag.value}));
			}
		}
		return empty.array;
	};

	canSubmit = () => {
		const {values, syncErrors} = this.props;
		return values && !syncErrors;
	};

	render() {
		const {
			handleSubmit, values, heading, salesforceURL, salesforceOrgId, privacyPolicy, salutationID, firstNameID, lastNameID, kvnrID, customerID, emailID, zipcodeID, streetID, cityID,
			productCategoryID, contactCategoryID, contactReasonID, retURL, callBackCaseID, customer
		} = this.props;

		const productCategoryOptions = this.buildFilterOptions(1);
		const contactCategoryOptions = (values && values.productCategory) ? this.buildFilterOptions(2) : empty.array;
		const contactReasonOptions = (values && (values.productCategory && values.contactCategory)) ? this.buildFilterOptions(3) : empty.array;

		const genderOptions= [
			{
				value: 'Herr',
				label: i18nLabels.SALUTATION_MAN_LABEL
			},
			{
				value: 'Frau',
				label: i18nLabels.SALUTATION_WOMAN_LABEL
			},
			{
				value: 'Divers',
				label: i18nLabels.SALUTATION_OTHER_LABEL
			}
		];

		return (
			<SalesforceForm handleSubmit={handleSubmit} canSubmit={this.canSubmit()} salesforceURL={salesforceURL}>
				<div className="container">
					<div className="adc-registration">
						<div className="adc-registration__heading">
							<h1 className="adc-title adc-title--blue  text-center">{heading}</h1>
						</div>
						<div className="row justify-content-md-center">
							<div className="col-md-8">
								<div className="adc-registration__left pb-2 pb-md-2 pb-lg-0 position-relative">
									<div className="adc-form-group">
										<SalutationField name={salutationID} validationRule={[required]} options={genderOptions}/>
									</div>
									<div className="adc-form-group">
										<div className="row">
											<div className="col-md-6">
												<FirstNameField name={firstNameID} validationRule={[required]} />
											</div>
											<div className="col-md-6">
												<LastNameField name={lastNameID} validationRule={[required]} />
											</div>
										</div>
									</div>
									<div className="adc-form-group">
										<EmailField name={emailID} validationRules={[required, email,fraudDomains]} />
									</div>
									<div className="adc-form-group">
										<KVNRField name={kvnrID} validationRules={[kvnr]} />
									</div>
									<div className="adc-form-group">
										<div className="row">
											<div className="col-5 col-md-4">
												<PostCodeField name={zipcodeID} validationRules={empty.array} hasValidateIcon={false} showTypeahead/>
												<input type="hidden" name={zipcodeID} value={values && values[zipcodeID]}/>
											</div>
											<div className="col-7 col-md-8 ">
												<CityField name={cityID} validationRules={empty.array} hasValidateIcon={false} showTypeahead  postcode={values?.[zipcodeID]}/>
												<input type="hidden" name={cityID} value={values && values[cityID]}/>
											</div>
										</div>
									</div>
									<div className="adc-form-group">
										<StreetField name={streetID} validationRules={empty.array} hasValidateIcon={false} showTypeahead postcode={values?.[zipcodeID]}/>
										<input type="hidden" name={streetID} value={values && values[streetID]}/>
									</div>
									<div className="adc-form-group">
										<PhoneField />
									</div>
									<div className="adc-form-group">
										<SelectFieldWithSearch className="adc-form-group__label"
											options={productCategoryOptions} name="productCategory"
											label={i18nLabels.PRODUCT_CATEGORY_LABEL}
											validationRules={[required]}
											placeholder={i18nLabels.PRODUCT_CATEGORY_PLACEHOLDER} />
										<input type="hidden" name={productCategoryID}
											value={values && values.productCategory && values.productCategory.value} />
									</div>
									<div className="adc-form-group">
										<SelectFieldWithSearch className="adc-form-group__label"
											options={contactCategoryOptions} name="contactCategory"
											label={i18nLabels.CONTACT_CATEGORY_LABEL}
											validationRules={[required]}
											placeholder={i18nLabels.CONTACT_CATEGORY_PLACEHOLDER} />
										<input type="hidden" name={contactCategoryID}
											value={values && values.contactCategory && values.contactCategory.value} />
									</div>
									<div className="adc-form-group">
										<SelectFieldWithSearch className="adc-form-group__label"
											options={contactReasonOptions} name="contactReason"
											label={i18nLabels.CONTACT_REASON_LABEL}
											validationRules={[required]}
											placeholder={i18nLabels.CONTACT_REASON_PLACEHOLDER} />
										<input type="hidden" name={contactReasonID}
											value={values && values.contactReason && values.contactReason.value} />
									</div>
									<div className="adc-form-group">
										<TextField name="description" label="personalized_message_label"
											placeholder="personalized_message_typehint" type="textarea" />
									</div>
									<div className="adc-checkboxList mt-4 ml-4">
										<CheckboxField
											name="privacyPolicy"
											label="privacy_policy_link_label"
											params={[privacyPolicy || '#']}
											validationRules={[required]}
										/>
									</div>
									<input type="hidden" name={customerID} value={customer && customer.id}/>
									<input type="hidden" name={callBackCaseID} value="0"/>
									<input type="hidden" name="orgid" value={salesforceOrgId}/>
									<input type="hidden" name="retURL" value={retURL + `?firstName=${values && values[firstNameID]}&lastName=${values && values[lastNameID]}`}/>
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
												ctaStyle={BUTTON_OPTIONS.STYLE.PRIMARY}
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
