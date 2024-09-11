import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import Icon from '../../../../../modules/Generic/components/Icon/Icon';

Enzyme.configure({
	adapter: new EnzymeAdapter(),
	// disableLifecycleMethods: true
});

describe('Icon Component Test Suite', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
			size: 'medium',
			image: 'icon'
		};
		wrapper = shallow(<Icon {...props} />);
	});
	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});
	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
});