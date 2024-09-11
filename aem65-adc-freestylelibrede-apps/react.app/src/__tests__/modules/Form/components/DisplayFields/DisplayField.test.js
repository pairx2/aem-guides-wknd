import React from 'react';
import DisplayField from '../../../../../modules/Form/components/DisplayFields/DisplayField';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

Enzyme.configure({
	adapter: new EnzymeAdapter()
});

describe('DisplayField Component Test Suite', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
			label: 'labelProp',
			value: 'valueProp',
		};
		wrapper = shallow(<DisplayField {...props} />);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

});


