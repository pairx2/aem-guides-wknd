import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

import InsuranceInfoForm from '../../../../../modules/Authentication/components/Registration/InsuranceInfoForm';
import {mockStore, mockStoreOrder} from '../../../../../__mocks__/storeMock';
import {Provider} from 'react-redux';


Enzyme.configure({
	adapter: new EnzymeAdapter(),
});


const setup = (props) => {
	const wrapper = shallow(<InsuranceInfoForm store={mockStore} {...props} />).dive().dive().dive().dive().dive().dive().dive().dive().dive().dive().dive();
	return wrapper;
};

const setupTwo = (props) => {
	const wrapper = shallow(<InsuranceInfoForm store={mockStoreOrder} {...props} />).dive().dive().dive().dive().dive().dive().dive().dive().dive().dive().dive();
	return wrapper;
};


describe('InsuranceInfoForm Component Test Suite with isAccountType as true', () => {
	let props, wrapper;
	const getSickFundsMock= jest.fn();
	const handleGoBackMock = jest.fn();

	beforeEach(() => {
		props = {
			handleGoBack: handleGoBackMock,
			selectInsurance: 'selectInsurance',
			insuranceHeading: 'insuranceHeading',
			insuranceSubHeading: 'insuranceSubHeading',
			readerInfoText: 'readerInfoText',
			insuranceBackCtaStyle: 'primary',
			insuranceContinueCtaStyle: 'primary',
			insuranceOptions: [
				{insuranceOption: 'insuranceOption1', insuranceKey: 'insuranceKey1'},
				{insuranceOption: 'insuranceOption2', insuranceKey: 'insuranceKey2'}
			],
			getSickFunds: getSickFundsMock,
			isAccountType: true
		};
		wrapper = setup(props);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

});
describe('InsuranceInfoForm Component Test Suite with isAccountType as true', () => {
	let props, wrapper;
	const getSickFundsMock= jest.fn();
	const handleGoBackMock = jest.fn();

	beforeEach(() => {
		props = {
			handleGoBack: handleGoBackMock,
			selectInsurance: 'selectInsurance',
			insuranceHeading: 'insuranceHeading',
			insuranceSubHeading: 'insuranceSubHeading',
			readerInfoText: 'readerInfoText',
			insuranceBackCtaStyle: 'primary',
			insuranceContinueCtaStyle: 'primary',
			readerInfoTextUnit: 'readerInfoTextUnit',
			insuranceOptions: [
				{insuranceOption: 'insuranceOption1', insuranceKey: 'private'},
				{insuranceOption: 'insuranceOption2', insuranceKey: 'cashpayer'},
				{insuranceOption: 'insuranceOption2', insuranceKey: 'public'}

			],
			getSickFunds: getSickFundsMock,
			isAccountType: true
		};
		wrapper = setup(props);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

});
describe('InsuranceInfoForm Component Test Suite with isAccountType as true', () => {
	let props, wrapper;
	const getSickFundsMock= jest.fn();
	const handleGoBackMock = jest.fn();

	beforeEach(() => {
		props = {
			handleGoBack: handleGoBackMock,
			selectInsurance: 'public',
			insuranceHeading: 'insuranceHeading',
			insuranceSubHeading: 'insuranceSubHeading',
			readerInfoText: 'readerInfoText',
			insuranceBackCtaStyle: 'primary',
			insuranceContinueCtaStyle: 'primary',
			readerInfoTextUnit: 'readerInfoTextUnit',
			insuranceOptions: [
				{insuranceOption: 'insuranceOption1', insuranceKey: 'insuranceKey1'},
				{insuranceOption: 'insuranceOption2', insuranceKey: 'insuranceKey2'}
			],
			getSickFunds: getSickFundsMock,
			isAccountType: true
		};
		wrapper = setup(props);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

});

describe('InsuranceInfoForm Component Test Suite with isAccountType as false & with sickfunds array', () => {
	let props, wrapper;
	const getSickFundsMock= jest.fn();
	const handleGoBackMock = jest.fn();

	beforeEach(() => {
		props = {
			handleGoBack: handleGoBackMock,
			selectInsurance: 'selectInsurance',
			insuranceHeading: 'insuranceHeading',
			insuranceSubHeading: 'insuranceSubHeading',
			readerInfoText: 'readerInfoText',
			insuranceBackCtaStyle: 'secondary',
			insuranceContinueCtaStyle: 'secondary',
			readerInfoTextUnit: 'readerInfoTextUnit',
			insuranceOptions: [
				{insuranceOption: 'insuranceOption1', insuranceKey: 'insuranceKey1'},
				{insuranceOption: 'insuranceOption2', insuranceKey: 'insuranceKey2'}
			],
			getSickFunds: getSickFundsMock,
			isAccountType: false
		};
		wrapper = setup(props);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('options inside RadioButtonReduxField', () => {
		const optionsProp = wrapper.props().children.props.children.props.children[1].props.children.props.children.props.children.props.children[0].props.children[1].props.children.props.options;
		expect(optionsProp).toBeInstanceOf(Array);
		expect(optionsProp.length).toBe(2);
	});

});

describe('InsuranceInfoForm Component Test Suite with isAccountType as false & with sickfunds array but without insuranceOptions array', () => {
	let props, wrapper;
	const getSickFundsMock= jest.fn();
	const handleGoBackMock = jest.fn();

	beforeEach(() => {
		props = {
			handleGoBack: handleGoBackMock,
			selectInsurance: 'selectInsurance',
			insuranceHeading: 'insuranceHeading',
			insuranceSubHeading: 'insuranceSubHeading',
			readerInfoText: 'readerInfoText',
			insuranceBackCtaStyle: 'secondary',
			insuranceContinueCtaStyle: 'secondary',
			readerInfoTextUnit: 'readerInfoTextUnit',
			insuranceOptions: [],
			getSickFunds: getSickFundsMock,
			isAccountType: false
		};
		wrapper = setup(props);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('options inside RadioButtonReduxField', () => {
		const optionsProp = wrapper.props().children.props.children.props.children[1].props.children.props.children.props.children.props.children[0].props.children[1].props.children.props.options;
		expect(optionsProp).toBeInstanceOf(Array);
		expect(optionsProp.length).toBe(0);
	});

});

describe('InsuranceInfoForm Component Test Suite with isAccountType as false & without sickfunds array', () => {
	let props, wrapper;
	const getSickFundsMock= jest.fn();
	const handleGoBackMock = jest.fn();

	beforeEach(() => {
		props = {
			handleGoBack: handleGoBackMock,
			selectInsurance: 'selectInsurance',
			insuranceHeading: 'insuranceHeading',
			insuranceSubHeading: 'insuranceSubHeading',
			readerInfoText: 'readerInfoText',
			insuranceBackCtaStyle: 'secondary',
			insuranceContinueCtaStyle: 'secondary',
			readerInfoTextUnit: 'readerInfoTextUnit',
			insuranceOptions: [
				{insuranceOption: 'insuranceOption1', insuranceKey: 'insuranceKey1'},
				{insuranceOption: 'insuranceOption2', insuranceKey: 'insuranceKey2'}
			],
			getSickFunds: getSickFundsMock,
			isAccountType: false
		};
		wrapper = setupTwo(props);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('options inside RadioButtonReduxField', () => {
		const optionsProp = wrapper.props().children.props.children.props.children[1].props.children.props.children.props.children.props.children[0].props.children[1].props.children.props.options;
		expect(optionsProp).toBeInstanceOf(Array);
		expect(optionsProp.length).toBe(2);
	});

});

describe('InsuranceInfoForm Component Test Suite with isAccountType as true', () => {
	let props, wrapper;
	const getSickFundsMock= jest.fn();
	const handleGoBackMock = jest.fn();

	beforeEach(() => {
		props = {
			handleGoBack: handleGoBackMock,
			selectInsurance: 'selectInsurance',
			insuranceHeading: 'insuranceHeading',
			insuranceSubHeading: 'insuranceSubHeading',
			readerInfoText: 'readerInfoText',
			insuranceBackCtaStyle: 'insuranceBackCtaStyle',
			insuranceContinueCtaStyle: 'insuranceContinueCtaStyle',
			readerInfoTextUnit: 'readerInfoTextUnit',
			insuranceOptions: [
				{insuranceOption: 'insuranceOption1', insuranceKey: 'insuranceKey1'},
				{insuranceOption: 'insuranceOption2', insuranceKey: 'insuranceKey2'}
			],
			getSickFunds: getSickFundsMock,
			isAccountType: true
		};
		wrapper =  mount(<Provider store={mockStore}><InsuranceInfoForm {...props} /></Provider>);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

});

