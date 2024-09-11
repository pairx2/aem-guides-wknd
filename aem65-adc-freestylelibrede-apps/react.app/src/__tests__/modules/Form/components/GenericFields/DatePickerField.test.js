import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import DatePickerField from '../../../../../modules/Form/components/GenericFields/DatePickerField';
import {mockStore} from '../../../../../__mocks__/storeMock';
Enzyme.configure({
	adapter: new EnzymeAdapter(),
});

describe('DatePickerField Component Test Suite', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
			validationRules: [],
			name: 'String',
			label: 'String',
			type: 'String',
			selectedDate: new Date(),
			confirmedDate: new Date(),
			isCalendarOpen: false,
			minDate: 1,
			icon: 'String',
			meta: {
				touched : false,
				error : false
			}
		};
		wrapper = shallow(<DatePickerField store={mockStore} {...props} />);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
});

describe('DatePickerField Component Test Suite', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
			validationRules: null,
			name: 'String',
			label: 'String',
			type: 'String',
			selectedDate: new Date(),
			confirmedDate: new Date(),
			isCalendarOpen: true,
			minDate: 1,
			icon: 'String',
			meta: {
				touched : true,
				error : true
			}
		};
		wrapper = shallow(<DatePickerField store={mockStore} {...props} />);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
});