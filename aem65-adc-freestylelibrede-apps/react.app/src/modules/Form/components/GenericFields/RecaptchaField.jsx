import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {Field} from 'redux-form';
import {required} from '../../utils/validationRules';
import ReCAPTCHA from 'react-google-recaptcha';
import {getRequiredSiteData} from '../../../../utils/siteData';
import {getUrlParameter} from '../../../../utils/getParams';
import {DEFAULT_COUNTRY_OPTIONS, INVISIBLE_RECAPTCHA_SIZE, RECAPTCHA_SITE_KEY_ENUM, RECAPTCHA_SITE_SRC_ENUM} from '../../../../utils/enums';
import I18n from '../../../Translation/components/I18n';
import { i18nLabels } from '../../../../utils/translationUtils';

export const RecaptchaRenderField = ({input, meta: {touched, error}}) => {
	const siteKey = getRequiredSiteData('recaptchaSiteKey');
	return (
		siteKey ? <>
			<ReCAPTCHA
				sitekey={siteKey}
				onChange={input.onChange}
				hl={DEFAULT_COUNTRY_OPTIONS[0].country_code}
			/>
			{touched && (error && <span className="adc-form-group--error">{error}</span>)}
		</>:null
	);
};

export const RecaptchaRenderFieldInvisible = ({ input,onLoadCall, meta: { touched, error } }) => {
	const siteKey = getRequiredSiteData(RECAPTCHA_SITE_KEY_ENUM);
  
	useEffect(() => {
	  if (siteKey) {
		const script = document.createElement('script');
		script.src = getRequiredSiteData(RECAPTCHA_SITE_SRC_ENUM);
		script.async = true;
		script.defer = true;
		document.head.appendChild(script);
  
		script.onload =  () => {
			  const current = window.setInterval(() => {
			if (window?.grecaptcha?.enterprise?.render && window?.grecaptcha?.enterprise?.ready) {
				clearInterval(current)
				window?.grecaptcha?.enterprise?.render('recaptcha-widget', {
					sitekey: siteKey,
					size: INVISIBLE_RECAPTCHA_SIZE,
					callback: input.onChange,
					hl: DEFAULT_COUNTRY_OPTIONS[0].country_code,
				  });
				  if (onLoadCall && window.grecaptcha.enterprise ) {
					 window?.grecaptcha?.enterprise?.execute().then(function (token){
						onLoadCall()
					});
					
				  }
			}
		  }, 300);
		 
		};
	  }
	}, [siteKey, input.onChange]);
  
	return (
		<>
		<p className='recaptcha-disclamer' ><I18n text={i18nLabels.INVISIBLE_RECAPTCHA_DISCLAIMER} /></p>
		<div id="recaptcha-widget" className='adc-invisible-captcha'></div>
	  
		</>
	);
  };

const RecaptchaField = ({name, validationRules,onLoadCall}) => {
	const byPass = getRequiredSiteData('recaptchaBypass') && getUrlParameter('bypass');
	
	const onChange = (value) => {
		if(value) localStorage.setItem('recaptchaValue',value);
	};
	
	return (
		<Field
			name={name}
			component={RecaptchaRenderFieldInvisible}
			validate={byPass ? undefined : validationRules}
			onChange={onChange}
			onLoadCall={onLoadCall}
		/>
	);
};
RecaptchaField.propTypes = {
	name: PropTypes.string,
	validationRules: PropTypes.array,
	onLoadCall: PropTypes.func
};

RecaptchaField.defaultProps = {
	name:'recaptchaValue',
	validationRules: []
};
export default RecaptchaField;