import React from 'react';
import ForgotPasswordConfirmation from '../../../../../modules/Authentication/components/ForgotPassword/ForgotPasswordConfirmation';
import Enzyme, {shallow, mount} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

import Icon from '../../../../../modules/Generic/components/Icon/Icon';
import {Provider} from 'react-redux';
import {mockStore} from '../../../../../__mocks__/storeMock';

Enzyme.configure({
	adapter: new EnzymeAdapter()
});

describe('ForgotPasswordConfirmation Component Test Suite', () => {
	let props;
	let wrapper;
	let confirmationPageHeading, readerInformationalText, confirmationPageSubheading, backToLogin, backToLoginUrl;

	beforeEach(() => {
		props = {
			confirmationPageHeading: 'confirmationPageHeading',
			readerInformationalText: 'readerInformationalText',
			confirmationPageSubheading: 'confirmationPageSubheading',
			backToLogin: 'backToLogin',
			backToLoginUrl: 'backToLoginUrl',
		};
		wrapper = shallow(<ForgotPasswordConfirmation {...props} />);

		confirmationPageHeading= 'confirmationPageHeading';
		readerInformationalText= 'readerInformationalText';
		confirmationPageSubheading= 'confirmationPageSubheading';
		backToLogin= 'backToLogin';
		backToLoginUrl= 'backToLoginUrl';
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('has confirmationPageHeading as prop and is of type string', () => {
		const confirmationPageHeadingProp = wrapper.props().children[0].props.children.props.children;
		expect(confirmationPageHeadingProp).toEqual(confirmationPageHeading);
		expect(typeof confirmationPageHeadingProp).toBe('string');
	});

	test('has confirmationPageSubheading as prop and is of type string', () => {
		const confirmationPageSubheadingProp = wrapper.props().children[1].props.children.props.children.props.children;
		expect(confirmationPageSubheadingProp).toEqual(confirmationPageSubheading);
		expect(typeof confirmationPageSubheadingProp).toBe('string');
	});

	test('Icon component is rendered & has image and size property', () => {
		const iconCompProp = wrapper.props().children[2].props.children.type.name;
		expect(iconCompProp).toBe('Icon');

		const imageProp = wrapper.props().children[2].props.children.props.image;
		expect(imageProp).toBe('email-large-desktop');

		const sizeProp = wrapper.props().children[2].props.children.props.size;
		expect(sizeProp).toBe(Icon.SIZE.LARGER);
	});

	test('has readerInformationalText as prop and is of type string', () => {
		const readerInformationalTextProp = wrapper.props().children[3].props.children.props.children;
		expect(readerInformationalTextProp).toEqual(readerInformationalText);
		expect(typeof readerInformationalTextProp).toBe('string');
	});

	test('Link component is rendered & has href and label property', () => {
		const linkCompProp = wrapper.props().children[4].props.children.type.name;
		expect(linkCompProp).toBe('Link');

		const hrefProp = wrapper.props().children[4].props.children.props.href;
		expect(hrefProp).toBe(backToLoginUrl);

		const labelProp = wrapper.props().children[4].props.children.props.label;
		expect(labelProp).toBe(backToLogin);
	});
});

describe('ForgotPasswordConfirmation Component Test Suite', () => {
	let props;
	let wrapper;
	beforeEach(() => {

		props = {
			confirmationPageHeading: 'confirmationPageHeading',
			readerInformationalText: 'readerInformationalText',
			confirmationPageSubheading: 'confirmationPageSubheading',
			backToLogin: 'backToLogin',
			backToLoginUrl: 'backToLoginUrl',
		};

		wrapper= mount(<Provider store= {mockStore}><ForgotPasswordConfirmation {...props}/></Provider>);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

});

