import React from 'react';
import PropTypes from 'prop-types';
import SocialLoginButtons from './SocialLoginButtons';
import {i18nLabels} from '../../../../utils/translationUtils';
import I18n from '../../../Translation/components/I18n';
import Button, {BUTTON_OPTIONS} from '../../../Generic/components/Button/Button';

const RegistrationCard = ({signUpHeading, createAccountLink, createAccount, isDisableRegistration, isDisableSocialLogin}) => {
	return (
		<div className="col-lg-6">
			<div className="row justify-content-md-center">
				<div className="col-md-8">
					<h5 className="adc-title adc-title--black text-center pb-lg-4">{signUpHeading}</h5>
					<div className="mt-5 mt-md-4">
						<Button
							label={createAccount}
							ctaStyle={BUTTON_OPTIONS.STYLE.PRIMARY}
							href={createAccountLink}
							hasNoMargin
							isFullWidth
							className={'white-text ml-0'}
						/>
					</div>
					<if condition={!isDisableRegistration}>
						<if condition={!isDisableSocialLogin}>
							<div className="adc-login__oder-line">
								<span className="adc-login__oder-line--txt"><I18n text={i18nLabels.OR}/></span>
							</div>
						</if>
					</if>
				</div>
				<if condition={!isDisableRegistration}>
					<if condition={!isDisableSocialLogin}>
						<div className='col-md-8'>
							<SocialLoginButtons
								facebookLabel={i18nLabels.REGISTER_WITH_FACEBOOK}
								googleLabel={i18nLabels.REGISTER_WITH_GOOGLE}
							/>
						</div>
					</if>
				</if>
			</div>
		</div>
	);
};
RegistrationCard.propTypes = {
	signUpHeading: PropTypes.string,
	createAccountLink: PropTypes.string,
	createAccount: PropTypes.string,
	isDisableRegistration: PropTypes.bool,
	isDisableSocialLogin: PropTypes.bool
};
export default RegistrationCard;