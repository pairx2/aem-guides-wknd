import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import RadioButtonReduxField from '../../../../../modules/Form/components/GenericFields/RadioButtonReduxField';
import RADIO_BUTTON_TYPES from '../../../../../modules/Form/components/GenericFields/RadioButtonReduxField';

Enzyme.configure({
	adapter: new EnzymeAdapter(),
	// disableLifecycleMethods: true
});

describe('RadioButtonReduxField Component Test Suite - horizontalRenderField', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
			validationRules: null,
			name: 'string',
			options: [
				{
					value: 'value',
					label: 'string'
				}
			],
			type: RADIO_BUTTON_TYPES.HORIZONTAL
		};
		wrapper = shallow(<RadioButtonReduxField {...props} />);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
});
describe('RadioButtonReduxField Component Test Suite - verticalRenderField', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
			validationRules: null,
			name: 'string',
			options: [
				{
					value: 'value',
					label: 'string'
				}
			],
			type: RADIO_BUTTON_TYPES.VERTICAL
		};
		wrapper = shallow(<RadioButtonReduxField {...props} />);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
});
describe('RadioButtonReduxField Component Test Suite - simpleRenderField', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
			validationRules: null,
			name: 'string',
			options: [
				{
					value: 'value',
					label: 'string'
				}
			],
			type: RADIO_BUTTON_TYPES.SIMPLE
		};
		wrapper = shallow(<RadioButtonReduxField {...props} />);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
});
