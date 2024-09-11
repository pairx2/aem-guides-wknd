import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import { mockStore, mockStoreOrder, paymentMockStore } from '../../../../__mocks__/storeMock';
import { isRxCheckoutPageType } from '../../../../utils/pageTypeUtils';
import Payment from '../../../../modules/Payment/components/Payment';
jest.mock('../../../../utils/endpointUrl.js');
jest.mock('../../../../utils/getParams.js');
jest.mock('../../../../utils/pageTypeUtils.js');

Enzyme.configure({
	adapter: new EnzymeAdapter()
});

const setup = (props) => {
	const wrapper = shallow(<Payment store={mockStore} {...props} />).dive().dive();
	return wrapper;
};

const setupTwo = (props) => {
	const wrapper = shallow(<Payment store={mockStoreOrder} {...props} />).dive().dive();
	return wrapper;
};
const setupThree = (props) => {
	const wrapper = shallow(<Payment store={paymentMockStore} {...props} />).dive().dive();
	return wrapper;
};

describe('Payment component Test Suite', () => {
	let props;
	let wrapper;
	const getAvailablePaymentMethodsRequestMock = jest.fn();
	const getCheckoutIdRequestMock = jest.fn();
	const setSavedPaymentMethodOnCartMock = jest.fn();
	const verifyAddressRequestMock = jest.fn();
	const setShippingAddressOnCartMock = jest.fn();
	const setBillingAddressOnCartMock = jest.fn();
	const getAvailablePaymentMethodsGraphqlRequestMock = jest.fn();
	beforeEach(() => {
		window.wpwl = {
			unload: jest.fn()
		}
		props = {
			payonEndpoint: 'String',
			confirmationPage: 'String',
			checkboxes: ['a', 'b'],
			isLoading: false,
			enableNewPaymentFlow: false,
			getAvailablePaymentMethodsRequest: getAvailablePaymentMethodsRequestMock,
			getAvailablePaymentMethodsGraphqlRequest: getAvailablePaymentMethodsGraphqlRequestMock,
			getCheckoutIdRequest: getCheckoutIdRequestMock,
			setSavedPaymentMethodOnCart: setSavedPaymentMethodOnCartMock,
			verifyAddressRequest: verifyAddressRequestMock,
			setShippingAddressOnCart: setShippingAddressOnCartMock,
			setBillingAddressOnCart: setBillingAddressOnCartMock,
			isAllowSave: true,
			isAllowSaveUpdated: true,
			adcIsAllowSave: false

		};
		wrapper = setup(props);
	});
	describe('method calls enableNewPaymentFlow=false', () => {
		describe('toggleOption calls', () => {
			test('toggleOption - this.state.expandedIndex === index false', () => {
				wrapper.instance().toggleOption(0);
				expect(wrapper.instance().state.paymentMethod).toBe('payon_saved_token');
				expect(wrapper.instance().state.paymentMethodToken).toBe(null);
			});
			test('toggleOption - this.state.expandedIndex === index false', () => {
				wrapper.instance().toggleOption(1);
				expect(wrapper.instance().state.paymentMethod).toBe('payon_paypal');
				expect(wrapper.instance().state.paymentMethodToken).toBe(null);
				expect(wrapper.instance().state.loadingIndex).toBe(1);

				const getCheckoutIdRequestMockCallCount = getCheckoutIdRequestMock.mock.calls.length;
				expect(getCheckoutIdRequestMockCallCount).toBeDefined();
			});
			test('toggleOption - this.state.expandedIndex === index true', () => {
				wrapper.instance().setState({ expandedIndex: 0 });
				wrapper.setProps({ cartDetails: [] });

				wrapper.instance().setState({ useNewRequestMethod: false });
				wrapper.instance().toggleOption(0);
			});
		});
		
	});
});

