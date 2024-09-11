import React from 'react';
import CheckboxField from '../../../Form/components/GenericFields/CheckboxField';
import {COMMUNICATION_CHANNELS} from './permissionsMappings';
import PropTypes from 'prop-types';
import {COMMUNICATION_CHANNEL_TYPES} from '../../../../utils/enums';
import {i18nLabels} from "../../../../utils/translationUtils";
import { getCommunicationChannelDetail } from '../../../../utils/newsletterUtils';

const EditContactDetails = ({isMobileVerified}) => {
	const editContactElement = Object.keys(COMMUNICATION_CHANNELS).map((channel)=> {
		return (
			<div key={`channel_${channel}`} className="py-4 w-100 d-inline-block adc-notification">
				
				<div >
					<div className="adc-checkboxList">
						{Object.keys(COMMUNICATION_CHANNELS[channel]).map((type) => {
							const label = "CONTACT_DETAILS_CHANNEL_TYPE_" + type;
							const iconClass = getCommunicationChannelDetail(type).icon;
							return (
								<CheckboxField
									key={`checkbox_${type}`}
									name={`${type}_FOR_${channel}`}
									label={i18nLabels[label]}
									hasRef={false}
									checkboxAlignment={'right'}
									iconClass={iconClass}
									containerClass = {"adc-edit-contact-details-padding"}
									typeOfNotification={type}
									isDisabled={channel === COMMUNICATION_CHANNEL_TYPES.PROACTIVE || (channel === COMMUNICATION_CHANNEL_TYPES.NEWS && type === COMMUNICATION_CHANNEL_TYPES.SMS && !isMobileVerified)}
								/>
								);
						})}
					</div>
				</div>
			</div>
		);
	});
	return <div>
		{editContactElement}
	</div>;
};
EditContactDetails.propTypes = {
	isMobileVerified: PropTypes.bool
};
export default EditContactDetails;