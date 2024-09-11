import {select,takeEvery, call, put} from 'redux-saga/effects';
import {
	VERIFY_ADDRESS_REQUEST, verifyAddressRequestFailure
} from '../../../../../modules/Address/redux/actions/verify_address.actions';
import * as saga from '../../../../../modules/Address/redux/sagas/verify_address.saga';
import verifyAddressSagas from '../../../../../modules/Address/redux/sagas/verify_address.saga';
import {checkAddress} from '../../../../../modules/Address/api/addressVerification.api';
import {OPEN_MODAL_ACTION} from '../../../../../modules/Modal/redux/actions';
import {i18nLabels} from '../../../../../utils/translationUtils';
jest.mock('../../../../../utils/endpointUrl.js');

describe('verifyAddressSaga saga with empty address - salutation:MR ', () => {
	const payload = {
		user : {
			birthday: '1997-06-11',
			email: 'mikeross@yopmail.com',
			firstName: 'Rachael',
			lastName: 'Zane',
			salutation: 'MR'
		},
		AddressStatus : {
			isShipping : false,
			isBilling : true
		},
		address:{},
		billingAddress:{},
		shippingAddress:{},
		isOrderUpdate:true
	};
	const iterator = saga.verifyAddressSaga({payload});
	test('call getDictionary', () => {
		const actualYield = iterator.next().value;
		const expectedYield =  select(saga.getDictionary);
		expect(actualYield).toEqual(expectedYield);
	});
	test('call checkAddress', () => {
		const dictionary = {'salutation_selection_man':'MR'};
		const actualYield = iterator.next(dictionary).value;
		const expectedYield =  call(checkAddress,
			payload.address,
			payload.user,
			payload.billingAddress,
			payload.shippingAddress,
			false,
			true,
			payload.isOrderUpdate);
		expect(actualYield).toEqual(expectedYield);
	});
	test('put verifyAddressRequestFailure', () => {
		const dictionary = {'salutation_selection_man':'MR'};
		const actualYield = iterator.next(dictionary).value;
		const expectedYield =  put(verifyAddressRequestFailure({
			address: undefined,
			section: undefined,
			status: 'ADDRESS_CHECK_ERROR',
			error: undefined,
			message: undefined,
			allowSave: undefined
		}));
		expect(actualYield).toEqual(expectedYield);
	});
	test('put OPEN_MODAL_ACTION', () => {
		const dictionary = {'salutation_selection_man':'MR'};
		const actualYield = iterator.next(dictionary).value;
		const expectedYield =  put({
			type: OPEN_MODAL_ACTION,
			payload: {
				heading: i18nLabels.GENERAL_ERROR,
				contentID: 'generalErrorModal',
				props: {
					errorTitle: i18nLabels.ADDRESS_CHECK_ERROR,
					errorMessage: undefined
				}
			}
		});
		expect(actualYield).toEqual(expectedYield);
	});
});
describe('verifyAddressSaga saga with empty address - salutation :divers', () => {
	const payload = {
		user : {
			birthday: '1997-06-11',
			email: 'mikeross@yopmail.com',
			firstName: 'Rachael',
			lastName: 'Zane',
			salutation: ''
		},
		AddressStatus : {
			isShipping : false,
			isBilling : true
		},
		address:{},
		billingAddress:{},
		shippingAddress:{},
		isOrderUpdate:true
	};
	const iterator = saga.verifyAddressSaga({payload});
	test('call getDictionary', () => {
		const actualYield = iterator.next().value;
		const expectedYield =  select(saga.getDictionary);
		expect(actualYield).toEqual(expectedYield);
	});
	test('call checkAddress', () => {
		const dictionary = {'salutation_selection_other':''};
		const actualYield = iterator.next(dictionary).value;
		const expectedYield =  call(checkAddress,
			payload.address,
			payload.user,
			payload.billingAddress,
			payload.shippingAddress,
			false,
			true,
			payload.isOrderUpdate);
		expect(actualYield).toEqual(expectedYield);
	});
	test('put verifyAddressRequestFailure', () => {
		const dictionary = {'salutation_selection_other':''};
		const actualYield = iterator.next(dictionary).value;
		const expectedYield =  put(verifyAddressRequestFailure({
			address: undefined,
			section: undefined,
			status: 'ADDRESS_CHECK_ERROR',
			error: undefined,
			message: undefined,
			allowSave: undefined
		}));
		expect(actualYield).toEqual(expectedYield);
	});
	test('put OPEN_MODAL_ACTION', () => {
		const dictionary = {'salutation_selection_other':''};
		const actualYield = iterator.next(dictionary).value;
		const expectedYield =  put({
			type: OPEN_MODAL_ACTION,
			payload: {
				heading: i18nLabels.GENERAL_ERROR,
				contentID: 'generalErrorModal',
				props: {
					errorTitle: i18nLabels.ADDRESS_CHECK_ERROR,
					errorMessage: undefined
				}
			}
		});
		expect(actualYield).toEqual(expectedYield);
	});
});
describe('verifyAddressSaga saga with valid address - salutation:MS', () => {
	const payload = {
		user : {
			birthday: '1997-06-11',
			email: 'mikeross@yopmail.com',
			firstName: 'Rachael',
			lastName: 'Zane',
			salutation: 'MS'
		},
		AddressStatus : {
			isShipping : false,
			isBilling : true
		},
		address:{
			city: 'Mainz',
			country: 'DE',
			street: 'Bahnhofplatz',
			streetNumber: '123',
			zipcode: '55116'
		},
		billingAddress:{
			city: 'Mainz',
			country: 'DE',
			firstName: 'Mike',
			lastName: 'Ross',
			street: 'Bahnhofplatz',
			streetNumber: '',
			zipcode: '55116'
		},
		shippingAddress:{
			city: 'Mainz',
			country: 'DE',
			firstName: 'Mike',
			lastName: 'Ross',
			street: 'Bahnhofplatz',
			streetNumber: '',
			zipcode: '55116'
		},
		isOrderUpdate:true
	};
	const iterator = saga.verifyAddressSaga({payload});
	test('call getDictionary', () => {
		const actualYield = iterator.next().value;
		const expectedYield =  select(saga.getDictionary);
		expect(actualYield).toEqual(expectedYield);
	});
	test('call checkAddress', () => {
		const dictionary = {'salutation_selection_woman':'MS'};
		const actualYield = iterator.next(dictionary).value;
		const expectedYield =  call(checkAddress,
			payload.address,
			payload.user,
			payload.billingAddress,
			payload.shippingAddress,
			false,
			true,
			payload.isOrderUpdate);
		expect(actualYield).toEqual(expectedYield);
	});
	test('put verifyAddressRequestFailure', () => {
		const dictionary = {'salutation_selection_man':'MS'};
		const actualYield = iterator.next(dictionary).value;
		const expectedYield =  put(verifyAddressRequestFailure({
			address: undefined,
			section: undefined,
			status: 'ADDRESS_CHECK_ERROR',
			error: undefined,
			message: undefined,
			allowSave: undefined
		}));
		expect(actualYield).toEqual(expectedYield);
	});
	test('put OPEN_MODAL_ACTION', () => {
		const dictionary = {'salutation_selection_man':'MS'};
		const actualYield = iterator.next(dictionary).value;
		const expectedYield =  put({
			type: OPEN_MODAL_ACTION,
			payload: {
				heading: i18nLabels.GENERAL_ERROR,
				contentID: 'generalErrorModal',
				props: {
					errorTitle: i18nLabels.ADDRESS_CHECK_ERROR,
					errorMessage: undefined
				}
			}
		});
		expect(actualYield).toEqual(expectedYield);
	});
});
describe('verifyAddressSagas saga ', () => {
	const iterator = verifyAddressSagas();
	test('get verifyAddressSagas -> verifyAddressSaga', () => {
		const actualYield = iterator.next().value;
		const expectedYield = takeEvery(VERIFY_ADDRESS_REQUEST, saga.verifyAddressSaga);
		expect(actualYield).toEqual(expectedYield);
	});
});