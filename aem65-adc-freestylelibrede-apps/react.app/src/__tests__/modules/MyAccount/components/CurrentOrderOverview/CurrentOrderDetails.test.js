import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

import CurrentOrderDetails from '../../../../../modules/MyAccount/components/CurrentOrderOverview/CurrentOrderDetails';
jest.mock('../../../../../utils/endpointUrl');
Enzyme.configure({
	adapter: new EnzymeAdapter(),
});

const productData = [{
	'index':1,
	'productSKU':'S5269856',
	'productName':'FreeStyle Libre Sensor v1 Sensor',
	'productQuantity':3,
	'productRescheduledDueDate':null,
	'productOriginalDateFrom':1587945600000,
	'productDateOfNextShipment':1595808000000,
	'productOriginalDateOfNextShipment':1595808000000,
	'productDueDateWindow':'14,14',
	'deliverableNumber':'DLV-000010292'
},
{
	'index':2,
	'productSKU':'S5269857',
	'productName':'FreeStyle Libre Sensor v2 Sensor',
	'productQuantity':2,
	'productRescheduledDueDate':null,
	'productOriginalDateFrom':1587945600000,
	'productDateOfNextShipment':1595808000000,
	'productOriginalDateOfNextShipment':1595808000000,
	'productDueDateWindow':'14,14',
	'deliverableNumber':'DLV-000010292'
}];

const products = {
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
	'image_url': 'https://abbott-magento2.test/static/version1563452614/graphql/_view/en_US/Magento_Catalog/images/product/placeholder/image.jpg',
	'url': 'https://abbott-magento2.test/simple-product.html',
	'min_sale_qty': '2',
	'max_sale_qty': '10',
	'price': '20.0000',
	'max_order_quantity': '3',
	'weight': '2.0000',
	'ean_code': '99999999992',
	'shelf_life': '20'
};

const serviceData= [{
	'serviceSKU':'1-71538-01',
	'serviceName':'FreeStyle Libre Sensor Subscription',
	'serviceFromDate':1587945600000,
	'serviceToDate':null,
	'serviceFrequency':'3',
	'serviceDuration':null,
	'serviceProductQuantity':1,
	'serviceStatus':'Active'
}];

describe('CurrentOrderDetails component Test Suite with valid object data & flags as true', () => {
	let props, wrapper;

	beforeEach(() => {

		props = {
			order: {
				'index':1,
			  'orderId':'DEBAAAAAIS',
			  'orderDate':1587945600000,
			  'orderTitle':'CashPay',
			  'orderType':'CashPay',
			  'rxmc':null,
			  'isReimbursedOrder':true,
			  'productData': productData,
			  'serviceData': serviceData,
				'currentProducts': [{
					'productSKU':'S5269856',
					'productName':'FreeStyle Libre Sensor v1',
					'productQuantity':1
				}]
			},
			products: products,
			dictionary: {
				'test_key': 'test_label',
				'test_key_html': '<div>test'
			},
			isCancelFlow: true,
			isCancelled: true,
			isPlusService: true,
			isAccountOverviewTab: true,
			tabName: '#kostenbernahme'
		};
		wrapper = shallow(<CurrentOrderDetails {...props}/>);
	});

	describe('props check', () => {

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});

		test('render check',() => {
			expect(wrapper.type()).not.toEqual(null);
		});

	});
});

describe('CurrentOrderDetails component Test Suite with empty object data & flags as false', () => {
	let props, wrapper;

	beforeEach(() => {

		props = {
			order: {
				'index':1,
			  'orderId':'DEBAAAAAIS',
			  'orderDate':1587945600000,
			  'orderTitle':'Reimbursement',
			  'orderType':'Reimbursement',
			  'orderSubtype': 'orderSubtype',
			  'rxmc':null,
			  'isReimbursedOrder':false,
			  'productData': productData,
				'serviceData': serviceData,
			},
			products: {},
			dictionary: {},
			isCancelFlow: false,
			isCancelled: false,
			isPlusService: false,
			isAccountOverviewTab: false,
			tabName: '#kostenbernahme'
		};
		wrapper = shallow(<CurrentOrderDetails {...props}/>);
	});

	describe('props check', () => {

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});

		test('render check',() => {
			expect(wrapper.type()).not.toEqual(null);
		});

	});
});

