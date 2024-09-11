import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import Circle from '../../../../../modules/Generic/components/Circle/Circle';

Enzyme.configure({
	adapter: new EnzymeAdapter(),
	// disableLifecycleMethods: true
});

describe('Circle Component Test Suite - isOverlay: true', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
			children:{'a':'b'}
		};
		wrapper = shallow(<Circle {...props} />);
	});
	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});
	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
});