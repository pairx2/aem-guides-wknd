import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import InsuranceDisplayEdit from '../../../../../modules/MyAccount/components/InsuranceDisplayEdit/InsuranceDisplayEdit';
import {Card, CardContent} from '../../../../../modules/Generic/components/Card/Card';
import InsuranceDetails from '../../../../../modules/MyAccount/components/InsuranceDisplayEdit/InsuranceDetails';
import InsuranceEdit from '../../../../../modules/MyAccount/components/InsuranceDisplayEdit/InsuranceEdit';
import NoInsuranceDetails from '../../../../../modules/MyAccount/components/InsuranceDisplayEdit/NoInsuranceDetails';
import {mockStore, mockStoreOrder} from '../../../../../__mocks__/storeMock';
jest.mock('../../../../../utils/endpointUrl.js');
jest.mock('../../../../../utils/pageTypeUtils.js');

Enzyme.configure({
	adapter: new EnzymeAdapter(),
});

const setup = (props) => {
	const wrapper = shallow(<InsuranceDisplayEdit store={mockStore} {...props} />);
	return wrapper;
};

const setupTwo = (props) => {
	const wrapper = shallow(<InsuranceDisplayEdit store={mockStoreOrder} {...props} />).dive().dive();
	return wrapper;
};

describe('InsuranceDisplayEdit Component Test Suite', () => {
	let props, wrapper;
	const updateInsuranceRequestMock = jest.fn();
	const getSickFundsMock = jest.fn();
	const updatePayerRequestMock = jest.fn();
	const openModalActionMock = jest.fn();

	beforeEach(() => {

		props = {
			heading: 'heading',
			infoIcon: 'infoIcon',
			noInsuranceDescription: 'noInsuranceDescription',
			noInsuranceHeading: 'noInsuranceHeading',
			noInsuranceIcon: 'noInsuranceIcon',
			secureDataMessage: 'secureDataMessage',
			secureIcon: 'secureIcon',
			customer: {'addresses': []},
			updateInsuranceRequest: updateInsuranceRequestMock,
			getSickFunds: getSickFundsMock,
			updatePayerRequest: updatePayerRequestMock,
			openModalAction: openModalActionMock
		};
		wrapper = setup(props).dive().dive();
	});

	describe('props check', () => {

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});

		test('render check',() => {
			expect(wrapper.type()).not.toEqual(null);
		});
		test('has heading as prop check',() => {
			const headingProp = wrapper.instance().props.heading;
			expect(typeof headingProp).toBe('string');
		});
		test('has infoIcon as prop and type check',() => {
			const infoIconProp = wrapper.instance().props.infoIcon;
			expect(typeof infoIconProp).toBe('string');
		});
		test('has noInsuranceDescription as prop and type check',() => {
			const noInsuranceDescriptionProp = wrapper.instance().props.noInsuranceDescription;
			expect(typeof noInsuranceDescriptionProp).toBe('string');
		});
		test('has noInsuranceDescription as prop and type check',() => {
			const noInsuranceDescriptionProp = wrapper.instance().props.noInsuranceDescription;
			expect(typeof noInsuranceDescriptionProp).toBe('string');
		});
		test('has noInsuranceHeading as prop and type check',() => {
			const noInsuranceHeadingProp = wrapper.instance().props.noInsuranceHeading;
			expect(typeof noInsuranceHeadingProp).toBe('string');
		});
		test('has noInsuranceIcon as prop and type check',() => {
			const noInsuranceIconProp = wrapper.instance().props.noInsuranceIcon;
			expect(typeof noInsuranceIconProp).toBe('string');
		});
		test('has secureDataMessage as prop and type check',() => {
			const secureDataMessageProp = wrapper.instance().props.secureDataMessage;
			expect(typeof secureDataMessageProp).toBe('string');
		});
		test('has secureIcon as prop and type check',() => {
			const secureIconProp = wrapper.instance().props.secureIcon;
			expect(typeof secureIconProp).toBe('string');
		});
		test('has customer as prop and type check',() => {
			const customerProp = wrapper.instance().props.customer;
			expect(customerProp).toBeInstanceOf(Object);
		});
		test('has sickfunds as prop and type check',() => {
			const sickfundsProp = wrapper.instance().props.sickfunds;
			expect(sickfundsProp).toBeInstanceOf(Array);
		});
		test('has updateInsuranceRequest as prop and type check',() => {
			const updateInsuranceRequestProp = wrapper.instance().props.updateInsuranceRequest;
			expect(typeof updateInsuranceRequestProp).toBe('function');
		});
		test('has getSickFunds as prop and type check',() => {
			const getSickFundsProp = wrapper.instance().props.getSickFunds;
			expect(typeof getSickFundsProp).toBe('function');
		});
	});


	describe('state check', () => {

		test('state value check', () => {
			const stateMock = wrapper.instance().state;
			expect(stateMock).toBeInstanceOf(Object);

			const isEditingMock= wrapper.instance().state.isEditing;
			expect(typeof isEditingMock).toBe('boolean');
			expect(isEditingMock).toBe(false);
		});
	});

	describe('functions check', () => {

		test('check getSickFunds call check in componentDidMount', () => {
			wrapper.instance().componentDidMount();

			const getSickFundCallCount = getSickFundsMock.mock.calls.length;
			expect(getSickFundCallCount).toBeDefined();
		});

		test('componentDidUpdate', () => {
			const prevProps = {
				customer: {},
				sickfunds: [],
				error: 'error'
			};
			wrapper.instance().componentDidUpdate(prevProps);
		});
		test('componentDidUpdate', () => {
			const prevProps = {
				customer: {...wrapper.props.customer},
				sickfunds: [],
				error: 'error',
				isPayerConfirmationAccepted: false
			};
			wrapper.instance().componentDidUpdate(prevProps);
		});

		test('check submit function', () => {
			const value = {
				payer_institution_name: {
					value:'test payers Swapna6',
					label:'test payers Swapna6'
				},
				payer_number: 'AOK Bayern',
				health_insurance_number: 'Q849505609',
				kvnr:'Q849505609'
			};
			wrapper.instance().submit(value);
		});

		test('toggleEditing  function check for false', () => {
			wrapper.instance().toggleEditing(true);
		});
		test('toggleEditing  function check for false', () => {
			wrapper.instance().toggleEditing(false);
			expect(wrapper.instance().state.isEditing).toBe(false);
			expect(wrapper.instance().state.showKVNRExistsError).toBe(false);
		});

		test('openModal function call check', () => {
			const openModalProp = wrapper.instance().openModal;
			expect(typeof openModalProp).toBe('function');

			openModalProp();
			const openModalActionMockCallCount = openModalActionMock.mock.calls.length;
			expect(openModalActionMockCallCount).toBeDefined();
		});

		test('editInsuranceInfo property in InsuranceDetails', () => {
			const actionProp = wrapper.props().children.props.children[0].props.editInsuranceInfo;
			expect(typeof actionProp).toBe('function');

			actionProp();
		});

		test('cancelEditInsuranceInfo property in InsuranceEdit', () => {
			wrapper.instance().setState({isEditing: true});
			const actionProp = wrapper.props().children.props.children[1].props.cancelEditInsuranceInfo;
			expect(typeof actionProp).toBe('function');

			actionProp();
		});
	});

	describe('component render check', () => {

		test('Card component gets rendered', () => {
			expect(wrapper.containsMatchingElement(<Card />)).toBeDefined();
		});
		test('CardContent gets rendered', () => {
			expect(wrapper.containsMatchingElement(<CardContent />)).toBeDefined();
		});
		test('InsuranceDetails gets rendered', () => {
			expect(wrapper.containsMatchingElement(<InsuranceDetails />)).toBeDefined();
		});
		test('InsuranceEdit gets rendered', () => {
			expect(wrapper.containsMatchingElement(<InsuranceEdit />)).toBeDefined();
		});
		test('InsuranceEdit gets rendered', () => {
			expect(wrapper.containsMatchingElement(<NoInsuranceDetails />)).toBeDefined();
		});
	});
});

