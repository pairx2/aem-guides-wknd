import React from 'react';
import Button, {BUTTON_OPTIONS} from '../../../Generic/components/Button/Button';
import {getSocialResponse} from '../../../../api/authentication.service';
import PropTypes from 'prop-types';
import { SOCIAL_PROVIDER } from '../../../../api/esl.auth.service';

const SocialLoginButtons = ({facebookLabel,googleLabel}) => {
	return (
		<div>
			<Button
				label={facebookLabel}
				ctaStyle={BUTTON_OPTIONS.STYLE.SECONDARY}
				type={BUTTON_OPTIONS.TYPE.BUTTON}
				hasNoMargin
				isFullWidth
				icon={'facebook'}
				className={'adc-button--social uppercase mb-3 ml-0'}
				action={() => getSocialResponse(SOCIAL_PROVIDER.FACEBOOK.PROVIDER)}
			/>
			<Button
				label={googleLabel}
				ctaStyle={BUTTON_OPTIONS.STYLE.SECONDARY}
				type={BUTTON_OPTIONS.TYPE.BUTTON}
				hasNoMargin
				isFullWidth
				icon={'google'}
				className={'adc-button--social uppercase ml-0'}
				action={() => getSocialResponse(SOCIAL_PROVIDER.GOOGLE.PROVIDER)}
			/>
		</div>
	);
};

SocialLoginButtons.propTypes = {
	facebookLabel: PropTypes.string,
	googleLabel: PropTypes.string
};

export default SocialLoginButtons;