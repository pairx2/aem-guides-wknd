import React, {Component} from 'react';
import {reduxForm} from 'redux-form';
import {i18nLabels} from '../../../../utils/translationUtils';
import SelectFieldWithSearch from '../../../Form/components/GenericFields/SelectFieldWithSearch';
import {required} from '../../../Form/utils/validationRules';
import PropTypes from 'prop-types';
import Button, {BUTTON_OPTIONS} from '../../../Generic/components/Button/Button';
import KVNRField from '../../../Form/components/FormFields/KVNRField';

export default reduxForm({
	form: 'insuranceForm',
	enableReinitialize: true
})(class InsuranceEdit extends Component {
	static propTypes = {
		cancelEditInsuranceInfo: PropTypes.func,
		sickfunds: PropTypes.array,
		payerNumber: PropTypes.string,
		pristine: PropTypes.bool
	};

	state = {
		search: ''
	};

	render() {
		const {handleSubmit, sickfunds, payerNumber, pristine} = this.props;

		return <form onSubmit={handleSubmit}>
			<SelectFieldWithSearch
				className="adc-form-group__label"
				name={'payer_institution_name'}
				label={i18nLabels.INSURANCE_NAME_LABEL}
				options={sickfunds}
				validationRules={[required]}
			/>
			<KVNRField isDisabled={!!payerNumber}/>
			<div className="row py-4">
				<div className="col-12 col-md-6 pr-lg-2 pr-md-2 pr">
					<Button
						className={'button-block text-center  w-100 mx-0'}
						label={i18nLabels.ABORT_CTA_STYLE}
						ctaStyle={BUTTON_OPTIONS.STYLE.SECONDARY}
						size={BUTTON_OPTIONS.SIZE.SMALL}
						action={this.props.cancelEditInsuranceInfo}
					/>
				</div>
				<div className="col-12 col-md-6 mt-3 mt-md-0 pl-lg-2 pl-md-2 pl">
					<Button
						className={'button-block text-center w-100  mx-0'}
						label={i18nLabels.SAVE_CTA_STYLE}
						ctaStyle={BUTTON_OPTIONS.STYLE.PRIMARY}
						size={BUTTON_OPTIONS.SIZE.SMALL}
						type={BUTTON_OPTIONS.TYPE.SUBMIT}
						isDisabled={pristine}
					/>
				</div>
			</div>
		</form>;
	}
});