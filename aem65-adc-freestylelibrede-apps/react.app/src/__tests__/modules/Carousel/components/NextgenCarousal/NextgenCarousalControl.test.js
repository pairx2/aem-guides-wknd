import React from 'react';
import Enzyme, {mount, shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import NextgenCarousalControl from '../../../../../modules/Carousel/components/NextgenCarousal/NextgenCarousalControl';
Enzyme.configure({
	adapter: new EnzymeAdapter()
});

describe('NextgenCarousalControl Component Test Suite', () => {
	let props;
	let wrapper;
	const mockGoto = jest.fn();
	beforeEach(() => {
		props = {
            currentIndex: 1,
			max: 5,
			next: jest.fn(),
			prev: jest.fn(),
			itemsToShow: 2,
			breakpoints : {
				desktop: 1025,
				mobile: 320,
				tablet: 768
			},
			currentBreakpoint : 'desktop',
			canDecrement:true,
			canIncrement:true,
            goto: jest.fn()
		};
		wrapper = shallow(<NextgenCarousalControl {...props} />);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

    test('renders without crashing', () => {
        wrapper.setProps({	canDecrement:false,
			canIncrement:false,})
		expect(wrapper).toBeDefined();
	});

});
