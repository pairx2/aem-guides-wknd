import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import {mockStore} from '../../../../../__mocks__/storeMock';
import SickFundInformation from '../../../../../modules/RXWizard/components/WizardInsuranceDisplay/SickFundInformation';

jest.mock('../../../../../utils/endpointUrl.js');

Enzyme.configure({
	adapter: new EnzymeAdapter(),
});

const setup = (props) => {
	const wrapper = shallow(<SickFundInformation store={mockStore} {...props} />).dive().dive().dive().dive().dive().dive().dive().dive().dive().dive().dive();
	return wrapper;
};
describe('SickFundInformation test suite',() => {
	let props, wrapper;

	beforeEach(() => {
		props = {
			selectedInsuraceInfo: '<h1>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</h1>\n<h1>&nbsp;</h1>\n<h1>The point of using Lorem Ipsum</h1>',
			pdfLink: '/content/dam/adc/freestylelibrede/de/de/fsl//sickfund/110311919/doc1_EN.pdf',
			selectedInsurancePDFs: [
				{'language':'en','path':'/content/dam/adc/freestylelibrede/de/de/fsl//sickfund/110311919/doc1_EN.pdf'},
				{'language':'de','path':'/content/dam/adc/freestylelibrede/de/de/fsl//sickfund/110311919/doc1_DE.pdf'}
			]
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

	});

	describe('method calls',() => {
		test('getLanguageOptions',() => {
			const LanguageOptions = wrapper.instance().getLanguageOptions();
			expect(LanguageOptions).toBeDefined();
		});
		test('handleSelectedInsuraceInfo',() => {
			const shouldTruncateState = wrapper.instance().state.shouldTruncate;
			wrapper.instance().handleSelectedInsuraceInfo();
			expect(!shouldTruncateState).toBe(wrapper.instance().state.shouldTruncate);
		});
		test('shouldTruncate state changes',() => {
			wrapper.instance().setState({
				shouldTruncate:true
			}, () => {
				expect(wrapper.instance().state.shouldTruncate).toBe(true);
			});
			wrapper.instance().setState({
				shouldTruncate:false
			}, () => {
				expect(wrapper.instance().state.shouldTruncate).toBe(false);
			});
		});

	});

});
describe('SickFundInformation test suite',() => {
	let props, wrapper;

	beforeEach(() => {
		props = {
			selectedInsuraceInfo: '<h1>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</h1>\n<h1>&nbsp;</h1>\n<h1>The point of using Lorem Ipsum</h1>',
			pdfLink: '/content/dam/adc/freestylelibrede/de/de/fsl//sickfund/110311919/doc1_EN.pdf',
			selectedInsurancePDFs: []
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

	});

	describe('method calls',() => {
		test('getLanguageOptions',() => {
			const LanguageOptions = wrapper.instance().getLanguageOptions();
			expect(LanguageOptions).toBeDefined();
		});
		test('handleSelectedInsuraceInfo',() => {
			const shouldTruncateState = wrapper.instance().state.shouldTruncate;
			wrapper.instance().handleSelectedInsuraceInfo();
			expect(!shouldTruncateState).toBe(wrapper.instance().state.shouldTruncate);
		});
		test('shouldTruncate state changes',() => {
			wrapper.instance().setState({
				shouldTruncate:true
			}, () => {
				expect(wrapper.instance().state.shouldTruncate).toBe(true);
			});
			wrapper.instance().setState({
				shouldTruncate:false
			}, () => {
				expect(wrapper.instance().state.shouldTruncate).toBe(false);
			});
		});

	});

});