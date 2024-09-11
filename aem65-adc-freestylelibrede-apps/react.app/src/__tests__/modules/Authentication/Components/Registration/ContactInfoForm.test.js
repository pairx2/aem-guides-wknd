import React from 'react';
import Enzyme, {mount} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

import ContactInfoForm from '../../../../../modules/Authentication/components/Registration/ContactInfoForm';
import {mockStore} from '../../../../../__mocks__/storeMock';
import {Provider} from 'react-redux';

Enzyme.configure({
	adapter: new EnzymeAdapter(),
});


describe('ContactInfoForm Component Test Suite with valid initialValues & both contactContinueCtaStyle & contactBackCtaStyle as primary', () => {
	let props, wrapper;
	const handleGoBackMock = jest.fn();

	beforeEach(() => {
		props = {
			handleGoBack: handleGoBackMock,
			contactHeading: 'contactHeading',
			contactSubHeading: 'contactSubHeading',
			informationalMsg: 'informationalMsg',
			contactContinueCtaStyle: 'primary',
			contactBackCtaStyle: 'primary',
			postcode: 'postcode',
			initialValues: {
				landline_phone: ['a1', 'a2', 'a3', 'a4'],
				mobile_phone: ['a1', 'a2', 'a3', 'a4'],
				postcode: 'postcode'
			}
		};
		wrapper = mount(<Provider store={mockStore}><ContactInfoForm  {...props} /></Provider>);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

});

describe('ContactInfoForm Component Test Suite with valid initialValues & both contactContinueCtaStyle & contactBackCtaStyle as primary & mobile_phone having iso2 prop', () => {
	let props, wrapper;
	const handleGoBackMock = jest.fn();

	beforeEach(() => {
		props = {
			handleGoBack: handleGoBackMock,
			contactHeading: 'contactHeading',
			contactSubHeading: 'contactSubHeading',
			informationalMsg: 'informationalMsg',
			contactContinueCtaStyle: 'primary',
			contactBackCtaStyle: 'primary',
			postcode: 'postcode',
			initialValues: {
				landline_phone: ['a1', 'a2', 'a3', 'a4'],
				mobile_phone: ['a1', 'a2', {iso2: 'de'}, 'a4'],
				postcode: 'postcode'
			}
		};
		wrapper = mount(<Provider store={mockStore}><ContactInfoForm  {...props} /></Provider>);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

});

describe('ContactInfoForm Component Test Suite with empty initialValues & both contactContinueCtaStyle & contactBackCtaStyle as secondary', () => {
	let props, wrapper;
	const handleGoBackMock = jest.fn();

	beforeEach(() => {
		props = {
			handleGoBack: handleGoBackMock,
			contactHeading: 'contactHeading',
			contactSubHeading: 'contactSubHeading',
			informationalMsg: 'informationalMsg',
			contactContinueCtaStyle: 'secondary',
			contactBackCtaStyle: 'secondary',
			postcode: 'postcode',
			initialValues: {
				landline_phone: [],
				mobile_phone: [],
				postcode: 'postcode'
			}
		};
		wrapper = mount(<Provider store={mockStore}><ContactInfoForm  {...props} /></Provider>);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

});





