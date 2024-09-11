import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Card, CardAction, CardContent} from '../../../Generic/components/Card/Card';
import PropTypes from 'prop-types';
import {i18nLabels} from '../../../../utils/translationUtils';
import LoadingIndicator from '../../../Generic/components/Loading/LoadingIndicator';
import Row from '../../../Generic/components/Container/Row';
import {Title} from '../../../Generic/components/Title/Title';
import {
	getCustomerPaymentTokensRequest,
	initializeCustomerPaymentTokenRequest, saveCustomerPaymentTokenRequest
} from '../../redux/actions/payment.action';
import Icon from '../../../Generic/components/Icon/Icon';
import {paymentMapping} from '../PaymentMapping';
import {getUrlParameter} from '../../../../utils/getParams';
import PaymentMethod from './PaymentMethod';
import AddPaymentMethod from './AddPaymentMethod';
import I18n from '../../../Translation/components/I18n';
import Link from '../../../Generic/components/Link/Link';
import {PAYMENT_TYPES, MAGENTO_PAYMENT_TYPES, BOOLEAN_STRING} from '../../../../utils/enums';
import MessageBanner from '../../../Generic/components/MessageBanner/MessageBanner';

const mapStateToProps = state => {
	const {isLoading, paymentTokens, payonCheckoutId, canGoToPaymentTab, error, errorInSavingPayment} = state.paymentModuleReducer.PaymentReducer;
	return {isLoading, paymentTokens, payonCheckoutId, canGoToPaymentTab, error, errorInSavingPayment};
};

