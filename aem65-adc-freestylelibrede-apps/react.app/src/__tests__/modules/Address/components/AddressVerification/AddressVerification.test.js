import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import {mockStore} from '../../../../../__mocks__/storeMock';
import AddressVerification from '../../../../../modules/Address/components/AddressVerification/AddressVerification';
jest.mock('../../../../../utils/pageTypeUtils.js');

Enzyme.configure({
	adapter: new EnzymeAdapter(),
});

const setup = (props) => {
	const wrapper = shallow(<AddressVerification store={mockStore} {...props} />).dive();
	return wrapper;
};

describe('AddressVerification component Test Suite ', () => {
	let props, wrapper;
	const closeModalMock = jest.fn();
	const acceptAddressMock = jest.fn();
	const acceptCorrectedRiskCheckAddressMock = jest.fn();

	beforeEach(() => {
		props = {
			closeModal: closeModalMock,
			message: 'message',
			acceptAddress: acceptAddressMock,
			acceptCorrectedRiskCheckAddress: acceptCorrectedRiskCheckAddressMock,
			section: 'registration',
			address:{
				street:'street',
				streetNumber:'10',
				zipcode:'22222',
				city:'Mainz'
			},
			communicationToken: 'communicationToken',
			methods: {
				CC: 'CC',
				SUE: 'SUE',
				sofort: 'sofort',
				OI: 'OI'
			},
			isOrderUpdate: false
		};
		wrapper = setup(props);
	});

	describe('props check', () => {

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});

		test('render check',() => {
			expect(wrapper.type()).not.toEqual(null);
		});

		test('All props  type check',() => {
			expect(typeof wrapper.instance().props.message).toBe('string');
			expect(typeof wrapper.instance().props.closeModal).toBe('function');
			expect(typeof wrapper.instance().props.acceptAddress).toBe('function');
			expect(typeof wrapper.instance().props.address).toBe('object');
			expect(typeof wrapper.instance().props.section).toBe('string');
			expect(typeof wrapper.instance().props.acceptCorrectedRiskCheckAddress).toBe('function');
			expect(typeof wrapper.instance().props.communicationToken).toBe('string');
			expect(typeof wrapper.instance().props.methods).toBe('object');
		});
	});

	describe('Functions check', () => {

		test('selectAddress check', () => {
			wrapper.instance().selectAddress();
		});
	});
});

describe('AddressVerification component Test Suite ', () => {
	let props, wrapper;
	const closeModalMock = jest.fn();
	const acceptAddressMock = jest.fn();
	const acceptCorrectedRiskCheckAddressMock = jest.fn();

	beforeEach(() => {
		props = {
			closeModal: closeModalMock,
			message: 'message',
			acceptAddress: acceptAddressMock,
			acceptCorrectedRiskCheckAddress: acceptCorrectedRiskCheckAddressMock,
			section: 'registration',
			address:{
				street:'street',
				streetNumber:'10',
				zipcode:'22222',
				city:'Mainz'
			},
			communicationToken: 'communicationToken',
			methods: {
				CC: 'CC',
				SUE: 'SUE',
				sofort: 'sofort',
				OI: 'OI'
			},
			isOrderUpdate: true
		};
		wrapper = setup(props);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('render check',() => {
		wrapper.instance().selectAddress();

		const acceptCorrectedRiskCheckAddressMockCount = acceptCorrectedRiskCheckAddressMock.mock.calls.length;
		expect(acceptCorrectedRiskCheckAddressMockCount).toBeDefined();
	});
});