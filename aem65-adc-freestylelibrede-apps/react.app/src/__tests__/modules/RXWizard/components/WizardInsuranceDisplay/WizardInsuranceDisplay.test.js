import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import {mockStore, mockStoreOrder} from '../../../../../__mocks__/storeMock';

import WizardInsuranceDisplay from '../../../../../modules/RXWizard/components/WizardInsuranceDisplay/WizardInsuranceDisplay';
import NoInsuranceDetails from '../../../../../modules/MyAccount/components/InsuranceDisplayEdit/NoInsuranceDetails';

jest.mock('../../../../../utils/endpointUrl.js');

Enzyme.configure({
	adapter: new EnzymeAdapter(),
});

const setup = (props) => {
	const wrapper = shallow(<WizardInsuranceDisplay store={mockStore} {...props} />).dive().dive();
	return wrapper;
};

const setupTwo = (props) => {
	const wrapper = shallow(<WizardInsuranceDisplay store={mockStoreOrder} {...props} />).dive().dive();
	return wrapper;
};

describe('WizardInsuranceDisplay test suite',() => {
	let props, wrapper;
	const getCustomerCartRequestMock = jest.fn();
	const getSickFundsMock = jest.fn();
	const updateInsuranceRequestMock = jest.fn();

	beforeEach(() => {
		props = {
			getCustomerCartRequest:getCustomerCartRequestMock ,
			updateInsuranceRequest: updateInsuranceRequestMock ,
			getSickFunds: getSickFundsMock ,
			heading: 'headingString',
			infoIcon: 'infoIconString',
			noInsuranceDescription: 'noInsuranceDescriptionString',
			noInsuranceHeading: 'noInsuranceHeadingString',
			noInsuranceIcon: 'noInsuranceIconString',
			secureDataMessage: 'secureDataMessageString',
			secureIcon: 'secureIconString',
			redirectPath: 'redirectPathString',
			sickFundsPDFList: [
				{'name':'110311919','documents':[{'language':'en','path':'/content/dam/adc/freestylelibrede/de/de/fsl//sickfund/110311919/doc1_EN.pdf'},{'language':'de','path':'/content/dam/adc/freestylelibrede/de/de/fsl//sickfund/110311919/doc1_DE.pdf'}]},
				{'name':'102114819','documents':[{'language':'de','path':'/content/dam/adc/freestylelibrede/de/de/fsl//sickfund/102114819/Sickfund.pdf'}]},
				{'name':'109519005','documents':[{'language':'de','path':'/content/dam/adc/freestylelibrede/de/de/fsl//sickfund/109519005/Sickfund.pdf'},{'language':'en','path':'/content/dam/adc/freestylelibrede/de/de/fsl//sickfund/109519005/Sickfund2.pdf'}]},
				{'name':'108310404','documents':[{'language':'en','path':'/content/dam/adc/freestylelibrede/de/de/fsl//sickfund/108310404/Resume- Performance Testing.pdf'}]}
			],
			sickFundMap:{
				'102114819':'<h1>SickFund&nbsp;AOK Niedersachsen</h1>\n',
				'108310404':'<h1>Lorem Ipsum&nbsp;is industry.</h1>',
				'109519005':'<h1>SickFund&nbsp;</h1>\n',
				'110311919':'<h1>It is a long established fact that a reader will be distracted by.</h1>\n<h1>&nbsp;</h1>\n<h1>The point of using Lorem Ipsum </h1>\n<h1>Many desktop publishing packages and web page </h1>\n'
			}

		};
		wrapper = setup(props);
	});
	describe('render &  props check', () => {

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});

		test('render check',() => {
			expect(wrapper.type()).not.toEqual(null);
		});
		test('customer object',() => {
			expect(typeof wrapper.instance().props.customer).toBe('object');
		});
		test('sickfunds object',() => {
			expect(typeof wrapper.instance().props.sickfunds).toBe('object');
		});


	});
	describe('lifecycle methods check', () => {
		test('component did mount',() => {
			wrapper.instance().componentDidMount();
			const getCustomerCartRequestMockCallCount = getCustomerCartRequestMock.mock.calls.length;
			expect(getCustomerCartRequestMockCallCount).toBeDefined();
		});
		test('propsDidChange',() => {
			const prevProps = {
				getCustomerCartRequest:getCustomerCartRequestMock ,
				updateInsuranceRequest: updateInsuranceRequestMock ,
				getSickFunds: getSickFundsMock ,
				heading: 'a',
				infoIcon: 'b',
				noInsuranceDescription: 'c',
				noInsuranceHeading: 'd',
				noInsuranceIcon: 'e',
				secureDataMessage: 'f',
				secureIcon: 'g',
				redirectPath: 'h',
				sickfunds: ['a','b'],
				customer: {},

			};
			const didChange = wrapper.instance().propsDidChange(prevProps);
			expect(didChange).toBe(true);
		});
		test('componentdidUpdate when propsDidChange true',() => {
			const prevProps = {
				getCustomerCartRequest:getCustomerCartRequestMock ,
				updateInsuranceRequest: updateInsuranceRequestMock ,
				getSickFunds: getSickFundsMock ,
				heading: 'a',
				infoIcon: 'b',
				noInsuranceDescription: 'c',
				noInsuranceHeading: 'd',
				noInsuranceIcon: 'e',
				secureDataMessage: 'f',
				secureIcon: 'g',
				redirectPath: 'h',
				sickfunds: ['a','b'],
				customer: {},

			};
			wrapper.instance().componentDidUpdate(prevProps);
		});
		test('componentdidUpdate when propsDidChange false',() => {
			const prevProps = {...wrapper.instance().props};
			wrapper.instance().componentDidUpdate(prevProps);
		});
	});
	describe('method calls',() => {
		test('getSickfundForCustomer',() => {
			const SickfundForCustomer = wrapper.instance().getSickfundForCustomer();
			expect(SickfundForCustomer).toBeDefined();
		});
		test('Submit',() => {
			const value = {
				payer_institution_name:{
					value:'name',
					label:'name'
				},
				kvnr: 'qw12as34zx56'

			};
			wrapper.instance().submit(value);
			expect(wrapper.instance().state.showKVNRExistsError).toBe(true);
		});

	});
	describe('render jsx isEditing state false', () => {
		test('card title',() => {
			wrapper.instance().setState({isEditing:false});
			expect(wrapper.props().title).toBe(wrapper.instance().props.heading);
		});
		test('card content title',() => {
			wrapper.instance().setState({isEditing:false});
			expect(wrapper.props().children.type.name).toBe('CardContent');
		});
		test('InsuranceDetails render',() => {
			wrapper.instance().setState({isEditing:false});
			expect(wrapper.props().children.props.children[0].type.name).toBe('InsuranceDetails');
		});
		test('InsuranceDetails props',() => {
			wrapper.instance().setState({isEditing:false});
			expect(wrapper.props().children.props.children[0].props.infoIcon).toBe(wrapper.instance().props.infoIcon);
			expect(wrapper.props().children.props.children[0].props.payerNumber).toBe(wrapper.instance().props.customer.health_insurance_number);
			expect(wrapper.props().children.props.children[0].props.payerInstitutionName).toBe(wrapper.instance().props.customer.payer_institution_name);
		});
		test('NoInsuranceDetails',() => {
			wrapper.instance().setState({isEditing:false});
			expect(wrapper.containsMatchingElement(<NoInsuranceDetails />)).toBeDefined();
		});

		test('action function in if part',() => {
			wrapper.instance().setState({isEditing: true, showKVNRExistsError: true});
			const cancelEditInsuranceInfoProp = wrapper.props().children.props.children[1].props.cancelEditInsuranceInfo;
			expect(typeof cancelEditInsuranceInfoProp).toBe('function');

			cancelEditInsuranceInfoProp();
			expect(wrapper.instance().state.isEditing).toBeFalsy();
		});

		test('action function in if part of else',() => {
			const cancelEditInsuranceInfoProp = wrapper.props().children.props.children[0].props.editInsuranceInfo;
			expect(typeof cancelEditInsuranceInfoProp).toBe('function');

			cancelEditInsuranceInfoProp();
			expect(wrapper.instance().state.isEditing).toBeTruthy();
		});
	});
	describe('render jsx isEditing state true', () => {
		test('card title',() => {
			wrapper.instance().setState({isEditing:true});
			expect(wrapper.props().title).toBe(wrapper.instance().props.heading);
		});
		test('card content title',() => {
			wrapper.instance().setState({isEditing:true});
			expect(wrapper.props().children.type.name).toBe('CardContent');
		});
		test('InsuranceEdit reduxForm render',() => {
			wrapper.instance().setState({isEditing:true});
			expect(wrapper.props().children.props.children[1].type.displayName).toBe('ReduxForm');
		});
		test('InsuranceEdit props',() => {
			wrapper.instance().setState({isEditing:true});
			expect(wrapper.props().children.props.children[1].props.payerNumber).toBe(wrapper.instance().props.customer.health_insurance_number);
			expect(wrapper.props().children.props.children[1].props.initialValues.kvnr).toBe(wrapper.instance().props.customer.health_insurance_number);
			expect(wrapper.props().children.props.children[1].props.initialValues.payer_institution_name.label).toBe(wrapper.instance().props.customer.payer_institution_name);
			expect(wrapper.props().children.props.children[1].props.initialValues.payer_institution_name.value).toBe(wrapper.instance().props.customer.payer_institution_name);
		});

	});


});

