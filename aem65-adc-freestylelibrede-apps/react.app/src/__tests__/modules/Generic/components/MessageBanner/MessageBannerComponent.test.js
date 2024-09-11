import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import {mockStore} from '../../../../../__mocks__/storeMock';
import MessageBannerComponent from '../../../../../modules/Generic/components/MessageBanner/MessageBannerComponent';


Enzyme.configure({
	adapter: new EnzymeAdapter(),
});

const setup = (props) => {
	const wrapper = shallow(<MessageBannerComponent store={mockStore} {...props} />).dive().dive();
	return wrapper;
};

describe('MessageBannerComponent test suite when type is newsletter',() => {
	let props, wrapper;
	const confirmNewsletterSubscriptionMock = jest.fn();
	const closeConfirmationMessageMock = jest.fn();

	beforeEach(() => {
		props = {
			confirmNewsletterSubscription:confirmNewsletterSubscriptionMock ,
			closeConfirmationMessage: closeConfirmationMessageMock ,
			type :'newsletter'

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
		test('ghostOrders object',() => {
			expect(typeof wrapper.instance().props.ghostOrders).toBe('object');
		});
		test('customer object',() => {
			expect(typeof wrapper.instance().props.customer).toBe('object');
		});
		test('orders object',() => {
			expect(typeof wrapper.instance().props.orders).toBe('object');
		});


	});
	describe('lifecycle methods check', () => {
		test('component did mount',() => {
			wrapper.instance().componentDidMount();
		});
	});
});
describe('MessageBannerComponent test suite when type is invoice_status',() => {
	let props, wrapper;
	const confirmNewsletterSubscriptionMock = jest.fn();
	const closeConfirmationMessageMock = jest.fn();

	beforeEach(() => {
		props = {
			confirmNewsletterSubscription:confirmNewsletterSubscriptionMock ,
			closeConfirmationMessage: closeConfirmationMessageMock ,
			type :'invoice_status'

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
		test('ghostOrders object',() => {
			expect(typeof wrapper.instance().props.ghostOrders).toBe('object');
		});
		test('customer object',() => {
			expect(typeof wrapper.instance().props.customer).toBe('object');
		});
		test('orders object',() => {
			expect(typeof wrapper.instance().props.orders).toBe('object');
		});


	});
	describe('methods check', () => {
		test('getinvoiceDetails',() => {
			const invoiceDetails = wrapper.instance().getinvoiceDetails();
			expect(invoiceDetails).toBeDefined();
		});
		test('onCloseActionForGhostOrderBanners ',() => {
			wrapper.instance().onCloseActionForGhostOrderBanners('1234','status');
		});
	});

});
describe('MessageBannerComponent test suite when type is default',() => {
	let props, wrapper;
	const confirmNewsletterSubscriptionMock = jest.fn();
	const closeConfirmationMessageMock = jest.fn();

	beforeEach(() => {
		props = {
			confirmNewsletterSubscription:confirmNewsletterSubscriptionMock ,
			closeConfirmationMessage: closeConfirmationMessageMock ,
			type :'default'

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
		test('ghostOrders object',() => {
			expect(typeof wrapper.instance().props.ghostOrders).toBe('object');
		});
		test('customer object',() => {
			expect(typeof wrapper.instance().props.customer).toBe('object');
		});
		test('orders object',() => {
			expect(typeof wrapper.instance().props.orders).toBe('object');
		});


	});
});
describe('MessageBannerComponent test suite when type is rx_not_supported',() => {
	let props, wrapper;
	const confirmNewsletterSubscriptionMock = jest.fn();
	const closeConfirmationMessageMock = jest.fn();

	beforeEach(() => {
		props = {
			confirmNewsletterSubscription:confirmNewsletterSubscriptionMock ,
			closeConfirmationMessage: closeConfirmationMessageMock ,
			type :'rx_not_supported'

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
		test('ghostOrders object',() => {
			expect(typeof wrapper.instance().props.ghostOrders).toBe('object');
		});
		test('customer object',() => {
			expect(typeof wrapper.instance().props.customer).toBe('object');
		});
		test('orders object',() => {
			expect(typeof wrapper.instance().props.orders).toBe('object');
		});


	});
	describe('methods check', () => {
		test('isRXFailure',() => {
			const rxNotSupported = wrapper.instance().isRXFailure();
			expect(rxNotSupported).toBe(false);
		});
	});

});
describe('MessageBannerComponent test suite when type is real_order_status',() => {
	let props, wrapper;
	const confirmNewsletterSubscriptionMock = jest.fn();
	const closeConfirmationMessageMock = jest.fn();

	beforeEach(() => {
		props = {
			confirmNewsletterSubscription:confirmNewsletterSubscriptionMock ,
			closeConfirmationMessage: closeConfirmationMessageMock ,
			type :'real_order_status'

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
		test('ghostOrders object',() => {
			expect(typeof wrapper.instance().props.ghostOrders).toBe('object');
		});
		test('customer object',() => {
			expect(typeof wrapper.instance().props.customer).toBe('object');
		});
		test('orders object',() => {
			expect(typeof wrapper.instance().props.orders).toBe('object');
		});


	});
	describe('methods check', () => {
		test('getdeliveryDetails',() => {
			const deliveryDetails = wrapper.instance().getdeliveryDetails();
			expect(deliveryDetails).toBeDefined();
		});
	});

});
describe('MessageBannerComponent test suite when type is ghost_order_status',() => {
	let props, wrapper;
	const confirmNewsletterSubscriptionMock = jest.fn();
	const closeConfirmationMessageMock = jest.fn();

	beforeEach(() => {
		props = {
			confirmNewsletterSubscription:confirmNewsletterSubscriptionMock ,
			closeConfirmationMessage: closeConfirmationMessageMock ,
			type :'ghost_order_status'

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
		test('ghostOrders object',() => {
			expect(typeof wrapper.instance().props.ghostOrders).toBe('object');
		});
		test('customer object',() => {
			expect(typeof wrapper.instance().props.customer).toBe('object');
		});
		test('orders object',() => {
			expect(typeof wrapper.instance().props.orders).toBe('object');
		});


	});
});
describe('MessageBannerComponent test suite when type is prescription_reminder',() => {
	let props, wrapper;
	const confirmNewsletterSubscriptionMock = jest.fn();
	const closeConfirmationMessageMock = jest.fn();

	beforeEach(() => {
		props = {
			confirmNewsletterSubscription:confirmNewsletterSubscriptionMock ,
			closeConfirmationMessage: closeConfirmationMessageMock ,
			type :'prescription_reminder'

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
		test('ghostOrders object',() => {
			expect(typeof wrapper.instance().props.ghostOrders).toBe('object');
		});
		test('customer object',() => {
			expect(typeof wrapper.instance().props.customer).toBe('object');
		});
		test('orders object',() => {
			expect(typeof wrapper.instance().props.orders).toBe('object');
		});


	});
	describe('methods check', () => {
		test('getPrescriptionStatus',() => {
			const prescriptionStatus = wrapper.instance().getPrescriptionStatus();
			expect(prescriptionStatus).toBe(true);
		});
	});

});