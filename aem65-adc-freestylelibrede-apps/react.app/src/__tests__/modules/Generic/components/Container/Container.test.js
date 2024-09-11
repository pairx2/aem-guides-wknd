import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import Container from '../../../../../modules/Generic/components/Container/Container';

Enzyme.configure({
	adapter: new EnzymeAdapter(),
	// disableLifecycleMethods: true
});

describe('Container Component Test Suite - with class name', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
			className: 'classNameString',
			children : [
				{'a':'b'},
				{'c':'d'}
			]
		};
		wrapper = shallow(<Container {...props} />);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
	test('div tag render',() => {
		expect(wrapper.type()).toBe('div');
	});

});
describe('Container Component Test Suite- without classname', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
			children : [
				{'a':'b'},
				{'c':'d'}
			]
		};
		wrapper = shallow(<Container {...props} />);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
	test('div tag render',() => {
		expect(wrapper.type()).toBe('div');
	});

});


