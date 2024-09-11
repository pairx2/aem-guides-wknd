import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import InsuranceDetails from '../../../../../modules/MyAccount/components/InsuranceDisplayEdit/InsuranceDetails';

jest.mock('../../../../../utils/endpointUrl.js');
jest.mock('../../../../../utils/pageTypeUtils.js');

Enzyme.configure({
	adapter: new EnzymeAdapter(),
	// disableLifecycleMethods: true
});

describe('InsuranceDetails Component Test Suite', () => {
	let props, wrapper;
	beforeEach(() => {
		props = {
			payerNumber: 'payerNumber',
	        payerInstitutionName: 'payerInstitutionName',
	        editInsuranceInfo: jest.fn()
		};
		wrapper = shallow(<InsuranceDetails {...props} />);
	});

	test('render null check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('render check',() => {
		expect(wrapper).toBeDefined();
	});
	test('div tag render and prop check', () => {
		expect(wrapper.props().children[0].type).toBe('div');
	});
	test('div tag render and prop check', () => {
		expect(wrapper.props().children[1].type).toBe('div');
		expect(wrapper.props().children[1].props.children[1].type).toBe('div');
	});
});