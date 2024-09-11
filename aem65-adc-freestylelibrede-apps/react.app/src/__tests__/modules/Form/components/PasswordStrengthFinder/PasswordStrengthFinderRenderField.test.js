import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import PasswordStrengthFinderRenderField from '../../../../../modules/Form/components/PasswordStrengthFinder/PasswordStrengthFinderRenderField';

Enzyme.configure({
	adapter: new EnzymeAdapter(),
	// disableLifecycleMethods: true
});

describe('PasswordStrengthFinderRenderField Component Test Suite', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
			placeholder: 'placeholder',
			meta: {
				touched: true,
				error: 'error',
				active:true
			}
		};
		wrapper = shallow(<PasswordStrengthFinderRenderField {...props} />);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('children type check', () => {
		expect(wrapper.props().children[0].type).toBe('input');
		expect(wrapper.props().children[2].type).toBe('span');
	});

	describe('state check', () => {

		test('state value check', () => {
			const stateMock = wrapper.instance().state;
			expect(stateMock).toBeInstanceOf(Object);
			expect(stateMock.passwordVisible).toBeFalsy();
		});
	});

	describe('functions check', () => {

		test('toggleShow function call check', () => {
			wrapper.instance().toggleShow();
			expect(wrapper.instance().state.passwordVisible).toBeTruthy();
		});
	});
});
describe('PasswordStrengthFinderRenderField Component Test Suite', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
			placeholder: 'placeholder',
			meta: {
				touched: false,
				error: 'error',
				active:false
			}
		};
		wrapper = shallow(<PasswordStrengthFinderRenderField {...props} />);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('children type check', () => {
		expect(wrapper.props().children[0].type).toBe('input');
		expect(wrapper.props().children[2].type).toBe('span');
	});

	describe('state check', () => {

		test('state value check', () => {
			const stateMock = wrapper.instance().state;
			expect(stateMock).toBeInstanceOf(Object);
			expect(stateMock.passwordVisible).toBeFalsy();
		});
	});

	describe('functions check', () => {

		test('toggleShow function call check', () => {
			wrapper.instance().toggleShow();
			expect(wrapper.instance().state.passwordVisible).toBeTruthy();
		});
	});
});