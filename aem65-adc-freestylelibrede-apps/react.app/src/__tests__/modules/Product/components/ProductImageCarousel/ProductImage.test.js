import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import ProductImage from '../../../../../modules/Product/components/ProductImageCarousel/ProductImage';
import EnlargedImage from '../../../../../modules/Product/components/ProductImageCarousel/EnlargedImage';
import Image from '../../../../../modules/Generic/components/Image/Image';
import {mockStore} from '../../../../../__mocks__/storeMock';

Enzyme.configure({
	adapter: new EnzymeAdapter(),
	// disableLifecycleMethods: true
});

const setup = (props) => {
	const wrapper = shallow(<ProductImage store={mockStore} {...props}/>).dive();
	return wrapper;
};

describe('ProductImage Component Test Suite', () => {
	let props, wrapper;
	const getBoundingClientRectMock = jest.fn();
	const openModalMock = jest.fn();
	beforeEach(() => {
		props = {
			image: {
				url: 'url'
			},
			getBoundingClientRect: getBoundingClientRectMock,
			openModalAction: openModalMock,
			isModalOpen: true
		};

		wrapper = setup(props);

	});

	test('render check', () => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('style type check',() => {
		expect(wrapper.props().children[0].type).toBe('div');
	});

	test('image type check',() => {
		expect(typeof wrapper.instance().props.image.url).toBe('string');
		expect(wrapper.instance().props.image.url).toBe('url');
	});

	describe('Functions check', () => {

		test('onMouseLeave check', () => {
			wrapper.instance().onMouseLeave();
			expect(wrapper.instance().state.displayEnlarged).toBe(false);
		});

		test('onHover check', () => {
			const e = {
				currentTarget: {
					getBoundingClientRect: jest.fn(() =>({
						x:0,
						y: 0,
						width: 8,
						height: 17,
					}))
				},
				clientX:5,
				clientY:5
			};
			wrapper.instance().onHover(e);
			expect(wrapper.instance().state.displayEnlarged).toBe(true);
		});
		test('openImageModal function call check', () => {
			const openImageModalMock = wrapper.instance().openImageModal;
			expect(typeof openImageModalMock).toBe('function');
			openImageModalMock();
			const openModalActionMockCallCount = openModalMock.mock.calls.length;
			expect(openModalActionMockCallCount).toBeDefined();
		});
	});

	describe('component render check', () => {

		test('EnlargedImage component gets rendered', () => {
			expect(wrapper.containsMatchingElement(<EnlargedImage />)).toBeDefined();
		});
		test('Image component gets rendered', () => {
			expect(wrapper.containsMatchingElement(<Image />)).toBeDefined();
		});
	});
});

describe('ProductImage Component Test Suite', () => {
	let props, wrapper;
	const getBoundingClientRectMock = jest.fn();
	const openModalMock = jest.fn();

	beforeEach(() => {
		props = {
			image: {
				url: 'url'
			},
			getBoundingClientRect: getBoundingClientRectMock,
			openModalAction: openModalMock,
			isModalOpen: false
		};
		wrapper = setup(props);
	});

	test('render check', () => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
});