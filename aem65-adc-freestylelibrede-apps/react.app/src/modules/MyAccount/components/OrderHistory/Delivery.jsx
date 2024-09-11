import React from 'react';
import Icon from '../../../Generic/components/Icon/Icon';
import I18n from '../../../Translation/components/I18n';
import PropTypes from 'prop-types';
import { DELIVERY_STATUSES, RETURN_ELIGIBLE_STATUSES, RETURN_TYPE, RETURN_STATUSES, PRODUCT_DELIVERABLE_STATUS } from '../../../../utils/enums';
import { i18nLabels } from '../../../../utils/translationUtils';
import Button, { BUTTON_OPTIONS } from '../../../Generic/components/Button/Button';
import {getTrackingURL, getStatus,getInvoiceType} from '../../../../utils/orderUtils';
import LoadingIndicator, { LOADING_INDICATOR_OPTIONS } from '../../../Generic/components/Loading/LoadingIndicator';
import ReturnStatus from '../../../MyAccount/components/OrderHistory/Return/ReturnStatus';


const Delivery = ({ orderId, delivery, getFormattedDate, getReturnReceipt, returnId, returnArticle, orderDate, getInvoice, rmaLabels, isOrderLoading, productData, commercialReturnGracePeriod, zipCode }) => {
	const {
		index,
		deliveryStatus,
		deliveryOrderId,
		estimatedDeliveryDate,
		deliveredDate,
		returnDetails
	} = delivery;
	const returnSent = deliveryStatus !== DELIVERY_STATUSES.RETURN_DECLARED;
	const getDeliveryStatus = getStatus(deliveryStatus);
	const trackingURL = getTrackingURL(delivery.deliveryTrackingNr);

	const returnType = returnDetails?.[0]?.returnType?.toLowerCase();
	const isReturnAvailable = (status, deliveryDate) => (RETURN_ELIGIBLE_STATUSES.indexOf(status) > -1) && (new Date(deliveryDate).setDate(new Date(deliveryDate).getDate() + parseInt(commercialReturnGracePeriod))) >= new Date();
	const isReturnQtyCheck = (deliveryDate) => {
		let returnQuantity = 0;
		let deliveryProductQuantity = 0;
		returnDetails?.forEach(returnDetailsObj => {
            returnDetailsObj?.returnItemDetails?.forEach(returnItemObj => {
                returnQuantity += returnItemObj?.returnItem?.returnItemQuantity ? parseInt(returnItemObj?.returnItem?.returnItemQuantity) : 0;
            });
        });

		delivery?.products?.forEach(deliveryProductObj => {
			deliveryProductQuantity += deliveryProductObj?.productQuantity ? parseInt(deliveryProductObj?.productQuantity) : 0;
		});

		if (returnQuantity !== 0 && deliveryProductQuantity !== 0 && deliveryProductQuantity > returnQuantity) {
			return (new Date(deliveryDate).setDate(new Date(deliveryDate).getDate() + parseInt(commercialReturnGracePeriod))) >= new Date();
		} else {
			return false;
		}
	}
	return (
		<div className="row pb-4">
			<div className="col-12 pb-3">
				<hr className="adc-border-bottom m-0" />
			</div>
			<div className="col-12">
				<p className="adc-order-hist__subs__desc-date m-0 lspacing-point3"><I18n text={i18nLabels.ESTIMATED_DELIVERY_DATE_LABEL} suffix={': '} /> {getFormattedDate(estimatedDeliveryDate)}</p>
				<p className="adc-order-hist__subs__desc-prod-id m-0">
					<I18n text={i18nLabels.ORDER_ID_LABEL} /> {deliveryOrderId}</p>
			</div>
			<if condition={deliveryStatus === DELIVERY_STATUSES.RETURN_DECLARED || returnDetails?.[0]?.returnId || returnId}>
				<div className="col-12">
					<div className="row align-items-center">
						<div className="col-12">
							<div className="d-flex align-items-center pt-3 pt-lg-0">
								<h3 className="adc-order-hist__subs__desc-heading font-weight-600 m-0 adc-product__subscription__desc-heading font-weight-600 m-0">
									<I18n text={i18nLabels.INDEXED_DELIVERY} params={[index]} />
								</h3>
								<div className="ml-auto d-flex adc-order-hist__return-order-tab h-100">
									<div className="d-flex align-self-center align-items-center pl-2 py-3 pl-md-4">
										<i className="adc-icon adc-icon--md adc-icon--return-blue " />
										<span className="adc-order-hist__subs__desc-heading font-weight-600 pl-3">
											<I18n text={deliveryStatus} />
										</span>
									</div>
								</div>
							</div>
						</div>
						<div className="col-12 m-top--1">
							<div className="adc-order-hist__subs-round p-3 p-md-5">
								<div className="row">
									<div className="col-12 col-lg-4 pb-md-4 order-sm-1 order-2">
										<ReturnStatus returnDetails={returnDetails} />
									</div>
									<div className="col-12 col-lg-8 order-sm-2 order-1 px-3 pl-lg-5">
										<div className="pt-4 pb-2">
											<if condition={isOrderLoading && !rmaLabels}>
												<div className="mt-3"><LoadingIndicator size={LOADING_INDICATOR_OPTIONS.SIZE.SMALL} label={i18nLabels.GENERATING_RMA_LABEL} /></div>
											</if>
											{
												returnDetails?.map((returnDetailsObj,index)=> {
													return <>
													<if condition={returnDetailsObj?.returnType?.toLowerCase() === RETURN_TYPE.COMMERCIAL_RETURN}>
														<Button
															action={() => getReturnReceipt(returnDetailsObj?.returnId, returnDetailsObj?.returnLabelType?.toLowerCase().includes("dhl_qr"))}
															label={returnDetailsObj?.returnLabelType !== null && returnDetailsObj?.returnLabelType !== '' ? 'download_return_form_' + returnDetailsObj?.returnLabelType?.toLowerCase() : 'download_return_form'}
															ctaStyle={BUTTON_OPTIONS.STYLE.PRIMARY}
															size={BUTTON_OPTIONS.SIZE.LARGE}
															color="blue"
															hasNoMargin
															isFullWidth
															icon='download-white'
															iconPosition={Icon.POSITION.LEFT}
															className={'download_return_form_ml_40 mt-1'}
														/>
													</if>
													</>
												})
											}
											<div className="col-12 py-2 px-0">
											
												<if condition={delivery && delivery.invoiceIdDetails?.length}>
												{
													delivery.invoiceIdDetails.map((invoice,index)=> {
														return <>
													<Button
																action={() => getInvoice({
															orderId: orderId,
															invoiceId: invoice.invoiceId,
															index: index
																})}
																label={getInvoiceType(invoice.invoiceId)}
														ctaStyle={BUTTON_OPTIONS.STYLE.SECONDARY}
														size={BUTTON_OPTIONS.SIZE.LARGE}
														color="blue"
														hasNoMargin
														isFullWidth
														icon={'arrow-blue-download'}
														iconPosition={Icon.POSITION.LEFT}
																className={'mt-2'}
													/>
														</>
													})
												}
												</if>
											</div>

											{isReturnQtyCheck(deliveredDate) && returnDetails[0]?.csStatus !== PRODUCT_DELIVERABLE_STATUS.CANCELLED &&
												<Button
												action={() => returnArticle(delivery, {
													orderDate,
													orderId,
													estimatedDeliveryDate,
													deliveryOrderId
												})}
												label={i18nLabels.RETURN_ORDER}
												ctaStyle={BUTTON_OPTIONS.STYLE.SECONDARY}
												size={BUTTON_OPTIONS.SIZE.LARGE}
												color="blue"
												hasNoMargin
												isFullWidth
												className={'mt-2'}
											/>}

											<if condition={returnSent && trackingURL}>
											{deliveryOrderId && zipCode && <I18n text={i18nLabels.TRACKING_LABEL} params={[Buffer.from(deliveryOrderId).toString('base64'), Buffer.from(zipCode).toString('base64')]} />}
											</if>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</if>
			<else>
				<div className="col-12">
					<div className="row align-items-center">
						<div className="col-12 col-lg-7">
							<div className="py-3 py-lg-0 mb-2">
								<h3 className="adc-order-hist__subs__desc-heading font-weight-600 m-0 font-weight-600 m-0">
									{delivery?.products.map(product => <p className={'m-0'} key={product.productSKU}><span className={'mr-1'}>{product.productQuantity}</span> {productData.find(_product => _product.productSKU === product.productSKU)?.productName}</p>)}
								</h3>
								<div className="d-flex row align-items-top">
									<div className="col-12">
										<if condition={delivery.deliveryTrackingNr}>
											{deliveryOrderId && zipCode && <I18n text={i18nLabels.TRACKING_LABEL} params={[Buffer.from(deliveryOrderId).toString('base64'), Buffer.from(zipCode).toString('base64')]} />}
										</if>
									</div>
									<div className="col-12 d-flex align-items-center pt-1">
										<span className="pr-2">
											<I18n text={i18nLabels.DELIVERY_STATUS} suffix={':'} />
											<span className={'font-weight-600'}> <I18n text={deliveryStatus} /></span>
										</span>
										<Icon image={getDeliveryStatus} />
									</div>
								</div>
							</div>
						</div>
						<div className="col-12 col-lg-5">
							<if condition={delivery && delivery.invoiceIdDetails?.length}>
							{
								delivery.invoiceIdDetails.map((invoice,index)=> {
									return <>
								<Button
											action={() => getInvoice({
										orderId: orderId,
										invoiceId: invoice.invoiceId,
										index: index
											})}
											label={getInvoiceType(invoice.invoiceId)}
									ctaStyle={BUTTON_OPTIONS.STYLE.SECONDARY}
									size={BUTTON_OPTIONS.SIZE.LARGE}
									color="blue"
									hasNoMargin
									isFullWidth
									icon={'arrow-blue-download'}
									iconPosition={Icon.POSITION.LEFT}
								/>
									</>
								})
							}
							</if>
							<if condition={isReturnAvailable(deliveryStatus, deliveredDate)}>
								<Button
									action={() => returnArticle(delivery, {
										orderDate,
										orderId,
										estimatedDeliveryDate,
										deliveryOrderId
									})}
									label={i18nLabels.RETURN_ORDER}
									ctaStyle={BUTTON_OPTIONS.STYLE.SECONDARY}
									size={BUTTON_OPTIONS.SIZE.LARGE}
									color="blue"
									hasNoMargin
									isFullWidth
									className={'mt-2'}
								/>
							</if>
						</div>
					</div>
				</div>
			</else>
		</div>
	);
};

Delivery.propTypes = {
	orderId: PropTypes.string,
	delivery: PropTypes.object,
	getFormattedDate: PropTypes.func,
	returnArticle: PropTypes.func,
	returnId: PropTypes.string,
	orderDate: PropTypes.number,
	estimatedDeliveryDate: PropTypes.number,
	getInvoice: PropTypes.func,
	getReturnReceipt: PropTypes.func,
	returnDetails: PropTypes.array,
	rmaLabels: PropTypes.object,
	isOrderLoading: PropTypes.bool,
	productData: PropTypes.array,
	commercialReturnGracePeriod: PropTypes.number
};

export default Delivery;