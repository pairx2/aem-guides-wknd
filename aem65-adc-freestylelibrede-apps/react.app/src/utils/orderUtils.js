import { getServiceEndPoint, orderParams } from './endpointUrl';
import { DELIVERY_STATUSES, COUNTRY_OPTIONS, GHOST_ORDER_STATUS, ORDER_TYPES, PRODUCT_DELIVERABLE_STATUS, WCM_MODE_EDIT, SUBSCRIPTION_STATUS } from './enums';
import translate, { i18nLabels } from '../utils/translationUtils';
import { getRequiredSiteData } from './siteData';
import { INVOICE_PREFIX } from './enums';

export const getCountryName = code => code && COUNTRY_OPTIONS.find(country => country.value.toLowerCase() === code.toLowerCase()).label || code;
export const rxOrderStatus49 = 49;
export const rxOrderStatus50 = 50;
export const rxOrderEndStatusArray = [60, 65, 90, 92, 95, 30, 31, 32, 33, 37, 96];
export const getTrackingURL = trackingId => `${getServiceEndPoint(orderParams.DHL_TRACKING_URL)}${trackingId}`;
export const returnReasons = [
	{
		value: 'R02',
		label: i18nLabels.SELECT_SECOND_REASON,
		allowed: true
	},
	{
		value: 'R03',
		label: i18nLabels.SELECT_THIRD_REASON,
		allowed: false
	},
	{
		value: 'R04',
		label: i18nLabels.SELECT_FOURTH_REASON,
		allowed: false
	},
	{
		value: 'R05',
		label: i18nLabels.SELECT_FIFTH_REASON,
		allowed: false
	},
	{
		value: 'R06',
		label: i18nLabels.SELECT_SIXTH_REASON,
		allowed: false
	}
];
export const orcReturnReasons = [
	{
		value: 'OrcR01',
		label: i18nLabels.SELECT_FIRST_ORC_REASON,
		allowed: true
	},
	{
		value: 'OrcR02',
		label: i18nLabels.SELECT_SECOND_ORC_REASON,
		allowed: false
	},
	{
		value: 'OrcR03',
		label: i18nLabels.SELECT_THIRD_ORC_REASON,
		allowed: false
	}
];
export const getStatus = (orderStatus) => {
	switch (orderStatus) {
		case DELIVERY_STATUSES.ORDER_SHIPPED:
		case DELIVERY_STATUSES.OUT_FOR_DELIVERY:
		case DELIVERY_STATUSES.DELIVERED:
		case DELIVERY_STATUSES.DELIVERED_TO_3RD_PARTY:
			return 'status-green';
		case DELIVERY_STATUSES.CREATED:
		case DELIVERY_STATUSES.IN_PREPARATION:
		case DELIVERY_STATUSES.IN_PROGRESS:
		case DELIVERY_STATUSES.SCHEDULED:
		case DELIVERY_STATUSES.PAYMENT_COMPLETED:
		case DELIVERY_STATUSES.PAYMENT_PENDING:
		case DELIVERY_STATUSES.PAYMENT_METHOD_ACCEPTED:
		case DELIVERY_STATUSES.CREATED_ON_HOLD:
		case DELIVERY_STATUSES.CREATED_ON_HOLD_1:
		case DELIVERY_STATUSES.CREATED_DENIED_PARTY:
			return 'status-yellow';
		case DELIVERY_STATUSES.RETURN_DECLARED:
		case DELIVERY_STATUSES.CARRIER_RETURN:
		case DELIVERY_STATUSES.CARRIER_RETURN_ACCEPTANCE:
		case DELIVERY_STATUSES.CARRIER_RETURN_NOT_COLLECTED:
		case DELIVERY_STATUSES.CARRIER_RETURN_NOT_REACHED:
		case DELIVERY_STATUSES.CARRIER_RETURN_RECIPIENT_UNKNOWN:
		case DELIVERY_STATUSES.CARRIER_RETURN_DAMAGE:
		case DELIVERY_STATUSES.CANCELLED:
		case DELIVERY_STATUSES.RX_CANCELLED:
		case DELIVERY_STATUSES.DEACTIVATED:
		case DELIVERY_STATUSES.INACTIVE:
			return 'status-red';
	}
};

export const getRxOrderStatus = (statusCode) => {
	switch (statusCode) {
		case 50:
		case 90:
		case 92:
		case 91:
			return GHOST_ORDER_STATUS.ACTIVE;
		case 0:
		case 10:
		case 20:
		case 22:
		case 23:
		case 35:
		case 25:
		case 27:
		case 40:
		case 48:
			return GHOST_ORDER_STATUS.OPEN;
		case 51:
		case 52:
		case 53:
		case 54:
		case 55:
		case 56:
		case 57:
		case 58:
		case 59:
		case 60:
		case 95:
		case 30:
		case 31:
		case 32:
		case 33:
		case 37:
		default:
			return GHOST_ORDER_STATUS.COMPLETED;
	}
};


