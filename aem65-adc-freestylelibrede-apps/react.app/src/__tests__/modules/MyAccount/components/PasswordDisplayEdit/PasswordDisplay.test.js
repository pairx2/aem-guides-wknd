import React from 'react';
import Enzyme, {shallow,mount} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

import PasswordDisplay from '../../../../../modules/MyAccount/components/PasswordDisplayEdit/PasswordDisplay';
import {mockStore, mockStoreOrder} from '../../../../../__mocks__/storeMock';
import {i18nLabels} from '../../../../../utils/translationUtils';
import {Provider} from 'react-redux';


Enzyme.configure({
	adapter: new EnzymeAdapter(),
});

const setup = (props= {}) => {
	const wrapper = shallow(<Provider store= {mockStore}><PasswordDisplay {...props}/></Provider>);
	return wrapper;
};

const setupTwo = (props= {}) => {
	const wrapper = shallow(<Provider store= {mockStoreOrder}><PasswordDisplay {...props}/></Provider>);
	return wrapper;
};


describe('PasswordDisplay component Test Suite with is_social as false', () => {
	let props, wrapper;

	beforeEach(() => {

		props = {
			email: 'email',
			breakpoints : {mobile: 320, tablet: 768, desktop: 1025},
			currentBreakpoint: 'mobile',
			children: ['child1', 'child2', 'child3']
		};

		wrapper = setup(props);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();

		const passwordMask = i18nLabels.PASSWORD_MASK;
		expect(passwordMask).toBe('password_mask');
	});

});

describe('PasswordDisplay component Test Suite with is_social as true', () => {
	let props, wrapper;

	beforeEach(() => {

		props = {
			email: 'email',
			breakpoints : {mobile: 320, tablet: 768, desktop: 1025},
			currentBreakpoint: 'mobile',
			children: ['child1', 'child2', 'child3']
		};

		wrapper = setupTwo(props);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
});

describe('PasswordDisplay component Test Suite with mount', () => {
	let props, wrapper;

	beforeEach(() => {

		props = {
			email: 'email',
			breakpoints : {mobile: 320, tablet: 768, desktop: 1025},
			currentBreakpoint: 'mobile',
			children: ['child1', 'child2', 'child3']
		};

		wrapper = mount(<Provider store= {mockStore}><PasswordDisplay {...props}/></Provider>);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});


});

