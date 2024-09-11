import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import CheckboxField, {CHECKBOX_TYPES} from '../../../../../modules/Form/components/GenericFields/CheckboxField';

Enzyme.configure({
	adapter: new EnzymeAdapter(),
	// disableLifecycleMethods: true
});

describe('CheckboxField Component Test Suite', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
			name: 'String',
			label: 'String',
			params: ['a','b'],
			containerClass: 'String',
			format: jest.fn(),
			normalize: jest.fn(),
			validationRules: [],
			isDisabled:false,
			type: CHECKBOX_TYPES.BLUE,
			hasRef: false,
			meta: {
				touched : false,
				error : false
			}
		};
		wrapper = shallow(<CheckboxField {...props} />);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

});
describe('CheckboxField Component Test Suite', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
			name: 'String',
			label: 'String',
			params: ['a','b'],
			containerClass: 'String',
			format: jest.fn(),
			normalize: jest.fn(),
			validationRules: [],
			isDisabled:true,
			type: CHECKBOX_TYPES.BLUE,
			hasRef: true,
			meta: {
				touched : true,
				error : true
			}
		};
		wrapper = shallow(<CheckboxField {...props} />);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

});
describe('CheckboxField Component Test Suite', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
			name: 'String',
			label: 'String',
			params: ['a','b'],
			containerClass: 'String',
			format: jest.fn(),
			normalize: jest.fn(),
			validationRules: [],
			isDisabled:false,
			type: CHECKBOX_TYPES.WHITE,
			hasRef: false,
			meta: {
				touched : false,
				error : false
			}
		};
		wrapper = shallow(<CheckboxField {...props} />);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

});
describe('CheckboxField Component Test Suite', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
			name: 'String',
			label: 'String',
			params: ['a','b'],
			containerClass: 'String',
			format: jest.fn(),
			normalize: jest.fn(),
			validationRules: [],
			isDisabled:true,
			type: CHECKBOX_TYPES.WHITE,
			hasRef: true,
			meta: {
				touched : true,
				error : true
			}
		};
		wrapper = shallow(<CheckboxField {...props} />);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

});

