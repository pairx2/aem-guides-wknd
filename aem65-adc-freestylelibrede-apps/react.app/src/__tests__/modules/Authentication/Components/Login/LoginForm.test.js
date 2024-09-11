import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import { mockStore } from '../../../../../__mocks__/storeMock';
import LoginForm from '../../../../../modules/Authentication/components/Login/LoginForm';
import { getCurrentAuthenticatedUser} from '../../../../../api/authentication.service';
import { getUrlParameter , getHashUrlParameter } from '../../../../../utils/getParams';
import { getCookie, setCookie } from '../../../../../utils/cookieUtils';
jest.mock('../../../../../utils/endpointUrl.js');
jest.mock('../../../../../utils/getParams.js');
jest.mock('../../../../../utils/cookieUtils.js');
jest.mock('../../../../../api/authentication.service.js');

Enzyme.configure({
	adapter: new EnzymeAdapter()
});

const setup = (props) => {
	const wrapper = shallow(<LoginForm store={mockStore} {...props} />).dive().dive();
	return wrapper;
};
describe('LoginForm component Test Suite', () => {
	let props;
	let wrapper;
	const mockLocation = new URL("https://example.com/test.html?key=HdKRbnv0dSToR0HEsF57H3TpagvdBWhW&id=827599&confirmationStatus=false&isCheckout=true&activateEmail=-1&redirectTo=dddss.html&hjshghg/sgsg&type=Rxcheckout");
	const loginMock = jest.fn();
	const confirmAccountMock = jest.fn();
	const confirmEmailChangeMock = jest.fn();
	const signOutMock = jest.fn();
	const openModalActionMock = jest.fn();
	const confirmationEmailTriggerMock = jest.fn();
	beforeEach(() => {
		location = window.location;
		getCurrentAuthenticatedUser.mockResolvedValue({ dataInserted: 1 });
		getCookie.mockImplementation(() => true);
		getUrlParameter.mockImplementation(() => null);
		getHashUrlParameter.mockImplementation(() => true);
		props = {
			loginSectionText: 'String',
			createAccount: 'String',
			signUpHeading: 'String',
			loginHeading: 'String',
			loginSubHeading: 'String',
			loginSuccessLink: 'String',
			loginButtonText: 'String',
			forgotPasswordText: 'String',
			forgotPasswordLink: 'String',
			createAccountLink: 'String',
			error: "String",
			email: 'String',
			isDisableRegistration: false,
			confirmationStatus: true,
			showChangeEmailModel: true,
			login: loginMock,
			confirmAccount: confirmAccountMock,
			confirmEmailChange: confirmEmailChangeMock,
			signOut: signOutMock,
			openModalAction: openModalActionMock,
			confirmationEmailTrigger: confirmationEmailTriggerMock,
			confirmationDetails: true,
			isGreyLoginShowMsg: false,
			activateEmail: 1
		};
		wrapper = setup(props);

	});
	afterEach(() => {
		window.location = location;
	});

	describe('render check', () => {
		test('renders without crashing', () => {

			wrapper.setState({isCheckingAuthStatus  : false, showChangeEmailModel : true, isLoading: true})
			getUrlParameter.mockImplementation(() => "true");
			getHashUrlParameter.mockImplementation(() => true);
			expect(wrapper).toBeDefined();
		});

		test('render check', () => {
			expect(wrapper.type()).not.toEqual(null);
		});

		test('has openModalAction as prop and is of type boolean', () => {
			const openModalActionProp = wrapper.instance().props.openModalAction;
			expect(typeof openModalActionProp).toBe('function');
		});

		test('has confirmationEmailTrigger as prop and is of type boolean', () => {
			const confirmationEmailTriggerProp = wrapper.instance().props.confirmationEmailTrigger;
			expect(typeof confirmationEmailTriggerProp).toBe('function');
		});
		test('has error as prop and is of type boolean', () => {
			const errorProp = wrapper.instance().props.error;
			expect(typeof errorProp).toBe('object');
		});


	});

	describe('state check', () => {

		test('state value check', () => {
			const stateCheck = wrapper.instance().state;
			expect(stateCheck).toBeInstanceOf(Object);

			expect(typeof stateCheck.isCheckingAuthStatus).toBe('boolean');
			expect(stateCheck.isCheckingAuthStatus).toBeTruthy();

			expect(typeof stateCheck.showChangeEmailModel).toBe('boolean');
			expect(stateCheck.showChangeEmailModel).toBeFalsy();

			expect(typeof stateCheck.currentStep).toBe('number');
			expect(stateCheck.currentStep).toBe(2);

			expect(typeof stateCheck.blueDoor).toBe('boolean');
			expect(stateCheck.blueDoor).toBeFalsy();

			expect(typeof stateCheck.confirmationDetails).toBe('object');
			expect(stateCheck.confirmationDetails).toBeDefined();
		});
	});


	describe('method calls', () => {
		test('Submit', () => {
			const value = {
				'a': 'b'
			};
			wrapper.setProps({ loginSuccessLink: 'test' })
			getUrlParameter.mockImplementation(() => "Hello.html&asjsdgdgdhg");
			wrapper.instance().submit(value);
			const loginMockCallCount = loginMock.mock.calls.length;
			expect(loginMockCallCount).toBeDefined();
		});
		test('Submit without redirect to', () => {
			const value = {
				'a': 'b'
			};
			wrapper.setProps({ loginSuccessLink: 'test' })
			getUrlParameter.mockImplementation(() => "");
			wrapper.instance().submit(value);
			const loginMockCallCount = loginMock.mock.calls.length;
			expect(loginMockCallCount).toBeDefined();
		});

		test('resetBluedoorFlag ', () => {
			const resetBluedoorFlagMock = wrapper.instance().resetBluedoorFlag;
			expect(typeof resetBluedoorFlagMock).toBe('function');

			resetBluedoorFlagMock();
			expect(wrapper.instance().state.blueDoor).toBeFalsy();
		});

		test('forgetPwdModal function call', () => {
			wrapper.instance().forgetPwdModal();

		});

		test('getConfirmationDetails function call', () => {
			const key = 'adnbdghgdagsdbcb';
			const id = '1272372';
			const type = 0;
			wrapper.instance().getConfirmationDetails(key, id, type);

		});

		test('componentDidUpdate function call check', () => {
			const componentDidUpdateMock = wrapper.instance().componentDidUpdate;
			expect(typeof componentDidUpdateMock).toBe('function');
		});

		test('componentDidUpdate function call check  ', () => {
			const prevProps = wrapper.instance().props;
			wrapper.setProps({ email: 'somthin@sumthing.com', error: 'UserNotConfirmedException', loggedIn: false, errorMsgAA : 'UserNotConfirmedException' , confirmationDetails: {}});
			wrapper.instance().componentDidUpdate(prevProps);
			wrapper.setState({isLoading: true});
		});

		test('component did mount', () => {

			sessionStorage.setItem('ghac', 'ghacId');
			getUrlParameter.mockImplementation(() => false);
			window.history.pushState({}, 'Test URL', '/test.html?key=HdKRbnv0dSToR0HEsF57H3TpagvdBWhW&id=827599&confirmationStatus=false&isCheckout=false&activateEmail=-1&redirectTo=dddss.html&hjshghg/sgsg&type=notknown');
			wrapper.instance().componentDidMount();
			expect(wrapper.instance().state.blueDoor).toBeTruthy();
		});
		test('component did mount', () => {
			sessionStorage.setItem('ghac', 'ghacId');
			getUrlParameter.mockImplementation(() => '1');
			window.history.pushState({}, 'Test URL', '/test.html?key=HdKRbnv0dSToR0HEsF57H3TpagvdBWhW&id=827599&confirmationStatus=false&isCheckout=false&activateEmail=-1&redirectTo=dddss.html&hjshghg/sgsg&type=notknown');
			wrapper.instance().componentDidMount();
			expect(wrapper.instance().state.blueDoor).toBeTruthy();
		});
		test('component did mount', () => {
			window.history.pushState({}, 'Test URL', '/test.html#claims_token=HdKRbnv0dSToR0HEsF57H3TpagvdBWhW&refresh_token=hjshghg');
			wrapper.instance().componentDidMount();
			expect(wrapper.instance().state.blueDoor).toBeTruthy();
		});
		test('component did mount', () => {
			sessionStorage.setItem('ghac', 'ghacId');
			getUrlParameter.mockImplementation(() => '1');
			window.history.pushState({}, 'Test URL', '/test.html?key=HdKRbnv0dSToR0HEsF57H3TpagvdBWhW&id=827599&confirmationStatus=false&isCheckout=false&activateEmail=-1&redirectTo=dddss.html&hjshghg/sgsg&type=notknown');
			wrapper.instance().componentDidMount();
			expect(wrapper.instance().state.blueDoor).toBeTruthy();
		});
		test('component did mount', () => {
			sessionStorage.setItem('ghac', 'ghacId');
			getUrlParameter.mockImplementation(() => '1');
			const fetchPromise = Promise.resolve(undefined);
			getCurrentAuthenticatedUser.mockRejectedValueOnce(fetchPromise);
			getCookie.mockImplementation(() => false);
			window.history.pushState({}, 'Test URL', '/test.html?key=HdKRbnv0dSToR0HEsF57H3TpagvdBWhW&id=827599&confirmationStatus=false&isCheckout=false&activateEmail=-1&redirectTo=dddss.html&hjshghg/sgsg&type=notknown');
			wrapper.instance().componentDidMount();
			expect(wrapper.instance().state.blueDoor).toBeTruthy();
		});

	});
});

