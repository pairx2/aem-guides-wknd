import React, {Component} from 'react';
import {connect} from 'react-redux';
import ShippingOption from './ShippingOption';
import {getShippingOptionsRequest, updateShippingOptionsRequest} from '../../redux/actions/shipping_options_action';
import {Card, CardContent} from '../../../Generic/components/Card/Card';
import PropTypes from 'prop-types';
import {CARRIER_CODE} from '../../../../utils/enums';

const mapStateToProps = state => {
	const {cartDetails} = state.cartModuleReducer.GetCustomerCartReducer;
	const {shippingOptions} = state.cartModuleReducer.shippingOptionsReducers;
	return {cartDetails, shippingOptions};
};

const mapDispatchToProps = {
	getShippingOptionsRequest,
	updateShippingOptionsRequest
};
export default connect(mapStateToProps, mapDispatchToProps)(class ShippingOptions extends Component {
	static propTypes = {
		getShippingOptionsRequest: PropTypes.func,
		updateShippingOptionsRequest: PropTypes.func,
		cartDetails: PropTypes.object,
		shippingOptions: PropTypes.array,
		shippingList: PropTypes.array,
		shippingOptionsInfo: PropTypes.string,
		shippingOptionsHeading: PropTypes.string,
	};

	state = {
		loading: null
	};

	componentDidUpdate(prevProps) {
		const {cartDetails, getShippingOptionsRequest, shippingOptions, updateShippingOptionsRequest} = this.props;
		if (cartDetails.shipping_address?.city !== prevProps.cartDetails.shipping_address?.city) {
			getShippingOptionsRequest();
		}

		if (!cartDetails.selected_shipping_method
			&& shippingOptions?.length > 0) {
			const standardShippingOption = shippingOptions.find(so => so.method_code === CARRIER_CODE.FLATRATE);
			if (standardShippingOption) {
				updateShippingOptionsRequest({
					carrierCode: standardShippingOption.carrier_code,
					methodCode: standardShippingOption.method_code
				});
			}
		}

		if(cartDetails.selected_shipping_method !== prevProps.cartDetails.selected_shipping_method){
			this.setState({loading: null});
		}
	}

	/* @Get all available Shipping Options with AEM autherable image*/
	getShippingOptions = () => {
		return this.props.shippingOptions?.map(item => ({
			...item,
			shippingImg: this.props.shippingList.find(aemSp => item.carrier_code === aemSp.shippingCode)?.shippingIcon
		})
		) || [];
	};

	updateShippingOption = (payload) => {
		const {updateShippingOptionsRequest} = this.props;
		this.setState({
			loading: payload.carrierCode
		});
		updateShippingOptionsRequest(payload);
	};

	render() {
		const {cartDetails, shippingOptionsInfo, shippingOptionsHeading, shippingList} = this.props;
		const {loading} = this.state;
		const selectedShippingOption = cartDetails.selected_shipping_method?.carrier_code;

		const renderShippingOptions = this.getShippingOptions().map(option =>
			<ShippingOption
				key={option.carrier_title}
				cardId={cartDetails.id}
				carrier_title={shippingList.find(shippingData => shippingData.shippingCode === option.carrier_code && shippingData.shippingType)?.shippingType}
				carrier_code={option.carrier_code}
				method_code={option.method_code}
				value={option.amount?.value || 0}
				isActive={option.carrier_code === selectedShippingOption}
				isLoading={loading === option.carrier_code}
				updateShippingOption={this.updateShippingOption}
				shippingImg={option.shippingImg}
			/>
		);
		return (
			<Card title={shippingOptionsHeading}
				  infoText={shippingOptionsInfo} className = 'pb-5'>
				<CardContent>
					<div className="adc-shipping-options">
						{renderShippingOptions}
					</div>
				</CardContent>
			</Card>
		);
	}
});