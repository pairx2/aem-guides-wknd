import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import CarouselControlBlueOrbs from '../../../../modules/Carousel/components/CarouselControlBlueOrbs';

Enzyme.configure({
	adapter: new EnzymeAdapter()
});

describe('CarouselControlBlueOrbs Component Test Suite', () => {
	let props;
	let wrapper;
	const goToMock = jest.fn();
	beforeEach(() => {
		props = {
			currentIndex: 1,
			max: 5,
			goTo: goToMock,
			itemsToShow: 2
		};
		wrapper = shallow(<CarouselControlBlueOrbs {...props} />);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
	test('div  renders children 4 ',() => {
		expect(wrapper.type()).toBe('div');
		expect(wrapper.props().children.length).toBe(4);
	});
	test('child 1',() => {
		expect(wrapper.props().children[0].type).toBe('div');
		expect(wrapper.props().children[0].key).toBe('0');
		expect(wrapper.props().children[0].props.children.type.name).toBe('Circle');

	});
	test('onclick div',() => {
		const divTag = wrapper.find('div').at(1);
		divTag.simulate('click');
		const goToMockCount = goToMock.mock.calls.length;
		expect(goToMockCount).not.toBe(0);
	});
});