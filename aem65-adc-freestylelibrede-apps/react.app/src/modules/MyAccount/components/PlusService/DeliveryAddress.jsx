import React from 'react';
import AddressInformation from '../AddressInformation/AddressInformation';
import I18n from '../../../Translation/components/I18n';
import {i18nLabels} from '../../../../utils/translationUtils';
import PropTypes from 'prop-types';
import Link from '../../../Generic/components/Link/Link';

const DeliveryAddress = ({deliveryAddressInfo}) => {
	return (
		<>
			<p className="adc-plus-service__highlight float-left my-3">
				<I18n text={i18nLabels.DELIVERY_ADDRESS_HEADING}/>
			</p>
			<p className="my-3 float-right">
				<Link
					icon={'edit'}
					label={i18nLabels.CHANGE}
				/>
			</p>
			<div className="clearfix"/>
			<AddressInformation
				addressLabel={'Arbeit'}
				prefix={
					deliveryAddressInfo &&
					deliveryAddressInfo[0].deliveryAddress.salutation
				}
				firstname={deliveryAddressInfo && deliveryAddressInfo[0].deliveryAddress.firstName}
				lastname={deliveryAddressInfo && deliveryAddressInfo[0].deliveryAddress.lastName}
				street={deliveryAddressInfo && (deliveryAddressInfo[0].deliveryAddress.street +
							+deliveryAddressInfo[0].deliveryAddress.streetNumber)}
				postcode={deliveryAddressInfo && deliveryAddressInfo[0].deliveryAddress.zipCode}
				city={deliveryAddressInfo && deliveryAddressInfo[0].deliveryAddress.city}
			/>
		</>
	);
};

DeliveryAddress.propTypes = {
	deliveryAddressInfo: PropTypes.object
};

export default DeliveryAddress;
