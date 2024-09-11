import {COMMUNICATION_CHANNEL_TYPES, CONTACT_DETAILS_CHANNEL_TYPES} from './enums';
import {i18nLabels} from './translationUtils';

export const getCommunicationChannelDetail = (communicationChannel, isGrey= "") => {
	let communication_channel;
	switch (communicationChannel) {
		case COMMUNICATION_CHANNEL_TYPES.EMAIL:
			communication_channel={"icon" : 'email-icon'+isGrey,"i18nLabel" : i18nLabels.CONTACT_DETAILS_CHANNEL_TYPE_EMAIL};
			return communication_channel;
		case CONTACT_DETAILS_CHANNEL_TYPES.PHONE:
			communication_channel={"icon" : 'phone-call'+isGrey,"i18nLabel" : i18nLabels.CONTACT_DETAILS_CHANNEL_TYPE_PHONE};
			return communication_channel;
		case CONTACT_DETAILS_CHANNEL_TYPES.MAIL:
			communication_channel={"icon" : 'post-icon'+isGrey,"i18nLabel" : i18nLabels.CONTACT_DETAILS_CHANNEL_TYPE_MAIL};
			return communication_channel;
		case COMMUNICATION_CHANNEL_TYPES.SMS:
			communication_channel={"icon" : 'phone-sms'+isGrey,"i18nLabel" : i18nLabels.CONTACT_DETAILS_CHANNEL_TYPE_SMS};
			return communication_channel;
		default:
			communication_channel={"icon" : communicationChannel.toLowerCase() + '-icon-black', "i18nLabel" : communicationChannel};
			return communication_channel;
	}
};