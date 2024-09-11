import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import EmptyCart from '../../../../../modules/Cart/components/EmptyCart/EmptyCart';

Enzyme.configure({
	adapter: new EnzymeAdapter()
});

describe('EmptyCart Component Test Suite - cartType:minicart', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
			cartType: 'minicart',
			message: 'String',
			imgPath: 'String',
			buttonCTA: 'String',
			emptyCartCtaStyle: 'primary',
			emptyCartCtaDestination: 'String',
			emptyCartCtaTarget: 'String',
		};
		wrapper = shallow(<EmptyCart {...props} />);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
});

describe('EmptyCart Component Test Suite - cartType:cartlist', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
			cartType: 'cartlist',
			message: 'String',
			imgPath: 'String',
			buttonCTA: 'String',
			emptyCartCtaStyle: 'primary',
			emptyCartCtaDestination: 'String',
			emptyCartCtaTarget: 'String',
		};
		wrapper = shallow(<EmptyCart {...props} />);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
});

describe('EmptyCart Component Test Suite - cartType:minicart', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
			cartType: 'minicart',
			message: 'String',
			imgPath: 'String',
			buttonCTA: 'String',
			emptyCartCtaStyle: 'secondary',
			emptyCartCtaDestination: 'String',
			emptyCartCtaTarget: 'String',
		};
		wrapper = shallow(<EmptyCart {...props} />);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
});

describe('EmptyCart Component Test Suite - cartType:minicart', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
			cartType: 'cartlist',
			message: 'String',
			imgPath: 'String',
			buttonCTA: 'String',
			emptyCartCtaStyle: 'secondary',
			emptyCartCtaDestination: 'String',
			emptyCartCtaTarget: 'String',
		};
		wrapper = shallow(<EmptyCart {...props} />);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
});