import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {reduxForm} from 'redux-form';
import EmailField, { fraudDomains } from '../../Form/components/FormFields/EmailField';
import Row from '../../Generic/components/Container/Row';
import Icon from '../../Generic/components/Icon/Icon';
import Button, {BUTTON_OPTIONS} from '../../Generic/components/Button/Button';
import Container from '../../Generic/components/Container/Container';
import {Title} from '../../Generic/components/Title/Title';
import Col from '../../Generic/components/Container/Col';
import {i18nLabels} from '../../../utils/translationUtils';
import CheckboxField from '../../Form/components/GenericFields/CheckboxField';
import {email, required} from '../../Form/utils/validationRules';
import {subscribeToNewsletter} from '../redux/actions/subscribe_to_newsletter.action';
import MessageBanner from '../../Generic/components/MessageBanner/MessageBanner';
import I18n from '../../Translation/components/I18n';
import RecaptchaField from '../../Form/components/GenericFields/RecaptchaField';

const mapStateToProps = state => {
	const {isSubscriptionSuccessful, error} = state.newsletterReducer.SubscribeToNewsletterReducer;
	return {isSubscriptionSuccessful, error};
};

const mapDispatchToProps = {
	subscribeToNewsletter
};

const NewsletterSignup = ({heading, subheading, privacyPolicy,termsAndConditions, handleSubmit, isSubscriptionSuccessful, error,subscribeToNewsletter}) => {
	const registerForNewsletter = async (values) => {
		await window?.grecaptcha?.enterprise?.execute().then(function (token){
			subscribeToNewsletter({
				email: values.email
			});
		});
		
	};
	return (
		<Container className={'py-5 newsletter-container'}>
			<div className={'d-flex justify-content-center'}>
				<div className={'adc-icon-container'}>
					<Icon image={'email-white'} size={Icon.SIZE.LARGER} style={Icon.STYLE.COVER}/>
				</div>
			</div>
			<Row className={'mt-3'}>
				<Title text={heading} className={'col-12 col-md-10 offset-md-1'} size={Title.SIZE.H3}
					   color={Title.COLOR.BLUE} isCentered/>
				<Title text={subheading} className={'col-12 col-md-10 offset-md-1'} size={Title.SIZE.H5}
					   color={Title.COLOR.BLUE}  isCentered/>
			</Row>

			<if condition={isSubscriptionSuccessful}>
				<MessageBanner color={MessageBanner.COLOR.GREEN} icon={MessageBanner.ICON.SUCCESS}
							   description={i18nLabels.NEWSLETTER_SUCCESS} className={'mb-3'}/>
			</if>
			<else>
				<if condition={isSubscriptionSuccessful === false}>
					<MessageBanner color={MessageBanner.COLOR.RED} icon={MessageBanner.ICON.FAILURE}
								   description={error} />
				</if>
				<form onSubmit={handleSubmit(registerForNewsletter)}>
					<Row className={'align-items-start'}>
						<Col lg={6} md={9} offsetLg={2} className={'px-md-0'}>
							<EmailField hasValidateIcon validationRules={[required,email,fraudDomains]}/>
							<CheckboxField label={i18nLabels.PRIVACY_POLICY_LINK_LABEL} params={[privacyPolicy,termsAndConditions|| '#']}
										   name={'newsletterSignup--privacy'} validationRules={[required]} hasRef={false}/>
										   <div className={'mt-4'}>
											<RecaptchaField />
										</div>
						</Col>
						<Col md={2} className={'mb-0 mt-md-4'}>
							<Button label={i18nLabels.REGISTER_NEWSLETTER} type={BUTTON_OPTIONS.TYPE.SUBMIT}
								className={'ml-0 mr-0 mb-0 adc-newsletter__register'}/>
						</Col>
					</Row>
				</form>
				<div className="col-12 col-md-9 col-lg-6 offset-lg-2 px-md-0 pt-3">
				<span className="adc-newsletter-required">
				   <I18n text={i18nLabels.MANDATORY_FIELD} prefix={'*'}/>
				</span>
			</div>
			</else>
			
		</Container>
	);
};

NewsletterSignup.propTypes = {
	heading: PropTypes.string,
	subheading: PropTypes.string,
	privacyPolicy: PropTypes.string,
	subscribeToNewsletter: PropTypes.func,
	isSubscriptionSuccessful: PropTypes.bool,
	error: PropTypes.object
};

export default reduxForm({
	form: 'newsletterSignup',
	destroyOnUnmount: false
})(connect(mapStateToProps, mapDispatchToProps)(NewsletterSignup));