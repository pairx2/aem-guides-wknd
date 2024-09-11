import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import RadioButtonField from '../../../../../modules/Form/components/GenericFields/RadioButtonField';

Enzyme.configure({
	adapter: new EnzymeAdapter(),
	// disableLifecycleMethods: true
});

describe('RadioButtonField Component Test Suite - isUndetermined: true', () => {
	let props;
	let wrapper;
	const setSelectedValueMock = jest.fn();
	beforeEach(() => {
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
			isUndetermined: true,
			undeterminedUomError: 'undeterminedUomError'
		};
		wrapper = shallow(<RadioButtonField {...props} />);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
	test('onClick', () => {
		const inputTag = wrapper.find('input');
		inputTag.simulate('click');
		const setSelectedValueCount = setSelectedValueMock.mock.calls.length;
		expect(setSelectedValueCount).toBeDefined();
	});

});
describe('RadioButtonField Component Test Suite - isUndetermined: true', () => {
	let props;
	let wrapper;
	const setSelectedValueMock = jest.fn();
	beforeEach(() => {
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
			isUndetermined: false,
			undeterminedUomError: 'undeterminedUomError'
		};
		wrapper = shallow(<RadioButtonField {...props} />);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
	test('onClick', () => {
		const inputTag = wrapper.find('input');
		inputTag.simulate('click');
		const setSelectedValueCount = setSelectedValueMock.mock.calls.length;
		expect(setSelectedValueCount).toBeDefined();
	});

});
describe('RadioButtonField Component Test Suite - isUndetermined: false', () => {
	let props;
	let wrapper;
	const setSelectedValueMock = jest.fn();
	beforeEach(() => {
		props = {
			options: [
				{
					value: 'value',
					label: 'string'
				}
			],
			name: 'string',
			selectedValue: 'string',
			setSelectedValue: setSelectedValueMock,
			isUndetermined: false,
			undeterminedUomError: ''
		};
		wrapper = shallow(<RadioButtonField {...props} />);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
	test('onClick', () => {
		const inputTag = wrapper.find('input');
		inputTag.simulate('click');
		const setSelectedValueCount = setSelectedValueMock.mock.calls.length;
		expect(setSelectedValueCount).toBeDefined();
	});

});