const mapDispatchToProps = {
	getCustomerPaymentTokens: getCustomerPaymentTokensRequest,
	initializeCustomerPaymentToken: initializeCustomerPaymentTokenRequest,
	saveCustomerPaymentToken: saveCustomerPaymentTokenRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(class PaymentDisplayEdit extends Component {

	static propTypes = {
		getCustomerPaymentTokens: PropTypes.func,
		initializeCustomerPaymentToken: PropTypes.func,
		saveCustomerPaymentToken: PropTypes.func,
		payonEndpoint: PropTypes.string,
		paymentTokens: PropTypes.array,
		isLoading: PropTypes.bool,
		canGoToPaymentTab: PropTypes.bool,
		payonCheckoutId: PropTypes.string,
		confirmationPage: PropTypes.string,
		checkboxes: PropTypes.array,
		isEnableDesign: PropTypes.bool,
		accountPagePath: PropTypes.string,
		accountPageTab: PropTypes.string,
		error: PropTypes.number,
		errorInSavingPayment: PropTypes.number
	};

	state = {
		expandedIndex: null,
		loadingIndex: null,
		paymentMethod: null,
		isOpenInvoiceClicked: false
	};

	componentDidMount() {
		const {saveCustomerPaymentToken, getCustomerPaymentTokens} = this.props;
		const confirmedPayonCheckoutId = this.getConfirmedCheckoutId();
		const isDefaultPayment = window.localStorage.getItem('isDefaultPayment');
		const isOrderUpdate = getUrlParameter('orderId');
		window.localStorage.removeItem('isDefaultPayment');
		if (confirmedPayonCheckoutId && !isOrderUpdate) {
			saveCustomerPaymentToken({
				paymentMethod: getUrlParameter('paymentMethod'),
				payonCheckoutId: confirmedPayonCheckoutId,
				isDefaultPayment: isDefaultPayment ===BOOLEAN_STRING.TRUE ? true : false
			});
		} else if (getUrlParameter('isOpenInvoice') === BOOLEAN_STRING.TRUE && !isOrderUpdate) {
			saveCustomerPaymentToken({
				paymentMethod: 'open_invoice',
				isDefaultPayment: isDefaultPayment === BOOLEAN_STRING.TRUE ? true : false
			});
		} else {
			getCustomerPaymentTokens();
		}
	}

	componentDidUpdate(prevProps, prevState) {
		const {payonEndpoint, payonCheckoutId, canGoToPaymentTab, accountPageTab, error} = this.props;
		const {paymentMethod} = this.state;

		if (payonCheckoutId && prevProps.payonCheckoutId !== payonCheckoutId) {
			this.setState({expandedIndex: this.state.loadingIndex, loadingIndex: null});
			const tag = document.createElement('script');
			tag.async = true;
			tag.src = `${payonEndpoint}/v1/paymentWidgets.js?checkoutId=${payonCheckoutId}`;
			document.getElementsByTagName('body')[0].appendChild(tag);
		}
		if (paymentMethod === PAYMENT_TYPES.OPEN_INVOICE && paymentMethod !== prevState.paymentMethod) {
			this.setState({expandedIndex: this.state.loadingIndex, loadingIndex: null});
		}
		if(canGoToPaymentTab && prevProps.canGoToPaymentTab !== canGoToPaymentTab) {
			if(accountPageTab){
				history.pushState({}, null, `${window.location.pathname}`);
				document.querySelector(`a[href="#${accountPageTab}"]`)?.click();
			}
		}
		if(payonCheckoutId !== prevProps.payonCheckoutId && error) {
			this.setState({expandedIndex: null});
		}

	}

	getConfirmedCheckoutId = () => {
		const id = getUrlParameter('id');
		const resourcePath = getUrlParameter('resourcePath');
		return (!resourcePath || resourcePath.indexOf('checkouts') === -1) ? undefined : id;
	};

	toggleOption = (index) => {
		const {initializeCustomerPaymentToken} = this.props;
		const isExpanded = this.state.expandedIndex === index;

		if (!isExpanded) {
			const paymentMethod = this.getMappedPaymentMethods()[index].magentoId;
			if (paymentMethod !== PAYMENT_TYPES.OPEN_INVOICE) {
				initializeCustomerPaymentToken({
					paymentMethod: paymentMethod,
					orderUpdateType: '',
					orderId: '',
					paymentMethodToken: ''
				});
			}
			this.setState({
				loadingIndex: index,
				paymentMethod: paymentMethod
			});
		}
	};

	getMappedPaymentMethods = () => {
		return paymentMapping.filter(p => !p.checkoutOnly && !p.hideAddEdit && !p.orderUpdateOnly && p.magentoId !== MAGENTO_PAYMENT_TYPES.FREE);
	};

	markFormAsDirty = () => {
		window.localStorage.setItem('isDefaultPayment', document.querySelector('input[name="customParameters[SHOPPER_isDefaultPaymentMethod]"]')?.checked);
		this.setState({isOpenInvoiceClicked: true});
	};

	render() {
		const {isLoading, paymentTokens, confirmationPage, checkboxes, isEnableDesign, accountPagePath, accountPageTab, error, errorInSavingPayment} = this.props;
		const {expandedIndex, loadingIndex, isOpenInvoiceClicked, paymentMethod} = this.state;
		const mappedPaymentMethods = this.getMappedPaymentMethods();
		const isPayon = expandedIndex !== null ? mappedPaymentMethods[expandedIndex]?.payon : false;
		const paymentEditUrl = `${accountPagePath}#${accountPageTab}`;

		return <>
			<if condition={isLoading}>
				<Card title={i18nLabels.PAYMENT_METHOD_LABEL} className={'adc-payment'}>
					<CardContent>
						<Row className={'justify-content-center'}>
							<LoadingIndicator />
						</Row>
						<Row className={'justify-content-center'}>
							<Title size={Title.SIZE.H6} text={i18nLabels.PLEASE_WAIT} color={Title.COLOR.BLUE} />
						</Row>
					</CardContent>
				</Card>
			</if>
			<else>
				<div>
					<if condition={errorInSavingPayment}>
						<MessageBanner className={'mb-5'} icon={MessageBanner.ICON.FAILURE} color={MessageBanner.COLOR.RED} description={i18nLabels.SAVE_PAYMENT_FAILURE} canClose/>
					</if>
					<if condition={paymentTokens?.length > 0}>
						<PaymentMethod isDefault paymentMethod={paymentTokens.find(pt => pt.is_default === true)}
						 title={i18nLabels.DEFAULT_PAYMENT_METHOD} isEnableDesign={isEnableDesign} paymentEditUrl={paymentEditUrl} isDefaultView />
						<if condition={paymentTokens.length < 2}>
							<if condition={!isEnableDesign}>
								<div className="col-12 col-md-12 col-lg-6 p-0 pb-3">
									<AddPaymentMethod expandedIndex={expandedIndex} loadingIndex={loadingIndex}
										isPayon={isPayon} confirmationPage={confirmationPage} paymentMethod={paymentMethod}
										isOpenInvoiceClicked={isOpenInvoiceClicked} paymentMapping={mappedPaymentMethods} error={error}
										toggleOption={this.toggleOption} markFormAsDirty={this.markFormAsDirty} checkboxes={checkboxes} />
								</div>
							</if>
						</if>
						<if condition={!isEnableDesign}>
							<div className="col-12 col-md-12 col-lg-6 p-0">
								<PaymentMethod paymentMethod={paymentTokens.find(pt => pt.is_default === false)}
									title={i18nLabels.SECONDARY_PAYMENT_METHOD} />
							</div>
						</if>
					</if>
					<else>
						<div className="row">
							<div className={`col-12 col-md-12 ${!isEnableDesign ? 'col-lg-6' : 'col-lg-12'}`}>
								<Card title={i18nLabels.DEFAULT_PAYMENT_METHOD}>
									<CardContent>
										<Icon image={'open-invoice'} size={Icon.SIZE.XXL} />
										<h6><I18n text={i18nLabels.NO_PAYMENT_DATA_AVAILABLE} /></h6>
										<p className={'text-small'}><I18n text={i18nLabels.NEEDED_FOR_YOUR_ORDERS} /></p>
										<div className={'d-flex align-items-center pb-3'}>
											<Icon image={'lock-gray'} size={Icon.SIZE.MEDIUM} />
											<p className={'text-small mb-0 ml-1'}>{'Ihre Daten sind bei uns sicher.'}</p>
										</div>
									</CardContent>
									<if condition={isEnableDesign}>
										<CardAction>
											<Link label={i18nLabels.EDIT} href={paymentEditUrl} icon={'edit-icon'} />
										</CardAction>
									</if>
								</Card>
							</div>
							<if condition={!isEnableDesign}>
								<div className="col-12 col-md-12 col-lg-6 pb-3">
									<AddPaymentMethod expandedIndex={expandedIndex} loadingIndex={loadingIndex}
										isPayon={isPayon} confirmationPage={confirmationPage} paymentMethod={paymentMethod}
										isOpenInvoiceClicked={isOpenInvoiceClicked} paymentMapping={mappedPaymentMethods} error={error}
										toggleOption={this.toggleOption} markFormAsDirty={this.markFormAsDirty} checkboxes={checkboxes} />
								</div>
							</if>
						</div>
					</else>
				</div>
			</else>
		</>;
	}
});