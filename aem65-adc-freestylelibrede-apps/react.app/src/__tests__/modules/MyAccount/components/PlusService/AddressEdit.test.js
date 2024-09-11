import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import {mockStore} from '../../../../../__mocks__/storeMock';
import AddressEdit from '../../../../../modules/MyAccount/components/PlusService/AddressEdit';


Enzyme.configure({
	adapter: new EnzymeAdapter(),
	// disableLifecycleMethods: true
});

describe('AddressEdit Component Test Suite with showBorder as false', () => {
	let props, wrapper;
	beforeEach(() => {
		props = {
			postcode: '55132',
			showBorder: false
		};
		wrapper = shallow(<AddressEdit store={mockStore} {...props} />).dive().dive();
	});

	test('render null check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('render check',() => {
		expect(wrapper).toBeDefined();
	});
	test('div tag check',() => {
		expect(wrapper.props().children[0].type).toBe('div');
		expect(wrapper.props().children[1].type).toBe('div');
		expect(wrapper.props().children[2].type).toBe('div');
		expect(wrapper.props().children[3].type).toBe('div');
		expect(wrapper.props().children[4].type).toBe('div');
		expect(wrapper.props().children[5].type).toBe('div');
		expect(wrapper.props().children[5].props.children.type).toBe('div');
		expect(wrapper.props().children[5].props.children.props.children[0].type).toBe('div');
		expect(wrapper.props().children[5].props.children.props.children[1].type).toBe('div');
	});
});

describe('AddressEdit Component Test Suite with showBorder as true', () => {
	let props, wrapper;

	beforeEach(() => {
		props = {
			postcode: '55132',
			showBorder: true
		};
		wrapper = shallow(<AddressEdit store={mockStore} {...props} />).dive().dive();
	});

	test('render check',() => {
		expect(wrapper).toBeDefined();
	});

});