describe('WizardInsuranceDisplay test suite',() => {
	let props, wrapper;
	const getCustomerCartRequestMock = jest.fn();
	const getSickFundsMock = jest.fn();
	const updateInsuranceRequestMock = jest.fn();

	beforeEach(() => {
		props = {
			getCustomerCartRequest:getCustomerCartRequestMock ,
			updateInsuranceRequest: updateInsuranceRequestMock ,
			getSickFunds: getSickFundsMock ,
			heading: 'headingString',
			infoIcon: 'infoIconString',
			noInsuranceDescription: 'noInsuranceDescriptionString',
			noInsuranceHeading: 'noInsuranceHeadingString',
			noInsuranceIcon: 'noInsuranceIconString',
			secureDataMessage: 'secureDataMessageString',
			secureIcon: 'secureIconString',
			redirectPath: 'redirectPathString',
			sickFundsPDFList: [
				{'name':'110311919','documents':[{'language':'en','path':'/content/dam/adc/freestylelibrede/de/de/fsl//sickfund/110311919/doc1_EN.pdf'},{'language':'de','path':'/content/dam/adc/freestylelibrede/de/de/fsl//sickfund/110311919/doc1_DE.pdf'}]},
				{'name':'102114819','documents':[{'language':'de','path':'/content/dam/adc/freestylelibrede/de/de/fsl//sickfund/102114819/Sickfund.pdf'}]},
				{'name':'109519005','documents':[{'language':'de','path':'/content/dam/adc/freestylelibrede/de/de/fsl//sickfund/109519005/Sickfund.pdf'},{'language':'en','path':'/content/dam/adc/freestylelibrede/de/de/fsl//sickfund/109519005/Sickfund2.pdf'}]},
				{'name':'108310404','documents':[{'language':'en','path':'/content/dam/adc/freestylelibrede/de/de/fsl//sickfund/108310404/Resume- Performance Testing.pdf'}]}
			],
			sickFundMap:{
				'102114819':'<h1>SickFund&nbsp;AOK Niedersachsen</h1>\n',
				'108310404':'<h1>Lorem Ipsum&nbsp;is industry.</h1>',
				'109519005':'<h1>SickFund&nbsp;</h1>\n',
				'110311919':'<h1>It is a long established fact that a reader will be distracted by.</h1>\n<h1>&nbsp;</h1>\n<h1>The point of using Lorem Ipsum </h1>\n<h1>Many desktop publishing packages and web page </h1>\n'
			}

		};
		wrapper = setupTwo(props);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('action function in if part of else',() => {
		const cancelEditInsuranceInfoProp = wrapper.props().children.props.children[0].props.editInsuranceInfo;
		expect(typeof cancelEditInsuranceInfoProp).toBe('function');

		cancelEditInsuranceInfoProp();
		expect(wrapper.instance().state.isEditing).toBeTruthy();
	});

});
