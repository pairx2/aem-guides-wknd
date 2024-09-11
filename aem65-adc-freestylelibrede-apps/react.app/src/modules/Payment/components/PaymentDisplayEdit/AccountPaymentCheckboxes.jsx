import React from 'react';
import PropTypes from 'prop-types';
import RequiredFieldsDisclaimer from '../../../Form/components/RequiredFieldsDisclaimer';
import {i18nLabels} from '../../../../utils/translationUtils';
import I18n from '../../../Translation/components/I18n';

const AccountPaymentCheckboxes = ({isPayon}) => {
	return (
		<div id="adc-account__checkboxes" className={isPayon ? 'd-none mt-3' : 'mt-3'}>
			<div className={isPayon ? 'mt-3' : ''}>
				<div className="submit-checkout__checkbox">
					<label className="checkbox-container">
						<p><I18n text={i18nLabels.SAVE_AS_DEFAULT_PAYMENT_METHOD}/></p>
						<input
							type="checkbox"
							name={'customParameters[SHOPPER_isDefaultPaymentMethod]'}
							className="checkbox-container__input" value="true"/>
						<span className="checkbox-container__checkmark"/>
					</label>
				</div>
			</div>
			<if condition={!isPayon}>
				<input type="hidden" name="isOpenInvoice" value="true"/>
				<RequiredFieldsDisclaimer/>
			</if>
		</div>
	);
};

AccountPaymentCheckboxes.propTypes = {
	isPayon: PropTypes.bool
};

export default AccountPaymentCheckboxes;