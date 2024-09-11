import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import MiniCartPricingOverview from '../../../../../modules/Cart/components/MiniCart/MiniCartPricingOverview';

Enzyme.configure({
	adapter: new EnzymeAdapter()
});

describe('MiniCartPricingOverview Component Test Suite', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
			currency: 'currencyString',
			cartPrice: 25,
			taxValue:'16'
		};
		wrapper = shallow(<MiniCartPricingOverview {...props} />);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('div tag renders another div',() => {
		expect(wrapper.type()).toBe('div');
		expect(wrapper.props().children.type).toBe('div');
	});
	test('div tag renders 2 child divs',() => {
		expect(wrapper.props().children.props.children.length).toBe(2);
		expect(wrapper.props().children.props.children[0].type).toBe('div');
		expect(wrapper.props().children.props.children[1].type).toBe('div');

	});
	test('1st div tag renders h5 , p',() => {
		expect(wrapper.props().children.props.children[0].props.children[0].type).toBe('h5');
		expect(wrapper.props().children.props.children[0].props.children[1].type).toBe('p');

	});
	test('2nd div tag renders h4',() => {
		expect(wrapper.props().children.props.children[1].props.children.type).toBe('h4');

	});
});
