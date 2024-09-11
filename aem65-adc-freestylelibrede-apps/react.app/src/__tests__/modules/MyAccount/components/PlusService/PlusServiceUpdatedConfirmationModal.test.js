import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import PlusServiceUpdatedConfirmationModal from '../../../../../modules/MyAccount/components/PlusService/PlusServiceUpdatedConfirmationModal';
import {mockStore, mockStoreOrder} from '../../../../../__mocks__/storeMock';

Enzyme.configure({
	adapter: new EnzymeAdapter()
});

const setup = (props = {}) => {
	const wrapper = shallow(<PlusServiceUpdatedConfirmationModal store={mockStore} {...props} />).dive().dive();
	return wrapper;
};

const setupTwo = (props = {}) => {
	const wrapper = shallow(<PlusServiceUpdatedConfirmationModal store={mockStoreOrder} {...props} />).dive().dive();
	return wrapper;
};

describe('PlusServiceUpdatedConfirmationModal component Test Suite', () => {
	let wrapper, props;
	beforeEach(() => {
		props = {
			modalProps: {
				paragraph_1: 'paragraph1',
				paragraph_2: 'paragraph2',
			},
			closeModalAction: jest.fn(),
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
	});
});

describe('Other PlusServiceUpdatedConfirmationModal component Test Suite', () => {
	let wrapper, props;
	beforeEach(() => {
		props = {
			modalProps: {
				paragraph_1: 'paragraph1',
				paragraph_2: 'paragraph2',
			},
			closeModalAction: jest.fn(),
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
	});
});