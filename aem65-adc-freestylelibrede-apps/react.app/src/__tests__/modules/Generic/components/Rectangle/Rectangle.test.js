import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import Rectangle from '../../../../../modules/Generic/components/Rectangle/Rectangle';

Enzyme.configure({
	adapter: new EnzymeAdapter(),
	// disableLifecycleMethods: true
});

describe('Rectangle Component Test Suite - isOverlay: true', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
			ar:1
		};
		wrapper = shallow(<Rectangle {...props} />);
	});
	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});
	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
});