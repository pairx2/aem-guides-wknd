import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

import PayonForm from '../../../../../modules/Payment/components/PaymentDisplayEdit/PayonForm';
import {mockStore} from '../../../../../__mocks__/storeMock';
import {Provider} from 'react-redux';


Enzyme.configure({
	adapter: new EnzymeAdapter(),
});

const setup = (props) => {
	const wrapper = shallow(<PayonForm store={mockStore} {...props} />).dive().dive();
	return wrapper;
};

describe('PayonForm component Test Suite with orderId and orderType as Reimbursement', () => {
	let props;
	let wrapper;

	beforeEach(() => {
		props = {
			paymentMethod: 'paymentMethod',
			confirmationPage: 'confirmationPage',
			expandedIndex: 1,
			paymentMapping: ['paymentMapping1', 'paymentMapping2'],
			order: {
				orderId: 'abc',
				orderType: 'Reimbursement'
			}
		};
		wrapper = setup(props);
	});

	describe('Props check', () => {

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});

		test('paymentMethod is a prop & is of type string', () => {
			const paymentMethodProp = wrapper.instance().props.paymentMethod;
			expect(paymentMethodProp).toBe('paymentMethod');
			expect(typeof paymentMethodProp).toBe('string');
		});

		test('confirmationPage is a prop & is of type string', () => {
			const confirmationPageProp = wrapper.instance().props.confirmationPage;
			expect(confirmationPageProp).toBe('confirmationPage');
			expect(typeof confirmationPageProp).toBe('string');
		});

		test('expandedIndex is a prop & is of type number', () => {
			const expandedIndexProp = wrapper.instance().props.expandedIndex;
			expect(expandedIndexProp).toBe(1);
			expect(typeof expandedIndexProp).toBe('number');
		});

		test('paymentMapping is a prop & is of type Array', () => {
			const paymentMappingProp = wrapper.instance().props.paymentMapping;
			expect(paymentMappingProp).toBeInstanceOf(Array);
		});
	});

	describe('state check', () => {
		test('state check', () => {
			const stateCheck = wrapper.instance().state;
			expect(stateCheck).toBeInstanceOf(Object);

			const isRerenderProp = wrapper.instance().state.isRerender;
			expect(isRerenderProp).toBeFalsy();
		});
	});

	describe('componentDidUpdate check', () => {
		test('componentDidUpdate function call check', () => {
			const componentDidUpdateMock = wrapper.instance().componentDidUpdate;
			expect(typeof componentDidUpdateMock).toBe('function');

			const prevProps= {paymentMethod: 'paymentMethod2'};
			wrapper.instance().componentDidUpdate(prevProps);

			if (prevProps.paymentMethod !== wrapper.instance().props.paymentMethod) {
				wrapper.instance().setState({isRerender: true});
			} else if (wrapper.instance().state.isRerender) {
				wrapper.instance().setState({isRerender: false});
			}
		});
	});

});

describe('PayonForm component Test Suite with no orderId and orderType', () => {
	let props;
	let wrapper;

	beforeEach(() => {
		props = {
			paymentMethod: 'paymentMethod',
			confirmationPage: 'confirmationPage',
			expandedIndex: 1,
			paymentMapping: ['paymentMapping1', 'paymentMapping2']
		};
		wrapper = setup(props);
	});

	describe('Props check', () => {

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});
	});

});

describe('PayonForm component Test Suite with mount', () => {
	let props;
	let wrapper;

	beforeEach(() => {
		props = {
			paymentMethod: 'paymentMethod',
			confirmationPage: 'confirmationPage',
			expandedIndex: 1,
			paymentMapping: ['paymentMapping1', 'paymentMapping2'],
			order: {
				orderId: 'abc',
				orderType: 'Cash Pay Subscription'
			}
		};
		wrapper = mount(<Provider store={mockStore}><PayonForm {...props} /></Provider>);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
});

