import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {FormSection, reduxForm} from 'redux-form';
import SalutationField from '../../../Form/components/FormFields/SalutationField';
import FirstNameField from '../../../Form/components/FormFields/FirstNameField';
import LastNameField from '../../../Form/components/FormFields/LastNameField';
import StreetField from '../../../Form/components/FormFields/StreetField';
import AdditionalAddressField from '../../../Form/components/FormFields/AdditionalAddressField';
import Row from '../../../Generic/components/Container/Row';
import Col from '../../../Generic/components/Container/Col';
import PostCodeField from '../../../Form/components/FormFields/PostCodeField';
import CityField from '../../../Form/components/FormFields/CityField';
import HiddenField from '../../../Form/components/GenericFields/HiddenField';
import RequiredFieldsDisclaimer from '../../../Form/components/RequiredFieldsDisclaimer';
import {i18nLabels} from '../../../../utils/translationUtils';
import CheckboxField from '../../../Form/components/GenericFields/CheckboxField';
import Button, {BUTTON_OPTIONS} from '../../../Generic/components/Button/Button';
import AddressSelectField from '../../../Form/components/FormFields/AddressSelectField';
import SelectFieldWithSearch from '../../../Form/components/GenericFields/SelectFieldWithSearch';
import {required} from '../../../Form/utils/validationRules';
import {COUNTRY_OPTIONS, DEFAULT_COUNTRY_OPTIONS, ADDRESS_TYPE} from '../../../../utils/enums';
import MessageBanner from '../../../Generic/components/MessageBanner/MessageBanner';


const mapStateToProps = state => {
	const {values} = state.form.addressEdit || {};
	return {values};
};

