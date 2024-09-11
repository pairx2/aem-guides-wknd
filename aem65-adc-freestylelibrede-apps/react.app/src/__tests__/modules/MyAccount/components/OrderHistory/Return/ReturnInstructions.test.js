import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import Col from '../../../../../../modules/Generic/components/Container/Col';
import Row from '../../../../../../modules/Generic/components/Container/Row';
import I18n from '../../../../../../modules/Translation/components/I18n';
import Button from '../../../../../../modules/Generic/components/Button/Button';
import HelpdeskBanner from '../../../../../../modules/MyAccount/components/OrderHistory/Return/HelpdeskBanner';
import LoadingIndicator from '../../../../../../modules/Generic/components/Loading/LoadingIndicator';
import MessageBanner from '../../../../../../modules/Generic/components/MessageBanner/MessageBanner';

import ReturnInstructions from '../../../../../../modules/MyAccount/components/OrderHistory/Return/ReturnInstructions';


Enzyme.configure({
	adapter: new EnzymeAdapter()
});

describe('ReturnInstructions component Test Suite', () => {
	let props, wrapper;

	beforeEach(() => {

		props = {
			close: jest.fn(),
			isLoading: false,
			returnId: 'returnId',
			error: 'error',
			getReturnReceipt: jest.fn()
		};

		wrapper = shallow(<ReturnInstructions {...props} />);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
	test('0th children h4 and p check', () => {
		expect(wrapper.props().children[0].props.children[0].type).toBe('h4');
		expect(wrapper.props().children[0].props.children[1].type).toBe('p');
		expect(wrapper.props().children[0].props.children[2].type).toBe('h4');
		expect(wrapper.props().children[0].props.children[3].type).toBe('p');
		expect(wrapper.props().children[0].props.children[4].type).toBe('h4');
		expect(wrapper.props().children[0].props.children[5].type).toBe('p');
	});

	test('1st children div check', () => {
		expect(wrapper.props().children[1].props.children.props.children[0]).toBeDefined();
	});

	test('2nd children div and p tag check', () => {
		expect(wrapper.props().children[1].props.children.props.children[1]).toBeDefined();
		expect(wrapper.props().children[1].props.children.props.children[1].props.children[0]).toBeDefined();
	});

	describe('component render check', () => {

		test('Col component gets rendered', () => {
			expect(wrapper.containsMatchingElement(<Col />)).toBeDefined();
		});
		test('Row gets rendered', () => {
			expect(wrapper.containsMatchingElement(<Row />)).toBeDefined();
		});
		test('I18n gets rendered', () => {
			expect(wrapper.containsMatchingElement(<I18n />)).toBeDefined();
		});
		test('Button gets rendered', () => {
			expect(wrapper.containsMatchingElement(<Button />)).toBeDefined();
		});
		test('HelpdeskBanner gets rendered', () => {
			expect(wrapper.containsMatchingElement(<HelpdeskBanner />)).toBeDefined();
		});
		test('LoadingIndicator gets rendered', () => {
			expect(wrapper.containsMatchingElement(<LoadingIndicator />)).toBeDefined();
		});
		test('MessageBanner gets rendered', () => {
			expect(wrapper.containsMatchingElement(<MessageBanner />)).toBeDefined();
		});
	});
});