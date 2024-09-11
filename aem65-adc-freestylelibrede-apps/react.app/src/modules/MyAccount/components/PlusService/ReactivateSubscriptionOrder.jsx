import React, {Component} from 'react';
import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import OrderCost from '../CurrentOrderOverview/OrderCost';
import PropTypes from 'prop-types';
import {i18nLabels} from '../../../../utils/translationUtils';
import I18n from '../../../Translation/components/I18n';
import {openModalAction} from '../../../Modal/redux/actions';
import {closeReactivationFormRequest, reactivatePlusServiceRequest, chooseDeliveryDateRequest, removeChoosenDeliveryDateRequest} from '../../redux/actions/orders.action';
import {SubscriptionPaymentInformation} from './SubscriptionPaymentInformation';
import CheckboxField from '../../../Form/components/GenericFields/CheckboxField';
import {required} from '../../../Form/utils/validationRules';
import SubscriptionDetails from './SubscriptionDetails';
import SelectField from '../../../Form/components/GenericFields/SelectField';
import {SUBSCRIPTION_OPTIONS} from '../../../../utils/enums';
import DatepickerCalendar from '../CurrentOrderOverview/DatepickerCalendar';
import DatePicker, {registerLocale} from 'react-datepicker';
import de from 'date-fns/locale/de';
import {splitAddressAndNumber} from '../../../../utils/regexUtils';
import {empty} from '../../../../utils/default';
import {Card, CardContent} from '../../../Generic/components/Card/Card';
import Icon from '../../../Generic/components/Icon/Icon';
import Link from '../../../Generic/components/Link/Link';
import AddressInformation from '../AddressInformation/AddressInformation';
import Button, {BUTTON_OPTIONS} from '../../../Generic/components/Button/Button';
import Row from '../../../Generic/components/Container/Row';
import Col from '../../../Generic/components/Container/Col';
import OrderPaymentDisplayAndEdit from './OrderPaymentDisplayAndEdit';
import {getMagentoFormattedDate, dottedToDashed} from '../../../../utils/dateUtils';
import {ORDER_TYPES} from '../../../../utils/enums';
import {addDays} from 'date-fns';
import {getAvailablePaymentMethodsRequest} from '../../../Payment/redux/actions/get_available_payment_methods.action';
import {paymentMapping} from '../../../Payment/components/PaymentMapping';
import {resetPaymentReducer} from '../../../MyAccount/redux/actions/update_payment_method.action';
import {resetAddressEditor} from '../../redux/actions/update_order.action';
import MessageBanner from '../../../Generic/components/MessageBanner/MessageBanner';

registerLocale('de', de);

const mapStateToProps = state => {
	const {loading: isLoading, errorCodes} = state.cartModuleReducer.GetCustomerCartReducer;
	const {customer} = state.myAccountModuleReducer.GetCustomerReducer;
	const {values: formValues} = state.form.reactivateSubscriptionForm || empty.object;
	const {isAllowSave} = state.paymentModuleReducer.GetAvailablePaymentMethodsReducer;
	const {isOrderUpdated, updatedOrderType, error: updateError} = state.myAccountModuleReducer.OrderUpdateReducer;
	const {error: paymentMethodUpdateError, addressAndPaymentUpdateError: addressAndPaymentUpdateError, isPaymentMethodUpdated, updatedOrder,isAddressAndPaymentMethodUpdated} = state.myAccountModuleReducer.UpdatePaymentMethodReducer;
	return {isLoading, errorCodes, customer, formValues, isAllowSave, paymentMethodUpdateError, updatedOrderType, updateError, isOrderUpdated, addressAndPaymentUpdateError, isPaymentMethodUpdated, isAddressAndPaymentMethodUpdated, updatedOrder};
};

const mapDispatchToProps = {
	openModalAction,
	resetPaymentReducer,
	resetAddressEditor,
	chooseDeliveryDateRequest,
	removeChoosenDeliveryDateRequest,
	closeReactivationForm: closeReactivationFormRequest,
	reactivatePlusService: reactivatePlusServiceRequest,
	getAvailablePaymentMethodsRequest
};

