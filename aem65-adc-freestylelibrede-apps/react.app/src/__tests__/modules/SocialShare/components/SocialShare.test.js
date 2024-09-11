import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import SocialShare from '../../../../modules/SocialShare/components/SocialShare';
import {mockStore} from '../../../../__mocks__/storeMock';

Enzyme.configure({
	adapter: new EnzymeAdapter(),
});

const setup = (props= {}) => {
	const wrapper = shallow(<SocialShare store= {mockStore} {...props}/>).dive().dive();
	return wrapper;
};

describe('SocialShare Component Test Suite', () => {

	let props, wrapper;
	const openModalActionMock= jest.fn();

	beforeEach(() => {
		props= {
			openModalAction: openModalActionMock,
			ctaNoType: 'ctaNoType',
			modalMessage: 'modalMessage',
			ctaNoText: 'ctaNoText',
			ctaYesType: 'ctaYesType',
			ctaYesText: 'ctaYesText'
		};
		wrapper= setup(props);
	});

	describe('Redux Props', () => {

		test('render check',() => {
			expect(wrapper.type()).not.toEqual(null);
		});

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});

		test('ctaNoType as a prop of type string', () => {
			const ctaNoTypeProp = wrapper.instance().props.ctaNoType;
			expect(typeof ctaNoTypeProp).toBe('string');
		});

		test('modalMessage as a prop of type string', () => {
			const modalMessageProp = wrapper.instance().props.modalMessage;
			expect(typeof modalMessageProp).toBe('string');
		});

		test('ctaNoText as a prop of type string', () => {
			const ctaNoTextProp = wrapper.instance().props.ctaNoText;
			expect(typeof ctaNoTextProp).toBe('string');
		});

		test('ctaYesType as a prop of type string', () => {
			const ctaYesTypeProp = wrapper.instance().props.ctaYesType;
			expect(typeof ctaYesTypeProp).toBe('string');
		});

		test('ctaYesText as a prop of type string', () => {
			const ctaYesTextProp = wrapper.instance().props.ctaYesText;
			expect(typeof ctaYesTextProp).toBe('string');
		});

		test('openModalAction as a prop of type function', () => {
			const openModalActionProp = wrapper.instance().props.openModalAction;
			expect(typeof openModalActionProp).toBe('function');
		});

	});

	describe('state check', () => {

		test('state check', () => {
			const stateCheck = wrapper.instance().state;
			expect(stateCheck).toBeInstanceOf(Object);

			expect(stateCheck.togglelink).toBeFalsy();
		});
	});

	describe('Functions check', () => {

		test('openSocialShare function call check', () => {
			const openSocialShareMock = wrapper.instance().openSocialShare;
			expect(typeof openSocialShareMock).toBe('function');

			openSocialShareMock();
			expect(wrapper.instance().state.togglelink).toBeTruthy();
		});

		test('shareModal function call check', () => {
			const shareModalMock = wrapper.instance().shareModal;
			expect(typeof shareModalMock).toBe('function');

			shareModalMock();
			const openModalActionMockCallCount = openModalActionMock.mock.calls.length;
			expect(openModalActionMockCallCount).toBeDefined();
		});

		test('action function call check', () => {
			const actionMock = wrapper.props().onClick;
			expect(typeof actionMock).toBe('function');

			actionMock();
			const openModalActionMockCallCount = openModalActionMock.mock.calls.length;
			expect(openModalActionMockCallCount).toBeDefined();
		});
	});
});