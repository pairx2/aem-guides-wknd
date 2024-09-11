import React, {Component} from 'react';
import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {i18nLabels} from '../../../utils/translationUtils';
import SelectFieldWithSearch from '../../Form/components/GenericFields/SelectFieldWithSearch';
import {openModalAction} from '../../Modal/redux/actions/index';
import Row from '../../Generic/components/Container/Row';
import Col from '../../Generic/components/Container/Col';
import PropTypes from 'prop-types';
import {getSickfundsRequest} from '../redux/actions/get_sickfunds.action';
import {BOOLEAN_STRING} from '../../../utils/enums';

const mapStateToProps = state => {
	const {sickfunds} = state.sickfundModuleReducer.SickfundReducer;
	return {sickfunds};
};

const mapDispatchToProps = {
	openModal: openModalAction,
	getSickFunds: getSickfundsRequest
};

export default reduxForm({
	form:'sickFundSearchForm'
})(connect(mapStateToProps, mapDispatchToProps)(class SickFundSearch extends Component {

	componentDidMount(){
		this.props.getSickFunds();
	}

	static propTypes = {
		openModal: PropTypes.func,
		sickfunds: PropTypes.array,
		moreInfoPath: PropTypes.string,
		backgroundImagePath: PropTypes.string,
		heading: PropTypes.string,
		subHeading: PropTypes.string,
		getSickFunds: PropTypes.func,
		sickFundsPDFList: PropTypes.array,
		sickFundMap: PropTypes.object,
		resetForm: PropTypes.func
	};

	inputChange = (value) => {
		if(!value || !value.label) return;
		const {sickFundsPDFList, moreInfoPath, sickFundMap, resetForm} = this.props;
		const sickFundName = value.label;
		const sickFundleadIKNumber = value.value.leadIKNumber;
		this.props.openModal({
			heading: sickFundName,
			contentID: 'sickFundSearchModal',
			props: {
				sickFundInformation: sickFundMap[sickFundleadIKNumber],
				sickFundDocuments: sickFundsPDFList.filter(sickFund => sickFund.name === sickFundleadIKNumber)?.map(sickFund => sickFund.documents)[0] || [],
				isSpecial: value.value.isSpecial,
				moreInfoPath: moreInfoPath
			}
		});
		resetForm();
	};

	sickFundOptions = () => this.props.sickfunds.map(sickFund => ({label: sickFund.insuranceName, value: {name: sickFund.insuranceName, leadIKNumber: sickFund.leadIKNumber, isSpecial: sickFund.isSpecialSickFund === BOOLEAN_STRING.TRUE ? true: false}})) || {};

	render() {
		const {backgroundImagePath, heading, subHeading} = this.props;
		return <div className="adc-sick-fund-search" style={{backgroundImage: `url('${backgroundImagePath}')`}}>
			<div className="adc-sick-fund-search__content">
				<div className="container">
					<Row className='justify-content-center'>
						<Col lg={8} md={10}>
							<div className="adc-sick-fund-search__content-inner">
								<h3 className="adc-title adc-title--white">{ heading }</h3>
								<div className="adc-sick-fund-search__subheading">
									<h5 className="adc-title adc-sick-fund-search__letterSpacing adc-title--white">{ subHeading }</h5>
								</div>
								<div className="adc-search-container">
									<div className="adc-search-field">
										<div className="adc-search-field__input-wrapper">
											<SelectFieldWithSearch onChange={this.inputChange} options={this.sickFundOptions()} name="sickFundSearch" placeholder={i18nLabels.FAQ_SEARCH_PLACEHOLDER} showBorder={false} searchIcon="search-blue" />
										</div>
									</div>
								</div>
							</div>
						</Col>
					</Row>
				</div>
			</div>
		</div>;
	}
}));
