import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import NoInsuranceDetails from '../../../../../modules/MyAccount/components/InsuranceDisplayEdit/NoInsuranceDetails';
import Link from '../../../../../modules/Generic/components/Link/Link';

Enzyme.configure({
	adapter: new EnzymeAdapter(),
	// disableLifecycleMethods: true
});

describe('NoInsuranceDetails Component Test Suite', () => {
	let props, wrapper;
	beforeEach(() => {
		props = {
			noInsuranceDescription: 'noInsuranceDescription',
			noInsuranceHeading: 'noInsuranceHeading',
			noInsuranceIcon: 'noInsuranceIcon',
			secureDataMessage: 'secureDataMessage',
			editInsuranceInfo: jest.fn()
		};
		wrapper = shallow(<NoInsuranceDetails {...props} />);
	});

	test('render null check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('render check',() => {
		expect(wrapper).toBeDefined();
	});
	test('div tag render and prop check', () => {
		expect(wrapper.props().children[0].type).toBe('div');
		expect(wrapper.props().children[0].props.children.props.image).toBe('noInsuranceIcon');
	});
	test('div tag render and prop check', () => {
		expect(wrapper.props().children[1].type).toBe('div');
		expect(wrapper.props().children[1].props.children).toBe('noInsuranceHeading');
	});
	test('div tag render and prop check', () => {
		expect(wrapper.props().children[2].props.children).toBe('noInsuranceDescription');
		expect(wrapper.props().children[2].type).toBe('p');
	});
	test('div tag render and prop check', () => {
		expect(wrapper.props().children[3].type).toBe('div');
		expect(wrapper.props().children[3].props.children[1].props.children.type).toBe('p');
		expect(wrapper.props().children[3].props.children[1].props.children.props.children).toBe('secureDataMessage');
	});

	test('div tag render check', () => {
		expect(wrapper.props().children[4].type).toBe('div');
	});

	test('Link gets rendered', () => {
		expect(wrapper.containsMatchingElement(<Link />)).toBeDefined();
	});
});