import React from 'react';
import Enzyme, {shallow,mount} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import {mockStore, mockStoreOrder} from '../../../../../__mocks__/storeMock';
import AddressCheckoutCard from '../../../../../modules/Address/components/AddressCheckout/AddressCheckoutCard';
import {isRxCheckoutPageType} from '../../../../../utils/pageTypeUtils';
jest.mock('../../../../../utils/endpointUrl.js');
jest.mock('../../../../../utils/pageTypeUtils.js');
Enzyme.configure({
	adapter: new EnzymeAdapter(),
});

const setup = (props) => {
	const wrapper = shallow(<AddressCheckoutCard store={mockStore} {...props} />).dive().dive();
	return wrapper;
};

const setupTwo = (props) => {
	const wrapper = shallow(<AddressCheckoutCard store={mockStoreOrder} {...props} />).dive().dive();
	return wrapper;
};

describe('AddressCheckoutCard component Test Suite ', () => {
	let props, wrapper;
	const updateAddressMock = jest.fn();
	const setBillingAddressOnCartMock = jest.fn();
	const setShippingAddressOnCartMock = jest.fn();
	const verifyAddressRequestMock = jest.fn();
	const createNewShippingAddressMock = jest.fn();
	const createNewBillingAddressMock = jest.fn();
	const clearNewShippingAddressMock = jest.fn();
	const clearNewBillingAddressMock = jest.fn();
	const setModesMock = jest.fn();
	const setBillingModesMock = jest.fn();
const getAvailablePaymentMethodsRequestMock = jest.fn();
	beforeEach(() => {
		props = {
			address: {
				addresstype: 'PropTypes.string',
				prefix: 'PropTypes.string',
				firstname: 'PropTypes.string',
				lastname: 'PropTypes.string',
				street: [],
				postcode: 'PropTypes.string',
				city: 'PropTypes.string',
				isNew: true,
				id: 1234,
				address_id: 1234,
				country_name:{label:'Germany',value:'DE'},
			},
			informationalMessage: 'InformationalMessage',
			dob:'PropTypes.string',
			email:'PropTypes.string',
			isBilling: true,
			isShipping: true,
			isShippingEqualToBilling: true,
			isEditing: true,
			isSelecting: true,
			setShippingAddressOnCart: setShippingAddressOnCartMock,
			setBillingAddressOnCart: setBillingAddressOnCartMock,
			updateAddress: updateAddressMock,
			verifyAddressRequest: verifyAddressRequestMock,
			createNewShippingAddress: createNewShippingAddressMock,
			createNewBillingAddress: createNewBillingAddressMock,
			clearNewShippingAddress: clearNewShippingAddressMock,
			clearNewBillingAddress: clearNewBillingAddressMock,
			setModes: setModesMock,
			setBillingModes: setBillingModesMock,
			newAddress: false,
			selectableAddresses: [
				{
					'id': 13,
					'prefix': 'Mr',
					'firstname': 'Firstname',
					'lastname': 'Lastname',
					'postcode': 'postcode',
					'country_id': 'DE',
					'country_name': 'Germany',
					'region_code': 'BER',
					'region': 'Berlin',
					'city': 'Berlin',
					'street': [
						'Street 1',
						'Street 2'
					],
					'telephone': '10111111112'
				}
			],
			enableNewPaymentFlow: false,
			getAvailablePaymentMethodsRequest: getAvailablePaymentMethodsRequestMock,
			paymentMethods:{
				payment_methods:[
					'payon_cc',
					'payon_paypal',
					'open_invoice'
					],
			isLoading: false,
			error: null,
			unavailablePaymentOptionsMsg: null,
			},
			verificationStatus: "ADDRESS_CHECK_SUCCESS",
		};
		wrapper = setup(props);
	});

	describe('props check', () => {

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});

		test('render check',() => {
			expect(wrapper.type()).not.toEqual(null);
		});

		test('cartDetails object',() => {
			expect(typeof wrapper.instance().props.cartDetails).toBe('object');
		});
		test('customer object',() => {
			expect(typeof wrapper.instance().props.customer).toBe('object');
		});
	});
	describe('lifecycle method calls', () => {
		test('componentdidUpdate isloading!= prevProps.isloading',() => {
			const prevProps = {
				setShippingAddressOnCart: setShippingAddressOnCartMock ,
				setBillingAddressOnCart: setBillingAddressOnCartMock ,
				informationalMessage: 'string',
				cartDetails:{...wrapper.instance().props.cartDetails},
				customer: {},
				isLoading:true,
				isCartLoading:false
			};
			wrapper.instance().componentDidUpdate(prevProps);
		});
		test('componentdidUpdate isloading!= prevProps.isloading',() => {
			const prevProps = {
				setShippingAddressOnCart: setShippingAddressOnCartMock ,
				setBillingAddressOnCart: setBillingAddressOnCartMock ,
				informationalMessage: 'string',
				cartDetails:{...wrapper.instance().props.cartDetails},
				customer: {},
				isLoading:true,
				isCartLoading:false,
				isRiskcheckLoading : true
			};
			wrapper.instance().componentDidUpdate(prevProps);
		});
		test('componentdidUpdate isloading!= prevProps.isloading',() => {
			const prevProps = {
				setShippingAddressOnCart: setShippingAddressOnCartMock ,
				setBillingAddressOnCart: setBillingAddressOnCartMock ,
				informationalMessage: 'string',
				cartDetails:{...wrapper.instance().props.cartDetails},
				customer: {},
				isLoading:true,
				isCartLoading:false,
				isRiskcheckLoading : false
			};
			wrapper.instance().componentDidUpdate(prevProps);
		});
		test('componentdidUpdate',() => {
			const prevProps = {
				setShippingAddressOnCart: setShippingAddressOnCartMock ,
				setBillingAddressOnCart: setBillingAddressOnCartMock ,
				informationalMessage: 'string',
				cartDetails:{...wrapper.instance().props.cartDetails},
				customer: {},
				isLoading:false,
				isCartLoading:true
			};
			wrapper.instance().componentDidUpdate(prevProps);
		});
		test('componentdidUpdate',() => {
			const prevProps = {
				setShippingAddressOnCart: setShippingAddressOnCartMock ,
				setBillingAddressOnCart: setBillingAddressOnCartMock ,
				informationalMessage: 'string',
				cartDetails:{...wrapper.instance().props.cartDetails},
				customer: {},
				isLoading:false,
				isCartLoading:true,
				verificationStatus:null
			};
			wrapper.instance().componentDidUpdate(prevProps);
		});
	});
	describe('method calls',() => {
		test('submitAddress - arg1 null',() => {
			wrapper.instance().submitAddress(null,wrapper.instance().props.verifiedAddress);
		});
		test('submitAddress - arg2 null',() => {
			wrapper.instance().submitAddress(wrapper.instance().props.address,null);
		});
		test('submitAddress',() => {
			const updatedAddress = {
				addresstype: 'PropTypes.string',
				prefix: 'PropTypes.string',
				firstname: 'PropTypes.string',
				lastname: 'PropTypes.string',
				street: [{"1": "test"},{"2": "test"}],
				country_name:{label:'Germany',value:'DE'},
				postcode: 'PropTypes.string',
				city: 'PropTypes.string',
				isNew: true,
				id: 1,
				address_id: 0,
				default_shipping: 'default_shipping',
				additionaladdress:'additionaladdress'

			};
			wrapper.instance().submitAddress(updatedAddress,wrapper.instance().props.address);

			const setShippingAddressOnCartMockCallCount= setShippingAddressOnCartMock.mock.calls.length;
			expect(setShippingAddressOnCartMockCallCount).toBeDefined();
		});

		test('submitAddress',() => {
			const updatedAddress = {
				addresstype: 'PropTypes.string',
				prefix: 'PropTypes.string',
				firstname: 'PropTypes.string',
				lastname: 'PropTypes.string',
				street: [],
				country_name:{label:'Germany',value:'DE'},
				postcode: 'PropTypes.string',
				city: 'PropTypes.string',
				isNew: true,
				id: 1,
				address_id: 0,
				default_shipping: 'default_shipping',
				additionaladdress:null

			};
			wrapper.instance().submitAddress(updatedAddress,wrapper.instance().props.address);

			const setShippingAddressOnCartMockCallCount= setShippingAddressOnCartMock.mock.calls.length;
			expect(setShippingAddressOnCartMockCallCount).toBeDefined();
		});

		test('submitAddress',() => {
			const updatedAddress = {
				addresstype: 'PropTypes.string',
				prefix: 'PropTypes.string',
				firstname: 'PropTypes.string',
				lastname: 'PropTypes.string',
				street: [],
				postcode: 'PropTypes.string',
				city: 'PropTypes.string',
				isNew: true,
				id: 343,
				address_id: 0,
				default_shipping: true,
				country_name:{label:'Germany',value:'DE'},
				additionaladdress:'additionaladdress'

			};
			wrapper.instance().submitAddress(updatedAddress,null);
		});
		test('submitAddress',() => {
			const updatedAddress = {
				addresstype: 'PropTypes.string',
				prefix: 'PropTypes.string',
				firstname: 'PropTypes.string',
				lastname: 'PropTypes.string',
				street: [],
				postcode: 'PropTypes.string',
				city: 'PropTypes.string',
				isNew: true,
				id: 23432,
				address_id: 0,
				country_name:{label:'Germany',value:'DE'},
				default_billing: false,
				additionaladdress:'additionaladdress'
			};
			wrapper.instance().submitAddress(updatedAddress,null);
		});
		test('setAddress',() => {
			wrapper.instance().setAddress(wrapper.instance().props.address);
		});
		test('addressFormInitialValues',() => {
			wrapper.instance().addressFormInitialValues(wrapper.instance().props.address);
		});
		test('addressFormInitialValues',() => {
			const addresss= {
				addresstype: 'PropTypes.string',
				prefix: 'PropTypes.string',
				firstname: 'PropTypes.string',
				lastname: 'PropTypes.string',
				street: [],
				postcode: 'PropTypes.string',
				city: 'PropTypes.string',
				isNew: true,
				id: -1,
				address_id: 345,
				default_billing: false,
				additionaladdress:'additionaladdress'
			};
			wrapper.instance().addressFormInitialValues(addresss);
		});
		test('addressCheckVerification',() => {
			const addresss= {
				addresstype: 'PropTypes.string',
				prefix: 'PropTypes.string',
				firstname: 'PropTypes.string',
				lastname: 'PropTypes.string',
				street: [],
				postcode: 'PropTypes.string',
				city: 'PropTypes.string',
				isNew: true,
				id: -1,
				address_id: 324,
				default_billing: false,
				additionaladdress:'additionaladdress',
				country_name:{
					label:'DE',
					value:'Germany'
				}
			};
			wrapper.instance().addressCheckVerification(addresss,true,true);
			wrapper.instance().addressCheckVerification(addresss,true,false);
			wrapper.instance().addressCheckVerification(addresss,false,true);
			wrapper.instance().addressCheckVerification(addresss,false,false);

		});
		test('riskCheckVerification',() => {
			const addresss= {
				addresstype: 'PropTypes.string',
				prefix: 'herr',
				firstname: 'PropTypes.string',
				lastname: 'PropTypes.string',
				street: [],
				postcode: 'PropTypes.string',
				city: 'PropTypes.string',
				isNew: true,
				id: -1,
				address_id: 234,
				default_billing: false,
				additionaladdress:'additionaladdress',
				country_name:{
					value:'DE',
					label:'Germany'
				}
			};
			wrapper.instance().riskCheckVerification(true,true , addresss);
			wrapper.instance().riskCheckVerification(true,false , addresss);
			wrapper.instance().riskCheckVerification(false,true , addresss);
			wrapper.instance().riskCheckVerification(false,false , addresss);

		});
		test('cancelEditMode',() => {
			wrapper.instance().cancelEditMode();
		});
		test('setSelectMode',() => {
			wrapper.instance().setSelectMode();
		});
		test('isCPSOrder',() => {
			wrapper.instance().isCPSOrder();
		});
		test('setOrderType',() => {
			wrapper.instance().setOrderType();
		});
		test('cancelSelectMode',() => {
			wrapper.instance().cancelSelectMode();
			expect(wrapper.instance().state.currentEditedAddressId).toBe(null);
		});
		test('clearNewAddress',() => {
			wrapper.instance().clearNewAddress();
		});
		test('createNewAddress',() => {
			wrapper.instance().createNewAddress();
		});
		test('backToAddressBook',() => {
			wrapper.instance().backToAddressBook();
		});
		test('willAddBilling',() => {
			const willAddBillingReturnValue = wrapper.instance().willAddBilling();
			expect(willAddBillingReturnValue).toBe(false);
		});
	});
});
describe('AddressCheckoutCard component Test Suite ', () => {
	let props, wrapper;
	const updateAddressMock = jest.fn();
	const setBillingAddressOnCartMock = jest.fn();
	const setShippingAddressOnCartMock = jest.fn();
	const verifyAddressRequestMock = jest.fn();
	const createNewShippingAddressMock = jest.fn();
	const createNewBillingAddressMock = jest.fn();
	const clearNewShippingAddressMock = jest.fn();
	const clearNewBillingAddressMock = jest.fn();
	const setModesMock = jest.fn();
	const setBillingModesMock = jest.fn();
	const getAvailablePaymentMethodsRequestMock =jest.fn();
	beforeEach(() => {
		props = {
			address: {
				addresstype: 'PropTypes.string',
				prefix: 'PropTypes.string',
				firstname: 'PropTypes.string',
				lastname: 'PropTypes.string',
				street: [],
				postcode: 'PropTypes.string',
				city: 'PropTypes.string',
				isNew: true,
				id: 324234,
				address_id: 324234,
				country_name:{label:'Germany',value:'DE'},
			},
			informationalMessage: 'InformationalMessage',
			dob:'PropTypes.string',
			email:'PropTypes.string',
			isBilling: true,
			isShipping: false,
			isShippingEqualToBilling: true,
			isEditing: true,
			isSelecting: true,
			setShippingAddressOnCart: setShippingAddressOnCartMock,
			setBillingAddressOnCart: setBillingAddressOnCartMock,
			updateAddress: updateAddressMock,
			verifyAddressRequest: verifyAddressRequestMock,
			createNewShippingAddress: createNewShippingAddressMock,
			createNewBillingAddress: createNewBillingAddressMock,
			clearNewShippingAddress: clearNewShippingAddressMock,
			clearNewBillingAddress: clearNewBillingAddressMock,
			setModes: setModesMock,
			setBillingModes: setBillingModesMock,
			newAddress: {
				'id': 13,
				'prefix': 'Mr',
				'firstname': 'Firstname',
				'lastname': 'Lastname',
				'postcode': 'postcode',
				'country_id': 'DE',
				'country_name': 'Germany',
				'region_code': 'BER',
				'region': 'Berlin',
				'city': 'Berlin',
				'street': [
					'Street 1',
					'Street 2'
				],
				'telephone': '10111111112'
			},
			selectableAddresses: [
				{
					'id': 13,
					'prefix': 'Mr',
					'firstname': 'Firstname',
					'lastname': 'Lastname',
					'postcode': 'postcode',
					'country_id': 'DE',
					'country_name': 'Germany',
					'region_code': 'BER',
					'region': 'Berlin',
					'city': 'Berlin',
					'street': [
						'Street 1',
						'Street 2'
					],
					'telephone': '10111111112'
				},{
					'id': 14,
					'prefix': 'Mr',
					'firstname': 'Firstname',
					'lastname': 'Lastname',
					'postcode': 'postcode',
					'country_id': 'DE',
					'country_name': 'Germany',
					'region_code': 'BER',
					'region': 'Berlin',
					'city': 'Berlin',
					'street': [
						'Street 1',
						'Street 2'
					],
					'telephone': '10111111112'
				}
			],
			enableNewPaymentFlow: true,
			getAvailablePaymentMethodsRequest: getAvailablePaymentMethodsRequestMock,
			paymentMethods:[
					'payon_cc',
					'payon_paypal',
					'open_invoice'
					],
		};
		wrapper = setupTwo(props);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('setOrderType',() => {
		wrapper.instance().setOrderType();
	});

	test('riskCheckVerification',() => {
		const addresss= {
			addresstype: 'PropTypes.string',
			prefix: 'PropTypes.string',
			firstname: 'PropTypes.string',
			lastname: 'PropTypes.string',
			street: [],
			postcode: 'PropTypes.string',
			city: 'PropTypes.string',
			isNew: true,
			id: -1,
			address_id: 454,
			default_billing: false,
			additionaladdress:'additionaladdress',
			country_name:{
				value:'DE',
				label:'Germany'
			}
		};
		wrapper.instance().riskCheckVerification(true,true,addresss);
		wrapper.instance().riskCheckVerification(true,false,addresss);
		wrapper.instance().riskCheckVerification(false,true,addresss);
		wrapper.instance().riskCheckVerification(false,false,addresss);

	});

	test('updateAddresses',() => {
		const editedAddress= {
			addresstype: 'PropTypes.string',
			prefix: 'PropTypes.string',
			firstname: 'PropTypes.string',
			lastname: 'PropTypes.string',
			street: [],
			postcode: 'PropTypes.string',
			city: 'PropTypes.string',
			isNew: true,
			id: -1,
			address_id: 454,
			default_billing: false,
			additionaladdress:'additionaladdress',
			country_name:{
				value:'DE',
				label:'Germany'
			}
		};
		wrapper.instance().updateAddresses();
		wrapper.instance().updateAddresses(editedAddress, 'address');
	});

	test('updateAddresses',() => {
		wrapper.instance().setState({useThisAddressChosen: true, chosenDefaultAddress: true});
		wrapper.instance().updateAddresses();
	});

	test('setDefaultCartAddress BILLING FALSE',() => {
		const address= {
			addresstype: 'PropTypes.string',
			prefix: 'PropTypes.string',
			firstname: 'PropTypes.string',
			lastname: 'PropTypes.string',
			street: [],
			postcode: 'PropTypes.string',
			city: 'PropTypes.string',
			isNew: true,
			id: 1234,
			address_id: 1234,
			country_name:{label:'Germany',value:'DE'},
			default_billing: true
		};
		wrapper.setProps({isBilling: false});
		wrapper.instance().setDefaultCartAddress(address);
	});

	test('setDefaultCartAddress shipping true',() => {
		const address= {
			addresstype: 'PropTypes.string',
			prefix: 'PropTypes.string',
			firstname: 'PropTypes.string',
			lastname: 'PropTypes.string',
			street: [],
			postcode: 'PropTypes.string',
			city: 'PropTypes.string',
			isNew: true,
			id: 1234,
			address_id: 1234,
			country_name:{label:'Germany',value:'DE'},
			default_billing: true
		};
		wrapper.setProps({isShipping: true});
		wrapper.instance().setDefaultCartAddress(address);
	});

	test('addressFormInitialValues',() => {
		const address= {
			addresstype: 'PropTypes.string',
			prefix: 'PropTypes.string',
			firstname: 'PropTypes.string',
			lastname: 'PropTypes.string',
			street: [],
			postcode: 'PropTypes.string',
			city: 'PropTypes.string',
			isNew: true,
			id: -1,
			address_id: 345,
			default_billing: false,
			additionaladdress:'additionaladdress',
			address_label: null
		};
		wrapper.instance().addressFormInitialValues(address);
	});

	test('addressCheckVerification',() => {
		const addresss= {
			addresstype: 'PropTypes.string',
			prefix: 'PropTypes.string',
			firstname: 'PropTypes.string',
			lastname: 'PropTypes.string',
			street: [],
			postcode: 'PropTypes.string',
			city: 'PropTypes.string',
			isNew: true,
			id: -1,
			address_id: 324,
			default_billing: false,
			additionaladdress:'additionaladdress',
			country_name:{
				label:'DE',
				value: null
			}
		};
		wrapper.instance().addressCheckVerification(addresss,true,true);
		wrapper.instance().addressCheckVerification(addresss,true,false);
		wrapper.instance().addressCheckVerification(addresss,false,true);
		wrapper.instance().addressCheckVerification(addresss,false,false);
	});
});
describe('AddressCheckoutCard component Test Suite ', () => {
	let props, wrapper;
	const updateAddressMock = jest.fn();
	const setBillingAddressOnCartMock = jest.fn();
	const setShippingAddressOnCartMock = jest.fn();
	const verifyAddressRequestMock = jest.fn();
	const createNewShippingAddressMock = jest.fn();
	const createNewBillingAddressMock = jest.fn();
	const clearNewShippingAddressMock = jest.fn();
	const clearNewBillingAddressMock = jest.fn();
	const setModesMock = jest.fn();
	const setBillingModesMock = jest.fn();
	const getAvailablePaymentMethodsRequestMock = jest.fn();
	beforeEach(() => {
		props = {
			address: {
				addresstype: 'PropTypes.string',
				prefix: 'PropTypes.string',
				firstname: 'PropTypes.string',
				lastname: 'PropTypes.string',
				street: [],
				postcode: 'PropTypes.string',
				city: 'PropTypes.string',
				isNew: true,
				id: 234,
				country_name:{label:'Germany',value:'DE'},
				address_id: 234,
			},
			informationalMessage: 'InformationalMessage',
			dob:'PropTypes.string',
			email:'PropTypes.string',
			isBilling: false,
			isShipping: false,
			isShippingEqualToBilling: true,
			isEditing: false,
			isSelecting: true,
			verificationStatus: null,
			setShippingAddressOnCart: setShippingAddressOnCartMock,
			setBillingAddressOnCart: setBillingAddressOnCartMock,
			updateAddress: updateAddressMock,
			verifyAddressRequest: verifyAddressRequestMock,
			createNewShippingAddress: createNewShippingAddressMock,
			createNewBillingAddress: createNewBillingAddressMock,
			clearNewShippingAddress: clearNewShippingAddressMock,
			clearNewBillingAddress: clearNewBillingAddressMock,
			setModes: setModesMock,
			setBillingModes: setBillingModesMock,
			newAddress: false,
			selectableAddresses: [
				{
					'id': 13,
					'prefix': 'Mr',
					'firstname': 'Firstname',
					'lastname': 'Lastname',
					'postcode': 'postcode',
					'country_id': 'DE',
					'country_name': 'Germany',
					'region_code': 'BER',
					'region': 'Berlin',
					'city': 'Berlin',
					'street': [
						'Street 1',
						'Street 2'
					],
					'telephone': '10111111112'
				},{
					'id': 14,
					'prefix': 'Mr',
					'firstname': 'Firstname',
					'lastname': 'Lastname',
					'postcode': 'postcode',
					'country_id': 'DE',
					'country_name': 'Germany',
					'region_code': 'BER',
					'region': 'Berlin',
					'city': 'Berlin',
					'street': [
						'Street 1',
						'Street 2'
					],
					'telephone': '10111111112'
				}
			],
			enableNewPaymentFlow: false,
			getAvailablePaymentMethodsRequest: getAvailablePaymentMethodsRequestMock,
			paymentMethods:{
				payment_methods:[
					'payon_cc',
					'payon_paypal',
					'open_invoice'
					],
			isLoading: false,
			error: null,
			unavailablePaymentOptionsMsg: null,
			},
			isAllowSave : true
		};
		wrapper = setup(props);
	});

	describe('props check', () => {
		
		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});

		test('render check',() => {
			expect(wrapper.type()).not.toEqual(null);
		});

		test('cartDetails object',() => {
			expect(typeof wrapper.instance().props.cartDetails).toBe('object');
		});
		test('customer object',() => {
			expect(typeof wrapper.instance().props.customer).toBe('object');
		});


	});
	describe('lifecycle method calls', () => {
		test('componentdidUpdate',() => {
			const prevProps = {
				setShippingAddressOnCart: setShippingAddressOnCartMock ,
				setBillingAddressOnCart: setBillingAddressOnCartMock ,
				informationalMessage: 'string',
				cartDetails:{...wrapper.instance().props.cartDetails},
				customer: {},
				isLoading:true,
				isCartLoading:false,
				isAllowSave : false,
			};
			wrapper.instance().componentDidUpdate(prevProps);
		});
		test('componentdidUpdate',() => {
			const prevProps = {
				setShippingAddressOnCart: setShippingAddressOnCartMock ,
				setBillingAddressOnCart: setBillingAddressOnCartMock ,
				informationalMessage: 'string',
				cartDetails:{...wrapper.instance().props.cartDetails},
				customer: {},
				isLoading:false,
				isCartLoading:true,
				isAllowSave : false,
			};
			wrapper.instance().componentDidUpdate(prevProps);
		});
		test('componentdidUpdate',() => {
			const prevProps = {
				setShippingAddressOnCart: setShippingAddressOnCartMock ,
				setBillingAddressOnCart: setBillingAddressOnCartMock ,
				informationalMessage: 'string',
				cartDetails:{...wrapper.instance().props.cartDetails},
				customer: {},
				isLoading:false,
				isCartLoading:true,
				verificationStatus:"ADDRESS_CHECK_SUCCESS",
				isAllowSave : false,
			};
			wrapper.instance().componentDidUpdate(prevProps);
		});
	});
	describe('method calls',() => {
		test('submitAddress - arg1 null',() => {
			wrapper.instance().submitAddress(null,wrapper.instance().props.verifiedAddress);
		});
		test('submitAddress - arg2 null',() => {
			wrapper.instance().submitAddress(wrapper.instance().props.address,null);
		});
		test('submitAddress',() => {
			const updatedAddress = {
				addresstype: 'PropTypes.string',
				prefix: 'PropTypes.string',
				firstname: 'PropTypes.string',
				lastname: 'PropTypes.string',
				street: [],
				postcode: 'PropTypes.string',
				city: 'PropTypes.string',
				isNew: true,
				id: 43242,
				address_id: 0,
				default_shipping: 'default_shipping',
				additionaladdress:'additionaladdress'

			};
			wrapper.instance().submitAddress(updatedAddress,null);
		});
		test('submitAddress',() => {
			const updatedAddress = {
				addresstype: 'PropTypes.string',
				prefix: 'PropTypes.string',
				firstname: 'PropTypes.string',
				lastname: 'PropTypes.string',
				street: [],
				postcode: 'PropTypes.string',
				city: 'PropTypes.string',
				isNew: true,
				id: 234324,
				address_id: 0,
				default_shipping: 'default_shipping',
				additionaladdress:'additionaladdress'

			};
			wrapper.instance().submitAddress(updatedAddress,null);
		});
		test('submitAddress',() => {
			const updatedAddress = {
				addresstype: 'PropTypes.string',
				prefix: 'PropTypes.string',
				firstname: 'PropTypes.string',
				lastname: 'PropTypes.string',
				street: [],
				postcode: 'PropTypes.string',
				city: 'PropTypes.string',
				isNew: true,
				id: 343,
				address_id: 0,
				default_billing: 'default_billing',
				country_name:{label:'Germany',value:'DE'},
				additionaladdress:'additionaladdress'
			};
			wrapper.instance().submitAddress(updatedAddress,null);
		});
		test('setAddress',() => {
			wrapper.instance().setAddress(wrapper.instance().props.address);
		});
		test('addressFormInitialValues',() => {
			wrapper.instance().addressFormInitialValues(wrapper.instance().props.address);
		});
		test('cancelEditMode',() => {
			wrapper.instance().cancelEditMode();
		});
		test('setSelectMode',() => {
			wrapper.instance().setSelectMode();
		});
		test('cancelSelectMode',() => {
			wrapper.instance().cancelSelectMode();
			expect(wrapper.instance().state.currentEditedAddressId).toBe(null);
		});
		test('clearNewAddress',() => {
			wrapper.instance().clearNewAddress();
		});
		test('createNewAddress',() => {
			wrapper.instance().createNewAddress();
		});
		test('backToAddressBook',() => {
			wrapper.instance().backToAddressBook();
		});
		test('willAddBilling',() => {
			const willAddBillingReturnValue = wrapper.instance().willAddBilling();
			expect(willAddBillingReturnValue).toBe(true);
		});
		test('saveAddress',() => {
			wrapper.setProps({ cartDetails: {
				'id': 'KDzhKR5Or16of6UqnOP29FqLn5YjPs9e',
				'items': [{
					'id': 3,
					'product': {
						'id': 1,
						'sku': 'simple_product',
						'name': 'Simple Product',
						'description': 'Some product description',
						'short_description': 'Some product short description',
						'uom': 1,
						'product_version': 1,
						'hts_code': '123-hts',
						'origin': 'Alabama',
						'type_id': 'simple',
						'meta_title': null,
						'meta_description': null,
						'meta_keyword': null,
						'is_in_stock': true,
						'regular_price_with_tax': null,
						'regular_price_without_tax': null,
						'image_url': 'https://abbott-magento2.test/static/version1563452614/graphql/_view/en_US/Magento_',
						'url': '',
						'https': '',
						'min_sale_qty': '2',
						'max_sale_qty': 10,
						'price': '20.0000',
						'max_order_quantity': '3',
						'weight': '2.0000',
						'ean_code': '99999999992',
						'shelf_life': '20'
					},
					'qty': 3,
					'bundle_options': [{
						'id': 1,
						'quantity': 2,
						'value': ['1']
					},
					],
					'price': {
						'value': 20,
						'currency': 'USD'
					},
					'item_price': {
						'value': 60,
						'currency': 'USD'
					},
					'sku': 'simple_product',
					'name': 'Simple Product'
				},
				{
					'id': 4,
					'product': {
						'id': 1,
						'sku': 'simple_product',
						'name': 'Simple Product',
						'description': 'Some product description',
						'short_description': 'Some product short description',
						'uom': 1,
						'product_version': 1,
						'hts_code': '123-hts',
						'origin': 'Alabama',
						'type_id': 'simple',
						'meta_title': null,
						'meta_description': null,
						'meta_keyword': null,
						'is_in_stock': true,
						'regular_price_with_tax': null,
						'regular_price_without_tax': null,
						'image_url': 'https://abbott-magento2.test/static/version1563452614/graphql/_view/en_US/Magento_',
						'url': '',
						'https': '',
						'min_sale_qty': '2',
						'max_sale_qty': '10',
						'price': '20.0000',
						'max_order_quantity': '3',
						'weight': '2.0000',
						'ean_code': '99999999992',
						'shelf_life': '20'
					},
					'qty': 13,
					'bundle_options': [{
						'id': 1,
						'quantity': 2,
						'value': ['1']
					},
					],
					'price': {
						'value': 20,
						'currency': 'USD'
					},
					'item_price': {
						'value': 60,
						'currency': 'USD'
					},
					'sku': 'simple_product',
					'name': 'Simple Product'
				}],
				'billing_address': {
					'id': 13,
					'prefix': 'Mr',
					'firstname': 'Firstname',
					'lastname': 'Lastname',
					'postcode': 'postcode',
					'country_id': 'DE',
					'country_name': 'Germany',
					'region_code': 'BER',
					'region': 'Berlin',
					'city': 'Berlin',
					'street': [
						'Street 1',
						'Street 2'
					],
					'telephone': '10111111112'
				},
				'shipping_address': {
					'id': 4,
					'prefix': 'Mr',
					'firstname': 'Firstname',
					'lastname': 'Lastname',
					'postcode': 'postcode',
					'country_id': 'DE',
					'country_name': 'Germany',
					'region_code': 'BER',
					'region': 'Berlin',
					'city': 'Berlin',
					'street': [
						'Street 1',
						'Street 2'
					],
					'telephone': '10111111112'
				},
				'applied_coupon': {
					'code': '2?ds5!2d'
				},
				'selected_payment_method': {
					'code': 'payon_paypal',
					'title': 'Check / Money order',
					'payon_checkout_id': 'payon_checkout_id'
				},
				'prices': {
					'grand_total': {
						'value': 70,
						'currency': 'USD'
					},
					'subtotal_including_tax': {
						'value': 60,
						'currency': 'USD'
					},
					'subtotal_excluding_tax': {
						'value': 60,
						'currency': 'USD'
					},
					'subtotal_with_discount_excluding_tax': {
						'value': 55,
						'currency': 'USD'
					},
					'applied_taxes': []
				}
			}})
			wrapper.instance().saveAddress(123);
		});
	});
});
describe('AddressCheckoutCard component Test Suite ', () => {
	let props, wrapper;
	const updateAddressMock = jest.fn();
	const setBillingAddressOnCartMock = jest.fn();
	const setShippingAddressOnCartMock = jest.fn();
	const verifyAddressRequestMock = jest.fn();
	const createNewShippingAddressMock = jest.fn();
	const createNewBillingAddressMock = jest.fn();
	const clearNewShippingAddressMock = jest.fn();
	const clearNewBillingAddressMock = jest.fn();
	const setModesMock = jest.fn();
	const setBillingModesMock = jest.fn();
	const getAvailablePaymentMethodsRequestMock = jest.fn();
	beforeEach(() => {
		isRxCheckoutPageType.mockImplementation(() => true);
		props = {
			address: {
				addresstype: 'PropTypes.string',
				prefix: 'PropTypes.string',
				firstname: 'PropTypes.string',
				lastname: 'PropTypes.string',
				street: [],
				postcode: 'PropTypes.string',
				city: 'PropTypes.string',
				isNew: true,
				id: 234,
				country_name:{label:'Germany',value:'DE'},
				address_id: 234,
			},
			informationalMessage: 'InformationalMessage',
			dob:'PropTypes.string',
			email:'PropTypes.string',
			isBilling: false,
			isShipping: false,
			isShippingEqualToBilling: true,
			isEditing: false,
			isSelecting: false,
			verificationStatus: "",
			setShippingAddressOnCart: setShippingAddressOnCartMock,
			setBillingAddressOnCart: setBillingAddressOnCartMock,
			updateAddress: updateAddressMock,
			verifyAddressRequest: verifyAddressRequestMock,
			createNewShippingAddress: createNewShippingAddressMock,
			createNewBillingAddress: createNewBillingAddressMock,
			clearNewShippingAddress: clearNewShippingAddressMock,
			clearNewBillingAddress: clearNewBillingAddressMock,
			setModes: setModesMock,
			setBillingModes: setBillingModesMock,
			newAddress: {
				id:123,
				'a':'b'
			},
			selectableAddresses: [
				{
					'id': 13,
					'prefix': 'Mr',
					'firstname': 'Firstname',
					'lastname': 'Lastname',
					'postcode': 'postcode',
					'country_id': 'DE',
					'country_name': 'Germany',
					'region_code': 'BER',
					'region': 'Berlin',
					'city': 'Berlin',
					'street': [
						'Street 1',
						'Street 2'
					],
					'telephone': '10111111112'
				},{
					'id': 14,
					'prefix': 'Mr',
					'firstname': 'Firstname',
					'lastname': 'Lastname',
					'postcode': 'postcode',
					'country_id': 'DE',
					'country_name': 'Germany',
					'region_code': 'BER',
					'region': 'Berlin',
					'city': 'Berlin',
					'street': [
						'Street 1',
						'Street 2'
					],
					'telephone': '10111111112'
				}
			],
			enableNewPaymentFlow: true,
			getAvailablePaymentMethodsRequest: getAvailablePaymentMethodsRequestMock,
			paymentMethods:{
				payment_methods:[
					'payon_cc',
					'payon_paypal',
					'open_invoice'
					],
			isLoading: false,
			error: null,
			unavailablePaymentOptionsMsg: null,
			
			},
			isAllowSave : false
		};
		wrapper = setup(props);
	});

	describe('props check', () => {
		
		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});

		test('render check',() => {
			expect(wrapper.type()).not.toEqual(null);
		});
	});
	describe('componentdidUpdate check', () => {
	test('componentdidUpdate',() => {
		const prevProps = {
			setShippingAddressOnCart: setShippingAddressOnCartMock ,
			setBillingAddressOnCart: setBillingAddressOnCartMock ,
			informationalMessage: 'string',
			cartDetails:{...wrapper.instance().props.cartDetails},
			customer: {},
			isLoading:false,
			isCartLoading:true,
			verificationStatus:"null",
			isAllowSave : false
		};
		wrapper.setProps({verificationStatus:"ADDRESS_CHECK_SUCCESS"})
		isRxCheckoutPageType.mockImplementation(() => true);
		wrapper.instance().componentDidUpdate(prevProps);
	});
});

