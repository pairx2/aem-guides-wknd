import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import SalutationField from '../../../Form/components/FormFields/SalutationField';
import FirstNameField from '../../../Form/components/FormFields/FirstNameField';
import LastNameField from '../../../Form/components/FormFields/LastNameField';
import StreetField from '../../../Form/components/FormFields/StreetField';
import AdditionalAddressField from '../../../Form/components/FormFields/AdditionalAddressField';
import PostCodeField from '../../../Form/components/FormFields/PostCodeField';
import CityField from '../../../Form/components/FormFields/CityField';
import RequiredFieldsDisclaimer from '../../../Form/components/RequiredFieldsDisclaimer';

const mapStateToProps = state => {
	const {postcode} = state.form.editSubscriptionForm?.values || state.form.editSubscriptionPaymentForm?.values || state.form.reactivateSubscriptionForm?.values || '';
	return {postcode};
};


const AddressEdit = ({postcode, showBorder}) => {
	return <div className={showBorder ? 'adc-title--border-bottom' : ''}>
		<div className="adc-form-group mt-3">
			<SalutationField/>
		</div>
		<div className="adc-form-group mt-3">
			<FirstNameField name={'firstname'}/>
		</div>
		<div className="adc-form-group mt-3">
			<LastNameField name={'lastname'}/>
		</div>
		<div className="adc-form-group mt-3">
			<StreetField showTypeahead postcode={postcode}/>
		</div>
		<div className="adc-form-group mt-3">
			<AdditionalAddressField/>
		</div>
		<div className="adc-form-group mt-3">
			<div className="row">
				<div className="col-5 col-md-4">
					<PostCodeField showTypeahead/>
				</div>
				<div className="col-7 col-md-8 ">
					<CityField showTypeahead postcode={postcode}/>
				</div>
			</div>
		</div>
		<RequiredFieldsDisclaimer/>
	</div>;
};

AddressEdit.propTypes = {
	postcode: PropTypes.string,
	showBorder: PropTypes.bool
};

export default connect(mapStateToProps, null)(AddressEdit);
