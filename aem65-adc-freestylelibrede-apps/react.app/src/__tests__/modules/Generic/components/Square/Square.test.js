import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import Square from '../../../../../modules/Generic/components/Square/Square';

Enzyme.configure({
	adapter: new EnzymeAdapter(),
	// disableLifecycleMethods: true
});

describe('Square Component Test Suite - isOverlay: true', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
			style:{'a':'b'}
		};
		wrapper = shallow(<Square {...props} />);
	});
	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});
	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
});