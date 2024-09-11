import React from 'react';
import Enzyme, {shallow, mount, render} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import RecaptchaField, {RecaptchaRenderField, RecaptchaRenderFieldInvisible} from '../../../../../modules/Form/components/GenericFields/RecaptchaField';
import {mockStore} from '../../../../../__mocks__/storeMock';
import {Provider} from 'react-redux';
import { getRequiredSiteData } from '../../../../../utils/siteData';

jest.mock('../../../../../utils/siteData');
jest.mock('../../../../../utils/endpointUrl');
Enzyme.configure({
	adapter: new EnzymeAdapter(),
	// disableLifecycleMethods: true
});

describe('RecaptchaField Component Test Suite without site key ', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		getRequiredSiteData.mockImplementation(() => '');
		props = {
			meta: {
				touched : true,
				error : true
			},
			input:{
				name:'name',
				onChange: jest.fn()
			},
		};
		wrapper = mount(<Provider store={mockStore}><RecaptchaRenderField  {...props} /></Provider>);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
});

describe('RecaptchaField Component Test Suite ', () => {
	let props;
	let wrapper;
	const setSelectedValueMock = jest.fn();
	beforeEach(() => {
		getRequiredSiteData.mockImplementation(() => 'recaptcha_key');
		props = {
			options: [
				{
					value: 'value',
					label: 'string'
				}
			],
			name: 'string',
			selectedValue: 'value',
			setSelectedValue: setSelectedValueMock,
			isUndetermined: true
		};
		wrapper = shallow(<RecaptchaField {...props} />);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

});

describe('RecaptchaField Component Test Suite ', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		getRequiredSiteData.mockImplementation(() => 'recaptcha_key');
		props = {
			meta: {
				touched : true,
				error : true
			},
			input:{
				name:'name',
				onChange: jest.fn()
			},
		};
		wrapper = mount(<Provider store={mockStore}><RecaptchaRenderField  {...props} /></Provider>);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
});

describe('RecaptchaRenderFieldInvisible  Component Test Suite ', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		getRequiredSiteData.mockImplementation(() => 'recaptcha_key');
		props = {
			meta: {
				touched : true,
				error : true
			},
			input:{
				name:'name',
				onChange: jest.fn()
			},
			onLoadCall: jest.fn()
		};
		wrapper = mount(<Provider store={mockStore}><RecaptchaRenderFieldInvisible {...props} /></Provider>);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
});