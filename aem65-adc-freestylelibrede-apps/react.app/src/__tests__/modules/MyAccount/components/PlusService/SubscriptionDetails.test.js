import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import SubscriptionDetails from '../../../../../modules/MyAccount/components/PlusService/SubscriptionDetails';

Enzyme.configure({
	adapter: new EnzymeAdapter()
});
const setup = (props) => {
	const wrapper = shallow(<SubscriptionDetails {...props}/>);
	return wrapper;
};

const productData= [{
	'index':1,
	'productSKU':'S5269856',
	'productName':'FreeStyle Libre Sensor v1',
	'productQuantity':1,
	'productRescheduledDueDate':null,
	'productOriginalDateFrom':1587945600000,
	'productDateOfNextShipment':1595808000000,
	'productOriginalDateOfNextShipment':1595808000000,
	'productDueDateWindow':'14,14',
	'deliverableNumber':'DLV-000010293'
}];


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


describe('SubscriptionDetails component Test Suite', () => {
	let wrapper, props;
	beforeEach(() => {
		props = {
			order: {
				orderId: 'prt455',
				orderTitle: 'orderTitle',
				orderType: 'Cash Pay',
				orderSubtype: 'orderSubtype',
				productData: productData,
				serviceData: serviceData,
				orderDate: 19920112,
			},
			products: {}
		},
		wrapper = setup(props);
	});

	describe('props check', () => {

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});

		test('render check',() => {
			expect(wrapper.type()).not.toEqual(null);
		});

		test('render check',() => {
			expect(wrapper.props().children.type).toBe('div');
			expect(wrapper.props().children.props.children[0].type).toBe('div');
			expect(wrapper.props().children.props.children[0].props.children.type).toBe('div');
			expect(wrapper.props().children.props.children[2].type).toBe('p');
			expect(wrapper.props().children.props.children[1].type).toBe('div');
			expect(wrapper.props().children.props.children[1].props.children.type).toBe('div');
			expect(wrapper.props().children.props.children[1].props.children.props.children.type).toBe('h5');
		});
	});
});

describe('SubscriptionDetails component Test Suite', () => {
	let wrapper, props;
	beforeEach(() => {
		props = {
			order: {
				orderId: 'prt455',
				orderTitle: 'orderTitle',
				orderType: 'Reimbursement',
				orderSubtype: null,
				productData: productData,
				serviceData: serviceData,
				orderDate: 19920112,
			},
			products: {}
		},
		wrapper = setup(props);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
});