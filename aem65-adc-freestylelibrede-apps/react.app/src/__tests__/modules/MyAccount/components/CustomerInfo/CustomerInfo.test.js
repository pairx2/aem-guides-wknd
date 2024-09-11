import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import {mockStore, mockStoreOrder} from '../../../../../__mocks__/storeMock';
import CustomerInfo from '../../../../../modules/MyAccount/components/CustomerInfo/CustomerInfo';

Enzyme.configure({
	adapter: new EnzymeAdapter(),
});

const setup = (props) => {
	const wrapper = shallow(<CustomerInfo store={mockStore} {...props} />).dive().dive();
	return wrapper;
};

const setupTwo = (props) => {
	const wrapper = shallow(<CustomerInfo store={mockStoreOrder} {...props} />).dive().dive();
	return wrapper;
};

describe('CustomerInfo component Test Suite ', () => {
	let props, wrapper;
	const updateCustomerMock = jest.fn();
	const openModalActionMock = jest.fn();
	const closeModalActionMock = jest.fn();

	beforeEach(() => {
		props = {
			deactivateHeading: 'deactivateHeadingString',
			heading: 'headingString',
			deactivateDescription: 'deactivateDescriptionString',
			updateCustomer: updateCustomerMock,
			openModalAction: openModalActionMock,
			closeModalAction: closeModalActionMock,
			enableTechnicalTrainingPopUp: true
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
		test('customer object',() => {
			expect(typeof wrapper.instance().props.customer).toBe('object');
		});

		test('deactivateHeading object',() => {
			expect(typeof wrapper.instance().props.deactivateHeading).toBe('string');
		});
		test('heading object',() => {
			expect(typeof wrapper.instance().props.heading).toBe('string');
		});
		test('deactivateDescription object',() => {
			expect(typeof wrapper.instance().props.deactivateDescription).toBe('string');
		});

	});
	describe('method calls', () => {
		test('get title if deactivating state is false',() => {
			const title = wrapper.instance().getTitle();
			expect(title).toBe(wrapper.instance().props.heading);
		});
		test('get title if deactivating state is true',() => {
			//make deactivating true
			wrapper.instance().deactivateAccount();
			const titleTrue = wrapper.instance().getTitle();
			expect(titleTrue).toBe(wrapper.instance().props.deactivateHeading);
			//make it false again
			wrapper.instance().cancelDeactivateAccount();
			const titleFalse = wrapper.instance().getTitle();
			expect(titleFalse).toBe(wrapper.instance().props.heading);
		});
		test('check cancelDeactivateAccount method makes deactivating false',() =>{
			wrapper.instance().cancelDeactivateAccount();
			expect(wrapper.instance().state.deactivating).toBe(false);

		});

		test('check verifyMobile method makes deactivating false',() =>{
			wrapper.instance().verifyMobile();
			expect(wrapper.instance().state.editing).toBe(false);
		});

		test('editCustomerInfo function call in editCustomerInfo property of CustomerInfoDisplay',() =>{
			const actionProp = wrapper.props().children.props.children.props.children.props.editCustomerInfo;
			expect(typeof actionProp).toBe('function');

			actionProp(true);
			expect(wrapper.instance().state.editing).toBeTruthy();
		});

		test('editCustomerInfo function call in cancelEditCustomerInfo property of CustomerInfoEdit',() =>{
			wrapper.instance().setState({editing: true});
			const actionProp = wrapper.props().children.props.children.props.children[0].props.cancelEditCustomerInfo;
			expect(typeof actionProp).toBe('function');

			actionProp(false);
			expect(wrapper.instance().state.editing).toBeFalsy();

			const closeModalActionMockCallCount = closeModalActionMock.mock.calls.length;
			expect(closeModalActionMockCallCount).toBeDefined();
		});

		test('componentDidUpdate function call',() =>{
			const componentDidUpdateMock = wrapper.instance().componentDidUpdate;
			expect(typeof componentDidUpdateMock).toBe('function');

			wrapper.instance().componentDidUpdate();
			const openModalActionMockCallCount = openModalActionMock.mock.calls.length;
			expect(openModalActionMockCallCount).toBeDefined();
		});

	});
	describe('render jsx', () => {
		test('Card render',() => {
			expect(wrapper.props().children.type.displayName).toBe('withBreakpoints(CardRender)');
		});
		test('CardContent render',() => {
			expect(wrapper.props().children.props.children.type.name).toBe('CardContent');
		});
		test('CustomerInfoDisplay render if editing state is false',() => {
			wrapper.instance().editCustomerInfo(false);
			expect(wrapper.props().children.props.children.props.children.type.displayName).toBe('Connect(CustomerInfoDisplay)');
		});
		test('DeactivateAccount render if editing state is true and deactivating state is false',() => {
			//make editing state true
			wrapper.instance().editCustomerInfo(true);
			// making deactivating state true
			wrapper.instance().deactivateAccount();
			expect(wrapper.props().children.props.children.props.children[0].type.displayName).toBe('Connect(ReduxForm)');
			expect(typeof wrapper.props().children.props.children.props.children[0].props.cancelDeactivateAccount).toBe('function');
			expect(wrapper.props().children.props.children.props.children[0].props.deactivateDescription).toBe(wrapper.instance().props.deactivateDescription);
			wrapper.instance().cancelDeactivateAccount();


		});
		test('CustomerInfoEdit render if editing state is true and deactivating state is true',() => {
			//make editing state true
			wrapper.instance().editCustomerInfo(true);
			//deactivating state is false
			expect(wrapper.props().children.props.children.props.children[0].type.displayName).toBe('Connect(ReduxForm)');
			expect(typeof wrapper.props().children.props.children.props.children[0].props.cancelEditCustomerInfo).toBe('function');
			expect(typeof wrapper.props().children.props.children.props.children[0].props.deactivateAccount).toBe('function');

			wrapper.instance().editCustomerInfo(false);

		});

	});

});

describe('CustomerInfo component Test Suite ', () => {
	let props, wrapper;
	const updateCustomerMock = jest.fn();
	const openModalActionMock = jest.fn();
	const closeModalActionMock = jest.fn();
	const customer4 = {
		'id':200998,
		'dob':'1990-10-10',
		'measurement':'101',
		'mobile_phone':null,
		'temporary_mobile_number':null,
		'landline_phone':'+49 176 11 11111111',
		'payer_institution_name':'test payers Swapna6',
		'payer_number':555555560,
		'health_insurance_number':'Q849505609',
		'account_type':0,
		'firstname':'Saurabh',
		'lastname':'Mishhra',
		'email':'786677@yopmail.com',
		'prefix':'Herr',
		'cs_first_shipment_shipped':true,
		'has_active_reimbursement':false,
		'prescription_reminder_sent':true,
		'last_cec_upload_date': '20171022',
		'is_cec_upload_allowed': true,
		'disable_mobile_popup' : false,
		'is_social': false, 
		'data_processing': false,
		'technical_instructions': [
			{
				"product_version": "FreeStyleLibre v.3",
				"status": "Not Completed",
				"tech_training_reminder_popup": true,
				"__typename": "AdcTechnicalTrainingDetails"
			}
		]
	};
	beforeEach(() => {
		props = {
			deactivateHeading: 'deactivateHeadingString',
			heading: 'headingString',
			deactivateDescription: 'deactivateDescriptionString',
			updateCustomer: updateCustomerMock,
			openModalAction: openModalActionMock,
			closeModalAction: closeModalActionMock,
			enableTechnicalTrainingPopUp: true
		};
		wrapper = setupTwo(props);
	});

	test('renders without crashing', () => {
		
		expect(wrapper).toBeDefined();
	});

	test('componentDidUpdate function call',() =>{
		localStorage.setItem('otpModal', 'false');
		sessionStorage.setItem('dataConsentModal', 'false')
		const componentDidUpdateMock = wrapper.instance().componentDidUpdate;
		expect(typeof componentDidUpdateMock).toBe('function');

		wrapper.instance().componentDidUpdate();

		const updateCustomerMockCallCount = updateCustomerMock.mock.calls.length;
		expect(updateCustomerMockCallCount).toBeDefined();

		const openModalActionMockCallCount = openModalActionMock.mock.calls.length;
		expect(openModalActionMockCallCount).toBeDefined();
	});
	test('componentDidUpdate function call without param',() =>{
		wrapper.setProps({customer: customer4});
		wrapper.setState({editing: false});
		localStorage.setItem('otpModal', 'true');
		const componentDidUpdateMock = wrapper.instance().componentDidUpdate;
		expect(typeof componentDidUpdateMock).toBe('function');

		wrapper.instance().componentDidUpdate();

		const updateCustomerMockCallCount = updateCustomerMock.mock.calls.length;
		expect(updateCustomerMockCallCount).toBeDefined();

		const openModalActionMockCallCount = openModalActionMock.mock.calls.length;
		expect(openModalActionMockCallCount).toBeDefined();
	});

	test('componentDidUpdate function call for dataconsent modal',() =>{
		wrapper.setState({dataConsentModal: true})
		wrapper.setState({editing: false})
		localStorage.setItem('otpModal', 'true');
		sessionStorage.setItem('techTrainingPopup', 'true')
		sessionStorage.setItem('dataConsentModal', 'true')
		const componentDidUpdateMock = wrapper.instance().componentDidUpdate;
		expect(typeof componentDidUpdateMock).toBe('function');

		wrapper.instance().componentDidUpdate();

		const updateCustomerMockCallCount = updateCustomerMock.mock.calls.length;
		expect(updateCustomerMockCallCount).toBeDefined();

		const openModalActionMockCallCount = openModalActionMock.mock.calls.length;
		expect(openModalActionMockCallCount).toBeDefined();
	});

	test('componentDidUpdate function call for techtraining modal',() =>{
		wrapper.setProps({customer: customer4});
		wrapper.setState({dataConsentModal: false})
		wrapper.setState({editing: false})
		localStorage.setItem('otpModal', 'false');
		sessionStorage.setItem('techTrainingPopup', true)
		sessionStorage.setItem('dataConsentModal', 'false')
		const componentDidUpdateMock = wrapper.instance().componentDidUpdate;
		expect(typeof componentDidUpdateMock).toBe('function');

		wrapper.instance().componentDidUpdate();

		const updateCustomerMockCallCount = updateCustomerMock.mock.calls.length;
		expect(updateCustomerMockCallCount).toBeDefined();

		const openModalActionMockCallCount = openModalActionMock.mock.calls.length;
		expect(openModalActionMockCallCount).toBeDefined();
	});
	
	test('handleNextModal function', () =>{
		expect(wrapper.instance().handleNextModal()).not.toEqual(null);
	})

	test('handleDataConsentModal function', () =>{
		expect(wrapper.instance().handleDataConsentModal()).not.toEqual(null);
	})

});
