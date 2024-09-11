import {ADOBE_ANALYTICS_EVENTS, ADOBE_LAUNCH_EVENTS, KEY_VARIABLE_VALUES} from './enums';
import { getServiceEndPoint } from '../utils/endpointUrl';

const satelliteTrack = ( eventName, payload) => {
	const serviceEndPointFlag = getServiceEndPoint('enable.adobe.analytics.tracking');
	if (serviceEndPointFlag && typeof window._satellite !== 'undefined') {
		window._satellite.track(eventName, payload)
	}
}

export default (event, eventData = null) => {

	try {
	switch(event) {
		case ADOBE_ANALYTICS_EVENTS.ADD_TO_CART:
			satelliteTrack(ADOBE_LAUNCH_EVENTS.ADD_TO_CART, {
				cartId: eventData?.id,
				currency: eventData?.price?.currency,
				products: [{
					id: eventData?.product?.sku,
					name: eventData?.product?.name,
					category:  eventData?.product?.product_type,
					variant:  eventData?.product?.product_version,
					brand: KEY_VARIABLE_VALUES.BRAND,
					price: eventData?.price?.value,
					quantity: eventData?.qty
			}]
			})
			localStorage.removeItem('productAdded');
			break;

		case ADOBE_ANALYTICS_EVENTS.VIEW_PRODUCT:
			let satelliteInterval = setInterval(function(){
				if(typeof _satellite != "undefined") {
				satelliteTrack(ADOBE_LAUNCH_EVENTS.VIEW_PRODUCT,{
				cartId: eventData?.sku,
				currency: eventData?.price?.currency || 'EUR',
				products: [{
					id: eventData?.sku,
					name: eventData?.name,
					category:  eventData?.product_type,
					brand: KEY_VARIABLE_VALUES.BRAND,
					price: eventData?.price
			}]
			});
			clearInterval(satelliteInterval);
		}
		},500);
			localStorage.removeItem('shouldPushViewProduct');
			break;

		case ADOBE_ANALYTICS_EVENTS.REMOVE_FROM_CART:
			satelliteTrack(ADOBE_LAUNCH_EVENTS.REMOVE_FROM_CART,{
				cartId: eventData?.id,
				currency: eventData?.price?.currency,
				products: [{
					id: eventData?.product?.sku,
					name: eventData?.product?.name,
					category:  eventData?.product?.product_type,
					variant:  eventData?.product?.product_version,
					brand: KEY_VARIABLE_VALUES.BRAND,
					price: eventData?.price?.value,
					quantity:  eventData?.qty
			}]
			});
			localStorage.removeItem('deletedProductFromCart');
			localStorage.removeItem('productDeleted');
			break;

		case ADOBE_ANALYTICS_EVENTS.CHECKOUT_STEP_ONE:
			satelliteTrack(ADOBE_LAUNCH_EVENTS.CHECKOUT_STEPS,{
				cartId: eventData?.id,
				currency: eventData?.prices?.grand_total?.currency,
				checkoutStepNumber: "1",
				checkoutStepName: KEY_VARIABLE_VALUES.CHECKOUT_STEP_ONE,
				products: eventData?.items?.map(eachItem => ({
					id: eachItem.product?.sku,
					name: eachItem.product?.name,
					category:  eachItem.product?.product_type,
					variant:  eachItem.product?.product_version,
					brand: KEY_VARIABLE_VALUES.BRAND,
					price: eachItem.price?.value,
					quantity: eachItem.qty
				}))
			});
			break;
		
		case ADOBE_ANALYTICS_EVENTS.CHECKOUT_STEP_TWO:
			satelliteTrack(ADOBE_LAUNCH_EVENTS.CHECKOUT_STEPS,{
				cartId: eventData?.id,
				currency: eventData?.prices?.grand_total?.currency,
				checkoutStepNumber: "2",
				checkoutStepName: KEY_VARIABLE_VALUES.CHECKOUT_STEP_TWO,
				products: eventData?.items?.map(eachItem => ({
					id: eachItem.product?.sku,
					name: eachItem.product?.name,
					category:  eachItem.product?.product_type,
					variant:  eachItem.product?.product_version,
					brand: KEY_VARIABLE_VALUES.BRAND,
					price: eachItem.price?.value,
					quantity: eachItem.qty
				}))
			});
			break;
		
		case ADOBE_ANALYTICS_EVENTS.TRANSACTION:
			satelliteTrack(ADOBE_LAUNCH_EVENTS.PURCHASE,{
				cartId: eventData?.id,
				currency: eventData?.prices?.grand_total?.currency,
				total: eventData?.prices?.grand_total?.value,
				transactionId: JSON.parse(localStorage.getItem("orderTransactionId")),
				shipping: eventData?.selected_shipping_method?.amount?.value,
				tax: eventData?.prices?.applied_taxes?.[0]?.amount?.value,
				couponCode: eventData?.applied_coupon?.code || '',
				discountAmount: eventData?.prices?.discount?.value,
				products: eventData?.items?.map(eachItem => ({
					id: eachItem.product?.sku,
					name: eachItem.product?.name,
					category:  eachItem.product?.product_type,
					variant:  eachItem.product?.product_version,
					brand: KEY_VARIABLE_VALUES.BRAND,
					price: eachItem.price?.value,
					quantity: eachItem.qty
				}))
			});  
			localStorage.removeItem('cartDetails');
			break;

		case ADOBE_ANALYTICS_EVENTS.APPLY_COUPON: 
			satelliteTrack(ADOBE_LAUNCH_EVENTS.APPLY_COUPON, {
				couponCode: eventData?.applied_coupon?.code
			});
			break;
		
		
		default:
			throw new Error(`Unrecognized Adobe event: ${event}`);
	}
} catch (error) {
		console.log("Tried to fire adobe e-commerce event Failed", error)
}
};

