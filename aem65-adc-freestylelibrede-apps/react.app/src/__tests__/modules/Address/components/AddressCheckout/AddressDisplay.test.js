import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import AddressDisplay from '../../../../../modules/Address/components/AddressCheckout/AddressDisplay';

Enzyme.configure({
	adapter: new EnzymeAdapter()
});

describe('AddressDisplay Component Test Suite', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
			address: {
				addresstype: 'String',
				prefix: 'String',
				firstname: 'String',
				lastname: 'String',
				street: ['a','b'],
				postcode: 'String',
				city: 'String',
			}
		};
		wrapper = shallow(<AddressDisplay {...props} />);

	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

});
describe('AddressDisplay Component Test Suite', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
			address: {
				addresstype: 'String',
				prefix: 'String',
				firstname: 'String',
				lastname: 'String',
				street: [null,null],
				postcode: 'String',
				city: 'String',
			}
		};
		wrapper = shallow(<AddressDisplay {...props} />);

	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

});
describe('AddressDisplay Component Test Suite', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
			address: {
				street: [],
			}
		};
		wrapper = shallow(<AddressDisplay {...props} />);

	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

});


