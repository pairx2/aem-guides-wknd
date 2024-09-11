import React from 'react';
import PropTypes from 'prop-types';
import I18n from '../../../Translation/components/I18n';
import { i18nLabels } from '../../../../utils/translationUtils';
import Icon from '../../../Generic/components/Icon/Icon';
import Button, { BUTTON_OPTIONS } from '../../../Generic/components/Button/Button';
import { getFormattedDate } from '../../../../utils/dateUtils';
import {getStatus,getInvoiceType} from '../../../../utils/orderUtils';
import { Title } from '../../../Generic/components/Title/Title';
import { formatPrice } from '../../../../utils/pricingUtils';
import { DELIVERY_STATUSES, SUBSCRIPTION_STATUS } from '../../../../utils/enums';
import ReturnStatus from '../../../MyAccount/components/OrderHistory/Return/ReturnStatus';

const Deliverable = ({ orderId, deliverable, index, productData, getInvoice, openChangeDeliveryDateModal, zipCode }) => {
	const getDeliverableDate = () => {
		let updatedDate = '';
		if (!deliverable.hasDelivery) {
			if (deliverable?.products?.[0]?.productRescheduledDueDate) {
				updatedDate = getFormattedDate(deliverable?.products?.[0]?.productRescheduledDueDate);
			} else {
				updatedDate = getFormattedDate(deliverable?.products?.[0]?.productOriginalDateFrom);
			}
		} else {
			updatedDate = getFormattedDate(deliverable?.estimatedDeliveryDate);
		}
		return updatedDate;
	};

	const returnDetails = deliverable?.deliveryDetails?.returnDetails;
	const deliveryOrderId = deliverable?.deliveryDetails?.deliveryOrderId;
	return (
		<div className="row pb-4">
			<div className="col-12 pb-3">
				<hr className="adc-border-bottom m-0" />
			</div>
			<div className="col-12 col-lg-6 mt-3">
				<p className="font-weight-600 m-0">
					<I18n text={!deliverable.hasDelivery ? i18nLabels.DELIVERABLE_DATE_LABEL : i18nLabels.ESTIMATED_DELIVERY_DATE_LABEL} suffix={': '} />
					{getDeliverableDate()}
				</p>
				<if condition={deliverable.hasDelivery}>
					<p className="font-weight-600 m-0"><I18n text={i18nLabels.ORDER_ID_LABEL} /> {deliverable.orderId}</p>
				</if>
			</div>
			<div className="col-12 col-lg-5 offset-lg-1 col-xl-4 offset-xl-2 mt-3">
				<div className="d-flex justify-content-between mb-2">
					<p><I18n text={i18nLabels.TOTAL_LABEL} /></p>
					<Title size={Title.SIZE.H6} text={`${formatPrice(deliverable.price || 0)}`}
						color={Title.COLOR.BLACK} />
				</div>
			</div>
			<div className="col-12">
				<div className="row align-items-center">
					<div className="col-12 col-lg-6">
						<div className="py-3 py-lg-0 mb-2">
							<div className={'my-3'}>
								{deliverable?.products.map(product => <p className={'m-0'} key={product.productSKU}><span className={'mr-3'}>{product.productQuantity}</span> {productData.find(_product => _product.productSKU === product.productSKU)?.productName}</p>)}
							</div>
							<div className="ml-auto d-flex align-items-center">
								<span className="pr-2">
									<I18n text={i18nLabels.DELIVERY_STATUS} suffix={':'} /><span className={'font-weight-600'}> <I18n text={deliverable.deliveryStatus} /></span>
								</span>
								<Icon image={getStatus(deliverable?.deliveryStatus)} />
							</div>
							<if condition={deliverable.deliveryDetails.deliveryTrackingNr}>
								{deliveryOrderId && zipCode && <I18n text={i18nLabels.TRACKING_LABEL} params={[Buffer.from(deliveryOrderId).toString('base64'), Buffer.from(zipCode).toString('base64')]} />}
							</if>
							<ReturnStatus returnDetails={returnDetails} />
						</div>
					</div>
					<if condition={deliverable.hasDelivery}>
						<div className="col-12 col-lg-5 offset-lg-1 col-xl-4 offset-xl-2">
							<if condition={deliverable && deliverable.invoiceIdDetails?.length}>
							{
								deliverable.invoiceIdDetails.map((invoice,index)=> {
									return <>
								<Button
											action={() => getInvoice({
										orderId: orderId,
												invoiceId: invoice.invoiceId,
												index: index,
											})}
											label={getInvoiceType(invoice.invoiceId)}
									ctaStyle={BUTTON_OPTIONS.STYLE.SECONDARY}
									size={BUTTON_OPTIONS.SIZE.LARGE}
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

					</if>
					<else>
						<div className="col-12 col-lg-5 offset-lg-1 col-xl-4 offset-xl-2">
							<if condition={deliverable?.deliveryStatus !== SUBSCRIPTION_STATUS.INACTIVE && deliverable?.deliveryStatus !== DELIVERY_STATUSES.DEACTIVATED && deliverable?.deliveryStatus !== SUBSCRIPTION_STATUS.CANCELLED}>
								<Button
									type={BUTTON_OPTIONS.TYPE.BUTTON}
									label={i18nLabels.EDIT_DELIVERY_DATE}
									ctaStyle={BUTTON_OPTIONS.STYLE.SECONDARY}
									action={openChangeDeliveryDateModal}
									hasNoMargin
									isFullWidth
								/>
							</if>
						</div>
					</else>
				</div>
			</div>
		</div>
	);
};

Deliverable.propTypes = {
	orderId: PropTypes.string,
	index: PropTypes.number,
	productData: PropTypes.array,
	deliverable: PropTypes.object,
	getInvoice: PropTypes.func,
	openChangeDeliveryDateModal: PropTypes.func
};

export default Deliverable;