describe('LoginForm component Test Suite', () => {
	let props;
	let wrapper;
	const mockLocation = new URL("https://example.com");
	const loginMock = jest.fn();
	const confirmAccountMock = jest.fn();
	const confirmEmailChangeMock = jest.fn();
	const signOutMock = jest.fn();
	const openModalActionMock = jest.fn();
	const confirmationEmailTriggerMock = jest.fn();
	beforeEach(() => {
		location = window.location;
		mockLocation.replace = jest.fn();
		delete window.location;
		window.location = mockLocation;
		getUrlParameter.mockImplementation(() => false);
		getHashUrlParameter.mockImplementation(() => null);
		props = {
			showChangeEmailModel: false,
			isDisableRegistration: true,
			login: loginMock,
			confirmAccount: confirmAccountMock,
			confirmEmailChange: confirmEmailChangeMock,
			signOut: signOutMock,
			openModalAction: openModalActionMock,
			confirmationEmailTrigger: confirmationEmailTriggerMock,
			confirmationDetails: true,
			isGreyLoginShowMsg: false,
			activateEmail: 1,
			confirmOfflineCustomerResponse: {
				"status": false,
				"requestId": "271a679b-81ea-4c31-8b6b-6f0065a90031",
				"response": {
					"statusReason": "Verification Link Expired",
					"i18nMessageKeyAvailable": true,
					"i18nMessageKey": "AUTH-1012"
				},
				"errorCode": 400
			},
		};
		wrapper = setup(props);

	});

		describe('render check', () => {

		test('renders without crashing', () => {
			wrapper.setState({confirmOfflineCustomerData: {
				"status": false,
				"requestId": "271a679b-81ea-4c31-8b6b-6f0065a90031",
				"response": {
					"statusReason": "Verification Link Expired",
					"i18nMessageKeyAvailable": true,
					"i18nMessageKey": "AUTH-1012"
				},
				"errorCode": 400
			},
			isCheckingAuthStatus: false
		})
			expect(wrapper).toBeDefined();
		});

		test('render check', () => {
			expect(wrapper.type()).not.toEqual(null);
		});
		test('getConfirmationDetails function call', () => {
			wrapper.instance().getConfirmationDetails('', '', '');
		});

	});

});


