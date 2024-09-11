import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import {mockStore} from '../../../../../__mocks__/storeMock';
import CouponCodeModal from '../../../../../modules/Cart/components/CouponCodeModal/CouponCodeModal';
import {Provider} from 'react-redux';

Enzyme.configure({
	adapter: new EnzymeAdapter(),
});
const setup = (props) => {
	const wrapper = shallow(<CouponCodeModal store={mockStore} {...props} />);
	return wrapper;
};

describe('ConfirmationPageErrorModal component Test Suite', () => {
	let props, wrapper;
	beforeEach(() => {
		props = {
			closeModalAction: jest.fn(),
			modalProps: {
				couponCode: 'couponCode',
				couponValue: 234,
				confirmCtaStyling: 'primary',
				couponCurrency: 'emailCTAStyle'
			}
		};
		wrapper = setup(props);
	});
	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});
	test('has modalProps as prop', () => {
		const modalProps = wrapper.dive().props().modalProps;
		expect(modalProps).toBeInstanceOf(Object);
	});
	test('closeModalActionMock test', () => {
		const closeModalActionMock = wrapper.dive().props().closeModalAction;
		expect(typeof closeModalActionMock).toBe('function');
	});
});

describe('ConfirmationPageErrorModal component Test Suite', () => {
	let props, wrapper;
	beforeEach(() => {
		props = {
			closeModalAction: jest.fn(),
			modalProps: {
				couponCode: 'couponCode',
				couponValue: 343,
				confirmCtaStyling: 'secondary',
				couponCurrency: 'emailCTAStyle'
			}
		};
		wrapper = mount(<Provider store={mockStore} ><CouponCodeModal {...props} /></Provider>);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});
});