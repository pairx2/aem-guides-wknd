import {call, put, takeLatest} from 'redux-saga/effects';
import { GET_AVAILABLE_PAYMENT_METHODS_GRAPHQL_REQUEST, getAvailablePaymentMethodsGraphqlRequestSuccess, getAvailablePaymentMethodsGraphqlRequestFailure} from '../../../../../modules/Cart/redux/actions/get_available_payment_methods_graphql.action';
import { Query } from '../../../../../api/graphql.config';
import {getAvailablePaymentMethodsGraphqlSchema} from '../../../../../modules/Cart/schemas/adc_get_available_paymentmethods_graphql_schema';
import * as saga from '../../../../../modules/Cart/redux/sagas/get_available_payment_methods_graphql.saga';
import getAvailablePaymentMethodsGraphqlSagas from '../../../../../modules/Cart/redux/sagas/get_available_payment_methods_graphql.saga';
jest.mock('../../../../../utils/endpointUrl.js');
jest.mock('../../../../../utils/pageTypeUtils');
import {_getJwtToken} from '../../../../../modules/Cart/redux/sagas/cart.saga'
import { OPEN_MODAL_ACTION } from '../../../../../modules/Modal/redux/actions';

describe('getAvailablePaymentMethodsGraphqlSaga saga', () => {
	const payload = {
	  payload: {
		cartId: 'cartId',
		ssid: 'ssid',
		AddressStatus: {
		  isShipping: false
		},
	  },
	  isOrderUpdate: false
	};
   
	const iterator = saga.getAvailablePaymentMethodsGraphqlSaga(payload);
	const jwtToken = 'jwtToken';
   
	test('call _getJwtToken', () => {
	  const actualYield = iterator.next().value;
	  const expectedYield = call(_getJwtToken);
	  expect(actualYield).toEqual(expectedYield);
	});
   
	test('call Query and put success', () => {
	  const data = {
		adcGetAvailablePaymentMethods: {
		  available_payment_methods: ['method1', 'method2'],
		  allow_save_corrected: false,
		  allow_save: true,
		  arvato_code: "AVD999",
		  billing_address_validation: {
			City: "Berlin",
			Country: "DE",
			Street: "Pack Station ",
			StreetNumber:"14",
			Validated: true
		  },
		  delivery_address_validation: {
			City: "Berlin",
			Country: "DE",
			Street: "Pack Station ",
			StreetNumber:"14",
			Validated: true
		  },
		  communication_token: "183161411516896",
		  is_blacklisted: false,
		  is_verified: true
		}
	  };
   
	  const actualYield = iterator.next(jwtToken).value;
	  const expectedYield = call(
		Query,
		getAvailablePaymentMethodsGraphqlSchema(payload.payload.cartId, payload.payload.ssid),
		jwtToken
	  );
	  
	  expect(actualYield).toEqual(expectedYield);
   
	  const successYield = iterator.next({ data }).value;
	  const expectedSuccessYield = put(getAvailablePaymentMethodsGraphqlRequestSuccess(data));
	  expect(successYield).toEqual(expectedSuccessYield);
	});
   
	test('call Query and put modal action', () => {
		const iterator = saga.getAvailablePaymentMethodsGraphqlSaga(payload);
		const data = {
			adcGetAvailablePaymentMethods: {
			  available_payment_methods: ['method1', 'method2'],
			  allow_save_corrected: true,
			  allow_save: true,
			  arvato_code: "AVD999",
			  billing_address_validation: {
				City: "Berlin",
				Country: "DE",
				Street: "Pack Station ",
				StreetNumber:"14",
				Validated: true
			  },
			  delivery_address_validation: {
				City: "Berlin",
				Country: "DE",
				Street: "Pack Station ",
				StreetNumber:"14",
				Validated: true
			  },
			  communication_token: "183161411516896",
			  is_blacklisted: false,
			  is_verified: true
			}
		  };
	      iterator.next(); // skip _getJwtToken
 
    	const actualYield = iterator.next(jwtToken).value;
		
		const expectedYield = call(
			Query,
			getAvailablePaymentMethodsGraphqlSchema(payload.payload.cartId, payload.payload.ssid),
			jwtToken
		  );
		  expect(actualYield).toEqual(expectedYield);
		  const modalActionYield = iterator.next({ data }).value;
	  	const expectedModalActionYield = put({
		type: OPEN_MODAL_ACTION,
		payload: {
		  heading: 'DID_YOU_MEAN_THIS_ADDRESS',
		  contentID: 'addressVerification',
		  props: {
			methods: data.adcGetAvailablePaymentMethods.available_payment_methods,
			address: payload.payload.AddressStatus.isShipping
			  ? data.adcGetAvailablePaymentMethods.delivery_address_validation
			  : data.adcGetAvailablePaymentMethods.billing_address_validation,
			rssResultCode: data.adcGetAvailablePaymentMethods.arvato_code,
			communicationToken: data.adcGetAvailablePaymentMethods.communication_token,
			isBlacklisted: data.adcGetAvailablePaymentMethods.is_blacklisted,
			isVerified: data.adcGetAvailablePaymentMethods.is_verified,
			isOrderUpdate: payload.payload.isOrderUpdate
		  },
		  canModalClose: false
		}
	  });
	});

	test('call Query and Error getAvailablePaymentMethodsGraphqlRequestFailure', () => {
		const resultCode = 400;
		const communicationToken = 'communicationToken';
		const allowSave = 'allowSave';
		const WebshopMessage = 'webShopMessage';
		const iterator = saga.getAvailablePaymentMethodsGraphqlSaga(payload);
		const actualYield = iterator.next({communicationToken,allowSave,resultCode, WebshopMessage}).value;
		const expectedYield =put(getAvailablePaymentMethodsGraphqlRequestFailure({
			error: resultCode,
			communicationToken: communicationToken,
			allowSave: allowSave,
			webShopMessage: WebshopMessage
		}));
	});
   
  });

describe('adcgetavailablepaymentmethodsSaga', () => {
	const iterator = getAvailablePaymentMethodsGraphqlSagas();
	test('getting adcgetavailablepaymntmethodssagas', () => {
		const actualToken = iterator.next().value;
		const expectedToken = takeLatest(GET_AVAILABLE_PAYMENT_METHODS_GRAPHQL_REQUEST, saga.getAvailablePaymentMethodsGraphqlSaga);
		expect(actualToken).toEqual(expectedToken);
	});
});
