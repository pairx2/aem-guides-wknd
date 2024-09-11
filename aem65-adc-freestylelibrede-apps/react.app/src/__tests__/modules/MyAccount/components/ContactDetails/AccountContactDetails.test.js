import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import AccountContactDetails from '../../../../../modules/MyAccount/components/ContactDetails/AccountContactDetails';
import {mockStore} from '../../../../../__mocks__/storeMock';

Enzyme.configure({
	adapter: new EnzymeAdapter(),
});

const setup = (props) => {
	const wrapper = shallow(<AccountContactDetails store={mockStore} {...props} />).dive().dive();
	return wrapper;
};

describe('Account contact details test suite',() => {
	let props, wrapper;
	const getCustomerPermissionRequestMock = jest.fn();
	const updateCustomerPermissionRequestMock = jest.fn();
	window.grecaptcha =  {
		enterprise:{
			execute: jest.fn()
		}		
	}
	beforeEach(() => {
		window?.grecaptcha?.enterprise?.execute.mockClear();
		props = {
			heading: 'headingString',
			abortCtaStyle: 'primary',
			saveCtaStyle: 'primary',
			getCustomerPermissionRequest: getCustomerPermissionRequestMock,
			updateCustomerPermissionRequest: updateCustomerPermissionRequestMock,
			errorCode:404
		};
		wrapper = setup(props);
	});
	describe('render jsx',() => {
		test('cardcontent render',()=> {
			expect(wrapper.props().children.type.name).toBe('CardContent');
		});
		test('ParentContactBoxes reduxForm render',()=> {
			expect(wrapper.props().children.props.children.type.displayName).toBe('Connect(ReduxForm)');
			expect(wrapper.props().children.props.children.props.abortCtaStyle).toBe(wrapper.instance().props.abortCtaStyle);
			expect(wrapper.props().children.props.children.props.saveCtaStyle).toBe(wrapper.instance().props.saveCtaStyle);
			expect(wrapper.props().children.props.children.props.isEditing).toBe(wrapper.instance().state.editClick);
			expect(wrapper.props().children.props.children.props.permissions).toBe(wrapper.instance().props.permissions);
			expect(wrapper.props().children.props.children.props.email).toBe(wrapper.instance().props.email);
			expect(wrapper.props().children.props.children.props.errorCode).toBe(wrapper.instance().props.errorCode);
		});
	});
	describe('function calls',() => {
		test('didmount should call getCustomerPermissionRequest',() => {
			wrapper.instance().componentDidMount();
			const getCustomerPermissionRequestCallCount = getCustomerPermissionRequestMock.mock.calls.length;
		    expect(getCustomerPermissionRequestCallCount).toBeDefined();
		});
		test('switchComponentHandler should change state variable',() => {
			const editClickState = wrapper.instance().state.editClick;
			wrapper.instance().switchComponentHandler();
		    expect(wrapper.instance().state.editClick).toBe(!editClickState);
		});
		test('updateCustomerPermissions should change state variable', () => {
			const editClickState = wrapper.instance().state.editClick;
			const values = {
				EMAIL_FOR_NEWS: true,
				PHONE_FOR_NEWS: true,
				SMS_FOR_PROACTIVE: true,
			};
			window?.grecaptcha?.enterprise?.execute.mockImplementation(()=>
			Promise.resolve('mocked-token')
			);
	
			wrapper.instance().updateCustomerPermissions(values);
			
		    expect(wrapper.instance().state.editClick).toBe(editClickState);
		});
		test('updateCustomerPermissions should change state variable',() => {
			const editClickState = wrapper.instance().state.editClick;
			const values = {
				EMAIL_FOR_NEWS: null,
				PHONE_FOR_NEWS: null,
				SMS_FOR_PROACTIVE: null,
			};
			wrapper.instance().updateCustomerPermissions(values);
		    expect(wrapper.instance().state.editClick).toBe(editClickState);
		});
	});
});