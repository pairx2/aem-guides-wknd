import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {DELIVERY_STATUSES, SUBSCRIPTION_STATUS} from '../../../../utils/enums';
import CurrentSubscriptionOrder from './CurrentSubscriptionOrder';
import {connect} from 'react-redux';
import SubscriptionEditor from './SubscriptionEditor';
import SubscriptionPaymentEditor from './SubscriptionPaymentEditor';
import {closePaymentEditFormRequest} from '../../redux/actions/orders.action';
import ReactivateSubscriptionOrder from './ReactivateSubscriptionOrder';
import AddressEditor from '../CurrentOrderOverview/AddressEditor';
import {resetAddressEditor} from '../../redux/actions/update_order.action';
import {resetPaymentReducer} from '../../../MyAccount/redux/actions/update_payment_method.action';

const mapStateToProps = state => {
	const {plusService: {isPaymentEditFormOpen, isReactivationFormOpen}} = state.myAccountModuleReducer.OrdersReducer;
	return {isPaymentEditFormOpen, isReactivationFormOpen};
};

const mapDispatchToProps = {
	closePaymentEditFormRequest,
	resetAddressEditor,
	resetPaymentReducer
};

export default connect(mapStateToProps, mapDispatchToProps)(class ActivePlusService extends Component {
	static propTypes = {
		order: PropTypes.object,
		products: PropTypes.object,
		orderServiceStatus: PropTypes.string,
		dictionary: PropTypes.object,
		customer: PropTypes.object,
		resetPaymentReducer: PropTypes.func,
		resetAddressEditor: PropTypes.func,
		isPaymentEditFormOpen: PropTypes.bool,
		isReactivationFormOpen: PropTypes.bool,
		closePaymentEditFormRequest: PropTypes.func,
		deactivateSubscription: PropTypes.func,
		deleteSubscription: PropTypes.func,
		privacyPolicyPath: PropTypes.string,
		termsAndConditionsPath: PropTypes.string,
		trainingMaterialsPath: PropTypes.string,
		confirmationPath: PropTypes.string,
		checkboxes: PropTypes.array,
		tabName: PropTypes.string,
		choosenDeliveryDateFromUrl: PropTypes.string,
		canRedirect: PropTypes.bool
	};

	state = {
		isSubscriptionEditing: false,
		isShippingAddressEditing: false,
		addressType: ''
	};

	componentDidMount() {
		this.ref = React.createRef();
		window.addEventListener('hashchange', this.tabChanged, false);
	}

	toggleSubscriptionEditing = (isSubscriptionEditing) => {
		const {resetAddressEditor, resetPaymentReducer, closePaymentEditFormRequest} = this.props;
		this.setState({
			isSubscriptionEditing
		});
		!isSubscriptionEditing && closePaymentEditFormRequest();
		this.ref?.current?.scrollIntoView();
		resetAddressEditor();
		resetPaymentReducer();
	};

	toggleShippingAddressEditing = (addressType, isShippingAddressEditing) => {
		this.setState({
			addressType,
			isShippingAddressEditing
		});
	};

	tabChanged = () => {
		this.setState({
			isShippingAddressEditing: false
		});
	};

	render() {
		const {order, orderServiceStatus, choosenDeliveryDateFromUrl, products, dictionary, customer, canRedirect, deactivateSubscription, deleteSubscription, isPaymentEditFormOpen, isReactivationFormOpen, privacyPolicyPath, termsAndConditionsPath, trainingMaterialsPath, confirmationPath, checkboxes, tabName} = this.props;
		const {isSubscriptionEditing, isShippingAddressEditing, addressType} = this.state;
		const currentDeliveryDetails = order.deliveryDetails?.[0];
		const composedOrder = {
			...order,
			currentDeliveryDetails: currentDeliveryDetails,
			currentAddress: currentDeliveryDetails?.deliveryAddress || order?.deliveryAddress,
			currentProducts: currentDeliveryDetails?.products,
			currentDeliveryDate: currentDeliveryDetails?.estimatedDeliveryDate,
			currentTrackingNr: currentDeliveryDetails?.deliveryTrackingNr,
			orderStatus: currentDeliveryDetails?.deliveryStatus || DELIVERY_STATUSES.CREATED
		};
		return (
			<div ref={this.ref}>
				<if condition={isSubscriptionEditing || (canRedirect && orderServiceStatus === SUBSCRIPTION_STATUS.INACTIVE && isReactivationFormOpen)}>
					<if condition={isPaymentEditFormOpen}>
						<SubscriptionPaymentEditor
							order={composedOrder}
							close={() => this.toggleSubscriptionEditing(false)}/>
					</if>
					<elseif condition={isShippingAddressEditing}>
						<AddressEditor order={order}
							confirmationPath={confirmationPath}
							checkboxes={checkboxes}
							addressType={addressType} close={() => this.toggleShippingAddressEditing(false)}/>
					</elseif>
					<elseif condition={isReactivationFormOpen && !isShippingAddressEditing}>
						<ReactivateSubscriptionOrder
							order={composedOrder}
							choosenDeliveryDateFromUrl={choosenDeliveryDateFromUrl}
							products={products}
							customer={customer}
							dictionary={dictionary}
							close={() => this.toggleSubscriptionEditing(false)}
							editAddress={(subscriptionAddressType) => this.toggleShippingAddressEditing(subscriptionAddressType, true)}
							privacyPolicyPath={privacyPolicyPath}
							termsAndConditionsPath={termsAndConditionsPath}
							trainingMaterialsPath={trainingMaterialsPath}
							confirmationPath={confirmationPath}
							checkboxes={checkboxes}
						/>
					</elseif>
					<else>
						<SubscriptionEditor
							order={composedOrder}
							orderServiceStatus={orderServiceStatus}
							products={products}
							customer={customer}
							close={() => this.toggleSubscriptionEditing(false)}
							confirmationPath={confirmationPath}
							checkboxes={checkboxes}
						/>
					</else>
				</if>
				<elseif condition={isShippingAddressEditing}>
					<AddressEditor order={order}
						confirmationPath={confirmationPath}
						checkboxes={checkboxes}
						addressType={addressType} close={() => this.toggleShippingAddressEditing(false)}/>
				</elseif>
				<else>
					<CurrentSubscriptionOrder
						order={composedOrder}
						orderServiceStatus={orderServiceStatus}
						products={products}
						dictionary={dictionary}
						customer={customer}
						editSubscription={() => this.toggleSubscriptionEditing(true)}
						editAddress={(subscriptionAddressType) => this.toggleShippingAddressEditing(subscriptionAddressType, true)}
						confirmationPath={confirmationPath}
						tabName={tabName}
						deactivateSubscription={deactivateSubscription}
						deleteSubscription={deleteSubscription}
					/>
				</else>
			</div>
		);
	}
});