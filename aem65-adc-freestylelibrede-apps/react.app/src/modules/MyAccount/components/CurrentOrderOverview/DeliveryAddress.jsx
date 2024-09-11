import React from 'react';
import I18n from '../../../Translation/components/I18n';
import PropTypes from 'prop-types';
import {i18nLabels} from '../../../../utils/translationUtils';
import Button, {BUTTON_OPTIONS} from '../../../Generic/components/Button/Button';
import {splitAddressAndNumber} from '../../../../utils/regexUtils';
import {USER_PREFIX} from '../../../../utils/enums';

const DeliveryAddress = ({index, address, selectAddress}) => {
	const streetAndNumber = splitAddressAndNumber(address.street?.[0]);
	let defaultLabel;
	if(address?.default_shipping && !address?.default_billing) {
		defaultLabel = i18nLabels.DELIVERY_ADDRESS_HEADING;
	} else if (address?.default_billing && !address?.default_shipping){
		defaultLabel = i18nLabels.BILLING_ADDRESS_HEADING;
	}
	return (
		<div className='col-md-6 col-lg-4 d-flex flex-column justify-content-between'>
			<div className={'mx-3'}>
				<p className = 'font-weight-bold mb-1'><I18n text={defaultLabel}/></p>
				<p className='mb-1'>{(address?.prefix?.toLowerCase() !== USER_PREFIX.DIVERS && address?.prefix !== USER_PREFIX.HYPHEN) && <I18n text={address?.prefix}/>} {address.firstname} {address.lastname}</p>
				<p className='mb-1'>{`${streetAndNumber.street || ''} ${streetAndNumber.streetNumber || ''}`}</p>
				<p className='mb-1'>{address.postcode} {address.city}</p>
				<p className='mb-1'>{address.country_name}</p>
			</div>
			<div>
				<Button
					key={'address_' + index}
					action={() => selectAddress(address)}
					type={BUTTON_OPTIONS.TYPE.BUTTON}
					ctaStyle={BUTTON_OPTIONS.STYLE.PRIMARY}
					isFullWidth
					hasNoMargin
					label={i18nLabels.USE_THIS_ADDRESS}
					className='mt-4 mb-3'
				/>
			</div>
		</div>
	);
};

DeliveryAddress.propTypes = {
	address: PropTypes.object,
	selectAddress: PropTypes.func,
	index: PropTypes.number
};

export default DeliveryAddress;