const getRXProductLabels = (order, filterCancelOrder) => {
	const { productData, serviceData } = order
	if (filterCancelOrder) {
		productData.filter(product => product.deliverableStatus != PRODUCT_DELIVERABLE_STATUS.CANCELLED);
	}
	const deliverable = [];
	productData.forEach((prodData) => {
		const isSkuExist = deliverable.filter(res => res.sku == prodData.productSKU);
		if (isSkuExist.length == 0) {
			deliverable.push({
				sku: prodData.productSKU,
				skuName: prodData.productName,
				skyQty: prodData.productQuantity
			});
		} else {
			deliverable.forEach((deliData) => deliData.skyQty = deliData.sku == prodData.productSKU ? deliData.skyQty + prodData.productQuantity : deliData.skyQty);
		}
	});
	const month = serviceData && serviceData?.[0].serviceDuration && serviceData?.[0].serviceDuration != null ? " - " + serviceData?.[0].serviceDuration + " Monaten" : "";
	return "(" + deliverable.map(reader => `${reader.skyQty} ${reader.skuName}`).join(', ') + month + ")";
};


const getProductDetailsReaders = (order) => {
	const { productData, serviceData } = order;
	const readerData = productData.filter(product => product.productSKU !== serviceData?.[0]?.productSKUDetails?.[0].productSKU);
	return readerData.map(reader => `${reader.productQuantity} ${reader.productName}`).join(',');
};

const getSensorName = (order) => {
	const { productData, serviceData } = order;
	if (serviceData?.[0]?.productSKUDetails?.length > 0) {
		const sensorSKU = serviceData?.[0]?.productSKUDetails?.[0]?.productSKU;
		return productData?.find(deliverable => deliverable.productSKU === sensorSKU)?.productName;
	} else {
		return undefined;
	}
};

export const getOrderDescriptionLabel = (order, dictionary, filterCancelOrder = true) => {
	const { orderType, productData, serviceData } = order;
	const productDetails = serviceData?.[0]?.productSKUDetails?.length > 0 ? getProductDetailsReaders(order) : undefined;

	const productQuantityAndNameCPO = productData?.map(deliverable => `${deliverable.productQuantity} ${deliverable.productName}`).join(', ');
	const productQuantity = serviceData?.[0]?.serviceProductQuantity;
	const productName = getSensorName(order) || productData?.[0]?.productName;
	const details = `, ${productDetails} )`
	let duration = '';
		if(serviceData?.[0]?.serviceDuration) 
			duration += ` - ${serviceData?.[0]?.serviceDuration} Monaten }`;
		else if (serviceData?.[0]?.serviceFrequency && orderType === ORDER_TYPES.CPS)
			duration += ` - ${translate(dictionary, 'product_frequency_label_' + serviceData?.[0]?.serviceFrequency)}`;


	switch (orderType) {
		case ORDER_TYPES.CPO:
			return `( ${productQuantityAndNameCPO} )`;
		case ORDER_TYPES.CPS:
			return `( ${productQuantity} ${productName} ${duration} ${details}`;
		case ORDER_TYPES.RX:
			return getRXProductLabels(order, filterCancelOrder);
		default:
			return '';
	}
};

export const checkOrdersHasProduct = (orderList, productSet, inOnlyActiveOrders = false) => {
	let hasProduct = false;
	const allDeliverables = [];
	let allDeliverablesFilter=[];

	if (inOnlyActiveOrders) {
		orderList = orderList?.filter(order => !(order?.serviceData && order?.serviceData[0]?.serviceStatus != SUBSCRIPTION_STATUS.ACTIVE));
	}
	orderList?.forEach((item) => item?.deliveryDetails?.map(delivery => { allDeliverables?.push(delivery) }));

	if (inOnlyActiveOrders) {
		allDeliverablesFilter = allDeliverables.filter(deliveryDetails => !([DELIVERY_STATUSES.CANCELLED, DELIVERY_STATUSES.RX_CANCELLED].includes(deliveryDetails.deliveryStatus)));
	}
	allDeliverablesFilter?.forEach((productItem) => {
		if (productItem?.productSKU && productSet.has(productItem.productSKU)) { hasProduct = true; }
	})
	return hasProduct;
};

export const getWcmMode = () => { return getRequiredSiteData('wcmmode') === WCM_MODE_EDIT ? true : false }

export const getInvoiceType = (invoiceId) => {
	invoiceId = invoiceId.toUpperCase();
	if(invoiceId.startsWith(INVOICE_PREFIX.INVOICE)){
		return i18nLabels.INVOICE_TYPE_INVOICE;
	}else if(invoiceId.startsWith(INVOICE_PREFIX.CREDIT_NOTE)){
		return i18nLabels.INVOICE_TYPE_CREDIT_NOTE;
	}else{
		return i18nLabels.OPEN_INVOICE;
	}
}

export const getGhostOrdersbyStatusCode = (statusCode,ghostOrders,ghostOrder,ghostOrderTypes) => {
	switch (statusCode){
		case GHOST_ORDER_STATUS.ACTIVE:
			ghostOrderTypes['active_order'] && !ghostOrders[ghostOrder].is_completed? ghostOrderTypes['active_order'].push(ghostOrders[ghostOrder]) : ghostOrderTypes['completed_order'].push(ghostOrders[ghostOrder]);
			break;
		case GHOST_ORDER_STATUS.OPEN:
			ghostOrderTypes['open_order']?.push(ghostOrders[ghostOrder]);
			break;
		case GHOST_ORDER_STATUS.COMPLETED:
			ghostOrderTypes['completed_order']?.push(ghostOrders[ghostOrder]);
			break;
	}
	return ghostOrderTypes;
}

export const getOrderImagesPath = (sku) => {
	return `/content/dam/adc/freestylelibrede/products/sku-mapping/${sku}.png`
}