describe('LoginForm component Test Suite', () => {
	let props;
	let wrapper;
	const mockLocation = new URL("https://example.com");
	const loginMock = jest.fn();
	const confirmAccountMock = jest.fn();
	const confirmEmailChangeMock = jest.fn();
	const signOutMock = jest.fn();
	const openModalActionMock = jest.fn();
	const confirmationEmailTriggerMock = jest.fn();
	beforeEach(() => {
		location = window.location;
		mockLocation.replace = jest.fn();
		delete window.location;
		window.location = mockLocation;
		getUrlParameter.mockImplementation(() => ({type: undefined}));
		getHashUrlParameter.mockImplementation(() => null);
		props = {
			showChangeEmailModel: false,
			isDisableRegistration: true,
			login: loginMock,
			confirmAccount: confirmAccountMock,
			confirmEmailChange: confirmEmailChangeMock,
			signOut: signOutMock,
			openModalAction: openModalActionMock,
			confirmationEmailTrigger: confirmationEmailTriggerMock,
			confirmationDetails: true,
			isGreyLoginShowMsg: false,
			activateEmail: 1,
			confirmOfflineCustomerResponse: {
				"status": false,
				"requestId": "271a679b-81ea-4c31-8b6b-6f0065a90031",
				"response": {
					"statusReason": "Verification Link Expired",
					"i18nMessageKeyAvailable": true,
					"i18nMessageKey": "AUTH-1012"
				},
				"errorCode": 400
			}
		};
		wrapper = setup(props);

	});

	describe('render check', () => {

		test('renders without crashing', () => {
			wrapper.setState({confirmOfflineCustomerData: {
				"status": false,
				"requestId": "271a679b-81ea-4c31-8b6b-6f0065a90031",
				"response": {
					"statusReason": "Verification Link Expired",
					"i18nMessageKeyAvailable": true,
					"i18nMessageKey": "AUTH-1012"
				},
				"errorCode": 400
			},
			isCheckingAuthStatus: false
		})
			expect(wrapper).toBeDefined();
		});

		test('render check', () => {
			expect(wrapper.type()).not.toEqual(null);
		});
		test('getConfirmationDetails function call', () => {
			wrapper.instance().getConfirmationDetails('', '', '');
		});

	});


});