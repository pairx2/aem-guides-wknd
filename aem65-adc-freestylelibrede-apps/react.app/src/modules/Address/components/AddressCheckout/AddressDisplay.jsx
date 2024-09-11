import React from 'react';
import PropTypes from 'prop-types';
import I18n from '../../../Translation/components/I18n';
import {USER_PREFIX} from '../../../../utils/enums';

const AddressDisplay = ({address, defaultLabel}) => {
	const {prefix, firstname, lastname, street, postcode, city, country_name} = address;
	return (
		<div>
			<p className = 'font-weight-bold mb-1'><I18n text={defaultLabel}/></p>
			<p className="m-0">{(prefix?.toLowerCase() !== USER_PREFIX.DIVERS && prefix !== USER_PREFIX.HYPHEN)&& <I18n text={prefix}/>} {firstname} {lastname}</p>
			<p className="m-0">{`${street[0] || ''}`}</p>
			<p className="m-0">{`${street[1] || ''}`}</p>
			<p className="m-0">{postcode} {city}</p>
			<p className="m-0">{country_name}</p>
		</div>

	);
};
AddressDisplay.propTypes = {
	address: PropTypes.shape({
		prefix: PropTypes.string,
		firstname: PropTypes.string,
		lastname: PropTypes.string,
		street: PropTypes.array,
		postcode: PropTypes.string,
		city: PropTypes.string,
		country_name:PropTypes.string
	}),
	defaultLabel: PropTypes.string
};

AddressDisplay.defaultProps = {
	address: {
		street: []
	}
};

export default AddressDisplay;