export const loginFormSuccess = () => {
	satelliteTrack('formSubmitSuccess',{
			'formName': 'Login',
			'formType': 'Login Form'
		});
	};

export const loginFormStart = () => {
	satelliteTrack('formStart',{
			'formName': 'Login',
			'formType': 'Login Form'
	});
};

export const formStartSatellite = () => {
	satelliteTrack('formStart', {
		'formName': 'Registration',
		'formType': 'Registration Form'
	});
};

export const formSubmitSuccessSatellite = () => {
	satelliteTrack('formSubmitSuccess', {
		'formName': 'Registration',
		'formType': 'Registration Form'
	});
};


export const cancelPlusServiceFormSuccess = () => {
	satelliteTrack('formSubmitSuccess', {
		'formName': 'Cancel PlusService subscription',
		'formType': 'Cancel PlusService subscription Form'
	});
};

export const cancelPlusServiceFormStart = () => {
	satelliteTrack('formStart', {
			'formName': 'Cancel PlusService subscription',
			'formType': 'Cancel PlusService subscription Form'
		});
	};

export const formSubmitErrorSatellite = (errorMessage) => {
	satelliteTrack('error',{ 
			'errors': [{
			  'errorType':'form', 
			  'errorMessage': errorMessage, 
			  'formName': 'Registration', 
			  'formType': 'Registration Form'
			}] 
	  });
};


export const cancelPlusServiceFormError = (errorMessage) => {
	satelliteTrack('error',{ 
			'errors': [{
		    'errorType':'form', 
			'errorMessage': errorMessage, 
			'formName': 'Cancel PlusService subscription', 
			'formType': 'Cancel PlusService subscription Form'
			}] 
		});
	};


export const loginFormError = (errorMessage) => {
		satelliteTrack('error',{ 
			'errors': [{
			'errorType':'form', 
			'errorMessage': errorMessage, 
			'formName': 'Login', 
			'formType': 'Login Form'
			}] 
		});
};

// offlineToOnline events
export const OfflineToOnlineIdentificationFormStart = () => {
	satelliteTrack('formStart', {
		'formName': 'Offline to Online Identification',
		'formType': 'Offline to Online Form'
	});
};
 
export const OfflineToOnlineIdentificationFormSuccess = () => {
	satelliteTrack('formSubmitSuccess', {
		'formName': 'Offline to Online Identification',
		'formType': 'Offline to Online Form'
	});
};
 
export const OfflineToOnlineIdentificationFormError = (errorMessage) => {
	satelliteTrack('error',{ 
		'errors': [{
		'errorType':'form', 
		'errorMessage': errorMessage, 
		'formName': 'Offline to Online Identification', 
		'formType': 'Offline to Online Form'
		}] 
	});
};

export const OfflineToOnlineRegistrationFormStart = () => {
	satelliteTrack('formStart', {
		'formName': 'Offline to Online Registration',
		'formType': 'Offline to Online Form'
	});
};

export const OfflineToOnlineRegistrationFormSuccess = () => {
	satelliteTrack('formSubmitSuccess', {
		'formName': 'Offline to Online Registration',
		'formType': 'Offline to Online Form'
	});
};
 
export const OfflineToOnlineRegistrationFormError = (errorMessage) => {
	satelliteTrack('error',{ 
		'errors': [{
		'errorType':'form', 
		'errorMessage': errorMessage, 
		'formName': 'Offline to Online Registration', 
		'formType': 'Offline to Online Form'
		}] 
	});
};
