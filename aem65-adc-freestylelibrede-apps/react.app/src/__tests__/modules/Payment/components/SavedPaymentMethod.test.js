import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import SavedPaymentMethod from '../../../../modules/Payment/components/SavedPaymentMethod';

jest.mock('../../../../utils/translationUtils.js');

Enzyme.configure({
	adapter: new EnzymeAdapter(),
	// disableLifecycleMethods: true
});

describe('SavedPaymentMethod Component Test Suite -payon_credit_card method', () => {
	let props;
	let wrapper;
	const selectMock = jest.fn();
	beforeEach(() => {
		props = {
			method: 'payon_credit_card',
			token: 'token',
			expiry:  'expiry',
			last4Digits: '1234',
			isSelected: true,
			select: selectMock
		};
		wrapper = shallow(<SavedPaymentMethod {...props} />);

	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
	test('onclick',() =>{
		const divonClick = wrapper.find('div').at(0);
		divonClick.simulate('click');
		const selectMockCount = selectMock.mock.calls.length;
		expect(selectMockCount).not.toBe(0);
	});

});
describe('SavedPaymentMethod Component Test Suite -open_invoice method', () => {
	let props;
	let wrapper;
	const selectMock = jest.fn();
	beforeEach(() => {
		props = {
			method: 'open_invoice',
			token: 'token',
			expiry:  'expiry',
			last4Digits: '1234',
			isSelected: true,
			select: selectMock
		};
		wrapper = shallow(<SavedPaymentMethod {...props} />);

	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

});
describe('SavedPaymentMethod Component Test Suite -payon_paypal method', () => {
	let props;
	let wrapper;
	const selectMock = jest.fn();
	beforeEach(() => {
		props = {
			method: 'payon_paypal',
			token: 'token',
			expiry:  'expiry',
			last4Digits: '1234',
			isSelected: true,
			select: selectMock
		};
		wrapper = shallow(<SavedPaymentMethod {...props} />);

	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

});
describe('SavedPaymentMethod Component Test Suite -payon_sofort method', () => {
	let props;
	let wrapper;
	const selectMock = jest.fn();
	beforeEach(() => {
		props = {
			method: 'payon_sofort',
			token: 'token',
			expiry:  'expiry',
			last4Digits: '1234',
			isSelected: true,
			select: selectMock
		};
		wrapper = shallow(<SavedPaymentMethod {...props} />);

	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

});
describe('SavedPaymentMethod Component Test Suite - unknown method', () => {
	let props;
	let wrapper;
	const selectMock = jest.fn();
	beforeEach(() => {
		props = {
			method: 'unknown',
			token: 'token',
			expiry:  'expiry',
			last4Digits: null,
			isSelected: false,
			select: selectMock
		};
		wrapper = shallow(<SavedPaymentMethod {...props} />);

	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

});

describe('SavedPaymentMethod Component Test Suite -payon_credit_card method', () => {
	let props;
	let wrapper;
	const selectMock = jest.fn();
	beforeEach(() => {
		props = {
			method: 'payon_credit_card',
			token: 'token',
			expiry:  'expiry',
			last4Digits: null,
			isSelected: true,
			select: selectMock
		};
		wrapper = shallow(<SavedPaymentMethod {...props} />);

	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
});