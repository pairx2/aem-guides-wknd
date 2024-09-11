import React from 'react';
import ShippingOption from '../../../../../modules/Product/components/ProductDetails/ShippingOption';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

Enzyme.configure({
	adapter: new EnzymeAdapter(),
	// disableLifecycleMethods: true
});

describe('ShippingOption Component Test Suite', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
			carrier_title: 'carrier_title',
			carrier_code: 'carrier_code',
			value: 101,
			shippingImg: 'shippingImg',
			currency: 'currency',
		};
		wrapper = shallow(<ShippingOption {...props} />);

	});

	test('render check', () => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
	test('Row with 3 children div',() => {
		expect(wrapper.type().name).toBe('Row');
		expect(wrapper.props().children.length).toBe(3);
		expect(wrapper.props().children[0].type).toBe('div');
		expect(wrapper.props().children[1].type).toBe('div');
		expect(wrapper.props().children[2].type).toBe('div');
	});
	test('1st div to render Icon',() => {
		expect(wrapper.props().children[0].props.children.type.name).toBe('Icon');

	});
	test('2nd div to render 2 p tags with ',() => {
		expect(wrapper.props().children[1].props.children[0].type).toBe('p');
		expect(wrapper.props().children[1].props.children[0].props.children).toBe('carrier_title');
		expect(wrapper.props().children[1].props.children[1].type).toBe('p');
		expect(wrapper.props().children[1].props.children[1].props.children.type.name).toBe('I18n');

	});
});




