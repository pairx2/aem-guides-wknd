import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import TypeaheadField, {TypeaheadRenderField} from '../../../../../modules/Form/components/GenericFields/TypeaheadField';
import {mockStore} from '../../../../../__mocks__/storeMock';
import {Provider} from 'react-redux';

Enzyme.configure({
	adapter: new EnzymeAdapter(),
	// disableLifecycleMethods: true
});

describe('TypeaheadField Component Test Suite - TypeaheadField', () => {
	let props;
	let wrapper;
	const getSuggestionsMock = jest.fn();
	const updateFormMock = jest.fn();

	beforeEach(() => {
		props = {
			name: 'string',
			validationRules: [],
			label: 'string',
			placeholder: 'string',
			options: ['opt1'],
			getSuggestions: getSuggestionsMock,
			suggestionTreshold: 2,
			updateForm: updateFormMock
		};
		wrapper = shallow(<TypeaheadField store={mockStore} {...props} />).dive();
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('normalize function call', () => {
		const normalizeMock = wrapper.props().children.props.normalize;
		expect(typeof normalizeMock).toBe('function');

		const value1= 'value1';
		const value2= {value: 'value2'};
		const value3= null;
		expect(normalizeMock(value1)).toBeUndefined();
		expect(normalizeMock(value2)).toBe('value2');
		expect(normalizeMock(value3)).toBe(null);
	});
	test('onValueChange function call', () => {
		const value= {value: 'value'};
		const input= {name: 'input', onChange: jest.fn()};
		const onValueChangeMock = wrapper.props().children.props.onValueChange;
		expect(typeof onValueChangeMock).toBe('function');

		onValueChangeMock(value, input);
		expect(wrapper.instance().state.inputValue).toBe('value');
	});

	test('getSuggestions prop function call - if scenarios', () => {
		const action= {action: 'init'};
		const onInputChangeMock = wrapper.props().children.props.onInputChange;
		expect(typeof onInputChangeMock).toBe('function');

		onInputChangeMock('value', action, 'form', 'inputName');

		const getSuggestionsMockCallCount= getSuggestionsMock.mock.calls.length;
		expect(getSuggestionsMockCallCount).toBeDefined();
		expect(getSuggestionsMockCallCount).not.toBe(0);

		const updateFormMockCallCount= updateFormMock.mock.calls.length;
		expect(updateFormMockCallCount).toBeDefined();
	});
	test('getSuggestions prop function call - else scenarios', () => {
		const action= {action: 'action'};
		const onInputChangeMock = wrapper.props().children.props.onInputChange;
		expect(typeof onInputChangeMock).toBe('function');
		onInputChangeMock('v', action, 'form', 'inputName');
	});
});
describe('TypeaheadRenderField Component Test Suite', () => {
	let props;
	let wrapper;
	const onInputChangeMock = jest.fn();
	const onValueChangeMock = jest.fn();

	beforeEach(() => {
		props = {
			label: 'string',
			placeholder: 'string',
			inputValue: 'string',
			onInputChange: onInputChangeMock,
			onValueChange: onValueChangeMock,
			rows: 'string',
			isRequired: true,
			meta: {
				touched : true,
				error : true
			},
			input:{
				name:'name',
				value: 'value'
			},
			options: [
				{
					value: 'value',
					label: 'string'
				}
			],
		};
		wrapper = mount(<Provider store={mockStore}><TypeaheadRenderField  {...props} /></Provider>);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

});
describe('TypeaheadRenderField Component Test Suite', () => {
	let props;
	let wrapper;
	const onInputChangeMock = jest.fn();
	const onValueChangeMock = jest.fn();

	beforeEach(() => {
		props = {
			label: 'string',
			placeholder: 'string',
			inputValue: null,
			onInputChange: onInputChangeMock,
			onValueChange: onValueChangeMock,
			rows: 'string',
			isRequired: false,
			meta: {
				touched : false,
				error : true
			},
			input:{
				name:'name',
				value: 'value'
			},
			options: [
				{
					value: 'value',
					label: 'string'
				}
			],
		};
		wrapper = mount(<Provider store={mockStore}><TypeaheadRenderField  {...props} /></Provider>);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

});
describe('TypeaheadRenderField Component Test Suite', () => {
	let props;
	let wrapper;
	const onInputChangeMock = jest.fn();
	const onValueChangeMock = jest.fn();

	beforeEach(() => {
		props = {
			label: 'string',
			placeholder: 'string',
			inputValue: 'string',
			onInputChange: onInputChangeMock,
			onValueChange: onValueChangeMock,
			rows: 'string',
			isRequired: false,
			meta: {
				touched : false,
				error : true
			},
			input:{
				name:'name',
				value: null
			},
			options: [
				{
					value: 'value',
					label: 'string'
				}
			],
		};
		wrapper = mount(<Provider store={mockStore}><TypeaheadRenderField  {...props} /></Provider>);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

});