import React from 'react';
import Enzyme, {shallow,mount} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import {mockStore} from '../../../../../__mocks__/storeMock';
import {Provider} from 'react-redux';
import RegistrationCard from '../../../../../modules/Authentication/components/Login/RegistrationCard';

jest.mock('../../../../../utils/endpointUrl.js');

Enzyme.configure({
	adapter: new EnzymeAdapter()
});

describe('RegistrationCard Component Test Suite', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
			signUpHeading: 'String',
			createAccountLink: 'String',
			createAccount: 'String',
			isDisableRegistration: true
		};
		wrapper = shallow(<RegistrationCard {...props} />);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
});
describe('RegistrationCard Component Test Suite', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
			signUpHeading: 'String',
			createAccountLink: 'String',
			createAccount: 'String',
			isDisableRegistration: false
		};
		wrapper = mount(<Provider store= {mockStore}><RegistrationCard {...props} /></Provider>);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

});