describe('CurrentOrderDetails component Test Suite with empty object data & flags as false', () => {
	let props, wrapper;

	beforeEach(() => {

		props = {
			order: {
				'index':1,
			  'orderId':'DEBAAAAAIS',
			  'orderDate':1587945600000,
			  'orderTitle':'Cash Pay',
			  'orderType':'Cash Pay',
			  'orderSubtype': 'orderSubtype',
			  'rxmc':null,
			  'isReimbursedOrder':false,
			  'productData': productData,
				'serviceData': serviceData,
			},
			products: {},
			dictionary: {},
			isCancelFlow: false,
			isCancelled: false,
			isPlusService: false,
			isAccountOverviewTab: false,
			tabName: '#kostenbernahme'
		};
		wrapper = shallow(<CurrentOrderDetails {...props}/>);
	});

	describe('props check', () => {

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});

	});
});

describe('CurrentOrderDetails component Test Suite without currentOrders object data & flags as true', () => {
	let props, wrapper;

	beforeEach(() => {

		props = {
			order: {
				'index':1,
			  'orderId':'DEBAAAAAIS',
			  'orderDate':1587945600000,
			  'orderTitle':'Cash Pay Subscription',
			  'orderType':'Cash Pay Subscription',
			  'orderSubtype': 'orderSubtype',
			  'rxmc':null,
			  'isReimbursedOrder':true,
			  'productData': productData,
			},
			products: products,
			dictionary: {
				'test_key': 'test_label',
				'test_key_html': '<div>test'
			},
			isCancelFlow: false,
			isCancelled: true,
			isPlusService: true,
			isAccountOverviewTab: true,
			tabName: '#kostenbernahme'
		};
		wrapper = shallow(<CurrentOrderDetails {...props}/>);
	});

	describe('props check', () => {

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});

		test('render check',() => {
			expect(wrapper.type()).not.toEqual(null);
		});

	});
});

describe('CurrentOrderDetails component Test Suite without currentOrders & productData object data', () => {
	let props, wrapper;
	
	const getProductImageMock = jest.fn();
	const getProductSKUsMock = jest.fn();

	beforeEach(() => {

		props = {
			order: {
				'index':1,
			  'orderId':'DEBAAAAAIS',
			  'orderDate':1587945600000,
			  'orderTitle':'WebRx',
			  'orderType':'WebRx',
			  'orderSubtype': 'orderSubtype',
			  'rxmc':null,
			  'isReimbursedOrder':true,
			  'serviceData': serviceData,
			  'productData': productData
			},
			products: products,
			dictionary: {
				'test_key': 'test_label',
				'test_key_html': '<div>test'
			},
			isCancelFlow: false,
			isCancelled: true,
			isPlusService: true,
			isAccountOverviewTab: true,
			tabName: '#kostenbernahme',
			getProductImage: getProductImageMock,
			getProductSKUsMock: getProductSKUsMock
		};
		wrapper = shallow(<CurrentOrderDetails {...props}/>);
	});

	describe('props check', () => {

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});

		test('render check',() => {
			expect(wrapper.type()).not.toEqual(null);
		});

	});
});

describe('CurrentOrderDetails component Test Suite with empty object data & flags as false', () => {
	let props, wrapper;

	beforeEach(() => {

		props = {
			order: {
				'index':1,
			  'orderId':'DEBAAAAAIS',
			  'orderDate':1587945600000,
			  'orderTitle':'Reimbursement',
			  'orderType':'Reimbursement',
			  'rxmc':null,
			  'isReimbursedOrder':false,
			  'productData': productData,
				'serviceData': serviceData,
			},
			products: {},
			dictionary: {},
			isCancelFlow: true,
			isCancelled: false,
			isPlusService: false,
			isAccountOverviewTab: false,
			tabName: '#kostenbernahme'
		};
		wrapper = shallow(<CurrentOrderDetails {...props}/>);
	});

	describe('props check', () => {

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});

		test('render check',() => {
			expect(wrapper.type()).not.toEqual(null);
		});

	});
});
