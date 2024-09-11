import React from 'react';
import {reduxForm, reset} from 'redux-form';
import {connect} from 'react-redux';
import PropsTypes from 'prop-types';
import I18n from '../../../Translation/components/I18n';
import PasswordStrengthFinder from '../../../Form/components/PasswordStrengthFinder/PasswordStrengthFinder';
import {validate} from './resetPasswordValidation';
import Link from '../../../Generic/components/Link/Link';
import Button, {BUTTON_OPTIONS} from '../../../Generic/components/Button/Button';
import {getUrlParameter} from '../../../../utils/getParams';


const mapStateToProps = state => {
	const {errorCode} = state.authenticationModuleReducer;
	return {errorCode};
};

export const resetPasswordFormField = (result, dispatch) => dispatch(reset('ResetPasswordForm'));

const ResetPasswordForm = ({resetPasswordHeading, resetPasswordSubheading, backToLogin, backToLoginUrl, submitCtaText, handleSubmit, hasServerSideError, serverSideErrorHandler, errorCode}) => {
	return (
		<div className="container">
			<div className="adc-passwordreset">
				<div className="adc-passwordreset__heading">
					<h1 className="adc-title adc-title--blue  pt-sm-3 pt-md-3 pt-lg-4 text-center">{resetPasswordHeading}</h1>
				</div>
				<div className="row justify-content-center align-items-center">
					<div className="adc-passwordreset__sub-heading col-12 col-md-10 col-xl-8">
						<h5 className="adc-title adc-title--blue text-center">{resetPasswordSubheading}</h5>
					</div>
				</div>
				<div className="row justify-content-center align-items-center mt-4">
					<div className="col-lg-5 col-md-10 col-12 px-xl-5">
						<form onSubmit={handleSubmit} className="mx-3">
							<if condition={hasServerSideError && errorCode}>
								<div className="mt-1">
									<span className="adc-form-group--error mt-4">
										<I18n text={'magento_error_code_' + errorCode}/>
									</span>
								</div>
							</if>
							<PasswordStrengthFinder
								hasServerSideError={hasServerSideError}
								serverSideErrorHandler={serverSideErrorHandler}
							/>
							<div className="mt-4">
								<Button
									className={'ml-0 lspacing'}
									label={submitCtaText}
									type={BUTTON_OPTIONS.TYPE.SUBMIT}
									ctaStyle={BUTTON_OPTIONS.STYLE.PRIMARY}
									size={BUTTON_OPTIONS.SIZE.LARGE}
									isFullWidth
									hasNoMargin
								/>
							</div>
							<div className="row justify-content-center my-3">
								<Link href={backToLoginUrl}
									hasNoMargin
									label={backToLogin}
									className="font-13"
								/>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

ResetPasswordForm.propTypes = {
	resetPasswordHeading: PropsTypes.string,
	resetPasswordSubheading: PropsTypes.string,
	backToLogin: PropsTypes.string,
	backToLoginUrl: PropsTypes.string,
	submitCtaText: PropsTypes.string,
	hasServerSideError: PropsTypes.bool,
	serverSideErrorHandler: PropsTypes.func,
	errorCode: PropsTypes.number
};

export default connect(mapStateToProps, null)(reduxForm({
	form: 'ResetPasswordForm',
	validate,
	initialValues: {
		confirmCode: getUrlParameter('key'),
		cid: getUrlParameter('id')
	},
	onSubmitSuccess: resetPasswordFormField
})(ResetPasswordForm));