describe('Payment component Test Suite', () => {
	let props;
	let wrapper;
	const getAvailablePaymentMethodsRequestMock = jest.fn();
	const getCheckoutIdRequestMock = jest.fn();
	const setSavedPaymentMethodOnCartMock = jest.fn();
	const verifyAddressRequestMock = jest.fn();
	const setShippingAddressOnCartMock = jest.fn();
	const setBillingAddressOnCartMock = jest.fn();
	const getAvailablePaymentMethodsGraphqlRequestMock = jest.fn();
	beforeEach(() => {
		window.wpwl = {
			unload: jest.fn()
		}
		props = {
			payonEndpoint: 'String',
			confirmationPage: 'String',
			checkboxes: ['a', 'b'],
			isLoading: false,
			enableNewPaymentFlow: true,
			getAvailablePaymentMethodsRequest: getAvailablePaymentMethodsRequestMock,
			getAvailablePaymentMethodsGraphqlRequest: getAvailablePaymentMethodsGraphqlRequestMock,
			getCheckoutIdRequest: getCheckoutIdRequestMock,
			setSavedPaymentMethodOnCart: setSavedPaymentMethodOnCartMock,
			verifyAddressRequest: verifyAddressRequestMock,
			setShippingAddressOnCart: setShippingAddressOnCartMock,
			setBillingAddressOnCart: setBillingAddressOnCartMock,
			isAllowSave: true,
			adcIsAllowSave: false
		};
		wrapper = setup(props);
	});

	describe('render check', () => {

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});

		test('render check', () => {
			expect(wrapper.type()).not.toEqual(null);
		});


	});
	describe('lifecycle methods check', () => {
		test('component did update', () => {
			const prevProps = {
				checkboxes: [],
				confirmationPage: 'prevString',
				cartDetails: {},
				paymentMethods: [],
				payonEndpoint: 'prevString',
				checkoutIdDate: null,
				methods: [],
				customer: {},
				isLoading: true,
				isSubmitDisabled: true,
				error: 'prevString',
				dictionary: {},
				paymentTokens: [],
				warnings: [],
				rxmcExists: 2,
				isAllowMethodLoading: true,

			};

			wrapper.instance().setState({ useNewRequestMethod: false, methodsAreLoaded: false });
			wrapper.setProps({
				paymentTokens: [{
					'method': 'payon_credit_card',
					'type': 'MC',
					'token': '',
					'expiry': '12/2019',
					'last4Digits': '1111',
					'label': 'Payon CC Payment',
					'is_default': true
				},
				{
					'method': 'payon_credit_card',
					'type': 'MC',
					'token': '',
					'expiry': '12/2019',
					'last4Digits': '1111',
					'label': 'Payon CC Payment',
					'is_default': false
				}],
			})
			wrapper.instance().componentDidUpdate(prevProps);
		});
		test('component did update', () => {
			const prevProps = {
				checkboxes: [],
				confirmationPage: 'prevString',
				cartDetails: {},
				payonEndpoint: 'prevString',
				checkoutIdDate: null,
				methods: [],
				paymentMethods: [],
				customer: {},
				isLoading: true,
				isSubmitDisabled: true,
				error: 'prevString',
				dictionary: {},
				paymentTokens: [],
				warnings: [],
				rxmcExists: 2,
				isAllowMethodLoading: true,
			};
			wrapper.instance().componentDidUpdate(prevProps);
			wrapper.instance().setState({ paymentMethod: 'string', methodsAreLoaded: true });

		});
		test('component did update', () => {
			const prevProps = {
				checkboxes: [],
				confirmationPage: 'prevString',
				cartDetails: { ...wrapper.instance().props.cartDetails },
				payonEndpoint: 'prevString',
				checkoutIdDate: null,
				methods: [],
				paymentMethods: [],
				customer: {},
				isLoading: true,
				isSubmitDisabled: true,
				error: 'prevString',
				dictionary: {},
				paymentTokens: [],
				warnings: [],
				rxmcExists: 2,
				isAllowMethodLoading: true,
				enableCreateOrderCall: true,
				isLoadingPaymentMethods: true
			};
			wrapper.setProps({ cartDetails: {}, isLoadingPaymentMethods: false, isLoading: false });
			wrapper.instance().setState({ methodsAreLoaded: false });
			wrapper.instance().componentDidUpdate(prevProps);
			wrapper.instance().setState({ paymentMethod: 'string' });

		});
		test('component did update payon_checkout_id null', () => {
			const sampleCartDetails = {
				'prices': {
					'grand_total': {
						'value': ''
					}
				},
				'selected_payment_method': {
					'payon_checkout_id': ''
				},
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
					},
					'qty': 3,
					'bundle_options': [{
						'id': 1,
						'quantity': 2,
						'value': ['1']
					}],
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
			};
			const prevProps = {
				checkboxes: [],
				confirmationPage: 'prevString',
				cartDetails: { ...sampleCartDetails },
				payonEndpoint: 'prevString',
				checkoutIdDate: 'Wed May 13 2020 13:38:55 GMT+0530 (India Standard Time)',
				methods: [],
				paymentMethods: [],
				customer: {},
				isLoading: true,
				isSubmitDisabled: true,
				error: 'prevString',
				dictionary: {},
				paymentTokens: [],
				warnings: [],
				rxmcExists: 2,
				isAllowMethodLoading: true,
			};
			wrapper.instance().setState({ useNewRequestMethod: true });
			wrapper.instance().componentDidUpdate(prevProps);
			expect(wrapper.instance().state.expandedIndex).toBe(null);
			expect(wrapper.instance().state.isOpenInvoiceClicked).toBe(false);
		});
	});
	describe('method calls', () => {
		test('paymentAddressCheck', () => {
			wrapper.instance().paymentAddressCheck(wrapper.instance().props.customer, wrapper.instance().props.cartDetails);
			const verifyAddressRequestMockCallCount = verifyAddressRequestMock.mock.calls.length;
			expect(verifyAddressRequestMockCallCount).toBeDefined();
		});
		test('constructPayload', () => {
			const constructPayloadReturnValue = wrapper.instance().constructPayload(wrapper.instance().props.customer, wrapper.instance().props.cartDetails);
			expect(constructPayloadReturnValue).toBeDefined();
		});
		describe('toggleOption calls', () => {
			test('toggleOption - this.state.expandedIndex === index false', () => {
				wrapper.instance().toggleOption(0);
				expect(wrapper.instance().state.paymentMethod).toBe('payon_saved_token');
				expect(wrapper.instance().state.paymentMethodToken).toBe(null);
			});
			test('toggleOption - this.state.expandedIndex === index false', () => {
				wrapper.instance().toggleOption(1);
				expect(wrapper.instance().state.paymentMethod).toBe('payon_paypal');
				expect(wrapper.instance().state.paymentMethodToken).toBe(null);
				expect(wrapper.instance().state.loadingIndex).toBe(1);

				const getCheckoutIdRequestMockCallCount = getCheckoutIdRequestMock.mock.calls.length;
				expect(getCheckoutIdRequestMockCallCount).toBeDefined();
			});
			test('toggleOption - this.state.expandedIndex === index true', () => {
				wrapper.instance().setState({ expandedIndex: 0 });
				wrapper.setProps({ cartDetails: [] });

				wrapper.instance().setState({ useNewRequestMethod: false });
				wrapper.instance().toggleOption(0);
			});
		});
		test('markFormAsDirty', () => {
			wrapper.instance().markFormAsDirty();
			expect(wrapper.instance().state.isOpenInvoiceClicked).toBe(true);
		});
		test('isCPSOrder', () => {
			wrapper.setProps({
				cartDetails: {
					'selected_payment_method': {
						'payon_checkout_id': '12343'
					},
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
							'price': '20.0000',
							'max_order_quantity': '3',
							'weight': '2.0000',
							'ean_code': '99999999992',
							'shelf_life': '20',
							is_subscription: true,
						},
						'qty': '3',
						'bundle_options': ['1'],
						'price': {
							'value': 20,
							'currency': 'USD'
						},
					}],
					'selected_shipping_method': {
						'carrier_code': 'flatrate',
						'method_code': 'flatrate',
						'carrier_title': 'Flat Rate',
						'amount': {
							'value': 15,
							'currency': 'USD'
						}
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
						'applied_taxes': [{ amount: { value: 101, currency: 'INR' } }],
					},
					'applied_coupon': null,
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
						'telephone': '10111111112',
						address_id: 0
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
						'telephone': '10111111112',
						address_id: 0
					},
				}
			})
			const returnValue = wrapper.instance().isCPSOrder();
			expect(returnValue).toBeDefined();
		});
		test('shouldSavePaymentMethod', () => {
			const returnValue = wrapper.instance().shouldSavePaymentMethod(2);
			expect(returnValue).not.toBeDefined();
		});
		test('validateInsuranceDetails', () => {
			const returnValue = wrapper.instance().validateInsuranceDetails();
			expect(returnValue).toBe(undefined);
		});
		test('setSavedPaymentMethod', () => {
			wrapper.instance().setSavedPaymentMethod('qwqeqe12232');
			expect(wrapper.instance().state.paymentMethodToken).toBe('qwqeqe12232');
			const setSavedPaymentMethodOnCartMockCallCount = setSavedPaymentMethodOnCartMock.mock.calls.length;
			expect(setSavedPaymentMethodOnCartMockCallCount).toBeDefined();
		});
		describe('getMappedPaymentMethods calls', () => {
			test('getMappedPaymentMethods', () => {
				const getMappedPaymentMethodsReturnValue = wrapper.instance().getMappedPaymentMethods(['EP', 'CC', 'free']);
				expect(getMappedPaymentMethodsReturnValue).toBeDefined();
			});
			test('getMappedPaymentMethods', () => {
				const getMappedPaymentMethodsReturnValue = wrapper.instance().getMappedPaymentMethods([]);
				expect(getMappedPaymentMethodsReturnValue).toBeDefined();
			});
			test('getMappedPaymentMethods', () => {
				const getMappedPaymentMethodsReturnValue = wrapper.instance().getMappedPaymentMethods(wrapper.instance().props.methods);
				expect(getMappedPaymentMethodsReturnValue).toBeDefined();
			});
			test('getMappedPaymentMethods', () => {
				const getMappedPaymentMethodsReturnValue = wrapper.instance().getMappedPaymentMethods();
				expect(getMappedPaymentMethodsReturnValue).toBeDefined();
			});
		});
		describe('validateCheckoutId calls', () => {
			test('validateCheckoutId', () => {
				const validateCheckoutIdReturnValue = wrapper.instance().validateCheckoutId(null, 'checkoutIdMethod', 'mappedMethods', 'index');
				expect(validateCheckoutIdReturnValue).toBeDefined();
			});
			test('validateCheckoutId without param', () => {
				const validateCheckoutIdReturnValue = wrapper.instance().validateCheckoutId();
				expect(validateCheckoutIdReturnValue).toBeDefined();
			});
		});
		test('defaultCartAddressDidChange', () => {
			const defaultCartAddressDidChangeValue = wrapper.instance().defaultCartAddressDidChange({ cartDetails: { address_id: '123' } }, 'shipping_address');
			expect(defaultCartAddressDidChangeValue).toBeDefined();
		});
		describe('validateCheckoutId calls', () => {

			test('isRiskCheckRequired test case', () => {
				const prevProps = {
					cartDetails: {
						prices: { grand_total: { 'value': 70, 'currency': 'USD' } }, 'selected_shipping_method': {
							'carrier_code': 'flatrate',
							'method_code': 'flatrate',
							'carrier_title': 'Flat Rate',
							'amount': {
								'value': 15,
								'currency': 'USD'
							}
						}
					}
				};
				const cartprops = {
					'items': [{
						'id': 3,
						'product': {
							'id': 1,
							'sku': null,
							'name': null,
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
						'qty': '30',
						'bundle_options': [{
							'id': 1,
							'quantity': 2,
							'value': ['1']
						},
						],
						'price': {
							'value': null,
							'currency': 'USD'
						},
						'item_price': {
							'value': null,
							'currency': 'USD'
						},
						'sku': 'simple_product',
						'name': 'Simple Product'
					}],
					prices: { grand_total: { 'value': 70, 'currency': 'USD' } }, 'selected_shipping_method': {
						'carrier_code': 'flatrate',
						'method_code': 'flatrate',
						'carrier_title': 'Flat Rate',
						'amount': {
							'value': 15,
							'currency': 'USD'
						}
					}
				};
				wrapper.setProps({ cartDetails: { ...cartprops }, warnings: [] });
				wrapper.instance().setState({ methodsAreLoaded: true });
				wrapper.instance().isRiskCheckRequired(prevProps);
			});

			test('isRiskCheckRequired test case', () => {
				wrapper.instance().setState({ methodsAreLoaded: false });
				wrapper.setProps({ cartDetails: [] });
				const prevProps = { cartDetails: { prices: { grand_total: { value: 70 } }, selected_shipping_method: { carrier_code: 'flatrate' } } };
				wrapper.instance().isRiskCheckRequired(prevProps);
			});
			test('isRiskCheckRequired test case', () => {
				const prevProps = { cartDetails: { ...wrapper.instance().props.cartDetails } };
				wrapper.instance().isRiskCheckRequired(prevProps);
			});
			test('isRiskCheckRequired test case', () => {
				wrapper.setProps({ cartDetails: {} });
				const prevProps = {};

				wrapper.instance().isRiskCheckRequired(prevProps);
			});
		});

	});
});

