import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import SearchBarTextField, {renderField} from '../../../../../modules/Search/components/SearchBar/SearchBarTextField';
import {Provider} from 'react-redux';
import {mockStore} from '../../../../../__mocks__/storeMock';

Enzyme.configure({
	adapter: new EnzymeAdapter()
});

describe('SearchBarTextField Component Test Suite', () => {
	let props;
	let wrapper;
	const formatMock = jest.fn();
	const onKeyDownMock = jest.fn();
	const onFocusMock = jest.fn();
	const onChangeMock = jest.fn();

	beforeEach(() => {
		props = {
			name: 'String',
			label: 'String',
			placeholder: 'String',
			hasValidateIcon: true,
			type: 'text',
			format: formatMock,
			onChange: onChangeMock,
			onKeyDown: onKeyDownMock,
			onFocus: onFocusMock
		};
		wrapper = shallow(<SearchBarTextField {...props} />);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
});
describe('SearchBarTextField Component Test Suite', () => {
	let props;
	let wrapper;
	const formatMock = jest.fn();
	const onKeyDownMock = jest.fn();
	const onFocusMock = jest.fn();
	const onChangeMock = jest.fn();

	beforeEach(() => {
		props = {
			name: 'String',
			label: 'String',
			placeholder: 'String',
			hasValidateIcon: false,
			type: 'text',
			format: formatMock,
			onChange: onChangeMock,
			onKeyDown: onKeyDownMock,
			onFocus: onFocusMock
		};
		wrapper = shallow(<SearchBarTextField {...props} />);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
});
describe('renderField Component Test Suite', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
			type: 'string',
			placeholder: 'string',
			onKeyDown: jest.fn(),
			input:{
				name:'search',
			}
		};
		wrapper = mount(<Provider store={mockStore}><renderField  {...props} /></Provider>);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
});
