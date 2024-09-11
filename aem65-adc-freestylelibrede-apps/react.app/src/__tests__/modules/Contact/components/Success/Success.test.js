import React from 'react';
import Success from '../../../../../modules/Contact/components/Success/Success';
import Enzyme, {shallow, mount} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import {mockStore} from '../../../../../__mocks__/storeMock';
import {Provider} from 'react-redux';
jest.mock('../../../../../utils/translationUtils');

Enzyme.configure({
	adapter: new EnzymeAdapter()
});

const setup = (props= {}) => {
	const wrapper = shallow(<Provider store= {mockStore}><Success  {...props}/></Provider>);
	return wrapper;
};

describe('Success Component Test Suite with successPageType as webtocase', () => {

	let props;
	let wrapper;

	beforeEach(() => {
		props = {
			successPageType: 'webtocase',
			subheading: 'subheading',
			image: 'image',
			informationMessage: 'informationMessage',
			newMessageCtaStyle: 'primary',
			newMessageCtaUrl: 'newMessageCtaUrl',
			homeCtaStyle: 'primary',
			homeCtaUrl: 'homeCtaUrl'
		};
		wrapper= setup(props);
	});

	describe('propTypes check', () => {

		test('render check',() => {
			expect(wrapper.type()).not.toEqual(null);
		});

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});

		test('has successPageType as prop and is of type string', () => {
			const successPageTypeProp = wrapper.dive().props().successPageType;
			expect(typeof successPageTypeProp).toBe('string');
		});

		test('has subheading as prop and is of type string', () => {
			const subheadingProp = wrapper.dive().props().subheading;
			expect(typeof subheadingProp).toBe('string');
		});

		test('has image as prop and is of type string', () => {
			const imageProp = wrapper.dive().props().image;
			expect(typeof imageProp).toBe('string');
		});

		test('has informationMessage as prop and is of type string', () => {
			const informationMessageProp = wrapper.dive().props().informationMessage;
			expect(typeof informationMessageProp).toBe('string');
		});

		test('has newMessageCtaStyle as prop and is of type string', () => {
			const newMessageCtaStyleProp = wrapper.dive().props().newMessageCtaStyle;
			expect(typeof newMessageCtaStyleProp).toBe('string');
		});

		test('has newMessageCtaUrl as prop and is of type string', () => {
			const newMessageCtaUrlProp = wrapper.dive().props().newMessageCtaUrl;
			expect(typeof newMessageCtaUrlProp).toBe('string');
		});

		test('has homeCtaStyle as prop and is of type string', () => {
			const homeCtaStyleProp = wrapper.dive().props().homeCtaStyle;
			expect(typeof homeCtaStyleProp).toBe('string');
		});

		test('has homeCtaUrl as prop and is of type string', () => {
			const homeCtaUrlProp = wrapper.dive().props().homeCtaUrl;
			expect(typeof homeCtaUrlProp).toBe('string');
		});

	});

});


describe('Success Component Test Suite with mount & successPageType as callback', () => {
	let props;
	let wrapper;

	beforeEach(() => {
		props = {
			successPageType: 'callback',
			subheading: 'subheading',
			image: 'image',
			informationMessage: 'informationMessage',
			newMessageCtaStyle: 'primary',
			newMessageCtaUrl: 'newMessageCtaUrl',
			homeCtaStyle: 'primary',
			homeCtaUrl: 'homeCtaUrl'
		};
		wrapper= mount(<Provider store= {mockStore}><Success  {...props}/></Provider>);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
});

