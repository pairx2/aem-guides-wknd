import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import PasswordStrengthFinderToolTip from '../../../../../modules/Form/components/PasswordStrengthFinder/PasswordStrengthFinderToolTip';

Enzyme.configure({
	adapter: new EnzymeAdapter(),
	// disableLifecycleMethods: true
});

describe('PasswordStrengthFinderToolTip Component Test Suite', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
			colorBar: {},
		};
		wrapper = shallow(<PasswordStrengthFinderToolTip {...props} />);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

});
describe('PasswordStrengthFinderToolTip Component Test Suite', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
			colorBar: {
				number:1,
				character:'a',
				length:4,
				symbol:'@'
			},
		};
		wrapper = shallow(<PasswordStrengthFinderToolTip {...props} />);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

});