describe('lifecycle method calls', () => {
	test('componentdidUpdate',() => {
		const prevProps = {
			setShippingAddressOnCart: setShippingAddressOnCartMock ,
			setBillingAddressOnCart: setBillingAddressOnCartMock ,
			informationalMessage: 'string',
			cartDetails:{...wrapper.instance().props.cartDetails},
			customer: {},
			isLoading:true,
			isCartLoading:false,
			isAllowSave : false
		};
		wrapper.instance().componentDidUpdate(prevProps);
	});
	test('componentdidUpdate',() => {
		const prevProps = {
			setShippingAddressOnCart: setShippingAddressOnCartMock ,
			setBillingAddressOnCart: setBillingAddressOnCartMock ,
			informationalMessage: 'string',
			cartDetails:{...wrapper.instance().props.cartDetails},
			customer: {},
			isLoading:false,
			isCartLoading:true,
			isAllowSave : false
		};
		wrapper.instance().componentDidUpdate(prevProps);
	});
	test('componentdidUpdate',() => {
		const prevProps = {
			setShippingAddressOnCart: setShippingAddressOnCartMock ,
			setBillingAddressOnCart: setBillingAddressOnCartMock ,
			informationalMessage: 'string',
			cartDetails:{...wrapper.instance().props.cartDetails},
			customer: {},
			isLoading:false,
			isCartLoading:true,
			verificationStatus:"null",
			isAllowSave : false
		};
		wrapper.instance().componentDidUpdate(prevProps);
	});
	test('componentdidUpdate',() => {
	
		wrapper.instance().componentDidUpdate();
	});
});
describe('method calls',() => {
	test('submitAddress - arg1 null',() => {
		wrapper.instance().submitAddress(null,wrapper.instance().props.verifiedAddress);
	});
	test('submitAddress - arg2 null',() => {
		wrapper.instance().submitAddress(wrapper.instance().props.address,null);
	});
	test('submitAddress',() => {
		const updatedAddress = {
			addresstype: 'PropTypes.string',
			prefix: 'PropTypes.string',
			firstname: 'PropTypes.string',
			lastname: 'PropTypes.string',
			street: [],
			postcode: 'PropTypes.string',
			city: 'PropTypes.string',
			isNew: true,
			id: 43242,
			address_id: 0,
			default_shipping: 'default_shipping',
			additionaladdress:'additionaladdress'

		};
		wrapper.instance().submitAddress(updatedAddress,null);
	});
	test('submitAddress',() => {
		const updatedAddress = {
			addresstype: 'PropTypes.string',
			prefix: 'PropTypes.string',
			firstname: 'PropTypes.string',
			lastname: 'PropTypes.string',
			street: [],
			postcode: 'PropTypes.string',
			city: 'PropTypes.string',
			isNew: true,
			id: 234324,
			address_id: 0,
			default_shipping: 'default_shipping',
			additionaladdress:'additionaladdress'

		};
		wrapper.instance().submitAddress(updatedAddress,null);
	});
	test('submitAddress',() => {
		const updatedAddress = {
			addresstype: 'PropTypes.string',
			prefix: 'PropTypes.string',
			firstname: 'PropTypes.string',
			lastname: 'PropTypes.string',
			street: [],
			postcode: 'PropTypes.string',
			city: 'PropTypes.string',
			isNew: true,
			id: 343,
			address_id: 0,
			default_billing: 'default_billing',
			country_name:{label:'Germany',value:'DE'},
			additionaladdress:'additionaladdress'
		};
		wrapper.instance().submitAddress(updatedAddress,null);
	});
	test('setAddress',() => {
		wrapper.setProps({ cartDetails: {
			'id': 'KDzhKR5Or16of6UqnOP29FqLn5YjPs9e',
			'items': [{
				'id': 3,
				'product': {
					'id': 1,
					'sku': 'simple_product',
					'name': 'Simple Product',
					'description': 'Some product description',
					'short_description': 'Some product short description',
					'uom': 1,
					'product_version': 1,
					'hts_code': '123-hts',
					'origin': 'Alabama',
					'type_id': 'simple',
					'meta_title': null,
					'meta_description': null,
					'meta_keyword': null,
					'is_in_stock': true,
					'regular_price_with_tax': null,
					'regular_price_without_tax': null,
					'image_url': 'https://abbott-magento2.test/static/version1563452614/graphql/_view/en_US/Magento_',
					'url': '',
					'https': '',
					'min_sale_qty': '2',
					'max_sale_qty': 10,
					'price': '20.0000',
					'max_order_quantity': '3',
					'weight': '2.0000',
					'ean_code': '99999999992',
					'shelf_life': '20'
				},
				'qty': 3,
				'bundle_options': [{
					'id': 1,
					'quantity': 2,
					'value': ['1']
				},
				],
				'price': {
					'value': 20,
					'currency': 'USD'
				},
				'item_price': {
					'value': 60,
					'currency': 'USD'
				},
				'sku': 'simple_product',
				'name': 'Simple Product'
			},
			{
				'id': 4,
				'product': {
					'id': 1,
					'sku': 'simple_product',
					'name': 'Simple Product',
					'description': 'Some product description',
					'short_description': 'Some product short description',
					'uom': 1,
					'product_version': 1,
					'hts_code': '123-hts',
					'origin': 'Alabama',
					'type_id': 'simple',
					'meta_title': null,
					'meta_description': null,
					'meta_keyword': null,
					'is_in_stock': true,
					'regular_price_with_tax': null,
					'regular_price_without_tax': null,
					'image_url': 'https://abbott-magento2.test/static/version1563452614/graphql/_view/en_US/Magento_',
					'url': '',
					'https': '',
					'min_sale_qty': '2',
					'max_sale_qty': '10',
					'price': '20.0000',
					'max_order_quantity': '3',
					'weight': '2.0000',
					'ean_code': '99999999992',
					'shelf_life': '20'
				},
				'qty': 13,
				'bundle_options': [{
					'id': 1,
					'quantity': 2,
					'value': ['1']
				},
				],
				'price': {
					'value': 20,
					'currency': 'USD'
				},
				'item_price': {
					'value': 60,
					'currency': 'USD'
				},
				'sku': 'simple_product',
				'name': 'Simple Product'
			}],
			'billing_address': {
				'id': 13,
				'prefix': 'Mr',
				'firstname': 'Firstname',
				'lastname': 'Lastname',
				'postcode': 'postcode',
				'country_id': 'DE',
				'country_name': 'Germany',
				'region_code': 'BER',
				'region': 'Berlin',
				'city': 'Berlin',
				'street': [
					'Street 1',
					'Street 2'
				],
				'telephone': '10111111112'
			},
			'shipping_address': {
				'id': 4,
				'prefix': 'Mr',
				'firstname': 'Firstname',
				'lastname': 'Lastname',
				'postcode': 'postcode',
				'country_id': 'DE',
				'country_name': 'Germany',
				'region_code': 'BER',
				'region': 'Berlin',
				'city': 'Berlin',
				'street': [
					'Street 1',
					'Street 2'
				],
				'telephone': '10111111112'
			},
			'applied_coupon': {
				'code': '2?ds5!2d'
			},
			'selected_payment_method': {
				'code': 'payon_paypal',
				'title': 'Check / Money order',
				'payon_checkout_id': 'payon_checkout_id'
			},
			'prices': {
				'grand_total': {
					'value': 70,
					'currency': 'USD'
				},
				'subtotal_including_tax': {
					'value': 60,
					'currency': 'USD'
				},
				'subtotal_excluding_tax': {
					'value': 60,
					'currency': 'USD'
				},
				'subtotal_with_discount_excluding_tax': {
					'value': 55,
					'currency': 'USD'
				},
				'applied_taxes': []
			}
		}})
		wrapper.instance().setAddress(wrapper.instance().props.address);
	});
	test('addressFormInitialValues',() => {
		wrapper.instance().addressFormInitialValues(wrapper.instance().props.address);
	});
	test('cancelEditMode',() => {
		wrapper.instance().cancelEditMode();
	});
	test('setSelectMode',() => {
		wrapper.instance().setSelectMode();
	});
	test('cancelSelectMode',() => {
		wrapper.instance().cancelSelectMode();
		expect(wrapper.instance().state.currentEditedAddressId).toBe(null);
	});
	test('clearNewAddress',() => {
		wrapper.instance().clearNewAddress();
	});
	test('createNewAddress',() => {
		wrapper.instance().createNewAddress();
	});
	test('backToAddressBook',() => {
		wrapper.instance().backToAddressBook();
	});
	test('willAddBilling',() => {
		const willAddBillingReturnValue = wrapper.instance().willAddBilling();
		expect(willAddBillingReturnValue).toBe(true);
	});
	test('saveAddress',() => {
		wrapper.setProps({ cartDetails: {
			'id': 'KDzhKR5Or16of6UqnOP29FqLn5YjPs9e',
			'items': [{
				'id': 3,
				'product': {
					'id': 1,
					'sku': 'simple_product',
					'name': 'Simple Product',
					'description': 'Some product description',
					'short_description': 'Some product short description',
					'uom': 1,
					'product_version': 1,
					'hts_code': '123-hts',
					'origin': 'Alabama',
					'type_id': 'simple',
					'meta_title': null,
					'meta_description': null,
					'meta_keyword': null,
					'is_in_stock': true,
					'regular_price_with_tax': null,
					'regular_price_without_tax': null,
					'image_url': 'https://abbott-magento2.test/static/version1563452614/graphql/_view/en_US/Magento_',
					'url': '',
					'https': '',
					'min_sale_qty': '2',
					'max_sale_qty': 10,
					'price': '20.0000',
					'max_order_quantity': '3',
					'weight': '2.0000',
					'ean_code': '99999999992',
					'shelf_life': '20'
				},
				'qty': 3,
				'bundle_options': [{
					'id': 1,
					'quantity': 2,
					'value': ['1']
				},
				],
				'price': {
					'value': 20,
					'currency': 'USD'
				},
				'item_price': {
					'value': 60,
					'currency': 'USD'
				},
				'sku': 'simple_product',
				'name': 'Simple Product'
			},
			{
				'id': 4,
				'product': {
					'id': 1,
					'sku': 'simple_product',
					'name': 'Simple Product',
					'description': 'Some product description',
					'short_description': 'Some product short description',
					'uom': 1,
					'product_version': 1,
					'hts_code': '123-hts',
					'origin': 'Alabama',
					'type_id': 'simple',
					'meta_title': null,
					'meta_description': null,
					'meta_keyword': null,
					'is_in_stock': true,
					'regular_price_with_tax': null,
					'regular_price_without_tax': null,
					'image_url': 'https://abbott-magento2.test/static/version1563452614/graphql/_view/en_US/Magento_',
					'url': '',
					'https': '',
					'min_sale_qty': '2',
					'max_sale_qty': '10',
					'price': '20.0000',
					'max_order_quantity': '3',
					'weight': '2.0000',
					'ean_code': '99999999992',
					'shelf_life': '20'
				},
				'qty': 13,
				'bundle_options': [{
					'id': 1,
					'quantity': 2,
					'value': ['1']
				},
				],
				'price': {
					'value': 20,
					'currency': 'USD'
				},
				'item_price': {
					'value': 60,
					'currency': 'USD'
				},
				'sku': 'simple_product',
				'name': 'Simple Product'
			}],
			'billing_address': {
				'id': 13,
				'prefix': 'Mr',
				'firstname': 'Firstname',
				'lastname': 'Lastname',
				'postcode': 'postcode',
				'country_id': 'DE',
				'country_name': 'Germany',
				'region_code': 'BER',
				'region': 'Berlin',
				'city': 'Berlin',
				'street': [
					'Street 1',
					'Street 2'
				],
				'telephone': '10111111112'
			},
			'shipping_address': {
				'id': 4,
				'prefix': 'Mr',
				'firstname': 'Firstname',
				'lastname': 'Lastname',
				'postcode': 'postcode',
				'country_id': 'DE',
				'country_name': 'Germany',
				'region_code': 'BER',
				'region': 'Berlin',
				'city': 'Berlin',
				'street': [
					'Street 1',
					'Street 2'
				],
				'telephone': '10111111112'
			},
			'applied_coupon': {
				'code': '2?ds5!2d'
			},
			'selected_payment_method': {
				'code': 'payon_paypal',
				'title': 'Check / Money order',
				'payon_checkout_id': 'payon_checkout_id'
			},
			'prices': {
				'grand_total': {
					'value': 70,
					'currency': 'USD'
				},
				'subtotal_including_tax': {
					'value': 60,
					'currency': 'USD'
				},
				'subtotal_excluding_tax': {
					'value': 60,
					'currency': 'USD'
				},
				'subtotal_with_discount_excluding_tax': {
					'value': 55,
					'currency': 'USD'
				},
				'applied_taxes': []
			}
		}})
		wrapper.instance().saveAddress(123);
	});
});
});
