import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import HiddenField from '../../../../../modules/Form/components/GenericFields/HiddenField';

Enzyme.configure({
	adapter: new EnzymeAdapter(),
	// disableLifecycleMethods: true
});

describe('HiddenField Component Test Suite', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
			name: 'String',
		};
		wrapper = shallow(<HiddenField {...props} />);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

});