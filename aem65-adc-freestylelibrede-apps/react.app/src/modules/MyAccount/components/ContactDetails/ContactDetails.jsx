import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../../../Generic/components/Icon/Icon';
import I18n from "../../../Translation/components/I18n";
import { i18nLabels } from '../../../../utils/translationUtils';
import { COMMUNICATION_CHANNEL_TYPES } from '../../../../utils/enums';
import { getCommunicationChannelDetail } from '../../../../utils/newsletterUtils';
import { COMMUNICATION_CHANNELS } from './permissionsMappings';

const ContactDetails = ({ communicationChannels, communicationType }) => {
	const valueMergedMasterData = Object.keys(COMMUNICATION_CHANNELS[communicationType]).map(obj => Object.assign({}, { masterChannel: obj }, communicationChannels?.find(user => obj === user.communication_channel)));

	const ContactIcon = valueMergedMasterData.filter(channel => channel?.subscriber_status !== 3).map((channel, index) => {
		const disableStyle =!channel.subscriber_status ? 'adc-edit-contact-details-disable' : '' ;
		return (
			<div className="" key={channel.masterChannel}>

				<div className={"adc-edit-contact-details-display " + disableStyle}>
					<Icon className={"adc-edit-contact-details-style-icon"}
						image={disableStyle ? getCommunicationChannelDetail(channel.masterChannel, "-grey").icon : getCommunicationChannelDetail(channel.masterChannel).icon}
						size={Icon.SIZE.SMALLER}
					/>
					<label className="adc-edit-contact-details-padding-lable" >
						<I18n text={getCommunicationChannelDetail(channel.masterChannel).i18nLabel} />
					</label>
					<if condition={communicationType == COMMUNICATION_CHANNEL_TYPES.NEWS && channel.communication_channel === COMMUNICATION_CHANNEL_TYPES.EMAIL && channel.subscriber_status === 1}>
						<Icon image={'status-red'} size={Icon.SIZE.SMALL} className={'ml-md-3'}>
							<div className="adc-tooltipbottom__content">
								<div className="row justify-content-center">
									<div className="col-10 font-weight-bold text-left"><I18n
										text={i18nLabels.SUBSCRIBED} /></div>
								</div>
							</div>
						</Icon>
					</if>
					<if condition={channel.subscriber_status}>
						<label className="" style={{ position: 'absolute', right: "30px", top: "4px" }} >
							<I18n text={i18nLabels.COMMUNICATION_CHANNEL_STATUS_ACTIVE} />
						</label>
						
						<img className='adc-edit-contact-details-active'></img>
					</if><else>
						<label className="" style={{ position: 'absolute', right: 0, top: "4px" }}>
							<I18n text={i18nLabels.COMMUNICATION_CHANNEL_STATUS_INACTIVE} />
						</label>
					</else>
				</div>
			</div>
		);
	});
	return <div >
		{ContactIcon}
	</div>;
};

ContactDetails.propTypes = {
	communicationChannels: PropTypes.array,
	communicationType: PropTypes.string
};

export default ContactDetails;