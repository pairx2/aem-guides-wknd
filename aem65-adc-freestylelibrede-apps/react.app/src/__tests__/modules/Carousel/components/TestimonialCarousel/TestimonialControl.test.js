import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import TestimonialControl from '../../../../../modules/Carousel/components/TestimonialCarousel/TestimonialControl';

Enzyme.configure({
	adapter: new EnzymeAdapter(),
	// disableLifecycleMethods: true
});

describe('TestimonialControl Component Test Suite - max > 3', () => {
	let props;
	let wrapper;
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
		};
		wrapper = shallow(<TestimonialControl {...props} />);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
	test('div tag renders with 3 children',() => {
		expect(wrapper.type()).toBe('div');
		expect(wrapper.props().children.length).toBe(3);
	});
	test('1st child - Icon',() => {
		expect(wrapper.props().children[0].type.name).toBe('Icon');
	});
	test('2nd child - span tag ',() => {
		expect(wrapper.props().children[1].type).toBe('span');
		expect(wrapper.props().children[1].props.children[0]).toBe(2);
		expect(wrapper.props().children[1].props.children[1].type).toBe('span');
	});
	test('3rd child - Icon',() => {
		expect(wrapper.props().children[2].type.name).toBe('Icon');
	});

});

describe('TestimonialControl Component Test Suite - max = 3, desktop', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
			currentIndex: 1,
			max: 3,
			next: jest.fn(),
			prev: jest.fn(),
			itemsToShow: 2,
			breakpoints : {
				desktop: 1025,
				mobile: 320,
				tablet: 768
			},
			currentBreakpoint : 'desktop',
			canDecrement:false,
			canIncrement:false,
		};
		wrapper = shallow(<TestimonialControl {...props} />);
	});
	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
});
describe('TestimonialControl Component Test Suite - max >1, mobile', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
			currentIndex: 1,
			max: 3,
			next: jest.fn(),
			prev: jest.fn(),
			itemsToShow: 2,
			breakpoints : {
				desktop: 1025,
				mobile: 320,
				tablet: 768
			},
			currentBreakpoint : 'mobile',
			canDecrement:true,
			canIncrement:false,
		};
		wrapper = shallow(<TestimonialControl {...props} />);
	});
	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
});
describe('TestimonialControl Component Test Suite - max = 1, mobile', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
			currentIndex: 1,
			max: 1,
			next: jest.fn(),
			prev: jest.fn(),
			itemsToShow: 2,
			breakpoints : {
				desktop: 1025,
				mobile: 320,
				tablet: 768
			},
			currentBreakpoint : 'mobile',
			canDecrement:false,
			canIncrement:true,
		};
		wrapper = shallow(<TestimonialControl {...props} />);
	});
	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
});


