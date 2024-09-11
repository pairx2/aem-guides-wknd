import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import InsuranceDisplay from '../../../../../modules/RXWizard/components/WizardInsuranceDisplay/InsuranceDisplay';

Enzyme.configure({
	adapter: new EnzymeAdapter()
});

describe('InsuranceDisplay Component Test Suite', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
			sickFundPdfPath: 'String',
			downloadStyle: 'String',
			acknowledgePdfCheckbox: 'String',
		};
		wrapper = shallow(<InsuranceDisplay {...props} />);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
	test('section with children',() =>{
		expect(wrapper.type()).toBe('section');
	});
});


