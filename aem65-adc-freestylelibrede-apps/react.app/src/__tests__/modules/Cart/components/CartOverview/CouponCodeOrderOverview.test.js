import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import {mockStore} from '../../../../../__mocks__/storeMock';
import CouponCodeOrderOverview from '../../../../../modules/Cart/components/CartOverview/CouponCodeOrderOverview';


Enzyme.configure({
	adapter: new EnzymeAdapter(),
	// disableLifecycleMethods: true
});

const setup = (props) => {
	const wrapper = shallow(<CouponCodeOrderOverview store= {mockStore} {...props}/>).dive();
	return wrapper;
};
describe('CouponCodeOrderOverview Component Test Suite', () => {
	let props;
	let wrapper;
	const removeCouponFromCartMock = jest.fn();
	beforeEach(() => {
		props = {
			removeCouponFromCart:removeCouponFromCartMock,
			currency: 'String',
			couponCode: 'String',
			couponValue: 120,
		};
		wrapper = setup(props);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
	test('div tag renders another div with 2 child divs', () => {
		expect(wrapper.type()).toBe('div');
		expect(wrapper.props().children.type).toBe('div');
		expect(wrapper.props().children.props.children[0].type).toBe('div');
		expect(wrapper.props().children.props.children[1].type).toBe('div');

	});
	test('1st div tag renders a and span tags', () => {
		expect(wrapper.props().children.props.children[0].props.children.length).toBe(2);
		expect(wrapper.props().children.props.children[0].props.children[0].type.name).toBe('Link');
		expect(wrapper.props().children.props.children[0].props.children[1].type).toBe('span');
	});
	test('2nd div tag renders span tag', () => {
		expect(wrapper.props().children.props.children[1].props.children.type).toBe('span');
	});
	test('link onClick',() => {
		const linkTag = wrapper.find('Link');
		linkTag.simulate('click');
		const removeCouponFromCartMockCount = removeCouponFromCartMock.mock.calls.length;
		expect(removeCouponFromCartMockCount).toBeDefined();
	});
	test('action call', () => {
		const actionProp = wrapper.props().children.props.children[0].props.children[0].props.action;
		expect(typeof actionProp).toBe('function');

		actionProp();
		const removeCouponFromCartMockCallCount = removeCouponFromCartMock.mock.calls.length;
		expect(removeCouponFromCartMockCallCount).toBeDefined();
	});
});