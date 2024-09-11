import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import DeliveryStatus from '../../../../../modules/MyAccount/components/PlusService/DeliveryStatus';
jest.mock('../../../../../utils/endpointUrl');
Enzyme.configure({
	adapter: new EnzymeAdapter()
});
const setup = (props) => {
	const wrapper = shallow(<DeliveryStatus {...props} />);
	return wrapper;
};

describe('DeliveryStatus component Test Suite', () => {
	let wrapper, props;
	beforeEach(() => {
		props = {
			deliveryDetails: {},
	        text: 'text',
			orderServiceStatus: 'delivered',
			order: {
				productData : [{
					'productOriginalDateFrom':1587945600000,
					'productDateOfNextShipment': null,
					'productOriginalDateOfNextShipment':1595808000000,
				}]
			}
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

		test('children type check', () =>{
			expect(wrapper.props().children[0].type).toBe('h6');
			expect(wrapper.props().children[1].type).toBe('div');
			expect(wrapper.props().children[1].props.children[0].type).toBe('p');
			expect(wrapper.props().children[1].props.children[1].type).toBe('div');
			expect(wrapper.props().children[1].props.children[1].props.children.type).toBe('p');
		});
	});
});

describe('DeliveryStatus component Test Suite', () => {
	let wrapper, props;
	beforeEach(() => {
		props = {
			deliveryDetails: {},
	        text: 'text',
			orderServiceStatus: 'delivered',
			order: {
				productData : [{
					'productOriginalDateFrom':1587945600000,
					'productDateOfNextShipment':1595808000000
				}]
			}
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

		test('children type check', () =>{
			expect(wrapper.props().children[0].type).toBe('h6');
			expect(wrapper.props().children[1].type).toBe('div');
			expect(wrapper.props().children[1].props.children[0].type).toBe('p');
			expect(wrapper.props().children[1].props.children[1].type).toBe('div');
			expect(wrapper.props().children[1].props.children[1].props.children.type).toBe('p');
		});
	});
});