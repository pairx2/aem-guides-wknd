import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { getDataInfo, getDateInPreferredLanguage } from '../../utils/common';
import { CommerceContext } from '../../context/CommerceContext';
import { useTranslation } from 'react-i18next';

const SubscriptionDetailsDataDisplay = ({ displayOutput = '', source }) => {
	const [commerceContext, setCommerceContext] = useContext(CommerceContext);
	const { t } = useTranslation();
	/* This can be exported to its own module and configurable if many more options to be added */
	const paymentCodes = {
		VI: 'Visa',
		MC: 'Mastercard',
	};

	const countryNames = {
		IE: 'Ireland',
	};

	const formatDate = (timestamp) =>
		getDateInPreferredLanguage(timestamp, {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
		});

	const sourceObj =
		source === 'null' || source === ''
			? `profile.items.subscriptionDetail`
			: `profile.items.subscriptionDetail.${source}`;

	const data = getDataInfo(commerceContext, sourceObj);

	const regex = /\$\{[^\}]*\}/g;
	const displayStr = displayOutput
		.replace(regex, (subStr) => {
		subStr = subStr.slice(2, -1);
		const hasData = !!(data && data[subStr]);
		const isPaymentType = subStr === 'payment_method';
		const isCountryCode = subStr === 'country_id';
		const isDateField = subStr === 'payment_date' || subStr === 'start_date' || subStr === 'last_order_date';
		const isStatus = subStr === 'status';	

		if (hasData && data.hasOwnProperty(subStr)) {
			if (!!(isPaymentType && paymentCodes[data[subStr]])) {
			return paymentCodes[data[subStr]];
			} else if (isPaymentType && !(paymentCodes[data[subStr]])) {
			return t([data[subStr]]);
			} else if (!!(isCountryCode && countryNames[data[subStr]])) {
			return countryNames[data[subStr]];
			} else if (isDateField) {
				return formatDate(data[subStr]);
			} else if (isStatus)    {
			return t(data[subStr]);
			}
			return data[subStr];
		}

		return '';
		})
		.replace(/^\s*[\r\n]/gm, '');
	(data?.status && document.querySelector('.subscription-status span').classList.add(data?.status));

	return displayStr ? (
		<p className="m-subscriptiondetails-datadisplay__list">
			{displayStr.split('\n').map((line) => <p>{line}</p>)}
		</p>
	) : null;
};

SubscriptionDetailsDataDisplay.propTypes = {
    displayOutput: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired,
};
  
export default SubscriptionDetailsDataDisplay;