import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import SocialShareModal from '../../../../modules/SocialShare/components/SocialShareModal';
import {mockStore} from '../../../../__mocks__/storeMock';

Enzyme.configure({
	adapter: new EnzymeAdapter(),
});

const setup = (props= {}) => {
	const wrapper = shallow(<SocialShareModal store= {mockStore} {...props}/>);
	return wrapper;
};

describe('SocialShareModal Component Test Suite', () => {

	let props, wrapper;
	const closeModalActionMock= jest.fn();

	beforeEach(() => {
		props= {
			ctaNoText: 'ctaNoText',
			ctaNoType: 'ctaNoType',
			ctaYesText: 'ctaYesText',
			ctaYesType: 'ctaYesType',
			modalMessage: 'modalMessage',
			produtUrl: 'produtUrl',
			closeModalAction: closeModalActionMock
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

		test('ctaNoText as a prop of type string', () => {
			const ctaNoTextProp = wrapper.props().ctaNoText;
			expect(typeof ctaNoTextProp).toBe('string');
		});

		test('ctaNoType as a prop of type string', () => {
			const ctaNoTypeProp = wrapper.props().ctaNoType;
			expect(typeof ctaNoTypeProp).toBe('string');
		});

		test('ctaYesText as a prop of type string', () => {
			const ctaYesTextProp = wrapper.props().ctaYesText;
			expect(typeof ctaYesTextProp).toBe('string');
		});

		test('ctaYesType as a prop of type string', () => {
			const ctaYesTypeProp = wrapper.props().ctaYesType;
			expect(typeof ctaYesTypeProp).toBe('string');
		});

		test('modalMessage as a prop of type string', () => {
			const modalMessageProp = wrapper.props().modalMessage;
			expect(typeof modalMessageProp).toBe('string');
		});

		test('produtUrl as a prop of type string', () => {
			const produtUrlProp = wrapper.props().produtUrl;
			expect(typeof produtUrlProp).toBe('string');
		});

		test('closeModalAction as a prop of type function', () => {
			const closeModalActionProp = wrapper.props().closeModalAction;
			expect(typeof closeModalActionProp).toBe('function');
		});

	});

	describe('button action test', () => {

		test('action test', () => {
			const actionProp = wrapper.dive().props().children[1].props.children[0].props.action;
			expect(typeof actionProp).toBe('function');

			actionProp();
			const closeModalActionMockCallCount = closeModalActionMock.mock.calls.length;
			expect(closeModalActionMockCallCount).toBeDefined();
		});
	});

});