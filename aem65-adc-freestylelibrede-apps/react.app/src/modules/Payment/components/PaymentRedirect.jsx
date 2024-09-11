import React from 'react';
import I18n from '../../Translation/components/I18n';
import {i18nLabels, useTranslation} from '../../../utils/translationUtils';
import PropTypes from 'prop-types';

const PaymentRedirect = ({title}) => {
	const translatedTitle = useTranslation(title);
	return <div className="row adc-payment__redirect">
		<p className="adc-payment__redirect-title">
			<I18n text={i18nLabels.REDIRECT_NOTICE_TITLE} />
		</p>
		<p className="font-12"><I18n text={i18nLabels.REDIRECT_NOTICE_DESCRIPTION} params={[translatedTitle]} /> </p>
	</div>;

};

PaymentRedirect.propTypes = {
	title: PropTypes.string
};

export default PaymentRedirect;