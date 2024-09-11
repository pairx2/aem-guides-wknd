import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import MiniCartProductPrice from '../../../../../modules/Cart/components/MiniCart/MiniCartProductPrice';

Enzyme.configure({
	adapter: new EnzymeAdapter()
});

describe('MiniCartProductPrice Component Test Suite', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
			currency: 'currencyString',
			price: 25,
		};
		wrapper = shallow(<MiniCartProductPrice {...props} />);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('h4',() => {
		expect(wrapper.type()).toBe('h4');
	});

});
