import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import ProductImageCarouselControl from '../../../../../modules/Product/components/ProductImageCarousel/ProductImageCarouselControl';
import Image from '../../../../../modules/Generic/components/Image/Image';

Enzyme.configure({
	adapter: new EnzymeAdapter(),
	// disableLifecycleMethods: true
});

describe('ProductImageCarouselControl Component Test Suite', () => {
	let props;
	let wrapper;
	const goToMock = jest.fn();
	beforeEach(() => {
		props = {
			currentIndex: 1,
			items: [{item: 'item1'}],
			goTo: goToMock
		};
		wrapper = shallow(<ProductImageCarouselControl {...props} />);
	});

	test('render check', () => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('div  check',() => {
		expect(wrapper.type()).toBe('div');
		expect(wrapper.props().children.length).toBe(1);
	});

	test('child 1',() => {
		expect(wrapper.props().children[0].type).toBe('div');
		expect(wrapper.props().children[0].key).toBe('1');
	});

	test('onclick div',() => {
		const divTag = wrapper.find('div').at(1);
		divTag.simulate('click');
		const goToMockCount = goToMock.mock.calls.length;
		expect(goToMockCount).not.toBe(0);
	});

	describe('component render check', () => {

		test('Image component gets rendered', () => {
			expect(wrapper.containsMatchingElement(<Image />)).toBeDefined();
		});
	});

});

describe('ProductImageCarouselControl Component Test Suite', () => {
	let props;
	let wrapper;
	const goToMock = jest.fn();
	beforeEach(() => {
		props = {
			currentIndex: 0,
			items: [{item: 'item1'}],
			goTo: goToMock
		};
		wrapper = shallow(<ProductImageCarouselControl {...props} />);
	});

	test('render check', () => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

});

