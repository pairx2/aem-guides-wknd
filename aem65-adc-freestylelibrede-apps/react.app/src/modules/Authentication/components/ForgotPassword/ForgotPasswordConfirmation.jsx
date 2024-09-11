import React from 'react';
import PropsTypes from 'prop-types';
import Icon from '../../../Generic/components/Icon/Icon';
import Link from '../../../Generic/components/Link/Link';

const ForgotPasswordConfirmation = ({
	confirmationPageHeading,
	confirmationPageSubheading,
	readerInformationalText,
	backToLogin,
	backToLoginUrl,
}) => {
	return (
		<div className="adc-passwordreset">
			<div className="adc-passwordreset__heading">
				<h1 className="adc-title adc-title--blue pt-5 text-center">{confirmationPageHeading}</h1>
			</div>

			<div className="row justify-content-center align-items-center">
				<div className="adc-passwordreset__sub-heading col-12 col-md-10 col-xl-8">
					<h5 className="adc-title adc-title--blue text-center">{confirmationPageSubheading}</h5>
				</div>
			</div>

			<div className="text-center mt-3">
				<Icon image={'email-large-desktop'} size={Icon.SIZE.LARGER}/>
			</div>
			<div className="row justify-content-center align-items-center">
				<div className="adc-passwordreset__reset-message mt-3 text-center col-10 col-xl-6">
					{readerInformationalText}
				</div>
			</div>
			<div className="my-3 text-center adc-passwordreset__link-text">
				<Link href={backToLoginUrl}
					  hasNoMargin
					  label={backToLogin}
				/>
			</div>
		</div>
	);
};
ForgotPasswordConfirmation.propTypes = {
	confirmationPageHeading: PropsTypes.string,
	readerInformationalText: PropsTypes.string,
	confirmationPageSubheading: PropsTypes.string,
	backToLogin: PropsTypes.string,
	backToLoginUrl: PropsTypes.string,
};
export default ForgotPasswordConfirmation;
