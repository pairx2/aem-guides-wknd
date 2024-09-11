import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import AddressSelectOption from '../../../../../modules/Form/components/FormFields/AddressSelectOption';

Enzyme.configure({
	adapter: new EnzymeAdapter(),
	// disableLifecycleMethods: true
});

describe('AddressSelectOption Component Test Suite', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
			name: 'String',
			address:{
				street: 'String',
				streetNumber: 'String',
				zipcode: 'String',
				city: 'String',
			},
			value: 'String',
			label: 'String'
		};
		wrapper = shallow(<AddressSelectOption {...props} />);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

});