describe('Payment component Test Suite 1', () => {
	let props;
	let wrapper;
	const getAvailablePaymentMethodsRequestMock = jest.fn();
	const getCheckoutIdRequestMock = jest.fn();
	const setSavedPaymentMethodOnCartMock = jest.fn();
	const verifyAddressRequestMock = jest.fn();
	const setShippingAddressOnCartMock = jest.fn();
	const setBillingAddressOnCartMock = jest.fn();
	const getAvailablePaymentMethodsGraphqlRequestMock = jest.fn();
	beforeEach(() => {
		window.wpwl = {
			unload: undefined
		}
		props = {
			payonEndpoint: 'String',
			confirmationPage: 'String',
			checkboxes: ['a', 'b'],
			enableNewPaymentFlow: true,
			getAvailablePaymentMethodsRequest: getAvailablePaymentMethodsRequestMock,
			getAvailablePaymentMethodsGraphqlRequest: getAvailablePaymentMethodsGraphqlRequestMock,
			getCheckoutIdRequest: getCheckoutIdRequestMock,
			setSavedPaymentMethodOnCart: setSavedPaymentMethodOnCartMock,
			verifyAddressRequest: verifyAddressRequestMock,
			setShippingAddressOnCart: setShippingAddressOnCartMock,
			setBillingAddressOnCart: setBillingAddressOnCartMock,
			isAllowSave: true,
			adcIsAllowSave:false
		};
		wrapper = setupTwo(props);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('constructPayload', () => {
		const constructPayloadReturnValue = wrapper.instance().constructPayload(wrapper.instance().props.customer, wrapper.instance().props.cartDetails);
		expect(constructPayloadReturnValue).toBeDefined();
	});
	test('toggleOption - this.state.expandedIndex === index window unload null', () => {
		wrapper.instance().toggleOption(0);
		expect(wrapper.instance().state.paymentMethodToken).toBe(null);
	});
	test('component did update', () => {
		const prevProps = {
			checkboxes: [],
			confirmationPage: 'prevString',
			cartDetails: wrapper.instance().props.cartDetails,
			payonEndpoint: 'prevString',
			checkoutIdDate: 'Wed May 13 2020 13:38:55 GMT+0530 (India Standard Time)',
			methods: [],
			paymentMethods: [],
			customer: {},
			isLoading: false,
			isSubmitDisabled: true,
			error: 'prevString',
			dictionary: {},
			paymentTokens: [],
			warnings: [],
			rxmcExists: 2,

			isAllowMethodLoading: true,
		};

		wrapper.instance().componentDidUpdate(prevProps);
		expect(wrapper.instance().state.expandedIndex).toBe(null);
		expect(wrapper.instance().state.isOpenInvoiceClicked).toBe(false);
	});
});
describe('Payment component Test Suite 2', () => {
	let props;
	let wrapper;

	const getAvailablePaymentMethodsRequestMock = jest.fn();
	const getCheckoutIdRequestMock = jest.fn();
	const setSavedPaymentMethodOnCartMock = jest.fn();
	const verifyAddressRequestMock = jest.fn();
	const setShippingAddressOnCartMock = jest.fn();
	const setBillingAddressOnCartMock = jest.fn();
	const getAvailablePaymentMethodsGraphqlRequestMock = jest.fn();

	beforeEach(() => {
		props = {
			payonEndpoint: 'String',
			confirmationPage: 'String',
			checkboxes: ['a', 'b'],
			enableNewPaymentFlow: false,
			getAvailablePaymentMethodsRequest: getAvailablePaymentMethodsRequestMock,
			getAvailablePaymentMethodsGraphqlRequest: getAvailablePaymentMethodsGraphqlRequestMock,
			getCheckoutIdRequest: getCheckoutIdRequestMock,
			setSavedPaymentMethodOnCart: setSavedPaymentMethodOnCartMock,
			verifyAddressRequest: verifyAddressRequestMock,
			setShippingAddressOnCart: setShippingAddressOnCartMock,
			setBillingAddressOnCart: setBillingAddressOnCartMock,
			isAllowSave: true
		};
		wrapper = setupThree(props);
		wrapper.instance().setState({ useNewRequestMethod: false, methodsAreLoaded: false });
	});



	test('component did update', () => {
		const prevProps = {
			checkboxes: [],
			confirmationPage: 'prevString',
			cartDetails: wrapper.instance().props.cartDetails,
			payonEndpoint: 'prevString',
			checkoutIdDate: 'Wed May 13 2020 13:46:55 GMT+0530 (India Standard Time)',
			methods: [],
			paymentMethods: [],
			customer: {},
			isLoading: false,
			isSubmitDisabled: true,
			error: 'prevString',
			dictionary: {},
			paymentTokens: [],
			warnings: [],
			rxmcExists: 2,
			isAllowMethodLoading: true,
			isAllowSave: false,
			adcIsAllowSave: true
		};
		//wrapper.instance().setState({useNewRequestMethod:false,methodsAreLoaded: false});
		wrapper.instance().componentDidUpdate(prevProps);
	});
	test('component did update', () => {
		const prevProps = {
			checkboxes: [],
			confirmationPage: 'prevString',
			cartDetails: wrapper.instance().props.cartDetails,
			payonEndpoint: 'prevString',
			checkoutIdDate: 'Wed May 13 2020 13:46:55 GMT+0530 (India Standard Time)',
			methods: [],
			paymentMethods: [],
			customer: {},
			isLoading: false,
			isSubmitDisabled: true,
			error: 'prevString',
			dictionary: {},
			paymentTokens: [],
			warnings: [],
			rxmcExists: 2,
			isAllowMethodLoading: true,
			isAllowSave: false,
		};
		wrapper.instance().setState({ useNewRequestMethod: true });
		wrapper.setProps({ enableNewPaymentFlow: false });
		wrapper.instance().componentDidUpdate(prevProps);
	});
	test('component did update', () => {
		const sampleCartDetails = {
			'selected_payment_method': {
				'payon_checkout_id': ''
			},
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
				},
				'qty': 3,
				'bundle_options': [{
					'id': 1,
					'quantity': 2,
					'value': ['1']
				}],
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
		};
		isRxCheckoutPageType.mockImplementation(() => true);
		const prevProps = {
			checkboxes: [],
			confirmationPage: 'prevString',
			cartDetails: { ...sampleCartDetails },
			payonEndpoint: 'prevString',
			checkoutIdDate: '2121, 11, 24',
			methods: [],
			paymentMethods: [],
			customer: {},
			isLoading: false,
			isSubmitDisabled: true,
			error: 'prevString',
			dictionary: {},
			paymentTokens: [],
			warnings: [],
			rxmcExists: 2,
			isAllowSave: false,
			isAllowMethodLoading: true,
		};

		wrapper.instance().componentDidUpdate(prevProps);
	});
});

describe('is rx value', () => {
	let props;
	let wrapper;
	const sampleCartDetails = {
		'selected_shipping_method': {
			'carrier_code': 'flatrate',
			'method_code': 'flatrate',
			'carrier_title': 'Flat Rate',
			'amount': {
				'value': 15,
				'currency': 'USD'
			}
		},
		'selected_payment_method': {
		},
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
			},
			'qty': 3,
			'bundle_options': [{
				'id': 1,
				'quantity': 2,
				'value': ['1']
			}],
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
		},
	};
	const sampleCartDetailsPP = {
		'selected_shipping_method': {
			'carrier_code': 'flatrate',
			'method_code': 'flatrate',
			'carrier_title': 'Flat Rate',
			'amount': {
				'value': 15,
				'currency': 'USD'
			}
		},
		'selected_payment_method': {
		},
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
			},
			'qty': 3,
			'bundle_options': [{
				'id': 1,
				'quantity': 2,
				'value': ['1']
			}],
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
		'prices': {
			'grand_total': {
				'value': 10,
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
		},
	};
	const getAvailablePaymentMethodsRequestMock = jest.fn();
	const getCheckoutIdRequestMock = jest.fn();
	const setSavedPaymentMethodOnCartMock = jest.fn();
	const verifyAddressRequestMock = jest.fn();
	const setShippingAddressOnCartMock = jest.fn();
	const setBillingAddressOnCartMock = jest.fn();
	const getAvailablePaymentMethodsGraphqlRequestMock = jest.fn();
	beforeEach(() => {
		isRxCheckoutPageType.mockImplementation(() => true);
		const unload = jest.fn();
		Object.defineProperty(window, 'wpwl', {
			writable: true,
			value: unload
		});
		props = {
			payonEndpoint: 'String',
			confirmationPage: 'String',
			checkboxes: ['a', 'b'],
			isLoading: false,
			getAvailablePaymentMethodsRequest: getAvailablePaymentMethodsRequestMock,
			getAvailablePaymentMethodsGraphqlRequest: getAvailablePaymentMethodsGraphqlRequestMock,
			getCheckoutIdRequest: getCheckoutIdRequestMock,
			setSavedPaymentMethodOnCart: setSavedPaymentMethodOnCartMock,
			verifyAddressRequest: verifyAddressRequestMock,
			setShippingAddressOnCart: setShippingAddressOnCartMock,
			setBillingAddressOnCart: setBillingAddressOnCartMock,
			isAllowSave: true,

		};
		wrapper = setup(props);
	});

	describe('render check', () => {

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();

		});

		test('render check', () => {
			expect(wrapper.type()).not.toEqual(null);
		});

		test('component did update', () => {

			const prevProps = {
				checkboxes: [],
				confirmationPage: 'prevString',
				cartDetails: { ...sampleCartDetailsPP },
				payonEndpoint: 'prevString',
				checkoutIdDate: '2121, 11, 24',
				methods: [],
				paymentMethods: [],
				customer: {},
				isLoading: false,
				isSubmitDisabled: true,
				error: 'prevString',
				dictionary: {},
				paymentTokens: [],
				warnings: [],
				rxmcExists: 2,
				isAllowSave: false,
				isAllowMethodLoading: true,
				isLoadingPaymentMethods: true
			};

			wrapper.setProps({ cartDetails: { ...sampleCartDetails } });
			isRxCheckoutPageType.mockImplementation(() => false);
			wrapper.setProps({ enableNewPaymentFlow: false, checkoutIdDate: '2121, 11, 24', isLoadingPaymentMethods: false, isLoading: true, isAllowSave: true, paymentMethod: "payon_saved_token" });
			wrapper.instance().setState({ methodsAreLoaded: false });
			const { isAllowSave } = wrapper.instance().props;
			const { methodsAreLoaded } = wrapper.instance().state;
			console.log(isAllowSave, prevProps.isAllowSave)
			wrapper.instance().componentDidUpdate(prevProps);
		});
		test('component did update', () => {

			const prevProps = {
				checkboxes: [],
				confirmationPage: 'prevString',
				cartDetails: { ...sampleCartDetailsPP },
				payonEndpoint: 'prevString',
				checkoutIdDate: '2121, 11, 24',
				methods: [],
				paymentMethods: [],
				customer: {},
				isLoading: false,
				isSubmitDisabled: true,
				error: 'prevString',
				dictionary: {},
				paymentTokens: [],
				warnings: [],
				rxmcExists: 2,
				isAllowSave: false,
				isAllowMethodLoading: true,
				isLoadingPaymentMethods: true
			};

			wrapper.setProps({ cartDetails: { ...sampleCartDetails } });
			isRxCheckoutPageType.mockImplementation(() => false);
			wrapper.setProps({ enableNewPaymentFlow: true, checkoutIdDate: '2121, 12, 24', isLoadingPaymentMethods: false, isLoading: true, isAllowSave: true, paymentMethod: "payon_saved_token" });
			wrapper.instance().setState({ methodsAreLoaded: false });
			const { isAllowSave } = wrapper.instance().props;
			const { methodsAreLoaded } = wrapper.instance().state;
			wrapper.instance().componentDidUpdate(prevProps);
		});
	});
	test('setSavedPaymentMethod', () => {
		wrapper.setProps({ cartDetails: { ...sampleCartDetails } });
		wrapper.setProps({
			paymentTokens: [{
				'method': 'payon_credit_card',
				'type': 'MC',
				'token': '1111',
				'expiry': '12/2019',
				'last4Digits': '1111',
				'label': 'Payon CC Payment',
				'is_default': true
			},
			{
				'method': 'payon_saved_token',
				'type': 'MC',
				'token': '',
				'expiry': '12/2019',
				'last4Digits': '1111',
				'label': 'Payon CC Payment',
				'is_default': false
			}],
		})
		wrapper.instance().setState({ paymentMethodToken: "qwqeqe12232" , paymentMethod : "payon_saved_token" })
		wrapper.instance().setSavedPaymentMethod("qwqeqe12232", 'payon_saved_token');
		expect(wrapper.instance().state.paymentMethodToken).toBe('qwqeqe12232');
		const setSavedPaymentMethodOnCartMockCallCount = setSavedPaymentMethodOnCartMock.mock.calls.length;
		expect(setSavedPaymentMethodOnCartMockCallCount).toBeDefined();
	});
	test('validateInsuranceDetails', () => {
		wrapper.setProps({ isMeasurementAvailable: false, cartDetails: { ...sampleCartDetails } });
		const returnValue = wrapper.instance().validateInsuranceDetails();
		expect(returnValue).toBeDefined();
	});
	test('validateInsuranceDetails', () => {
		wrapper.setProps({ isMeasurementAvailable: false, cartDetails: { ...sampleCartDetails }, customer: {} });
		const returnValue = wrapper.instance().validateInsuranceDetails();
		expect(returnValue).toBeDefined();
	});
	test('validateInsuranceDetails', () => {
		wrapper.setProps({ isMeasurementAvailable: true, cartDetails: { ...sampleCartDetails }, customer: {} });
		const returnValue = wrapper.instance().validateInsuranceDetails();
		expect(returnValue).toBeDefined();
	});
	test('savedPaymentMethod ', () => {

		wrapper.setProps({ cartDetails: { items: [{ id: 12, product: { is_subscription: true } }, { id: 13, product: { is_subscription: false } }, { id: 12 }] } });
		const returnValue = wrapper.instance().savedPaymentMethod();
		expect(returnValue).toBeDefined();
	});

	test('constructPayload', () => {
		const constructPayloadReturnValue = wrapper.instance().constructPayload(wrapper.instance().props.customer, { ...sampleCartDetails });
		expect(constructPayloadReturnValue).toBeDefined();
	});
});