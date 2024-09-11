import React from 'react';
import Enzyme, {shallow,mount} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import TextAreaField, {RenderField} from '../../../../../modules/Form/components/GenericFields/TextAreaField';
import {Provider} from 'react-redux';
import {mockStore} from '../../../../../__mocks__/storeMock';

Enzyme.configure({
	adapter: new EnzymeAdapter(),
	// disableLifecycleMethods: true
});

describe('TextAreaField Component Test Suite', () => {
	let props;
	let wrapper;
	const formatMock = jest.fn();
	const onChangeMock = jest.fn();
	const onFocusMock = jest.fn();

	beforeEach(() => {
		props = {
			hasValidateIcon: false,
			validationRules: null,
			name: 'string',
			label: 'string',
			placeholder: 'string',
			type: 'string',
			format: formatMock,
			onChange: onChangeMock,
			onFocus: onFocusMock,
			rows: 'string',
			className: 'className'
		};
		wrapper = shallow(<TextAreaField {...props} />);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

});
describe('TextAreaField Component Test Suite', () => {
	let props;
	let wrapper;
	const formatMock = jest.fn();
	const onChangeMock = jest.fn();
	const onFocusMock = jest.fn();

	beforeEach(() => {
		props = {
			hasValidateIcon: true,
			validationRules: null,
			name: 'string',
			label: 'string',
			placeholder: 'string',
			type: 'string',
			format: formatMock,
			onChange: onChangeMock,
			onFocus: onFocusMock,
			rows: 'string',
			className: 'className'
		};
		wrapper = shallow(<TextAreaField {...props} />);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

});
describe('RenderField Component Test Suite', () => {
	let props;
	let wrapper;
	const formatMock = jest.fn();
	const onChangeMock = jest.fn();
	const onFocusMock = jest.fn();

	beforeEach(() => {
		props = {
			hasValidateIcon: true,
			validationRules: null,
			name: 'string',
			label: 'string',
			placeholder: 'string',
			type: 'string',
			format: formatMock,
			onChange: onChangeMock,
			onFocus: onFocusMock,
			className: 'className',
			isRequired: true,
			maxLength: 5,
			rows: 2,
			meta: {
				touched : false,
				error : false
			},
			input:{
				name:'name'
			}
		};
		wrapper = mount(<Provider store={mockStore}><RenderField  {...props} /></Provider>);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

});
describe('RenderField Component Test Suite', () => {
	let props;
	let wrapper;
	const formatMock = jest.fn();
	const onChangeMock = jest.fn();
	const onFocusMock = jest.fn();

	beforeEach(() => {
		props = {
			hasValidateIcon: true,
			validationRules: null,
			name: 'string',
			label: 'string',
			placeholder: 'string',
			type: 'string',
			format: formatMock,
			onChange: onChangeMock,
			onFocus: onFocusMock,
			className: 'className',
			isRequired: true,
			maxLength: 5,
			rows: 2,
			meta: {
				touched : true,
				error : false
			},
			input:{
				name:'name'
			}
		};
		wrapper = mount(<Provider store={mockStore}><RenderField  {...props} /></Provider>);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

});
describe('RenderField Component Test Suite', () => {
	let props;
	let wrapper;
	const formatMock = jest.fn();
	const onChangeMock = jest.fn();
	const onFocusMock = jest.fn();

	beforeEach(() => {
		props = {
			hasValidateIcon: false,
			validationRules: null,
			name: 'string',
			label: 'string',
			placeholder: 'string',
			type: 'string',
			format: formatMock,
			onChange: onChangeMock,
			onFocus: onFocusMock,
			className: 'className',
			isRequired: false,
			maxLength: 5,
			rows: 2,
			meta: {
				touched : true,
				error : true
			},
			input:{
				name:'name'
			}
		};
		wrapper = mount(<Provider store={mockStore}><RenderField  {...props} /></Provider>);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

});