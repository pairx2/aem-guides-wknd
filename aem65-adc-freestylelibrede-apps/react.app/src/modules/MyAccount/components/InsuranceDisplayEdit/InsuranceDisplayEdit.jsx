import React, {Component} from 'react';
import {connect} from 'react-redux';
import InsuranceDetails from './InsuranceDetails';
import InsuranceEdit from './InsuranceEdit';
import NoInsuranceDetails from './NoInsuranceDetails';
import {updateInsuranceRequest, updatePayerRequest, customerMobileUpdateRequest} from '../../redux/actions/customer.action';
import {Card, CardContent} from '../../../Generic/components/Card/Card';
import I18n from '../../../Translation/components/I18n';
import PropTypes from 'prop-types';
import {getSickfundsRequest} from '../../../SickFund/redux/actions/get_sickfunds.action';
import {isRxCheckoutPageType} from '../../../../utils/pageTypeUtils';
import {openModalAction} from '../../../Modal/redux/actions/index';

const mapStateToProps = state => {
	const {customer, error, isPayerConfirmationAccepted} = state.myAccountModuleReducer.GetCustomerReducer;
	const {sickfunds} = state.sickfundModuleReducer.SickfundReducer;
	return {customer, sickfunds, error, isPayerConfirmationAccepted};
};

const mapDispatchToProps = {
	updateInsuranceRequest,
	customerMobileUpdateRequest,
	getSickFunds: getSickfundsRequest,
	openModalAction,
	updatePayerRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(class InsuranceDisplayEdit extends Component {

	static propTypes = {
		heading: PropTypes.string,
		infoIcon: PropTypes.string,
		noInsuranceDescription: PropTypes.string,
		noInsuranceHeading: PropTypes.string,
		noInsuranceIcon: PropTypes.string,
		secureDataMessage: PropTypes.string,
		secureIcon: PropTypes.string,
		customer: PropTypes.object,
		sickfunds: PropTypes.array,
		updateInsuranceRequest: PropTypes.func,
		customerMobileUpdateRequest: PropTypes.func,
		getSickFunds: PropTypes.func,
		error: PropTypes.number,
		openModalAction: PropTypes.func,
		isPayerConfirmationAccepted: PropTypes.bool,
		updatePayerRequest: PropTypes.func,
		modelHeading: PropTypes.string,
		description: PropTypes.string,
		buttonLabel: PropTypes.string,
	};

	state = {
		isEditing: false,
		showKVNRExistsError: false
	};

	componentDidMount() {
		this.props.getSickFunds();
	}
	componentDidUpdate(prevProps) {
		const {customer, error, isPayerConfirmationAccepted} = this.props;
		if(!error && customer?.payer_institution_name !== prevProps.customer?.payer_institution_name && customer?.payer_institution_name) {
			this.toggleEditing(false);
		}
		else if(isPayerConfirmationAccepted != prevProps.isPayerConfirmationAccepted && isPayerConfirmationAccepted){
			this.toggleEditing(true);
		}
	 }

	submit = (value) => {
		const {customerMobileUpdateRequest, updateInsuranceRequest} = this.props;
		this.setState({
			showKVNRExistsError: true
		});
		const {sickfunds} = this.props;
		const updatedValue = {
			...value,
			payer_institution_name: value.payer_institution_name.value,
			payer_number: sickfunds?.find(sickfund => sickfund.insuranceName.toLowerCase() === value.payer_institution_name.value.toLowerCase())?.leadIKNumber,
			health_insurance_number: value.kvnr
		};
		customerMobileUpdateRequest(false);
		updateInsuranceRequest(updatedValue);
	};

	toggleEditing = (isEditing) => {
		this.setState({
			isEditing: isEditing
		});
		if(!isEditing) {
			this.setState({
				showKVNRExistsError: false
			});
		}
	};

	openModal = () => {
		const {modelHeading, description, buttonLabel, updatePayerRequest, openModalAction} = this.props;
		updatePayerRequest();
		openModalAction({
			heading: modelHeading,
			contentID: 'insuranceDisplayEditModal',
			props: {
				insuranceDisplayHeading: description,
				insuranceDisplayButtonText: buttonLabel,
			}
		});
	}

	render() {
		const {heading, infoIcon, noInsuranceDescription, noInsuranceHeading, noInsuranceIcon, secureDataMessage, secureIcon, customer, sickfunds, error} = this.props;
		const {isEditing, showKVNRExistsError} = this.state;

		return <Card title={heading}>
			<CardContent>
				<if condition={isEditing}>
					<if condition={error && showKVNRExistsError}>
						<span className="adc-form-group--error">
							<I18n text={'magento_error_code_' + error}/>
						</span>
					</if>
					<InsuranceEdit
						onSubmit={this.submit}
						cancelEditInsuranceInfo={() => this.toggleEditing(false)}
						initialValues={{
							kvnr: customer?.health_insurance_number,
							payer_institution_name: {
								label: customer?.payer_institution_name || '',
								value: customer?.payer_institution_name || ''
							}
						}}
						sickfunds={sickfunds.map(sickfund => ({
							label: sickfund.insuranceName,
							value: sickfund.insuranceName
						}))}
						payerNumber={customer?.health_insurance_number}
					/>
				</if>
				<else>
					<if condition={customer.health_insurance_number}>
						<InsuranceDetails
							infoIcon={infoIcon}
							payerNumber={customer?.health_insurance_number}
							payerInstitutionName={customer?.payer_institution_name}
							editInsuranceInfo={() => {isRxCheckoutPageType() ? this.toggleEditing(true) : this.openModal();}}
						/>
					</if>
					<else>
						<NoInsuranceDetails
							noInsuranceDescription={noInsuranceDescription}
							noInsuranceHeading={noInsuranceHeading}
							noInsuranceIcon={noInsuranceIcon}
							secureDataMessage={secureDataMessage}
							secureIcon={secureIcon}
							editInsuranceInfo={() => this.toggleEditing(true)}
						/>
					</else>
				</else>
			</CardContent>
		</Card>;
	}
});
