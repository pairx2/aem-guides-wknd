import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import I18n from '../../../../../../modules/Translation/components/I18n';

import ReturnReason from '../../../../../../modules/MyAccount/components/OrderHistory/Return/ReturnReason';


Enzyme.configure({
	adapter: new EnzymeAdapter()
});

describe('ReturnReason component Test Suite', () => {
	let props, wrapper;
	const setReturnReasonMock = jest.fn();

	beforeEach(() => {

		props = {
			returnReason: 'returnReason',
	        text: 'text',
	        isActive: false,
	        setReturnReason: setReturnReasonMock
		};

		wrapper = shallow(<ReturnReason {...props} />);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
	test('label and text check', () => {
		expect(wrapper.props().children[0].type).toBe('label');
		expect(wrapper.props().children[0].props.children.props.text).toBe('text');
	});

	test('div onClick',() => {
		const divTag = wrapper.find('div');
		divTag.simulate('click');
		const setReturnReasonMockCount = setReturnReasonMock.mock.calls.length;
		expect(setReturnReasonMockCount).toBeDefined();
	});

	describe('component render check', () => {
		test('I18n gets rendered', () => {
			expect(wrapper.containsMatchingElement(<I18n />)).toBeDefined();
		});
	});
});