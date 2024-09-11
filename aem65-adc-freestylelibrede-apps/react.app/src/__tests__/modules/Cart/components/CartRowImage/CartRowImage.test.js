import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import CartRowImage from '../../../../../modules/Cart/components/CartRowImage/CartRowImage';
import {Provider} from 'react-redux';
import {mockStore} from '../../../../../__mocks__/storeMock';

Enzyme.configure({
	adapter: new EnzymeAdapter(),
	// disableLifecycleMethods: true
});

describe('CartRowImage Component Test Suite', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
			image: 'imageProp',
			url: 'urlProp',
			name: 'nameProp',

		};
		wrapper = shallow(<CartRowImage {...props} />);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

});

describe('CartRowImage Component Test Suite', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
			image: 'imageProp',
			url: 'urlProp',
			name: 'nameProp',

		};
		wrapper = mount(<Provider store={mockStore}><CartRowImage {...props} /></Provider>);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

});
