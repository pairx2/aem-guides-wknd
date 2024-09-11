import React, {Component} from 'react';
import {reduxForm} from 'redux-form';
import I18n from '../../../Translation/components/I18n';
import SocialLoginButtons from '../Login/SocialLoginButtons';
import FirstNameField from '../../../Form/components/FormFields/FirstNameField';
import LastNameField from '../../../Form/components/FormFields/LastNameField';
import BirthDateField from '../../../Form/components/FormFields/BirthDateField';
import SalutationField from '../../../Form/components/FormFields/SalutationField';
import PropTypes from 'prop-types';
import {getUrlParameter} from '../../../../utils/getParams';
import {i18nLabels} from '../../../../utils/translationUtils';
import FieldList from '../../../Form/components/FieldList';
import Button, {BUTTON_OPTIONS} from '../../../Generic/components/Button/Button';
import Link from '../../../Generic/components/Link/Link';
import {BOOLEAN_STRING} from '../../../../utils/enums';
import {formStartSatellite} from '../../../../utils/adobeAnalyticsUtils';
import RecaptchaField from '../../../Form/components/GenericFields/RecaptchaField';

export default reduxForm({
	form: 'generalInfoForm',
	destroyOnUnmount: false,
	enableReinitialize: true
})(class GeneralInfoForm extends Component {

	static propTypes = {
		registrationHeading: PropTypes.string,
		registrationSubheading: PropTypes.string,
		continueCtastyle: PropTypes.string,
		loginLink: PropTypes.string,
		isEApply: PropTypes.bool,
		isAccountType: PropTypes.bool,
		isDisableRegistration: PropTypes.bool,
		isDisableSocialRegistration: PropTypes.bool
	};
	state = {
		formFields: [
			{
				component: SalutationField
			},
			{
				component: FirstNameField
			},
			{
				component: LastNameField
			}
		],
		isTrackingCalled : false
	};

	componentDidUpdate = (prevProps) => {
        if (!this.state.isTrackingCalled && this.props.generalInfoFormValues.prefix !== undefined) {
            formStartSatellite();
            this.setState({ isTrackingCalled: true });
        }
    }


	render() {
		const {registrationHeading, registrationSubheading, continueCtastyle, handleSubmit, loginLink, isEApply, isAccountType, isDisableRegistration, isDisableSocialRegistration} = this.props;
		const isSocialLogin = getUrlParameter('isSocialSignIn') === BOOLEAN_STRING.TRUE;
		const socialLoginCondition = (isSocialLogin || isDisableSocialRegistration) ? '6' :'8'
		
		const ghac = sessionStorage.getItem('ghac');
		const rxmc = sessionStorage.getItem('rxmc');
		const health_insurance_number = sessionStorage.getItem('insurenceId');
		return (
			<form onSubmit={handleSubmit}>
				<div className="container">
					<div className="adc-registration">
						<div className="adc-registration__heading">
							<h1 className="adc-title adc-title--blue text-center">{registrationHeading}</h1>
							<h5 className="adc-title adc-title--blue text-center mt-3">{registrationSubheading}</h5>
						</div>
						<div className="row align-items-center px-3 px-md-0 px-sm-0">
							<div className={`${isSocialLogin || isDisableSocialRegistration  ? 'col-lg-12' : 'col-lg-6'} col-md-12 col-sm-12 ${isDisableRegistration || isEApply ? 'offset-lg-3' : ''}`}>
								<div className="row justify-content-md-center">
									<div className={`col-md-${isEApply ? '12' : socialLoginCondition}`}>
										<div className="adc-registration__left pb-2 pb-md-2 pb-lg-0 position-relative">
											{!isDisableSocialRegistration && !isDisableRegistration && !isEApply && !isSocialLogin &&
												<div className="adc-registration__left__border-line position-absolute">
													<span className="adc-registration__left__border-line--text d-flex align-items-center justify-content-center position-absolute">
														<I18n text={i18nLabels.OR} />
													</span>
												</div>}
											<FieldList options = {this.state.formFields} />
											<BirthDateField isDisabled = {isAccountType}/>
											<p className="adc-registration--required mt-3 mb-4 text-right">
												<I18n text={i18nLabels.MANDATORY_FIELD} prefix={'* '} /></p>
											<div className="adc-registration--submit-btn">
												<Button
													label={i18nLabels.CONTINUE_CTA_TEXT}
													ctaStyle={continueCtastyle === BUTTON_OPTIONS.STYLE.PRIMARY ? BUTTON_OPTIONS.STYLE.PRIMARY : BUTTON_OPTIONS.STYLE.SECONDARY}
													className={isSocialLogin ? 'float-right col-md-6' :''}
													action={handleSubmit}
													hasNoMargin
													isFullWidth
												/>
											</div>
											<if condition={ghac && rxmc && health_insurance_number}>
							<div className={'mt-5'}>
								<RecaptchaField onLoadCall={this.props.bluedoorOnloadCall} />
							</div>
						</if>
											<if condition={!isSocialLogin}>
												<div className="text-center  pb-lg-4">
													<p className="m-0 adc-registration--info"><I18n
														text={i18nLabels.ALREADY_REGISTERED_TEXT} /></p>
													<div className="my-1">
														<Link href={loginLink} label={i18nLabels.SIGNIN_CTA_TEXT} />
													</div>
												</div>
											</if>
										</div>
									</div>
								</div>
							</div>
							<if condition={!isDisableSocialRegistration && !isDisableRegistration && !isEApply && !isSocialLogin}>
								<if condition={!isAccountType || (!isDisableRegistration && isAccountType)}>
									<div className="col-lg-6 col-md-12 col-sm-12">
										<div className="row justify-content-md-center mt-5 mt-md-5 mt-lg-0">
											<div className="col-md-8">
												<SocialLoginButtons
													facebookLabel={i18nLabels.REGISTER_WITH_FACEBOOK}
													googleLabel={i18nLabels.REGISTER_WITH_GOOGLE}
												/>
											</div>
										</div>
									</div>
								</if>
							</if>
						</div>
					</div>
				</div>
			</form>
		);
	}
});