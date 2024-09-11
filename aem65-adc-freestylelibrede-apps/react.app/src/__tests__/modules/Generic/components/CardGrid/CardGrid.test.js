import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import CardGrid from '../../../../../modules/Generic/components/CardGrid/CardGrid';

Enzyme.configure({
	adapter: new EnzymeAdapter(),
	// disableLifecycleMethods: true
});

describe('CardGrid Component Test Suite - with [] children', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
			columns: 1,
			children:[]
		};
		wrapper = shallow(<CardGrid {...props} />);
	});
	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});
	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
});
describe('CardGrid Component Test Suite - with children', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
			columns: 1,
			children:['a','b']
		};
		wrapper = shallow(<CardGrid {...props} />);
	});
	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});
	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
});