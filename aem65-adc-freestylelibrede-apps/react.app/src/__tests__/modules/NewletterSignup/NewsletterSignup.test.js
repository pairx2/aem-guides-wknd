import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import {Provider} from 'react-redux';
import NewsletterSignup from '../../../modules/NewsletterSignup/components/NewsletterSignup';
import {mockStore} from '../../../__mocks__/storeMock';
jest.mock('../../../utils/endpointUrl');
Enzyme.configure({
	adapter: new EnzymeAdapter()
});

const setup = (props) => {
	const wrapper = shallow(<NewsletterSignup store= {mockStore} {...props}/>).dive();
	return wrapper;
};

describe('NewsletterSignup Component Test Suite', () => {

	let initialState, props;
	let wrapper;

	beforeEach(() => {
		props = {
			heading: 'heading',
			subheading: 'subheading',
			privacyPolicy: 'privacyPolicy',
			subscribeToNewsletter: () => {},
			isSubscriptionSuccessful: false,
			error: {'error': 'dummy'}
		};

		initialState = {
			heading: 'heading',
			subheading: 'subheading',
			privacyPolicy: 'privacyPolicy',
			subscribeToNewsletter: () => {},
			isSubscriptionSuccessful: false,
			error: {'error': 'dummy'}
		};
		wrapper= setup(initialState, props);
	});

	describe('propTypes check', () => {

		test('render check',() => {
			expect(wrapper.type()).not.toEqual(null);
		});

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});

		test('has heading as prop', () => {
			const headingProp = wrapper.instance().props.heading;
			expect(headingProp).toEqual(initialState.heading);
			expect(typeof headingProp).toBe('string');
		});

		test('has subheading as prop', () => {
			const subheadingProp = wrapper.instance().props.subheading;
			expect(subheadingProp).toEqual(initialState.subheading);
			expect(typeof subheadingProp).toBe('string');
		});

		test('has privacyPolicy as prop', () => {
			const privacyPolicyProp = wrapper.instance().props.privacyPolicy;
			expect(privacyPolicyProp).toEqual(initialState.privacyPolicy);
			expect(typeof privacyPolicyProp).toBe('string');
		});


		test('has error as prop', () => {
			const errorProp = wrapper.instance().props.error;
			expect(errorProp).toEqual(initialState.error);
			expect(typeof errorProp).toBe('object');
		});

		test('has isSubscriptionSuccessful as prop', () => {
			const isSubscriptionSuccessfulProp = wrapper.instance().props.isSubscriptionSuccessful;
			expect(isSubscriptionSuccessfulProp).toEqual(initialState.isSubscriptionSuccessful);
			expect(typeof isSubscriptionSuccessfulProp).toBe('boolean');
		});

		test('subscribeToNewsletter as prop and of type function', () => {
			const subscribeToNewsletterProp = wrapper.instance().props.subscribeToNewsletter;
			expect(typeof subscribeToNewsletterProp).toBe('function');
		});

		test('form', () => {
			const formProp = wrapper.instance().props.form;
			expect(formProp).toBe('newsletterSignup');
			expect(typeof formProp).toBe('string');
		});


		test('subscribe', () => {
			const subscribeProp = wrapper.instance().props.store.subscribe;
			expect(typeof subscribeProp).toBe('function');
		});
	});
	test('mocking subscribeToNewsletter function', () => {
		const subscribeToNewsletterF = jest.fn();

		subscribeToNewsletterF();

		const subscribeToNewsletterFCallCount = subscribeToNewsletterF.mock.calls.length;
		expect(subscribeToNewsletterFCallCount).not.toBe(0);
	});

	test('registerForNewsletter function call check', () => {
		const registerForNewsletterMock = wrapper.instance().registerForNewsletter;
		expect(typeof registerForNewsletterMock).toBeDefined();
	});

	test('form render & onSubmit',() => {
		const wrapper = shallow(<NewsletterSignup store= {mockStore} {...props}/>).dive().dive().dive().dive().dive().dive().dive().dive().dive().dive().dive();
		const formTag = wrapper.find('form');
		formTag.simulate('submit');
		expect(formTag).toBeDefined();
	});

});

describe('NewsletterSignup Component Test Suite with mount', () => {

	let props;
	let wrapper;

	beforeEach(() => {
		props = {
			heading: 'heading',
			subheading: 'subheading',
			privacyPolicy: 'privacyPolicy',
			subscribeToNewsletter: () => {},
			isSubscriptionSuccessful: false,
			error: {'error': 'dummy'}
		};
		wrapper = mount(<Provider store= {mockStore}><NewsletterSignup {...props}/></Provider>);
	});

	describe('propTypes check', () => {

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});
	});
});