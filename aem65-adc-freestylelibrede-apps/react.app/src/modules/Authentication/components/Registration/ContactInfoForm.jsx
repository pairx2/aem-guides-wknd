import React from 'react';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import I18n from '../../../Translation/components/I18n';
import PostCodeField from '../../../Form/components/FormFields/PostCodeField';
import CityField from '../../../Form/components/FormFields/CityField';
import StreetField from '../../../Form/components/FormFields/StreetField';
import AdditionalAddressField from '../../../Form/components/FormFields/AdditionalAddressField';
import PhoneField from '../../../Form/components/FormFields/PhoneField';
import MobilePhoneField from '../../../Form/components/FormFields/MobilePhoneField';
import {i18nLabels} from '../../../../utils/translationUtils';
import { MOBILE_AND_LANDLINE_NUMBER_MAXLENGTH } from '../../../../utils/enums';

import PropTypes from 'prop-types';
import Button, {BUTTON_OPTIONS} from '../../../Generic/components/Button/Button';
import validate from '../../../Form/utils/phoneNumberValidation';

const mapStateToProps = state => {
	const {postcode} = state.form.contactInfoForm?.values || '';
	return {postcode};
};

const ContactInfoForm = ({handleGoBack, handleSubmit, contactHeading, contactSubHeading, informationalMsg, contactContinueCtaStyle, contactBackCtaStyle, initialValues, postcode}) => {
	const{landline_phone, mobile_phone} = initialValues || {};
	return (
		<form onSubmit={handleSubmit}>
			<div className="container">
				<div className="adc-registration">
					<div className="adc-registration__heading">
						<h1 className="adc-title adc-title--blue  text-center">{contactHeading}</h1>
						<h5 className="adc-title adc-title--blue text-center mt-3">{contactSubHeading}</h5>
					</div>
					<div className="row align-items-center px-3 px-md-0 px-sm-0">
						<div className="col-lg-12 col-md-12 col-sm-12">
							<div className="row justify-content-md-center">
								<div className="col-lg-6 col-md-8">
									<div className="adc-form-group mb-3">
										<div className="row">
											<div className="col-5 col-md-4">
												<PostCodeField showTypeahead />
											</div>
											<div className="col-7 col-md-8 ">
												<CityField showTypeahead postcode={postcode}/>
											</div>
										</div>
									</div>
									<div className="adc-form-group mb-3">
										<StreetField showTypeahead postcode={postcode}/>
									</div>
									<div className="adc-form-group mb-3">
										<AdditionalAddressField/>
									</div>
									<div className="adc-form-group mb-3">
										<MobilePhoneField label={i18nLabels.MOBILE_PHONE_LABEL_FOR_FIELD} defaultValue={mobile_phone?.[3]} defaultCountry={mobile_phone?.[2]?.iso2} defaultMaxLength={MOBILE_AND_LANDLINE_NUMBER_MAXLENGTH}/>
									</div>
									<div className="adc-form-group mb-3">
										<PhoneField label={i18nLabels.PHONE_LABEL_FOR_FIELD} defaultValue={landline_phone?.[3]} defaultCountry={landline_phone?.[2]?.iso2} defaultMaxLength={MOBILE_AND_LANDLINE_NUMBER_MAXLENGTH}/>
									</div>
									<p className="adc-registration--required mt-3 mb-4 text-right">
										<I18n text={i18nLabels.MANDATORY_FIELD} prefix={'* '}/>
									</p>
									<p className="adc-registration--required mb-4 text-right">
										<I18n text={i18nLabels.MANDATORY_CONTACT_NUMBER_LABEL} prefix={'** '}/>
									</p>
									<div className="text-center">
										<p className="m-0 adc-registration--info-2">{informationalMsg}</p>
									</div>
									<div className="adc-registration--submit-btn mt-5">
										<div className="row">
											<div className="col-12 col-md-6">
												<Button
													label={i18nLabels.BACK_CTA_TEXT}
													ctaStyle={contactBackCtaStyle === BUTTON_OPTIONS.STYLE.PRIMARY ? BUTTON_OPTIONS.STYLE.PRIMARY : BUTTON_OPTIONS.STYLE.SECONDARY}
													action={handleGoBack}
													hasNoMargin
													isFullWidth
												/>
											</div>
											<div className="col-12 col-md-6 mt-3 mt-md-0">
												<Button
													label={i18nLabels.CONTINUE_CTA_TEXT}
													ctaStyle={contactContinueCtaStyle === BUTTON_OPTIONS.STYLE.PRIMARY ? BUTTON_OPTIONS.STYLE.PRIMARY : BUTTON_OPTIONS.STYLE.SECONDARY}
													action={handleSubmit}
													hasNoMargin
													isFullWidth
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
};

ContactInfoForm.propTypes = {
	handleGoBack: PropTypes.func,
	contactHeading: PropTypes.string,
	contactSubHeading: PropTypes.string,
	informationalMsg: PropTypes.string,
	contactContinueCtaStyle: PropTypes.string,
	contactBackCtaStyle: PropTypes.string,
	postcode: PropTypes.string,
	initialValues: PropTypes.object
};

export default reduxForm({
	form: 'contactInfoForm',
	destroyOnUnmount: false,
	validate
})(connect(mapStateToProps, null)(ContactInfoForm));
