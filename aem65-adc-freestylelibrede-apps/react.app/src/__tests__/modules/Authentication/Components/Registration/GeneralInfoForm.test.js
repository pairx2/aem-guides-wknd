import React from 'react';
import Enzyme, {mount} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

import GeneralInfoForm from '../../../../../modules/Authentication/components/Registration/GeneralInfoForm';
import {mockStore} from '../../../../../__mocks__/storeMock';
import {Provider} from 'react-redux';
jest.mock('../../../../../utils/endpointUrl');

Enzyme.configure({
	adapter: new EnzymeAdapter(),
});


describe('GeneralInfoForm Component Test Suite with isEApply as true & continueCtastyle as primary', () => {
	let props, wrapper;

	beforeEach(() => {
		props = {
			registrationHeading: 'registrationHeading',
			registrationSubheading: 'registrationSubheading',
			continueCtastyle: 'primary',
			loginLink: 'loginLink',
			isEApply: true,
			isDisableRegistration: true,
			generalInfoFormValues: {
				prefix: 'test'
			}
		};
		wrapper = mount(<Provider store={mockStore}><GeneralInfoForm {...props} /></Provider>);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

});

describe('GeneralInfoForm Component Test Suite with isEApply as true & continueCtastyle as secondary', () => {
	let props, wrapper;

	beforeEach(() => {
		props = {
			registrationHeading: 'registrationHeading',
			registrationSubheading: 'registrationSubheading',
			continueCtastyle: 'secondary',
			loginLink: 'loginLink',
			isEApply: true,
			isDisableRegistration: true,
			generalInfoFormValues: {
				prefix: 'test'
			}
		};
		wrapper = mount(<Provider store={mockStore}><GeneralInfoForm {...props} /></Provider>);
	});

	test('render check',() => {
		sessionStorage.setItem('ghac', 'ghac');
			sessionStorage.setItem('rxmc', 'rxmc');
			sessionStorage.setItem('insurenceId', 'insurenceId');
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		sessionStorage.setItem('ghac', 'ghac');
			sessionStorage.setItem('rxmc', 'rxmc');
			sessionStorage.setItem('insurenceId', 'insurenceId');
		expect(wrapper).toBeDefined();
	});

});

describe('GeneralInfoForm Component Test Suite with isEApply as false & continueCtastyle as primary', () => {
	let props, wrapper;

	beforeEach(() => {
		props = {
			registrationHeading: 'registrationHeading',
			registrationSubheading: 'registrationSubheading',
			continueCtastyle: 'primary',
			loginLink: 'loginLink',
			isEApply: false,
			isDisableRegistration: false,
			generalInfoFormValues: {
				prefix: 'test'
			},
			isDisableSocialRegistration: true,
			isAccountType: false,
			isSocialLogin: true
		};
		wrapper = mount(<Provider store={mockStore}><GeneralInfoForm {...props} /></Provider>);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

});

describe('GeneralInfoForm Component Test Suite with isEApply as false & continueCtastyle as secondary', () => {
	let props, wrapper;

	beforeEach(() => {
		props = {
			registrationHeading: 'registrationHeading',
			registrationSubheading: 'registrationSubheading',
			continueCtastyle: 'secondary',
			loginLink: 'loginLink',
			isEApply: false,
			isDisableRegistration: false,
			generalInfoFormValues: {
				prefix: 'test'
			},
			isDisableSocialRegistration: false,
			isAccountType: true,
			isSocialLogin: false
		};
		wrapper = mount(<Provider store={mockStore}><GeneralInfoForm {...props} /></Provider>);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

});