export default reduxForm({
	form: 'reactivateSubscriptionForm',
	destroyOnUnmount: false,
	enableReinitialize: true
})(connect(mapStateToProps, mapDispatchToProps)(class ReactivateSubscriptionOrder extends Component {
	constructor(props) {
		super(props);
		this.state = {
			deliveryDate: addDays(new Date(), 1),
			selectedDate: addDays(new Date(), 1),
			isCalendarOpen: false,
			togglePaymentEditing: false,
			submitClicked:false
		};
	}

	static propTypes = {
		reactivatePlusService: PropTypes.func,
		close: PropTypes.func,
		choosenDeliveryDateFromUrl: PropTypes.string,
		chooseDeliveryDateRequest: PropTypes.func,
		removeChoosenDeliveryDateRequest: PropTypes.func,
		isAllowSave: PropTypes.bool,
		getAvailablePaymentMethodsRequest: PropTypes.func,
		closeReactivationForm: PropTypes.func,
		order: PropTypes.object,
		products: PropTypes.object,
		privacyPolicyPath: PropTypes.string,
		termsAndConditionsPath: PropTypes.string,
		trainingMaterialsPath: PropTypes.string,
		customer: PropTypes.object,
		editAddress: PropTypes.func,
		confirmationPath: PropTypes.string,
		checkboxes: PropTypes.array,
		isPaymentMethodUpdated: PropTypes.bool,
		isAddressAndPaymentMethodUpdated: PropTypes.bool,
		paymentMethodUpdateError: PropTypes.string,
		addressAndPaymentUpdateError: PropTypes.string,
		resetPaymentReducer: PropTypes.func,
		resetAddressEditor:PropTypes.func,
		updatedOrder: PropTypes.string,
		isOrderUpdated: PropTypes.bool,
		updateError: PropTypes.object,
		updatedOrderType: PropTypes.string
	};

	componentDidMount() {
		const {choosenDeliveryDateFromUrl} = this.props;
		if(choosenDeliveryDateFromUrl){
			this.setState({deliveryDate : choosenDeliveryDateFromUrl});
		}
	}

	componentDidUpdate(prevProps) {
		const {isAllowSave, closeReactivationForm,close, removeChoosenDeliveryDateRequest} = this.props;
		if (this.propsDidChange(prevProps)) {
			if (isAllowSave !== prevProps.isAllowSave && this.state.submitClicked) {
				this.submitForm();
				closeReactivationForm();
				close();
			}
		}
		if(this.state.deliveryDate === prevProps.choosenDeliveryDateFromUrl && prevProps.choosenDeliveryDateFromUrl) removeChoosenDeliveryDateRequest();
	}

	propsDidChange(prevProps) {
		return this.props.isAllowSave !== prevProps.isAllowSave;
	}

	handleChange = date => {
		this.setState({
			selectedDate: date
		});
	};

	handleConfirm = date => {
		this.setState({
			deliveryDate: date,
			isCalendarOpen: false
		});
		this.props.chooseDeliveryDateRequest({deliveryDate: date});
	};

	toggleCalendar = () => {
		this.setState({
			isCalendarOpen: !this.state.isCalendarOpen
		});
	};

	editPaymentMethod = (togglePaymentEditing) => {
		this.setState({
			togglePaymentEditing
		});
	};

	getRsid = (paymentMethodType) => {
		return paymentMapping.find(payment => payment?.title?.toLowerCase() === paymentMethodType?.toLowerCase())?.rsId;
	};
	checkAddress = () => {
		const {order: {deliveryAddress, billingAddress}, order, getAvailablePaymentMethodsRequest} = this.props;
		const {customer} = this.props;
		if (customer) {
			const {dob: birthDate, email} = customer;
			const streetAndNumber = splitAddressAndNumber(deliveryAddress.street);
			const billingStreetAndNumber = splitAddressAndNumber(billingAddress.street);
			const shippingStreetAndNumber = splitAddressAndNumber(deliveryAddress.street);
			//Verify address before sending the form
			const payload = {
				orderType: ORDER_TYPES.CPS,
				products: {
					paymentType: this.getRsid(order?.paymentDetails?.paymentMethodType),
					grossTotal: `${order.priceBreakdown?.price}`,
					total: `${order.priceBreakdown?.totalPrice}`
				},
				address: {
					street: streetAndNumber.street,
					streetNumber: streetAndNumber.streetNumber,
					zipcode: deliveryAddress.zipCode,
					city: deliveryAddress.city,
					country: deliveryAddress.countryCode
				},
				user: {
					id: customer.user_id,
					firstName: deliveryAddress.firstName,
					lastName: deliveryAddress.lastName,
					birthday: dottedToDashed(birthDate),
					mail: email,
					salutation: deliveryAddress.salutation
				},
				billingAddress: {
					lastName: billingAddress.lastName,
					firstName: billingAddress.firstName,
					street: billingStreetAndNumber.street,
					streetNumber: billingStreetAndNumber.streetNumber,
					zipcode: billingAddress.zipCode,
					city: billingAddress.city,
					country: billingAddress.country || billingAddress.countryCode
				},
				shippingAddress: {
					lastName: deliveryAddress.lastName,
					firstName: deliveryAddress.firstName,
					street: shippingStreetAndNumber.street,
					streetNumber: shippingStreetAndNumber.streetNumber,
					zipcode: deliveryAddress.zipCode,
					city: deliveryAddress.city,
					country: deliveryAddress.country || deliveryAddress.countryCode
				},
				AddressStatus: {
					isShipping: false,
					isBilling: false
				},
				section: 'plus_service'
			};
			this.setState({submitClicked:true});
			getAvailablePaymentMethodsRequest(payload);
		}
	};

	submitForm = () => {
		const {deliveryDate} = this.state;
		const {order: {productData, orderId, orderType, rxmc}, reactivatePlusService, resetPaymentReducer, resetAddressEditor} = this.props;
		const reactivateSubscription = [{
			sku: productData?.[0]?.productSKU,
			deliverable_id: productData?.[0]?.deliverableNumber
		}];
		reactivatePlusService({
			order_id: orderType === ORDER_TYPES.RX ? rxmc : orderId,
			order_type: orderType,
			delivery_date: getMagentoFormattedDate(deliveryDate),
			deliverable_id: reactivateSubscription,
			activate: true,
			deliveryDate: deliveryDate
		});
		resetPaymentReducer();
		resetAddressEditor();
	};

	render() {
		const {handleSubmit, order, products, privacyPolicyPath, termsAndConditionsPath, paymentMethodUpdateError, updatedOrderType, updateError, isOrderUpdated, resetPaymentReducer, resetAddressEditor, addressAndPaymentUpdateError, isPaymentMethodUpdated, isAddressAndPaymentMethodUpdated, updatedOrder, trainingMaterialsPath, editAddress, close, customer, confirmationPath, checkboxes} = this.props;
		const {isCalendarOpen, deliveryDate, selectedDate, togglePaymentEditing} = this.state;

		return (
			<Card title={i18nLabels.OVERVIEW}>
				<CardContent>
					<if condition={isPaymentMethodUpdated && ORDER_TYPES[updatedOrder] === order.orderType}>
						<MessageBanner className={'mb-5'} icon={MessageBanner.ICON.SUCCESS} color={MessageBanner.COLOR.BLUE} description={i18nLabels.UPDATE_PAYMENT_SUCCESS} canClose onCloseAction={resetPaymentReducer}/>
					</if>
					<elseif condition={isAddressAndPaymentMethodUpdated && ORDER_TYPES[updatedOrder] === order.orderType}>
						<MessageBanner className={'mb-5'} icon={MessageBanner.ICON.SUCCESS} color={MessageBanner.COLOR.BLUE} description={i18nLabels.UPDATE_ORDER_SUCCESS} canClose onCloseAction={resetPaymentReducer}/>
					</elseif>
					<elseif condition={paymentMethodUpdateError && !addressAndPaymentUpdateError && ORDER_TYPES[updatedOrder] === order.orderType}>
						<MessageBanner className={'mb-5'} icon={MessageBanner.ICON.FAILURE} color={MessageBanner.COLOR.RED} description={i18nLabels.UPDATE_PAYMENT_FAILURE} canClose onCloseAction={resetPaymentReducer}/>
					</elseif>
					<elseif condition={isOrderUpdated && updatedOrderType === order.orderType}>
						<MessageBanner className={'mb-5'} icon={MessageBanner.ICON.SUCCESS} color={MessageBanner.COLOR.BLUE} description={i18nLabels.UPDATE_ADDRESS_SUCCESS} canClose onCloseAction={resetAddressEditor}/>
					</elseif>
					<elseif condition={updateError && updatedOrderType === order.orderType}>
						<MessageBanner className={'mb-5'} icon={MessageBanner.ICON.FAILURE} color={MessageBanner.COLOR.RED} description={i18nLabels.UPDATE_ADDRESS_FAILURE} canClose onCloseAction={resetAddressEditor}/>
					</elseif>
					<elseif condition={addressAndPaymentUpdateError && paymentMethodUpdateError && ORDER_TYPES[updatedOrder] === order.orderType}>
						<MessageBanner className={'mb-5'} icon={MessageBanner.ICON.FAILURE} color={MessageBanner.COLOR.RED} description={i18nLabels.UPDATE_ORDER_FAILURE} canClose onCloseAction={resetAddressEditor}/>
					</elseif>
					<div className={'row m-0'}>
						<form onSubmit={handleSubmit(this.checkAddress)} className={`PlusService-deactivate row p-0 m-0 col-12 col-lg-${togglePaymentEditing ? 6 : 12}`}>
							<div className={`col-12 col-lg-${togglePaymentEditing ? 12 : 6}`}>
								<SubscriptionDetails order={order} products={products}/>
								<section className="mt-4">
									<div className="adc-form-group border-bottom-grey pb-3">
										<h6><I18n text={i18nLabels.DELIVERY_PERIOD} suffix={':*'}/></h6>
										<SelectField
											options={SUBSCRIPTION_OPTIONS}
											name='subscriptionOption'
										/>
									</div>
								</section>
								<section className="mt-4">
									<h6><I18n text={i18nLabels.STARTS_AT_LABEL} suffix={':*'}/></h6>
									<DatePicker
										id="delivery-date"
										selected={selectedDate}
										onChange={this.handleChange}
										dateFormat="dd.MM.yyyy"
										inline
										minDate={addDays(new Date(), 1)}
										locale="de"
										calendarContainer={DatepickerCalendar(isCalendarOpen, this.toggleCalendar, this.handleConfirm, selectedDate, deliveryDate, true)}
										renderCustomHeader={({date, decreaseMonth, increaseMonth}) => {
											const formattedHeader = new Intl.DateTimeFormat('de-DE', {
												year: 'numeric',
												month: 'long'
											}).format(date);
											return (
												<div className="adc-datepicker__header">
													<button className="adc-datepicker__mobile-content" onClick={decreaseMonth}>
														<Icon image={'arrow-left'} size={Icon.SIZE.MEDIUM}/>
													</button>
													<p className="adc-datepicker__current-month">{formattedHeader}</p>
													<button className="adc-datepicker__mobile-content" onClick={increaseMonth}>
														<Icon image={'arrow-right'} size={Icon.SIZE.MEDIUM}/>
													</button>
													<div
														className="adc-datepicker__header-buttons adc-datepicker__desktop-content">
														<button onClick={decreaseMonth}>
															<Icon image={'arrow-left'} size={Icon.SIZE.MEDIUM}/>
														</button>
														<button onClick={increaseMonth}>
															<Icon image={'arrow-right'} size={Icon.SIZE.MEDIUM}/>
														</button>
													</div>
												</div>
											);
										}}
									/>
								</section>
							</div>
							<if condition={!togglePaymentEditing}>
								<div className={'col col-lg-6'}>
									<if condition={order.currentAddress}>
										<div className='d-flex'>
											<h6 className="flex-grow-1 current-o-heading">
												<I18n text={i18nLabels.DELIVERY_ADDRESS_HEADING} suffix={':'}/>
											</h6>
											<Link action={() => editAddress('shipping')}
												icon={'edit-icon'}
												label={i18nLabels.CHANGE}
											/>
										</div>
										<AddressInformation
											prefix={order.currentAddress.salutation}
											firstname={order.currentAddress.firstName}
											lastname={order.currentAddress.lastName}
											street={order.currentAddress.street}
											additionalAddress={order.currentAddress.streetNumber}
											city={order.currentAddress.city}
											postcode={order.currentAddress.zipCode}
										/>
									</if>
									<if condition={order.billingAddress}>
										<div className='d-flex'>
											<h6 className="flex-grow-1 current-o-heading">
												<I18n text={i18nLabels.BILLING_ADDRESS_HEADING} suffix={':'}/>
											</h6>
											<Link action={() => editAddress('billing')}
												icon={'edit-icon'}
												label={i18nLabels.CHANGE}
											/>
										</div>
										<AddressInformation
											prefix={order.billingAddress.salutation}
											firstname={order.billingAddress.firstName}
											lastname={order.billingAddress.lastName}
											street={order.billingAddress.street}
											additionalAddress={order.billingAddress.streetNumber}
											city={order.billingAddress.city}
											postcode={order.billingAddress.zipCode}
										/>
									</if>
									<SubscriptionPaymentInformation
										order={order}
										isReactivationFlow
										editSubscriptionPayment={() => this.editPaymentMethod(true)}
									/>
									<OrderCost order={order} isPlusService showBorder/>
									<CheckboxField
										name="privacyPolicyConfirmation"
										label={i18nLabels.PRIVACY_POLICY_LINK_LABEL}
										params={[privacyPolicyPath, termsAndConditionsPath || '#']}
										validationRules={[required]}
									/>
									<CheckboxField
										name="trainingConfirmation"
										label={i18nLabels.TRAINING_CONFIRMATION_LABEL}
										params={[trainingMaterialsPath || '#']}
										validationRules={[required]}
									/>
								</div>
								<div className="col-12 mt-3">
									<Row className='justify-content-center'>
										<Col md={6} lg={4} className="mt-3">
											<Button
												type={BUTTON_OPTIONS.TYPE.BUTTON}
												label={i18nLabels.ABORT_CTA_STYLE}
												isFullWidth
												ctaStyle={BUTTON_OPTIONS.STYLE.SECONDARY}
												hasNoMargin
												action={close}/>
										</Col>
										<Col md={6} lg={4} className="my-3">
											<Button
												type={BUTTON_OPTIONS.TYPE.SUBMIT}
												label={i18nLabels.REACTIVATE}
												isFullWidth
												ctaStyle={BUTTON_OPTIONS.STYLE.PRIMARY}
												hasNoMargin
												isDisabled={close}/>
										</Col>
									</Row>
								</div>
							</if>
						</form>
						<if condition={togglePaymentEditing}>
							<div className={'col-12 col-lg-6'}>
								<OrderPaymentDisplayAndEdit  order={order} customer={customer} confirmationPage={confirmationPath} checkboxes={checkboxes}/>
							</div>
							<div className="col-12 mt-3">
								<Row className='justify-content-center'>
									<Col md={6} lg={4} className="mt-3">
										<Button
											type={BUTTON_OPTIONS.TYPE.BUTTON}
											label={i18nLabels.ABORT_CTA_STYLE}
											isFullWidth
											ctaStyle={BUTTON_OPTIONS.STYLE.SECONDARY}
											hasNoMargin
											action={close}/>
									</Col>
								</Row>
							</div>
						</if>
					</div>
				</CardContent>
			</Card>
		);
	}
}));