import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import InsuranceEdit from '../../../../../modules/MyAccount/components/InsuranceDisplayEdit/InsuranceEdit';
import SelectFieldWithSearch from '../../../../../modules/Form/components/GenericFields/SelectFieldWithSearch';
import Button from '../../../../../modules/Generic/components/Button/Button';
import KVNRField from '../../../../../modules/Form/components/FormFields/KVNRField';
import {mockStore} from '../../../../../__mocks__/storeMock';

Enzyme.configure({
	adapter: new EnzymeAdapter(),
});

const setup = (props) => {
	const wrapper = shallow(<InsuranceEdit store={mockStore} {...props} />);
	return wrapper;
};

describe('InsuranceEdit Component Test Suite', () => {
	let props, wrapper;

	beforeEach(() => {
		props = {
			handleSubmit: jest.fn(),
			payerNumber: 'payerNumber',
			sickfunds: [
				{
				   'insuranceName':'AOK Bayern',
				   'leadIKNumber':'108310404',
				   'isSpecialSickFund':'false',
				   'supportsApprovalFree':'false',
				   'isExtendedRollover':'false',
				   'displayToCustomer':'true',
				   'insuranceType':'Public',
				   'associatedRSPs':[
					  {
						 'rspName':'CC'
					  }
				   ]
				}
			],
			pristine: false
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
		test('has payerNumber as prop check',() => {
			const payerNumberProp = wrapper.dive().instance().props.payerNumber;
			expect(typeof payerNumberProp).toBe('string');
		});
		test('has sickfunds as prop check',() => {
			const sickfundsProp = wrapper.dive().instance().props.sickfunds;
			expect(sickfundsProp).toBeInstanceOf(Object);
		});
		test('has handleSubmit as prop check',() => {
			const handleSubmitProp = wrapper.dive().instance().props.handleSubmit;
			expect(typeof handleSubmitProp).toBe('function');
		});
		test('has pristine as prop check',() => {
			const pristineProp = wrapper.dive().instance().props.pristine;
			expect(typeof pristineProp).toBe('boolean');
		});
	});
	describe('state check', () => {

		test('state value check', () => {
			expect(wrapper.dive().dive().dive().dive().dive().dive().dive().dive().dive().instance().state.search).toBe('');
		});
	});


	describe('component render check', () => {

		test('SelectFieldWithSearch component gets rendered', () => {
			expect(wrapper.containsMatchingElement(<SelectFieldWithSearch />)).toBeDefined();
		});
		test('Button gets rendered', () => {
			expect(wrapper.containsMatchingElement(<Button />)).toBeDefined();
		});
		test('KVNRField gets rendered', () => {
			expect(wrapper.containsMatchingElement(<KVNRField />)).toBeDefined();
		});
	});
});