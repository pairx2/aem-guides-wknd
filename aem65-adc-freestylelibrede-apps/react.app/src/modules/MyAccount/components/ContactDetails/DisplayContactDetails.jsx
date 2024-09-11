import React from 'react';
import PropTypes from 'prop-types';
import ContactDetails from './ContactDetails';
import { COMMUNICATION_CHANNEL_TYPES } from '../../../../utils/enums';

const DisplayContactDetails = ({ permissions }) => {
	const userPermissions = permissions.filter(permission => permission.communication_type !== COMMUNICATION_CHANNEL_TYPES.PROACTIVE).map((permission, index) => {
		return (
			<div key={`permission_${permission.subscriber_status}`} className="adc-notification adc-border-bottom">

				<ContactDetails
					communicationChannels={permission?.communication_channels}
					communicationType={permission?.communication_type}
				/>
			</div>
		);
	});

	return <div>
		{userPermissions}
	</div>;
};
DisplayContactDetails.propTypes = {
	permissions: PropTypes.array
};
export default DisplayContactDetails;