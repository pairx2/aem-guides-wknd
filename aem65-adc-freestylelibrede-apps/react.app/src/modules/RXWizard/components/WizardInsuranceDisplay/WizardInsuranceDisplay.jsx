import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Card, CardContent} from '../../../Generic/components/Card/Card';
import {getSickfundsRequest} from '../../../SickFund/redux/actions/get_sickfunds.action';
import {updateInsuranceRequest} from '../../../MyAccount/redux/actions/customer.action';
import {getCustomerCartRequest} from '../../../Cart/redux/actions/cart.action';
import InsuranceDetails from '../../../MyAccount/components/InsuranceDisplayEdit/InsuranceDetails';
import NoInsuranceDetails from '../../../MyAccount/components/InsuranceDisplayEdit/NoInsuranceDetails';
import InsuranceEdit from '../../../MyAccount/components/InsuranceDisplayEdit/InsuranceEdit';
import I18n from '../../../Translation/components/I18n';
import PropTypes from 'prop-types';
import {RSP_NAME_OPTIONS, BOOLEAN_STRING, INSURANCE_KEY_TYPES} from '../../../../utils/enums';

const mapStateToProps = state => {
	const {customer, error} = state.myAccountModuleReducer.GetCustomerReducer;
	const {sickfunds} = state.sickfundModuleReducer.SickfundReducer;
	return {customer, sickfunds, error};
};

const mapDispatchToProps = {
	getSickFunds: getSickfundsRequest,
	updateInsuranceRequest,
	getCustomerCartRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(class WizardInsuranceDisplay extends Component {
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
		getCustomerCartRequest: PropTypes.func,
		updateInsuranceRequest: PropTypes.func,
		getSickFunds: PropTypes.func,
		redirectPath: PropTypes.string,
		error: PropTypes.number,
		sickFundsPDFList: PropTypes.array,
		sickFundMap: PropTypes.object
	};

	state = {
		isEditing: false,
		showKVNRExistsError: false
	};

	componentDidMount() {
		const {getCustomerCartRequest, getSickFunds} = this.props;
		getSickFunds();
		getCustomerCartRequest({forceRxCart: true});
	}

	componentDidUpdate(prevProps) {
		if(this.propsDidChange(prevProps)) {
			const {customer, redirectPath, error} = this.props;
			const sickfund = this.getSickfundForCustomer();
			if (redirectPath && customer.payer_institution_name && sickfund?.associatedRSPs?.[0]?.rspName !== RSP_NAME_OPTIONS.CC && (customer.has_active_reimbursement || sickfund?.isSpecialSickFund === BOOLEAN_STRING.TRUE || sickfund?.insuranceType?.toLowerCase() === INSURANCE_KEY_TYPES.PRIVATE)) {
				window.location.href = redirectPath + '?rxNotSupported=true';
			}
			if(!error && customer?.payer_institution_name) {
				this.toggleEditing(false);
			}
		}
	}

	propsDidChange(prevProps) {
		const {sickfunds, customer, error} = this.props;
		return (sickfunds && customer?.payer_institution_name !== prevProps.customer?.payer_institution_name) || (customer && sickfunds !== prevProps.sickfunds) || (error !== prevProps.error);
	}

	getSickfundForCustomer = () => {
		const {customer, sickfunds} = this.props;
		return sickfunds.find(sickfund => sickfund.insuranceName == customer.payer_institution_name);
	};

	submit = (value) => {
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
		this.props.updateInsuranceRequest(updatedValue);
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
	getSelectedInsurancePDF = () => {
		const {customer, sickFundsPDFList} = this.props;
		return sickFundsPDFList.filter(sickFund => sickFund.name === customer.payer_number)?.map(sickFund => sickFund.documents)[0] || [];
	}
	render() {
		const {heading, infoIcon, noInsuranceDescription, noInsuranceHeading, noInsuranceIcon, secureDataMessage, secureIcon, customer, sickfunds, error, sickFundMap} = this.props;
		const {isEditing, showKVNRExistsError} = this.state;
		const selectedInsurancePDF = customer.health_insurance_number ? this.getSelectedInsurancePDF() : [];
		return <Card title={heading} className={'adc-rx-checkout'}>
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
								label: customer?.payer_institution_name,
								value: customer?.payer_institution_name
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
							editInsuranceInfo={() => this.toggleEditing(true)}
							selectedInsurancePDF={selectedInsurancePDF}
							selectedInsuraceInfo={sickFundMap[customer?.payer_number]}
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
