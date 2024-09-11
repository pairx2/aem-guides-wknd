import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

import DatepickerCalendar from '../../../../../modules/MyAccount/components/CurrentOrderOverview/DatepickerCalendar';

Enzyme.configure({
	adapter: new EnzymeAdapter(),
});


describe('DatepickerCalendar component Test Suite', () => {
	let props, wrapper;

	beforeEach(() => {

		props = {
			isCalendarOpen: true,
			toggleCalendar: () => {},
			handleConfirm: () => {},
			selectedDate: new Date(1602633600000),
			deliveryDate: new Date(1594684800000),
			isFullWidth: true
		};
		wrapper = shallow(<DatepickerCalendar {...props}/>);
	});

	describe('props check', () => {

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});

		test('render check',() => {
			expect(wrapper.type()).not.toEqual(null);
		});

	});
});

describe('DatepickerCalendar component Test Suite', () => {
	let props, wrapper;

	beforeEach(() => {

		props = {
			isCalendarOpen: true,
			toggleCalendar: () => {},
			handleConfirm: () => {},
			selectedDate: new Date(1602633600000),
			deliveryDate: new Date(1594684800000),
			isFullWidth: true
		};
		wrapper = mount(<DatepickerCalendar {...props}/>);
	});

	describe('props check', () => {

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});

		test('render check',() => {
			expect(wrapper.type()).not.toEqual(null);
		});

	});
});

describe('DatepickerCalendar component Test Suite', () => {
	let props, wrapper;

	beforeEach(() => {

		props = {
			isCalendarOpen: false,
			toggleCalendar: () => {},
			handleConfirm: () => {},
			selectedDate: null,
			deliveryDate: null,
			isFullWidth: false
		};
		wrapper = shallow(<DatepickerCalendar {...props}/>);
	});

	describe('props check', () => {

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});

		test('render check',() => {
			expect(wrapper.type()).not.toEqual(null);
		});

	});
});