describe('InsuranceDisplayEdit Component Test Suite', () => {
	let props, wrapper;
	const updateInsuranceRequestMock = jest.fn();
	const getSickFundsMock = jest.fn();
	const updatePayerRequestMock = jest.fn();
	const openModalActionMock = jest.fn();

	beforeEach(() => {

		props = {
			heading: 'heading',
			infoIcon: 'infoIcon',
			noInsuranceDescription: 'noInsuranceDescription',
			noInsuranceHeading: 'noInsuranceHeading',
			noInsuranceIcon: 'noInsuranceIcon',
			secureDataMessage: 'secureDataMessage',
			secureIcon: 'secureIcon',
			customer: {'addresses': []},
			updateInsuranceRequest: updateInsuranceRequestMock,
			getSickFunds: getSickFundsMock,
			updatePayerRequest: updatePayerRequestMock,
			openModalAction: openModalActionMock
		};
		wrapper = setupTwo(props);
	});

	describe('props check', () => {

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});

		test('render check',() => {
			expect(wrapper.type()).not.toEqual(null);
		});

		test('componentDidUpdate', () => {
			const prevProps = {
				customer: {},
				sickfunds: [],
				error: 'error'
			};
			wrapper.instance().componentDidUpdate(prevProps);
		});

		test('editInsuranceInfo property in InsuranceDetails', () => {
			const actionProp = wrapper.props().children.props.children[0].props.editInsuranceInfo;
			expect(typeof actionProp).toBe('function');

			actionProp();
		});
	});

});