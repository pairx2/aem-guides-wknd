import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import SickFundSearch from '../../../modules/SickFund/components/SickFundSearch';
import {mockStore} from '../../../__mocks__/storeMock';

Enzyme.configure({
	adapter: new EnzymeAdapter()
});

describe('SickFundSearch Component Test Suite with mockStore i.e. valid sickFunds array', () => {

	let props, wrapper;
	const openModalMock = jest.fn();
	const getSickFundsMock = jest.fn();
	const resetFormMock = jest.fn();

	beforeEach(() => {

		props= {
			openModal: openModalMock,
			moreInfoPath: 'moreInfoPath',
			backgroundImagePath: 'backgroundImagePath',
			heading: 'heading',
			subHeading: 'subHeading',
			getSickFunds: getSickFundsMock,
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
			},
			resetForm : resetFormMock
		};
		wrapper= shallow(<SickFundSearch store= {mockStore} {...props}/>).dive().dive().dive().dive().dive().dive().dive().dive().dive().dive().dive();
	});

	describe('Redux Props', () => {

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});

		test('render check',() => {
			expect(wrapper.type()).not.toEqual(null);
		});

		test('has moreInfoPath as prop and is of type string', () => {
			const moreInfoPathProp = wrapper.instance().props.moreInfoPath;
			expect(typeof moreInfoPathProp).toBe('string');
		});

		test('has backgroundImagePath as prop and is of type string', () => {
			const backgroundImagePathProp = wrapper.instance().props.backgroundImagePath;
			expect(typeof backgroundImagePathProp).toBe('string');
		});

		test('has heading as prop and is of type string', () => {
			const headingProp = wrapper.instance().props.heading;
			expect(typeof headingProp).toBe('string');
		});

		test('has subHeading as prop and is of type string', () => {
			const subHeadingProp = wrapper.instance().props.subHeading;
			expect(typeof subHeadingProp).toBe('string');
		});

		test('has sickfunds as prop and is of type array', () => {
			const sickfundsProp = wrapper.instance().props.sickfunds;
			expect(sickfundsProp).toBeInstanceOf(Array);
		});

		test('has sickFundsPDFList as prop and is of type array', () => {
			const sickFundsPDFListProp = wrapper.instance().props.sickFundsPDFList;
			expect(sickFundsPDFListProp).toBeInstanceOf(Array);
		});

		test('has openModal as prop and is of type function', () => {
			const openModalProp = wrapper.instance().props.openModal;
			expect(typeof openModalProp).toBe('function');
		});

		test('has getSickFunds as prop and is of type function', () => {
			const getSickFundsProp = wrapper.instance().props.getSickFunds;
			expect(typeof getSickFundsProp).toBe('function');
		});

	});

	describe('Functions check', () => {

		test('inputChange function call check', () => {
			const inputChangeMock = wrapper.instance().inputChange;
			expect(typeof inputChangeMock).toBe('function');

			expect(inputChangeMock()).toBeUndefined();

			const value= {label: 'label', value: {name: 'name',leadIKNumber:110311919}};
			inputChangeMock(value);

			const openModalMockCallCount = openModalMock.mock.calls.length;
			expect(openModalMockCallCount).toBeDefined();

			const resetFormMockCallCount = resetFormMock.mock.calls.length;
			expect(resetFormMockCallCount).toBeDefined();
			expect(resetFormMockCallCount).not.toBe(0);
		});

		test('sickFundOptions function call check', () => {
			const sickFundOptionsMock = wrapper.instance().sickFundOptions;
			expect(typeof sickFundOptionsMock).toBe('function');

			expect(sickFundOptionsMock()).toBeDefined();
			expect(typeof sickFundOptionsMock()).toBe('object');
		});

		test('componentDidMount function call check', () => {
			const componentDidMountMock = wrapper.instance().componentDidMount;
			expect(typeof componentDidMountMock).toBe('function');

			wrapper.instance().componentDidMount();
			const getSickFundsMockCallCount = getSickFundsMock.mock.calls.length;
			expect(getSickFundsMockCallCount).toBeDefined();
		});
	});

});