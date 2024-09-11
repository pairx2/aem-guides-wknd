import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import Col from '../../../../../../modules/Generic/components/Container/Col';
import Row from '../../../../../../modules/Generic/components/Container/Row';
import I18n from '../../../../../../modules/Translation/components/I18n';

import HelpdeskBanner from '../../../../../../modules/MyAccount/components/OrderHistory/Return/HelpdeskBanner';


Enzyme.configure({
	adapter: new EnzymeAdapter(),
});

describe('HelpdeskBanner component Test Suite', () => {
	let props, wrapper;

	beforeEach(() => {

		props = {
			className: '',
		};

		wrapper = shallow(<HelpdeskBanner {...props} />);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
	test('className check', () => {
		expect(wrapper.props().className).toBeDefined();
	});
	test('div and p check', () => {
		expect(wrapper.props().children[0].props.children.type).toBe('div');
		expect(wrapper.props().children[1].props.children.props.children[0].props.children.type).toBe('p');
		expect(wrapper.props().children[1].props.children.props.children[1].props.children.type).toBe('p');
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
	});
});