import React from 'react';
import ShippingOption from '../../../../../modules/Cart/components/ShippingOptions/ShippingOption';
import Enzyme, {shallow, mount} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

import {mockStore} from '../../../../../__mocks__/storeMock';

import {Provider} from 'react-redux';

Enzyme.configure({
	adapter: new EnzymeAdapter(),
});

describe('ShippingOption Component Test Suite', () => {
	let props;
	let wrapper;
	const updateShippingOptionMock = jest.fn();

	beforeEach(() => {
		props = {
			carrier_title: 'carrier_title',
			carrier_code: 'carrier_code',
			method_code: 'method_code',
			value: 101,
			shippingImg: 'shippingImg',
			currency: 'currency',
			isActive: true,
			updateShippingOption: updateShippingOptionMock,
			isLoading: true
		};
		wrapper = shallow(<ShippingOption {...props} />);

	});

	test('render check', () => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('LoadingIndicator component has size as prop and is of type string', () => {
		const LoadingIndicatorProp = wrapper.props().children[0].type.name;
		expect(LoadingIndicatorProp).toEqual('LoadingIndicator');
		expect(typeof LoadingIndicatorProp).toBe('string');

		const sizeProp = wrapper.props().children[0].props.size;
		expect(sizeProp).toEqual('small');
		expect(typeof sizeProp).toBe('string');
	});

	test('label component has carrier_title as prop and is of type string', () => {
		const labelProp = wrapper.props().children[1].type;
		expect(labelProp).toEqual('label');
		expect(typeof labelProp).toBe('string');

		const carrier_titleProp = wrapper.props().children[1].props.children[0];
		expect(typeof carrier_titleProp).toBe('string');
	});

	test('Icon component has image as prop and is of type string', () => {
		const IconProp = wrapper.props().children[1].props.children[3].props.children.type.name;
		expect(IconProp).toEqual('Icon');
		expect(typeof IconProp).toBe('string');

		const imageProp = wrapper.props().children[1].props.children[3].props.children.props.image;
		expect(typeof imageProp).toBe('string');
	});

	test('updateShippingOption function call in onClick', () => {
		const clickProp = wrapper.props().onClick;
		expect(typeof clickProp).toBe('function');

		clickProp();
		const updateShippingOptionMockCallCount = updateShippingOptionMock.mock.calls.length;
		expect(updateShippingOptionMockCallCount).toBeDefined();
		expect(updateShippingOptionMockCallCount).not.toBe(0);
	});

});

describe('ShippingOption Component Test Suite', () => {
	let props;
	let wrapper;

	beforeEach(() => {

		props = {
			carrier_title: 'carrier_title',
			carrier_code: 'carrier_code',
			method_code: 'method_code',
			value: 101,
			shippingImg: 'shippingImg',
			currency: null,
			isActive: true,
			updateShippingOption: () => {},
			isLoading: true
		};
		wrapper = mount(<Provider store= {mockStore}><ShippingOption {...props} /></Provider>);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('updateShippingOption is a prop and is of type function', () => {
		const updateShippingOptionProp = wrapper.props().children.props.updateShippingOption;
		expect(typeof updateShippingOptionProp).toBe('function');
		wrapper.props().children.props.updateShippingOption({
			carrierCode: wrapper.props().children.props.carrier_code,
			methodCode: wrapper.props().children.props.method_code
		});
	});

});


