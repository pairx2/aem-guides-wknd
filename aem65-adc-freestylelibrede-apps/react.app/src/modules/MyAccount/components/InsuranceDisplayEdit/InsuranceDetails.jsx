import React from 'react';
import I18n from '../../../Translation/components/I18n';
import {i18nLabels} from '../../../../utils/translationUtils';
import Icon from '../../../Generic/components/Icon/Icon';
import PropTypes from 'prop-types';
import Link from '../../../Generic/components/Link/Link';
import SickFundInformation from '../../../RXWizard/components/WizardInsuranceDisplay/SickFundInformation';
import {isRxCheckoutPageType} from '../../../../utils/pageTypeUtils';

const InsuranceDetails = ({payerNumber, payerInstitutionName, editInsuranceInfo, selectedInsurancePDF, selectedInsuraceInfo}) => {
	return <section className="mt-4">
		<div className="w-40 float-left adc-generic-widget--font-medium-bold"><I18n text={i18nLabels.INSURANCE} suffix={':'}/></div>
		<div className="w-60 float-right text-right d-inline-block position-relative">{payerInstitutionName}
			<div className="align-top adc-wizard__tooltiptop adc-tooltiptop__insurance-details">
				<Icon
					image={'info-box'}
					size={Icon.SIZE.SMALL}
					className={'align-middle ml-1 position-relative'}
				/>
				<div className="adc-wizard__tooltiptop--content adc-tooltiptop__insurance-details--content text-left p-2">
					<I18n text={i18nLabels.INSURANCE_HINT_INFO}/>
				</div>
			</div>
		</div>
		<div className="w-100 d-inline-block mt-3">
			<div className="w-50 float-left adc-generic-widget--font-medium-bold"><I18n text={i18nLabels.INSURANCE_NUMBER_LABEL} suffix={':'}/></div>
			<div className="w-50 float-right text-right">{payerNumber}</div>
		</div>
		<if condition={isRxCheckoutPageType()}>
			<SickFundInformation
				selectedInsurancePDFs={selectedInsurancePDF}
				selectedInsuraceInfo={selectedInsuraceInfo}
			/>
		</if>
		<div className="w-100 d-inline-block text-right border-top-grey mt-4 pt-3">
			<Link
				action={editInsuranceInfo}
				icon={'arrow-forth-blue'}
				label={i18nLabels.EDIT}
			/>
		</div>
	</section>;
};

InsuranceDetails.propTypes = {
	payerNumber: PropTypes.string,
	payerInstitutionName: PropTypes.string,
	editInsuranceInfo: PropTypes.func,
	selectedInsurancePDF: PropTypes.array,
	selectedInsuraceInfo: PropTypes.string
};

export default InsuranceDetails;