import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import translate, {i18nLabels} from '../../../../utils/translationUtils';
import SubscriptionDetails from './SubscriptionDetails';
import I18n from '../../../Translation/components/I18n';
import DeliveryStatus from './DeliveryStatus';
import {getFormattedDate} from '../../../../utils/dateUtils';
import {SubscriptionPaymentInformation} from './SubscriptionPaymentInformation';
import {Card, CardAction, CardContent} from '../../../Generic/components/Card/Card';
import Link from '../../../Generic/components/Link/Link';
import OrderPaymentDisplayAndEdit from './OrderPaymentDisplayAndEdit';
import Col from '../../../Generic/components/Container/Col';
import Row from '../../../Generic/components/Container/Row';


const mapStateToProps = state => {
	const {dictionary} = state.translationModuleReducer.translationReducer;
	const {customer} = state.myAccountModuleReducer.GetCustomerReducer;
	return {customer, dictionary};
};

export default connect(mapStateToProps, null)(class SubscriptionEditor extends Component {
	static propTypes = {
		close: PropTypes.func,
		customer: PropTypes.object,
		order: PropTypes.object,
		orderServiceStatus: PropTypes.string,
		products: PropTypes.object,
		dictionary: PropTypes.object,
		confirmationPath: PropTypes.string,
		checkboxes: PropTypes.array
	};

	state = {
		togglePaymentEditing: false
	}

	editPaymentMethod = (togglePaymentEditing) => {
		this.setState({
			togglePaymentEditing
		});
	};
	getProductDetailsReaders = (order) =>{
		const productData = order?.productData;
		const serviceData = order?.serviceData;
		const readerData = productData?.filter(product => product.productSKU !== serviceData?.[0]?.productSKUDetails?.[0].productSKU);
		return readerData?.map(reader => `${reader.productQuantity} ${reader.productName}`).join(',');
	};
	getServiceDescription = (order, dictionary) => {
		const productData = order?.productData;
		const serviceData = order?.serviceData;
		const productDetails = serviceData?.[0]?.productSKUDetails?.length > 0 ? this.getProductDetailsReaders(order) : undefined;
		const productQuantity = serviceData?.[0]?.serviceProductQuantity;
		const productName =  productData?.[0]?.productName;
		const details = productDetails ? `, ${productDetails} )`: ')';
		let duration = '';
		if(serviceData?.[0]?.serviceDuration) 
			duration += ` - ${serviceData?.[0]?.serviceDuration} Monaten }`;
		else if (serviceData?.[0]?.serviceFrequency)
			duration += ` - ${translate(dictionary, 'product_frequency_label_' + serviceData?.[0]?.serviceFrequency)}`;
		
		if (!serviceData) return undefined;
		return `( ${productQuantity} ${productName} ${duration} ${details}`
	};
	render() {
		const {close, order, customer, orderServiceStatus, products, confirmationPath, checkboxes, dictionary} = this.props;
		return (
			<Card title={i18nLabels.EDIT_PLUS_SERVICE}>
				<CardContent>
					<div className="row">
						<div className="col-12 col-lg">
							<SubscriptionDetails order={order} products={products} />
							<section className="mt-4">
								<div className="adc-form-group border-bottom-grey pb-3">
									<h6><I18n text={i18nLabels.DELIVERY_PERIOD} suffix={':'} /></h6>
									<p dangerouslySetInnerHTML={{__html: this.getServiceDescription(order, dictionary)}}/>
								</div>
							</section>
							<if condition={order.currentDeliveryDetails}>
								<section className="mt-4">
									<DeliveryStatus
										deliveryDetails={order.currentDeliveryDetails}
										text={i18nLabels.EXPECTED_DELIVERY_DATE}
										orderServiceStatus={orderServiceStatus}
										order={order}/>
								</section>
								<if condition={order.deliveryDetails && order.deliveryDetails[1]}>
									<section className="mt-4">
										<DeliveryStatus
											deliveryDetails={order.deliveryDetails?.[1]}
											text={i18nLabels.LAST_DELIVERY}
											orderServiceStatus={orderServiceStatus}/>
									</section>
								</if>
							</if>
							<else>
								<section className="mt-4">
									<h6 className={'mb-4'}>
										<I18n text={i18nLabels.DELIVERY_PERIOD_STARTS_AT} suffix={':'} />
									</h6>
									<div
										className='d-flex justify-content-between align-items-center adc-title--border-bottom mb-3'>
										<p className="m-0">{getFormattedDate(order.serviceData?.[0]?.serviceFromDate)}</p>
									</div>
								</section>
							</else>
							<section className="mt-4">
								<SubscriptionPaymentInformation
									order={order}
									editSubscriptionPayment={() => this.editPaymentMethod(true)} />
							</section>
						</div>
						<div className="col-12 col-lg offset-lg-1">
							<if condition={this.state.togglePaymentEditing}>
								<OrderPaymentDisplayAndEdit order={order}  customer={customer} checkboxes={checkboxes} confirmationPage={confirmationPath}/>
							</if>
						</div>
					</div>
				</CardContent>
				<CardAction>
					<Row>
						<Col width={4} className={'text-left pb-3'}>
							<Link action={close}
								label={i18nLabels.BACK_TO_ORDER_OVERVIEW_CTA}
								className={'pt-1'}
							/>
						</Col>
					</Row>
				</CardAction>
			</Card>
		);
	}
});