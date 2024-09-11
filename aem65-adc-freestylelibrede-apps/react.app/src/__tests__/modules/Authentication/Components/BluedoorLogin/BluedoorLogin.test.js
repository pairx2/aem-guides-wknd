import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import BluedoorLogin from '../../../../../modules/Authentication/components/BluedoorLogin/BluedoorLogin';
import {mockStore} from '../../../../../__mocks__/storeMock';
import {setCookie, deleteCookie} from '../../../../../utils/cookieUtils';

Enzyme.configure({
	adapter: new EnzymeAdapter()
});

const setup = (props) => {
	const wrapper = shallow(<BluedoorLogin store= {mockStore} {...props}/>).dive().dive().dive().dive().dive().dive().dive().dive().dive().dive().dive();
	return wrapper;
};

describe('BluedoorLogin Component Test Suite', () => {
	let  props, wrapper;
	const signOutMock= jest.fn();
	const getBluedoorCustomerRequestMock = jest.fn();

	beforeEach(() => {

		props= {
			heading: 'heading',
			instruction: 'instruction',
			blueDoorImage: 'blueDoorImage',
			buttonText: 'buttonText',
			information: 'information',
			loginSuccessLink: 'loginSuccessLink',
			errorCode: 222,
			bluedoorCustomer: {'bluedoorCustomer': 'bluedoorCustomer'},
			bluedoorValues: {'kvnr': 'V849505609', 'receiptId': 'QXtUR5'},
			signOut: signOutMock,
			getBluedoorCustomerRequest: getBluedoorCustomerRequestMock
		};

		wrapper= setup(props);
	});

	describe('Redux Props', () => {

		test('render check',() => {
			expect(wrapper.type()).not.toEqual(null);
		});

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});

		test('has getBluedoorCustomerRequest as prop and type check', () => {
			const getBluedoorCustomerRequestProp = wrapper.instance().props.getBluedoorCustomerRequest;
			expect(typeof getBluedoorCustomerRequestProp).toBe('function');
		});
		test('has heading as prop and is of type string', () => {
			const headingProp = wrapper.instance().props.heading;
			expect(typeof headingProp).toBe('string');
		});
		test('has instruction as prop and is of type string', () => {
			const instructionProp = wrapper.instance().props.instruction;
			expect(typeof instructionProp).toBe('string');
		});
		test('has blueDoorImage as prop and is of type string', () => {
			const blueDoorImageProp = wrapper.instance().props.blueDoorImage;
			expect(typeof blueDoorImageProp).toBe('string');
		});
		test('has buttonText as prop and is of type string', () => {
			const buttonTextProp = wrapper.instance().props.buttonText;
			expect(typeof buttonTextProp).toBe('string');
		});
		test('has information as prop and is of type string', () => {
			const informationProp = wrapper.instance().props.information;
			expect(typeof informationProp).toBe('string');
		});
		test('has loginSuccessLink as prop and is of type string', () => {
			const loginSuccessLinkProp = wrapper.instance().props.loginSuccessLink;
			expect(typeof loginSuccessLinkProp).toBe('string');
		});
		test('has errorCode as prop and is of type string', () => {
			const errorCodeProp = wrapper.instance().props.errorCode;
			expect(typeof errorCodeProp).toBe('number');
		});
		test('has bluedoorCustomer as prop and is of type string', () => {
			const bluedoorCustomerProp = wrapper.instance().props.bluedoorCustomer;
			expect(bluedoorCustomerProp).toBeInstanceOf(Object);
		});

	});

	describe('Functions check', () => {

		test ('bluedoorSubmit', () => {
			const values = {
				receiptId: 'QXtUR5',
				kvnr: 'V849505609'
			};
			wrapper.instance().bluedoorSubmit(values);

			const getBluedoorCustomerRequestMockCount = getBluedoorCustomerRequestMock.mock.calls.length;
			expect(getBluedoorCustomerRequestMockCount).toBeDefined();
		});

		test ('componentDidUpdate', () => {
			const prevProps = {bluedoorCustomer: null};
			wrapper.instance().componentDidUpdate(prevProps);
		});

		test('componentDidMount function call', () => {
			setCookie('isLoggedIn', true);
			const componentDidMountMock = wrapper.instance().componentDidMount;
			expect(typeof componentDidMountMock).toBe('function');

			wrapper.instance().componentDidMount();
			deleteCookie('isLoggedIn');
		});
	});
});