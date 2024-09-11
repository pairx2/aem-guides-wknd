import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import {mockStore, mockStoreOrder} from '../../../../../__mocks__/storeMock';
import CustomerInfoDisplay from '../../../../../modules/MyAccount/components/CustomerInfo/CustomerInfoDisplay';
import {Provider} from 'react-redux';

Enzyme.configure({
	adapter: new EnzymeAdapter(),
});

const setup = (props) => {
	const wrapper = shallow(<CustomerInfoDisplay store={mockStore} {...props} />).dive().dive();
	return wrapper;
};

const customer1 = {
	'id':200998,
	'dob':'1990-10-10',
	'measurement':'101',
	'mobile_phone':'+49 176 11111111',
	'temporary_mobile_number':'+49 176 11111111',
	'landline_phone':'+49 176 11 11111111',
	'payer_institution_name':'test payers Swapna6',
	'payer_number':null,
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
	'disable_mobile_popup' : true,
	'is_social': false
};
const customer2 = {
	'id':200998,
	'dob':'1990-10-10',
	'measurement':'101',
	'mobile_phone':'+49 176 11111111',
	'temporary_mobile_number':'+49 176 11112211',
	'landline_phone':'+49 176 11 11111111',
	'payer_institution_name':'test payers Swapna6',
	'payer_number':null,
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
	'disable_mobile_popup' : true,
	'is_social': false
};
const customer3 = {
	'id':200998,
	'dob':'1990-10-10',
	'measurement':'101',
	'mobile_phone':'+49 176 11111111',
	'temporary_mobile_number':null,
	'landline_phone':'+49 176 11 11111111',
	'payer_institution_name':'test payers Swapna6',
	'payer_number':null,
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
	'disable_mobile_popup' : true,
	'is_social': false
};
const customer4 = {
	'id':200998,
	'dob':'1990-10-10',
	'measurement':'101',
	'mobile_phone':'+33 176 11111111',
	'temporary_mobile_number':null,
	'landline_phone':'+49 176 11 11111111',
	'payer_institution_name':'test payers Swapna6',
	'payer_number':null,
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
	'disable_mobile_popup' : true,
	'is_social': false
};
const customer5 = {
	'id':200998,
	'dob':'1990-10-10',
	'measurement':'101',
	'mobile_phone': null,
	'temporary_mobile_number':null,
	'landline_phone':'+49 176 11 11111111',
	'payer_institution_name':'test payers Swapna6',
	'payer_number':null,
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
	'disable_mobile_popup' : true,
	'is_social': false
};

describe('CustomerInfo component Test Suite ', () => {
	let props, wrapper;
	const editCustomerInfoMock = jest.fn();
	const verifyMobileMock = jest.fn();
	beforeEach(() => {
		props = {
			editCustomerInfo: editCustomerInfoMock,
			verifyMobile: verifyMobileMock,
			customer: {},
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
	});
});
describe('CustomerInfo component Test Suite ', () => {
	let props, wrapper;
	const editCustomerInfoMock = jest.fn();
	const verifyMobileMock = jest.fn();
	beforeEach(() => {
		props = {
			editCustomerInfo: editCustomerInfoMock,
			verifyMobile: verifyMobileMock,
			customer: customer1,
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
	});
});
describe('CustomerInfo component Test Suite ', () => {
	let props, wrapper;
	const editCustomerInfoMock = jest.fn();
	const verifyMobileMock = jest.fn();
	beforeEach(() => {
		props = {
			editCustomerInfo: editCustomerInfoMock,
			verifyMobile: verifyMobileMock,
			customer: customer1,
		};
		wrapper = mount(<Provider store={mockStore}><CustomerInfoDisplay {...props} /></Provider>);
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
describe('CustomerInfo component Test Suite ', () => {
	let props, wrapper;
	const editCustomerInfoMock = jest.fn();
	const verifyMobileMock = jest.fn();
	beforeEach(() => {
		props = {
			editCustomerInfo: editCustomerInfoMock,
			verifyMobile: verifyMobileMock,
			customer: customer2,
		};
		wrapper = mount(<Provider store={mockStore}><CustomerInfoDisplay {...props} /></Provider>);
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
describe('CustomerInfo component Test Suite ', () => {
	let props, wrapper;
	const editCustomerInfoMock = jest.fn();
	const verifyMobileMock = jest.fn();
	beforeEach(() => {
		props = {
			editCustomerInfo: editCustomerInfoMock,
			verifyMobile: verifyMobileMock,
			customer: customer3,
		};
		wrapper = mount(<Provider store={mockStore}><CustomerInfoDisplay {...props} /></Provider>);
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
describe('CustomerInfo component Test Suite ', () => {
	let props, wrapper;
	const editCustomerInfoMock = jest.fn();
	const verifyMobileMock = jest.fn();
	beforeEach(() => {
		props = {
			editCustomerInfo: editCustomerInfoMock,
			verifyMobile: verifyMobileMock,
			customer: customer4,
		};
		wrapper = mount(<Provider store={mockStore}><CustomerInfoDisplay {...props} /></Provider>);
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
describe('CustomerInfo component Test Suite ', () => {
	let props, wrapper;
	const editCustomerInfoMock = jest.fn();
	const verifyMobileMock = jest.fn();
	beforeEach(() => {
		props = {
			editCustomerInfo: editCustomerInfoMock,
			verifyMobile: verifyMobileMock,
			customer: customer5,
		};
		wrapper = mount(<Provider store={mockStore}><CustomerInfoDisplay {...props} /></Provider>);
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
describe('CustomerInfo component Test Suite ', () => {
	let props, wrapper;
	const editCustomerInfoMock = jest.fn();
	const verifyMobileMock = jest.fn();
	beforeEach(() => {
		props = {
			editCustomerInfo: editCustomerInfoMock,
			verifyMobile: verifyMobileMock,
			customer: customer1,
		};
		wrapper = mount(<Provider store={mockStoreOrder}><CustomerInfoDisplay {...props} /></Provider>);
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
