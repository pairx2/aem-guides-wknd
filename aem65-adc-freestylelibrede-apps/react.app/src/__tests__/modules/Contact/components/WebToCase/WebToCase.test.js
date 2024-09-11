import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import WebToCase from '../../../../../modules/Contact/components/WebToCase/WebToCase';
import {mockStore} from '../../../../../__mocks__/storeMock';
import {Provider} from 'react-redux';

jest.mock('../../../../../utils/endpointUrl.js');
jest.mock('../../../../../utils/siteData.js');

Enzyme.configure({
	adapter: new EnzymeAdapter(),
});

const setup = (props) => {
	const wrapper = shallow(<WebToCase store={mockStore} {...props} />).dive().dive().dive().dive().dive().dive().dive().dive().dive().dive().dive();
	return wrapper;
};

describe('WebToCase Component Test Suite', () => {
	let props, wrapper;

	beforeEach(() => {
		props = {
			values: {productCategory: {'value': 'products1'}},
			syncErrors: {},
			productCategoryTags: [{'value': 'products1'}],
			heading: 'heading',
			salesforceURL: 'salesforceURL',
			salesforceOrgId: 'salesforceOrgId',
			privacyPolicy: 'privacyPolicy',
			salutationID: 'salutationID',
			firstNameID: 'firstNameID',
			lastNameID: 'lastNameID',
			kvnrID: 'kvnrID',
			customerID: 'customerID',
			emailID: 'emailID',
			zipcodeID: 'zipcodeID',
			streetID: 'streetID',
			cityID: 'cityID',
			productCategoryID: 'productCategoryID',
			contactCategoryID: 'contactCategoryID',
			contactReasonID: 'contactReasonID',
			retURL: 'retURL',
			callBackCaseID: 'callBackCaseID',
			customer: {},
			dictionary: {}
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

	describe('Function calls', () => {

		test('buildFilterOptions function call for level ', () => {
			wrapper.instance().buildFilterOptions(1);
			wrapper.instance().buildFilterOptions(2);
			wrapper.instance().buildFilterOptions(3);
		});

		test('canSubmit function call', () => {
			wrapper.instance().canSubmit();
		});
	});
});

describe('WebToCase Component Test Suite with mount', () => {

	let props;
	let wrapper;

	beforeEach(() => {
		props = {
			values: {productCategory: {'value': 'products1'}},
			syncErrors: {},
			productCategoryTags: [{'value': 'products1'}],
			heading: 'heading',
			salesforceURL: 'salesforceURL',
			salesforceOrgId: 'salesforceOrgId',
			privacyPolicy: 'privacyPolicy',
			salutationID: 'salutationID',
			firstNameID: 'firstNameID',
			lastNameID: 'lastNameID',
			kvnrID: 'kvnrID',
			customerID: 'customerID',
			emailID: 'emailID',
			zipcodeID: 'zipcodeID',
			streetID: 'streetID',
			cityID: 'cityID',
			productCategoryID: 'productCategoryID',
			contactCategoryID: 'contactCategoryID',
			contactReasonID: 'contactReasonID',
			retURL: 'retURL',
			callBackCaseID: 'callBackCaseID',
			customer: {},
			dictionary: {}
		};
		wrapper = mount(<Provider store= {mockStore}><WebToCase {...props}/></Provider>);
	});

	describe('propTypes check', () => {

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});
	});
});
describe('WebToCase Component Test Suite with mount', () => {

	let props;
	let wrapper;

	beforeEach(() => {
		props = {
			values: {productCategory: {'value': 'products1'}},
			syncErrors: {},
			productCategoryTags: null,
			heading: 'heading',
			salesforceURL: 'salesforceURL',
			salesforceOrgId: 'salesforceOrgId',
			privacyPolicy: null,
			salutationID: 'salutationID',
			firstNameID: 'firstNameID',
			lastNameID: 'lastNameID',
			kvnrID: 'kvnrID',
			customerID: 'customerID',
			emailID: 'emailID',
			zipcodeID: 'zipcodeID',
			streetID: 'streetID',
			cityID: 'cityID',
			productCategoryID: 'productCategoryID',
			contactCategoryID: 'contactCategoryID',
			contactReasonID: 'contactReasonID',
			retURL: 'retURL',
			callBackCaseID: 'callBackCaseID',
			customer: {},
			dictionary: {}
		};
		wrapper = mount(<Provider store= {mockStore}><WebToCase {...props}/></Provider>);
	});

	describe('propTypes check', () => {

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});
	});
});