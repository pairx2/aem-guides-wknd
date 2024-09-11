import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import PasswordStrengthFinderMeter from '../../../../../modules/Form/components/PasswordStrengthFinder/PasswordStrengthFinderMeter';

Enzyme.configure({
	adapter: new EnzymeAdapter(),
	// disableLifecycleMethods: true
});

describe('PasswordStrengthFinderMeter Component Test Suite - colorBar of length 4 ', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
			colorBar: {
				a: 'green',
				b: 'yellow',
				c: 'red',
				d: 'pink'
			}
		};
		wrapper = shallow(<PasswordStrengthFinderMeter {...props} />);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});
	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	describe('functions check', () => {
		test('changeColor function call check', () => {
			wrapper.instance().changeColor('red', 'grey', 'grey', 'grey');
		});
	});


});
describe('PasswordStrengthFinderMeter Component Test Suite -colorBar of length 3', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
			colorBar: {
				a: 'green',
				b: 'yellow',
				c: 'red',
			}
		};
		wrapper = shallow(<PasswordStrengthFinderMeter {...props} />);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});
	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	describe('functions check', () => {
		test('changeColor function call check', () => {
			wrapper.instance().changeColor('red', 'grey', 'grey', 'grey');
		});
	});


});
describe('PasswordStrengthFinderMeter Component Test Suite -colorBar of length 2', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
			colorBar: {
				a: 'green',
				b: 'yellow',
			}
		};
		wrapper = shallow(<PasswordStrengthFinderMeter {...props} />);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});
	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	describe('functions check', () => {
		test('changeColor function call check', () => {
			wrapper.instance().changeColor('red', 'grey', 'grey', 'grey');
		});
	});


});
describe('PasswordStrengthFinderMeter Component Test Suite -colorBar of length 1', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
			colorBar: {
				a: 'green',
			}
		};
		wrapper = shallow(<PasswordStrengthFinderMeter {...props} />);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});
	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
	describe('functions check', () => {
		test('changeColor function call check', () => {
			wrapper.instance().changeColor('red', 'grey', 'grey', 'grey');
		});
	});


});