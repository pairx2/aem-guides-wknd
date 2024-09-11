import React from 'react';
import ProductPrice from '../../../../../modules/Product/components/ProductPrice/ProductPrice';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

Enzyme.configure({
	adapter: new EnzymeAdapter(),
	// disableLifecycleMethods: true
});

describe('ProductPrice Component Test Suite', () => {
	let props;
	let wrapper;

	beforeEach(() => {
		props = {
			price: 58.37,
			hasReference: true
		};
		wrapper = shallow(<ProductPrice {...props} />);
	});

	test('render check', () => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

});

describe('ProductPrice Component Test Suite', () => {
	let props;
	let wrapper;

	beforeEach(() => {
		props = {
			price: 58.003,
			hasReference: false
		};
		wrapper = shallow(<ProductPrice {...props} />);
	});

	test('render check', () => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

});




