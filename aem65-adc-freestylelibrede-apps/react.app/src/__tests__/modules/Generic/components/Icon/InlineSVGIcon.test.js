import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import InlineSVGIcon from '../../../../../modules/Generic/components/Icon/InlineSVGIcon';

Enzyme.configure({
	adapter: new EnzymeAdapter(),
	disableLifecycleMethods: true
});

describe('InlineSVGIcon Component Test Suite', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
			size: 'md',
			icon: 'icon'
		};
		wrapper = shallow(<InlineSVGIcon {...props} />);
	});
	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});
	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
});