const AddressEdit = ({addressId, informationalMessage, onSubmit,isDisabled, handleSubmit, cancelEdit,addressType, values, canSave, hasTwoColumns, hasOnlyOneAddress}) => {
	const address = values?.["_"+addressId];
	const allowedCountries = COUNTRY_OPTIONS.filter(country => country.value !== 'GB');
	return <form onSubmit={handleSubmit(onSubmit)}>
		<FormSection name={"_" +addressId?.toString()}>
			<div className={hasTwoColumns ? 'row' : 'pb-3'}>
				<if condition={hasTwoColumns}>
					<Col>
						<Row>
							<Col lg={6}>
								<AddressSelectField
									name={'address_label'}
									isDisabled={isDisabled} />
								<SalutationField/>
								<FirstNameField name={'firstname'}/>
								<LastNameField name={'lastname'}/>
							</Col>
							<Col lg={6}>
								{address?.address_label === ADDRESS_TYPE.SHIPPING || addressType === ADDRESS_TYPE.SHIPPING ?
									<SelectFieldWithSearch
										className="adc-form-group__label"
										name={'country_name'}
										label={i18nLabels.COUNTRY_LABEL}
										options={allowedCountries}
										validationRules={[required]}
										placeholder={i18nLabels.COUNTRY_LABEL_PLACEHOLDER}
										defaultValue={DEFAULT_COUNTRY_OPTIONS[0]}
										isDisabled
									/>:
									<SelectFieldWithSearch
										className="adc-form-group__label"
										name={'country_name'}
										label={i18nLabels.COUNTRY_LABEL}
										options={allowedCountries}
										validationRules={[required]}
										placeholder={i18nLabels.COUNTRY_LABEL_PLACEHOLDER}
									/>
								}
								<Row>
									<Col md={4} className = "adc-card__margin">
										<PostCodeField showTypeahead={address?.country_name?.value === DEFAULT_COUNTRY_OPTIONS[0].value}/>
									</Col>
									<Col md={8} className = "adc-card__margin">
										<CityField showTypeahead={address?.country_name?.value === DEFAULT_COUNTRY_OPTIONS[0].value} postcode={address?.postcode}/>
									</Col>
								</Row>
								<StreetField name={'street.0'} showTypeahead={address?.country_name?.value === DEFAULT_COUNTRY_OPTIONS[0].value} postcode={address?.postcode}/>
								<AdditionalAddressField name={'street.1'}/>
							</Col>
						</Row>
					</Col>
				</if>
				<else>
					<AddressSelectField name={'address_label'} isDisabled={isDisabled}/>
					<SalutationField/>
					<FirstNameField name={'firstname'}/>
					<LastNameField name={'lastname'}/>
					{address?.address_label === ADDRESS_TYPE.SHIPPING || addressType === ADDRESS_TYPE.SHIPPING ?
						<SelectFieldWithSearch
							className="adc-form-group__label"
							name={'country_name'}
							label={i18nLabels.COUNTRY_LABEL}
							options={allowedCountries}
							validationRules={[required]}
							placeholder={i18nLabels.COUNTRY_LABEL_PLACEHOLDER}
							defaultValue={DEFAULT_COUNTRY_OPTIONS[0]}
							isDisabled
						/>:
						<SelectFieldWithSearch
							className="adc-form-group__label"
							name={'country_name'}
							label={i18nLabels.COUNTRY_LABEL}
							options={allowedCountries}
							validationRules={[required]}
							placeholder={i18nLabels.COUNTRY_LABEL_PLACEHOLDER}
						/>
					}
					<Row>
						<Col md={4}>
							<PostCodeField showTypeahead={address?.country_name?.value === DEFAULT_COUNTRY_OPTIONS[0].value}/>
						</Col>
						<Col md={8}>
							<CityField showTypeahead={address?.country_name?.value === DEFAULT_COUNTRY_OPTIONS[0].value} postcode={address?.postcode} />
						</Col>
					</Row>
					<StreetField name={'street.0'} showTypeahead={address?.country_name?.value === DEFAULT_COUNTRY_OPTIONS[0].value} postcode={address?.postcode} />
					<AdditionalAddressField name={'street.1'}/>
					<HiddenField name={'telephone'}/>
					<p className="adc-address-checkout__infotext">{informationalMessage}</p>
					<CheckboxField name={'default_shipping'} containerClass={address?.address_label === ADDRESS_TYPE.SHIPPING || addressType === ADDRESS_TYPE.SHIPPING?'':'d-none'} label={i18nLabels.MY_MAIN_SHIPPING_ADDRESS} isDisabled={hasOnlyOneAddress}/>
					<CheckboxField name={'default_billing'} containerClass={address?.address_label === ADDRESS_TYPE.SHIPPING || addressType === ADDRESS_TYPE.SHIPPING?'d-none':''} label={i18nLabels.MY_MAIN_BILLING_ADDRESS} isDisabled={hasOnlyOneAddress}/>
				</else>
				<if condition={hasTwoColumns}>
				<MessageBanner className={'mt-3 mb-3 custom-warning-msg'} icon={MessageBanner.ICON.ALERT} color={MessageBanner.COLOR.YELLOW} description={i18nLabels.ALERT_EDIT_ADDRESS_MESSAGE} />
					<Col>
						<RequiredFieldsDisclaimer/>
						<Row className='mt-4 d-flex align-items-center justify-content-center'>
							<Col md={6} lg={4}>
								<Button type={BUTTON_OPTIONS.TYPE.BUTTON} label={i18nLabels.CANCEL_CTA} isFullWidth
									ctaStyle={BUTTON_OPTIONS.STYLE.SECONDARY} hasNoMargin className={'mb-3'} action={cancelEdit}/>
							</Col>
							<Col md={6} lg={4}>
								<Button type={BUTTON_OPTIONS.TYPE.SUBMIT}
									label={address?.address_label === ADDRESS_TYPE.SHIPPING || addressType === ADDRESS_TYPE.SHIPPING?i18nLabels.SAVE_DELIVERY_ADDRESS_LABEL:i18nLabels.SAVE_BILLING_ADDRESS_LABEL}
									isFullWidth
									ctaStyle={BUTTON_OPTIONS.STYLE.PRIMARY} hasNoMargin className={'mb-3'} isDisabled={!canSave}/>
							</Col>
						</Row>
					</Col>
				</if>
				<else>
				<MessageBanner className={'mt-3 mb-3 custom-warning-msg'} icon={MessageBanner.ICON.ALERT} color={MessageBanner.COLOR.YELLOW} description={i18nLabels.ALERT_EDIT_ADDRESS_MESSAGE} />
					<RequiredFieldsDisclaimer/>
					<Button type={BUTTON_OPTIONS.TYPE.SUBMIT}
						label={address?.address_label === ADDRESS_TYPE.SHIPPING || addressType === ADDRESS_TYPE.SHIPPING?i18nLabels.SAVE_DELIVERY_ADDRESS_LABEL:i18nLabels.SAVE_BILLING_ADDRESS_LABEL}
						isFullWidth
						ctaStyle={BUTTON_OPTIONS.STYLE.PRIMARY} hasNoMargin className={'mb-3'} isDisabled={!canSave}/>
					<Button type={BUTTON_OPTIONS.TYPE.BUTTON} label={i18nLabels.CANCEL_CTA} isFullWidth
						ctaStyle={BUTTON_OPTIONS.STYLE.SECONDARY} hasNoMargin action={cancelEdit}/>
				</else>
			</div>
		</FormSection>
	</form>;
};

AddressEdit.propTypes = {
	addressId: PropTypes.number.isRequired,
	informationalMessage: PropTypes.string,
	onSubmit: PropTypes.func.isRequired,
	cancelEdit: PropTypes.func.isRequired,
	values: PropTypes.object,
	canSave: PropTypes.bool,
	hasTwoColumns: PropTypes.bool,
	hasOnlyOneAddress: PropTypes.bool,
	addressType:PropTypes.string,
	isDisabled:PropTypes.bool
};
AddressEdit.defaultProps = {
	canSave: true,
	hasTwoColumns: false,
	hasOnlyOneAddress: false,
	isDisabled:false
};
export default reduxForm({
	form: 'addressEdit',
	destroyOnUnmount: false,
	enableReinitialize: true
})(connect(mapStateToProps, null)(AddressEdit));