import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import IntlTelInputField, {IntlTelInputRenderField} from '../../../../../modules/Form/components/GenericFields/IntlTelInputField';
import {mockStore} from '../../../../../__mocks__/storeMock';
import {Provider} from 'react-redux';

Enzyme.configure({
	adapter: new EnzymeAdapter(),
	// disableLifecycleMethods: true
});

describe('IntlTelInputField Component Test Suite', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
			name: 'string',
			validationRules: [],
			label: 'string',
			isRequired: true,
			hasValidateIcon: true,
			defaultMaxLength: 'string',
			defaultValue:'string',
			defaultCountry: 'string',
			placeholder: 'string'
		};
		wrapper = shallow(<IntlTelInputField {...props} />);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
});
describe('IntlTelInputField Component Test Suite', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
			name: 'mobile_phone',
			validationRules: [],
			label: 'string',
			isRequired: true,
			hasValidateIcon: true,
			defaultMaxLength: 'string',
			defaultValue:'string',
			defaultCountry: 'de',
			placeholder: 'string'
		};
		wrapper = shallow(<IntlTelInputField {...props} />);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
});
describe('IntlTelInputField Component Test Suite', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
			name: 'mobile_phone',
			validationRules: [],
			label: 'string',
			isRequired: true,
			hasValidateIcon: true,
			defaultMaxLength: 'string',
			defaultValue:'string',
			defaultCountry: 'UK',
			placeholder: 'string'
		};
		wrapper = shallow(<IntlTelInputField {...props} />);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
});
describe('IntlTelInputRenderField Component Test Suite', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
			validationRules: [],
			label: 'string',
			isRequired: true,
			hasValidateIcon: true,
			defaultMaxLength: 'string',
			defaultValue:'string',
			defaultCountry: 'UK',
			placeholder: 'string',
			meta: {
				touched : true,
				error : false
			},
			input:{
				name:'name',
				onChange: jest.fn(),
				onBlur: jest.fn(),
				value: 'value'
			}
		};
		wrapper = mount(<Provider store={mockStore}><IntlTelInputRenderField  {...props} /></Provider>);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
});
describe('IntlTelInputRenderField Component Test Suite', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
			validationRules: [],
			label: 'string',
			isRequired: false,
			hasValidateIcon: false,
			defaultMaxLength: 'string',
			defaultValue:'string',
			defaultCountry: 'de',
			placeholder: 'string',
			meta: {
				touched : true,
				error : false
			},
			input:{
				name:'mobile_phone',
				onChange: jest.fn(),
				onBlur: jest.fn(),
				value: ['1','2']
			}
		};
		wrapper = mount(<Provider store={mockStore}><IntlTelInputRenderField  {...props} /></Provider>);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
});
describe('IntlTelInputRenderField Component Test Suite', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
			validationRules: [],
			label: 'string',
			isRequired: false,
			hasValidateIcon: false,
			defaultMaxLength: 'string',
			defaultValue:'string',
			defaultCountry: 'UK',
			placeholder: 'string',
			meta: {
				touched : true,
				error : true
			},
			input:{
				name:'mobile_phone',
				onChange: jest.fn(),
				onBlur: jest.fn(),
				value: null
			}
		};
		wrapper = mount(<Provider store={mockStore}><IntlTelInputRenderField  {...props} /></Provider>);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
});