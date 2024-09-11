import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Icon from '../../Generic/components/Icon/Icon';
import I18n from '../../../modules/Translation/components/I18n';
import {i18nLabels} from '../../../utils/translationUtils';
import {placeOrderFailure, placeOrderRequest} from '../redux/actions/place_order.action';
import {getUrlParameter} from '../../../utils/getParams';
import {closeModalAction, openModalAction} from '../../Modal/redux/actions/index';
import Button, {BUTTON_OPTIONS} from '../../Generic/components/Button/Button';
import {downloadDocumentRequest} from '../../MyAccount/redux/actions/download_document.action';
import {ERROR_TYPES} from '../../../utils/enums';

const mapStateToProps = state => {
	const {customer} = state.myAccountModuleReducer.GetCustomerReducer;
	const {orderID, claimReceipt, error} = state.paymentIdReducer.OrderIdModuleReducer;
	const {cartId} = state.cartModuleReducer.GetCustomerCartIdReducer;
	const {cartDetails} = state.cartModuleReducer.GetCustomerCartReducer;
	const {products} = state.productModuleReducer.GetProductsReducer;
	return {customer, claimReceipt, orderID, cartId, error, cartDetails, products};
};

const mapDispatchToProps = {
	placeOrderRequest,
	openModalAction,
	closeModalAction,
	getOrderIdFailure: placeOrderFailure,
	downloadDocumentRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(class ConfirmationPage extends Component {
	static propTypes = {
		moreInfoIcon: PropTypes.string,
		moreInfoDescription: PropTypes.string,
		moreInfoLabel: PropTypes.string,
		moreInfoLink: PropTypes.string,
		moreCTAStyle: PropTypes.string,
		error: PropTypes.oneOf([PropTypes.string, PropTypes.shape({error: PropTypes.string})]),
		readerInformation: PropTypes.string,
		serviceText: PropTypes.string,
		helplineNumber: PropTypes.string,
		emailCTAStyle: PropTypes.string,
		callCTAStyle: PropTypes.string,
		buttonAction:PropTypes.string,
		email: PropTypes.string,
		openModalAction: PropTypes.func,
		modalHeading: PropTypes.string,
		closeModalAction: PropTypes.func,
		placeOrderRequest: PropTypes.func,
		orderID: PropTypes.string,
		customer: PropTypes.shape({
			firstname: PropTypes.string,
			lastname: PropTypes.string,
			email: PropTypes.string
		}),
		getOrderIdFailure: PropTypes.func,
		isReimbursment: PropTypes.bool,
		orderTrackCtaText: PropTypes.string,
		urlHashKey: PropTypes.string,
		orderTrackCtaStyle: PropTypes.string,
		orderTrackPath: PropTypes.string,
		downloadDocumentRequest: PropTypes.func,
		heading: PropTypes.string,
		iconPath: PropTypes.string,
		claimReceipt: PropTypes.object,
		description: PropTypes.string,
		buttonText: PropTypes.string,
		onlineInfoIcon: PropTypes.string,
		onlineDescription: PropTypes.string,
		onlineCtaInfoLabel: PropTypes.string,
		onlineCtaInfoLink: PropTypes.string,
		onlineMoreCTAStyle: PropTypes.string,
		cartDetails: PropTypes.shape({
			prices: PropTypes.shape({
				grand_total: PropTypes.shape({
					value: PropTypes.number,
					currency: PropTypes.string
				}),
			}),
			items: PropTypes.array
		}),
		products: PropTypes.object
	};
	componentDidUpdate(prevProps) {
		const {error, readerInformation, serviceText, helplineNumber, emailCTAStyle, callCTAStyle, buttonAction, email, openModalAction, modalHeading, closeModalAction} = this.props;
		if (this.propsDidChange(prevProps)) {
			if (error === ERROR_TYPES.PAYMENT_ERROR || error.error) {
				const errorModalProps = {
					readerInformation: readerInformation,
					serviceText: serviceText,
					helplineNumber: helplineNumber,
					emailCTAStyle: emailCTAStyle,
					callCTAStyle: callCTAStyle,
					email: email,
					buttonAction: buttonAction
				};

				openModalAction({
					heading: modalHeading,
					contentID: 'confirmationPageErrorModal',
					props: errorModalProps
				});
			} else {
				closeModalAction();
			}
		}
		this.runTrustedShopsScript();
	}

	runTrustedShopsScript(){
		const isTrustedShops = document?.getElementById('trustedShopsCheckout');
		if(isTrustedShops){
			window.trustedShopsScript();
		}
	}

	componentDidMount() {
		const LS = window.localStorage;
		const paymentId = getUrlParameter('id') || getUrlParameter('payonToken');
		const isOpenInvoice = getUrlParameter('isOpenInvoice');
		const resourcePath = getUrlParameter('resourcePath');
		const isReimbursementOrder = this.props.isReimbursment;
		const {openModalAction, getOrderIdFailure, placeOrderRequest} = this.props;
		if (paymentId || isOpenInvoice) {
			openModalAction({
				contentID: 'confirmationPageLoadingModal'
			});

			placeOrderRequest({
				isReimbursementOrder: isReimbursementOrder,
				paymentId,
				isSavedPayment: resourcePath ? false : true,
				orderId: LS.lastOrderId ?? null
			});
		} else {
			getOrderIdFailure(ERROR_TYPES.PAYMENT_ERROR);
		}
	}

	propsDidChange(prevProps) {
		return this.props.error !== prevProps.error;
	}

	getCartItems = () => this.props.cartDetails.items.map(item => ({
		...item,
		details: this.props.products?.[item.product.sku]
	}));

	isCartEmpty = () => this.props.cartDetails.items.length === 0;

	render() {
		const {moreInfoIcon, moreInfoDescription, description, claimReceipt, heading, buttonText, iconPath, isReimbursment, moreInfoLabel, moreInfoLink, moreCTAStyle,
			orderID, customer, orderTrackCtaText, orderTrackCtaStyle, orderTrackPath, downloadDocumentRequest, onlineInfoIcon, onlineDescription, onlineCtaInfoLabel,
			onlineCtaInfoLink, onlineMoreCTAStyle, cartDetails, urlHashKey} = this.props;
		const isTrustedShops = document?.getElementById('trustedShopsCheckout');
		const urlHashKeyCondition = urlHashKey ? `#${urlHashKey}`: '';
		const orderpagePath = `${orderTrackPath}${urlHashKeyCondition}`;
		const downloadPayload = {
			fileContent: claimReceipt,
			fileName: i18nLabels.APPLICATION_FOR_REIMBURSMENT
		};
		return (<if condition={orderID}>
			<div className="container">
				<div className="confirmation">
					<div className="mb-3">
						{customer && <h2 className="adc-title adc-title--blue text-center ">
							<I18n text={i18nLabels.PERSONALIZED_THANK_YOU}
								  params={[`${customer.firstname} ${customer.lastname}`]}/>
						</h2>}
					</div>
					<h4 className="adc-title adc-title--blue text-center"><I18n
						text={i18nLabels.CONFIRMATION_PAGE_DESCRIPTION}/></h4>
					<h4 className="adc-title adc-title--blue text-center"><I18n
						text={i18nLabels.CONFIRMATION_EMAIL_DESCRIPTION}/></h4>
					<if condition={isReimbursment}>
						<div className="container rounded col-12 col-lg-9 h-40 p-2 d-flex justify-contentcenter adc-button-primary">
							<div className="col-12 d-block d-md-flex px-2">
								<div className="col-12 col-md-6 text-center text-md-left mt-2 p-3">
									<div><h4 className="text-white pt-2 pb-2">{heading ? heading : 'WICHTIG!'}</h4></div>
									<div className="confirmation__font-properties" dangerouslySetInnerHTML={{__html: description}}/>
								</div>
								<div className="col-12 col-md-6 col-xl-5 d-flex float-right flex-column mt-2">
									<span className="px-2 pt-2 pt-md-5 pb-3 mb-2 d-flex justify-content-center">
										<Icon image={iconPath ? iconPath : 'post-white'} className={'confirmation__icon-size adc-icon adc-icon--xxl'}
											size={Icon.SIZE.HUGE}/>
									</span>
									<div className="w-100 d-flex justify-content-center flex-column py-3 py-md-5 flex-grow-1 bt-lg">
										<Button
											className={'confirmation__download-button'}
											action={()=> downloadDocumentRequest(downloadPayload)}
											label={ buttonText ? buttonText : 'ANSCHREIBEN HERUNTERLAEN'}
											ctaStyle={BUTTON_OPTIONS.STYLE.SECONDARY}
											isFullWidth
											hasNoMargin
											icon={'arrow-blue-download'}
											iconPosition={Icon.POSITION.LEFT}
										/>
									</div>
								</div>
							</div>
						</div>
					</if>
					<div className="row justify-content-center">
						<div className="col-lg-9 col-md-12 col-11">
							<div className="row justify-content-center">
								<div className="col-md-6">
									<div className="row justify-content-center">
										<div className="col-md-11">
											<div className="confirmation__item">
												<div className="confirmation__item--icon-container">
													<Icon image={'shipping-black'} style={Icon.STYLE.COVER}
														  size={Icon.SIZE.LARGE}/>
												</div>
												<div className="confirmation__item--description">
													<p  className="mb-1"><I18n text={i18nLabels.TRACK_ORDER_DESCRIPTION}/></p>
													<p>
														<I18n text={isReimbursment ? i18nLabels.ORDER_NUMBER_LABEL : i18nLabels.ORDER_ID_LABEL}/>
														<span className="confirmation__item--description--order-no">{orderID}</span>
													</p>
													<div className="mt-3">
														<Button className="d-block"
															label={orderTrackCtaText}
															ctaStyle={orderTrackCtaStyle}
															href={orderpagePath}
														/>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="row justify-content-center">
								<div className="col-md-6">
									<div className="row justify-content-center">
										<div className="col-md-11">
											<div className="confirmation__item">
												<div className="confirmation__item--icon-container">
													<Icon image={moreInfoIcon} style={Icon.STYLE.COVER}
														  size={Icon.SIZE.LARGE}/>
												</div>
												<div className="confirmation__item--description confirmation__item--description__par" dangerouslySetInnerHTML={{__html: moreInfoDescription}}/>
												<div className="mt-3">
													<Button className="d-block"
														label={moreInfoLabel}
														ctaStyle={moreCTAStyle}
														href={moreInfoLink}
													/>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="col-md-6">
									<div className="row justify-content-center">
										<div className="col-md-11">
											<div className="confirmation__item">
												<div className="confirmation__item--icon-container">
													<Icon image={onlineInfoIcon} style={Icon.STYLE.COVER}
														  size={Icon.SIZE.LARGE}/>
												</div>
												<div className="confirmation__item--description">
													<p className="confirmation__item--description__par mb-0" dangerouslySetInnerHTML={{__html: onlineDescription}}/>
												</div>
												<div className="mt-3">
													<Button className="d-block"
														label={onlineCtaInfoLabel}
														ctaStyle={onlineMoreCTAStyle}
														href={onlineCtaInfoLink}
													/>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<if condition={!isTrustedShops && !this.isCartEmpty()}>
					<div id="trustedShopsCheckout" style={{display:'none'}}>
						<span id="tsCheckoutOrderNr">{orderID}</span>
						<span id="tsCheckoutBuyerEmail">{customer.email}</span>
						<span id="tsCheckoutOrderAmount">{cartDetails.prices.grand_total.value}</span>
						<span id="tsCheckoutOrderCurrency">{cartDetails.prices.grand_total.currency}</span>
						<span id="tsCheckoutOrderPaymentType">{'other'}</span>
						{this.getCartItems()?.map(cartItem =>
							<span key={cartItem.id} className="tsCheckoutProductItem">
								<span className="tsCheckoutProductUrl">{cartItem.details?.productUrl}</span>
								<span className="tsCheckoutProductImageUrl">{cartItem.details?.productImage?.[0]}</span>
								<span className="tsCheckoutProductName">{cartItem.product.name}</span>
								<span className="tsCheckoutProductSKU">{cartItem.product.sku}</span>
								<span className="tsCheckoutProductBrand">
									<I18n text={i18nLabels.PRODUCT_BRAND_NAME}/>
								</span>
							</span>
						)}
					</div>
				</if>
			</div>
		</if>);
	}
});