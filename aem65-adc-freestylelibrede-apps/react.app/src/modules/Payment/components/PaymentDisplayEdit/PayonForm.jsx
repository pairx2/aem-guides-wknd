import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ORDER_TYPES, TAB_NAMES, ORDER_TYPES_STATUS} from '../../../../utils/enums';
import {connect} from 'react-redux';

const mapStateToProps  = state => {
	const {choosenDeliveryDate} = state.myAccountModuleReducer.OrdersReducer;
	return {choosenDeliveryDate};
};

export default connect(mapStateToProps, null)(class PayonForm extends Component {
	static propTypes = {
		paymentMethod: PropTypes.string,
		confirmationPage: PropTypes.string,
		expandedIndex: PropTypes.number,
		paymentMapping: PropTypes.array,
		order: PropTypes.object,
		choosenDeliveryDate:PropTypes.string
	};

	state = {
		isRerender: false
	};

	componentDidUpdate(prevProps) {
		if (prevProps.paymentMethod !== this.props.paymentMethod) {
			this.setState({isRerender: true});
		} else if (this.state.isRerender) {
			this.setState({isRerender: false});
		}
	}

	render() {
		const {paymentMethod, confirmationPage, expandedIndex, paymentMapping, order, choosenDeliveryDate} = this.props;
		const {isRerender} = this.state;
		const page = `${confirmationPage}?paymentMethod=${paymentMethod}`;
		const deliverydate = choosenDeliveryDate ? `&choosenDeliveryDate=${choosenDeliveryDate.getTime()}` : '';
		const currentSubscriptionOrderStatus = `&currentSubscriptionOrderStatus=${order?.serviceData?.[0]?.serviceStatus}`;
		const tabNameCPS = `${ORDER_TYPES_STATUS.CPS}&tabName=${TAB_NAMES.PLUS_SERVICE}`;
		const tabNameRX = `${ORDER_TYPES_STATUS.RX}&tabName=${TAB_NAMES.REIMBURSEMENT}`;
		const orderType = order?.orderType === ORDER_TYPES.RX ? tabNameRX : tabNameCPS + currentSubscriptionOrderStatus + deliverydate;
		const action = order?.orderId ? `${confirmationPage}?paymentMethod=${paymentMethod}&orderId=${order.rxmc || order.orderId}&orderType=${orderType}` : page
		return (<if condition={!isRerender}>
			<div>
				<form action={action} className="paymentWidgets"
					data-brands={paymentMapping[expandedIndex]?.id}
					  />
			</div>
		</if>);
	}
});