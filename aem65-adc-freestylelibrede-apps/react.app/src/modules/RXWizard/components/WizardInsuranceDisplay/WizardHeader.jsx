import React from 'react';
import PropTypes from 'prop-types';
import {i18nLabels} from '../../../../utils/translationUtils';
import {required} from '../../../Form/utils/validationRules';
import SelectFieldWithSearch from '../../../Form/components/GenericFields/SelectFieldWithSearch';
import Button, {BUTTON_OPTIONS} from '../../../Generic/components/Button/Button';
import {reduxForm} from 'redux-form';
import KVNRField from '../../../Form/components/FormFields/KVNRField';

const WizardHeader = ({sickfunds, hasKvnr, handleSubmit}) => {
	return <form onSubmit={handleSubmit}>
		<section className="adc-generic-widget__form">
			<div className="adc-form-group">
				<SelectFieldWithSearch
					className="adc-form-group__label"
					name={'payer_institution_name'}
					label={i18nLabels.INSURANCE}
					options={sickfunds}
					validationRules={[required]}
				/>
			</div>
			<div className={'adc-form-group'}>
				<KVNRField isDisabled={hasKvnr}/>
			</div>
			<Button
				className={'button-block text-center  mx-0'}
				label={i18nLabels.SAVE_CTA_STYLE}
				ctaStyle={BUTTON_OPTIONS.STYLE.PRIMARY}
				size={BUTTON_OPTIONS.SIZE.SMALL}
				type={BUTTON_OPTIONS.TYPE.SUBMIT}
				isFullWidth
			/>
		</section>
	</form>;
};

WizardHeader.propTypes = {
	sickfunds: PropTypes.array,
	handleSubmit: PropTypes.func,
	hasKvnr: PropTypes.bool,
};

export default reduxForm({
	form: 'insuranceRxForm',
	enableReinitialize: true
})(WizardHeader);