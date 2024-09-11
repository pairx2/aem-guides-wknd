import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import {mockStore, mockStoreOrder} from '../../../../../__mocks__/storeMock';
jest.mock('../../../../../utils/endpointUrl.js');
jest.mock('../../../../../utils/pageTypeUtils.js');

import AddressCheckout from '../../../../../modules/Address/components/AddressCheckout/AddressCheckout';
import {i18nLabels} from '../../../../../utils/translationUtils';

Enzyme.configure({
	adapter: new EnzymeAdapter(),
});

const setup = (props) => {
	const wrapper = shallow(<AddressCheckout store={mockStore} {...props} />).dive().dive();
	return wrapper;
};

const setupTwo = (props) => {
	const wrapper = shallow(<AddressCheckout store={mockStoreOrder} {...props} />).dive().dive();
	return wrapper;
};

describe('AddressCheckout component Test Suite ', () => {
	let props, wrapper;
	const getCustomerRequestMock = jest.fn();
	const setBillingAddressOnCartMock = jest.fn();
	const setShippingAddressOnCartMock = jest.fn();

	beforeEach(() => {
		props = {
			getCustomerRequest:getCustomerRequestMock ,
			setShippingAddressOnCart: setShippingAddressOnCartMock ,
			setBillingAddressOnCart: setBillingAddressOnCartMock ,
			informationalMessage: 'informationalMessageString',

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
		test('customer object',() => {
			expect(typeof wrapper.instance().props.customer).toBe('object');
		});
		test('cartDetails object',() => {
			expect(typeof wrapper.instance().props.cartDetails).toBe('object');
		});
	});
	describe('lifecycle method calls', () => {
		test('propsDidChange',() => {
			const prevProps = {
				getCustomerRequest:getCustomerRequestMock ,
				setShippingAddressOnCart: setShippingAddressOnCartMock ,
				setBillingAddressOnCart: setBillingAddressOnCartMock ,
				informationalMessage: 'string',
				cartDetails: {},
				customer: {},

			};
			const didChange = wrapper.instance().propsDidChange(prevProps);
			expect(didChange).toBe(true);
		});
		test('componentdidUpdate cartDetails.id !== prevProps.cartDetails.id is true and billing address id not equal',() => {
			const prevProps = {
				getCustomerRequest:getCustomerRequestMock ,
				setShippingAddressOnCart: setShippingAddressOnCartMock ,
				setBillingAddressOnCart: setBillingAddressOnCartMock ,
				informationalMessage: 'string',
				cartDetails: {
					'billing_address': {
						'id': 13,
						'address_id':13,
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
				},
				customer: {},

			};
			wrapper.instance().componentDidUpdate(prevProps);
			expect(wrapper.instance().state.addresses).toBe(wrapper.instance().props.customer.addresses);
			expect(wrapper.instance().state.newBillingAddress).toBe(null);

		});
		test('componentdidUpdate cartDetails.id !== prevProps.cartDetails.id is true and billing address id equal',() => {
			const prevProps = {
				getCustomerRequest:getCustomerRequestMock ,
				setShippingAddressOnCart: setShippingAddressOnCartMock ,
				setBillingAddressOnCart: setBillingAddressOnCartMock ,
				informationalMessage: 'string',
				cartDetails: {},
				customer: {},

			};
			wrapper.instance().componentDidUpdate(prevProps);
			expect(wrapper.instance().state.addresses).toBe(wrapper.instance().props.customer.addresses);

		});
		test('componentdidUpdate cartDetails.id !== prevProps.cartDetails.id is false',() => {
			//same cartdetails obj in prevprops
			const prevProps = {
				getCustomerRequest:getCustomerRequestMock ,
				setShippingAddressOnCart: setShippingAddressOnCartMock ,
				setBillingAddressOnCart: setBillingAddressOnCartMock ,
				informationalMessage: 'string',
				cartDetails: {
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
							'max_sale_qty': '10',
							'price': '20.0000',
							'max_order_quantity': '3',
							'weight': '2.0000',
							'ean_code': '99999999992',
							'shelf_life': '20'
						},
						'qty': 3,
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
						'code': 'checkmo',
						'title': 'Check / Money order'
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
				},
				customer: {},

			};
			wrapper.instance().componentDidUpdate(prevProps);
			expect(wrapper.instance().state.addresses).toBe(wrapper.instance().props.customer.addresses);
		});
	});
	describe('method calls',() => {
		test('setBillingModes',() => {
			const BillingState = wrapper.instance().state.billing;
			wrapper.instance().setBillingModes(true,true);
			expect(BillingState).not.toBe(wrapper.instance().state.billing);
		});
		test('setShippingModes',() => {
			const shippingState = wrapper.instance().state.shipping;
			wrapper.instance().setShippingModes(true,true);
			expect(shippingState).not.toBe(wrapper.instance().state.shipping);
		});
		test('createNewBillingAddress',() => {
			const BillingAddress = wrapper.instance().state.newBillingAddress;
			wrapper.instance().createNewBillingAddress();
			expect(wrapper.instance().state.newBillingAddress).not.toBe(BillingAddress);
		});
		test('createNewShippingAddress',() => {
			const ShippingAddress = wrapper.instance().state.newShippingAddress;
			wrapper.instance().createNewShippingAddress();
			expect(wrapper.instance().state.newShippingAddress).not.toBe(ShippingAddress);
		});
		test('clearNewBillingAddress',() => {
			wrapper.instance().clearNewBillingAddress();
			expect(wrapper.instance().state.newBillingAddress).toBe(null);
		});
		test('clearNewShippingAddress',() => {
			wrapper.instance().clearNewShippingAddress();
			expect(wrapper.instance().state.newShippingAddress).toBe(null);
		});
	});
	describe('render jsx', () => {
		test('Card render',() => {
			expect(wrapper.props().children[0].type.displayName).toBe('withBreakpoints(CardRender)');
		});
		test('Card Content render',() => {
			expect(wrapper.props().children[0].props.children.type.name).toBe('CardContent');
			expect(wrapper.props().children[0].props.title).toBe(i18nLabels.DELIVERY_AND_BILLING_ADDRESS_HEADING);
		});
		test('AddressCheckoutCard render',() => {
			const AddressCheckoutElement = wrapper.props().children[0].props.children.props.children;
			expect(AddressCheckoutElement.type.displayName).toBe('Connect(AddressCheckoutCard)');
			expect(AddressCheckoutElement.props.informationalMessage).toBe(wrapper.instance().props.informationalMessage);
			expect(AddressCheckoutElement.props.isEditing).toBe(wrapper.instance().state.shipping.editing);
			expect(AddressCheckoutElement.props.isSelecting).toBe(wrapper.instance().state.shipping.selecting);
			expect(AddressCheckoutElement.props.selectableAddresses).toBe(wrapper.instance().props.customer.addresses);
			expect(AddressCheckoutElement.props.createNewBillingAddress).toBe(wrapper.instance().createNewBillingAddress);
			expect(AddressCheckoutElement.props.createNewShippingAddress).toBe(wrapper.instance().createNewShippingAddress);
			expect(AddressCheckoutElement.props.clearNewShippingAddress).toBe(wrapper.instance().clearNewShippingAddress);
			expect(AddressCheckoutElement.props.clearNewBillingAddress).toBe(wrapper.instance().clearNewBillingAddress);
			expect(AddressCheckoutElement.props.address).toBe(wrapper.instance().props.cartDetails.shipping_address);
			const isShippingEqualToBilling = wrapper.instance().shippingAddressEqualsBillingAddress();
			expect(AddressCheckoutElement.props.isShippingEqualToBilling).toBe(isShippingEqualToBilling);
		});

	});

});

describe('AddressCheckout component Test Suite ', () => {
	let props, wrapper;
	const getCustomerRequestMock = jest.fn();
	const setBillingAddressOnCartMock = jest.fn();
	const setShippingAddressOnCartMock = jest.fn();

	beforeEach(() => {
		props = {
			getCustomerRequest:getCustomerRequestMock ,
			setShippingAddressOnCart: setShippingAddressOnCartMock ,
			setBillingAddressOnCart: setBillingAddressOnCartMock ,
			informationalMessage: 'informationalMessageString',

		};
		wrapper = setupTwo(props);
	});


	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('Card Content render',() => {
		expect(wrapper.props().children[0].props.children.type.name).toBe('CardContent');
		expect(wrapper.props().children[0].props.title).toBe(i18nLabels.DELIVERY_ADDRESS_HEADING);
	});
	test('AddressCheckoutCard render',() => {
		const AddressCheckoutElement = wrapper.props().children[0].props.children.props.children;

		const isShippingEqualToBilling = wrapper.instance().shippingAddressEqualsBillingAddress();
		expect(AddressCheckoutElement.props.isShippingEqualToBilling).toBe(isShippingEqualToBilling);
	});
});