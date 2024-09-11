import React from 'react';
import I18n from '../../../Translation/components/I18n';
import PropTypes from 'prop-types';
import {i18nLabels} from '../../../../utils/translationUtils';
import Button, {BUTTON_OPTIONS} from '../../../Generic/components/Button/Button';
import {getCountryName} from '../../../../utils/orderUtils';
import {USER_PREFIX} from '../../../../utils/enums';

const AddressInformation = ({prefix, firstname, lastname, street, additionalAddress, postcode, city, country, hasAlternateAddressButton, alternateAddressButtonAction, maxAddressError}) => {
	return (
		<div className="adc-title--border-bottom mb-3">
			<p className='mb-1'>{(prefix?.toLowerCase() !== USER_PREFIX.DIVERS && prefix !== USER_PREFIX.HYPHEN)&& <I18n text={prefix}/>} {firstname} {lastname}</p>
			<p className='mb-1'>{`${street || ''}`}</p>
			<p className='mb-1'>{`${additionalAddress || ''}`}</p>
			<p className='mb-1'>{postcode} {city}</p>
			<p className='mb-1'>{getCountryName(country)}</p>
			<if condition={hasAlternateAddressButton}>
				<Button
					label={i18nLabels.ADD_ANOTHER_ADDRESS}
					ctaStyle={BUTTON_OPTIONS.STYLE.SECONDARY}
					className={'m-0 mt-5 mb-4'}
					isFullWidth
					action={alternateAddressButtonAction}
				/>
				<if condition={maxAddressError}>
					<span className="adc-form-group--error">
						<I18n text={i18nLabels.MAX_ADDRESSES_MESSAGE}/>
					</span>
				</if>
			</if>
		</div>
	);
};
AddressInformation.propTypes = {
	hasAlternateAddressButton: PropTypes.bool,
	prefix: PropTypes.string,
	firstname: PropTypes.string,
	lastname: PropTypes.string,
	street: PropTypes.string,
	additionalAddress: PropTypes.string,
	postcode: PropTypes.string,
	city: PropTypes.string,
	maxAddressError: PropTypes.string,
	country:PropTypes.string,
	alternateAddressButtonAction: PropTypes.func,
};
AddressInformation.defaultProps = {
	hasAlternateAddressButton: false
};
export default AddressInformation;