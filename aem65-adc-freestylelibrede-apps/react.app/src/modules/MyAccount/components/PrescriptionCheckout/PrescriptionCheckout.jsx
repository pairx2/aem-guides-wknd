import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Card, CardContent} from '../../../Generic/components/Card/Card';
import {defaultUom, measurementOptions} from '../../../../utils/measureOptions';
import I18n from '../../../Translation/components/I18n';
import RadioButtonField from '../../../Form/components/GenericFields/RadioButtonField';
import {getUrlParameter} from '../../../../utils/getParams';
import {setMeasurmentRequest} from '../../redux/actions/set_measurment.action';
import PropTypes from 'prop-types';

const mapStateToProps = state => {
	const {customer:{measurement}, errorInSettingMeasurment} = state.myAccountModuleReducer.GetCustomerReducer;
	const {id: cartId} = state.cartModuleReducer.GhostCartReducer;
	return{measurement, errorInSettingMeasurment, cartId};
};
const mapDispatchToProps = {
	setMeasurmentRequest
};


export default connect(mapStateToProps, mapDispatchToProps)(class PrescriptionCheckout extends Component {
	static propTypes = {
		prescriptionHeading: PropTypes.string,
		measurementInstructions: PropTypes.string,
		measurementHints: PropTypes.string,
		measurement: PropTypes.string,
		setMeasurmentRequest: PropTypes.func,
		errorInSettingMeasurment: PropTypes.any,
		cartId:PropTypes.string
	};

	state = {
		selectedUom: defaultUom,
		insuranceType: getUrlParameter('insuranceType')
	};

	setSelectedValue = (selectedValue) => {
		this.setState({
			selectedUom: selectedValue,
		}, () => {
			this.props.setMeasurmentRequest(this.state.selectedUom);
		});
	};
	componentDidUpdate(prevProps) {
		const {measurement, cartId} = this.props;
		if (measurement && prevProps.cartId !== cartId) {
			this.setSelectedValue(measurement);
		} else if(measurement !== prevProps.measurement){
			this.setState({
				selectedUom: measurement
			});
		}
	}
	render() {
		const {prescriptionHeading, measurementInstructions, measurementHints, errorInSettingMeasurment} = this.props;
		return (
			<Card title={prescriptionHeading}>
				<CardContent>
					<if condition={errorInSettingMeasurment}>
						<I18n text={'magento_error_code_' + errorInSettingMeasurment}/>
					</if>
					<div className="adc-presc-checkout">
						<div className="col-12 order-1 order-md-2 p-0 mt-3">
							<div className="row d-flex align-items-center">
								<div className="col-12">
									<label className="adc-product-details__measure-text ml-3">
										<I18n text={'unit_of_measurement_label'}/>
									</label>
									<i className="adc-icon adc-icon--medium adc-icon--info-box  adc-tooltipbottom position-absolute"
										aria-hidden="true">
										<div className="adc-tooltipbottom__content">
											<div className="row justify-content-center">
												<div className="col-10 font-weight-bold text-left">{measurementHints}</div>
											</div>
										</div>
									</i>
								</div>
							</div>
							<div className="row d-flex align-items-center">
								<div className="col-12">
									<RadioButtonField
										name={'measurement'}
										options={measurementOptions}
										selectedValue={this.state.selectedUom}
										setSelectedValue={this.setSelectedValue}/>
								</div>
							</div>
						</div>
						<div className="d-flex pt-4 pb-3">
							<div
								className="align-self-start pr-3 mt-1 adc-presc-checkout__measurement-instructions">{measurementInstructions}</div>
						</div>
					</div>
				</CardContent>
			</Card>
		);
	}
});