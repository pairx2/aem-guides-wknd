import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import Carousel from '../../../../modules/Carousel/components/Carousel';
import {mockStore} from '../../../../__mocks__/storeMock';


Enzyme.configure({
	adapter: new EnzymeAdapter(),
});

const setup = (props) => {
	const wrapper = shallow(<Carousel store={mockStore} {...props} />).dive().dive();
	return wrapper;
};


describe('Carousel Test Case Suite when breakpoint is mobile- 1', () => {

	let props, wrapper;
	const controlComponentMobileMock = jest.fn();
	const controlComponentTabletMock = jest.fn();
	const controlComponentDesktopMock = jest.fn();

	beforeEach(() => {
		props = {
			itemsToShowMobile: 1,
			itemsToShowTablet: 2,
			itemsToShowDesktop: 3,
			scrollByMobile: 1,
			scrollByTablet: 2,
			scrollByDesktop: 3,
			hasArrows: true,
			canAutoSlide:false,
			arrowLeftIcon: 'arrowLeftIcon',
			arrowRightIcon: 'arrowRightIcon',
			controlComponentMobile: controlComponentMobileMock,
			controlComponentTablet: controlComponentTabletMock,
			controlComponentDesktop: controlComponentDesktopMock,
			animationTime: 1,
			controlPosition: 'top',
			items: ['items1', 'items2'],
			breakpoints : {mobile: 320, tablet: 768, desktop: 1025},
			currentBreakpoint: 'mobile',
			children: ['child1', 'child2', 'child3'],
			className: 'className',
			isNexgenCarousel: true,
			requestAnimationFrame: jest.fn().mockImplementation(callback => callback())
		};
		wrapper = setup(props);
	});

	describe('props check', () => {

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});

		test('render check', () => {
			expect(wrapper.type()).not.toEqual(null);
		});

		test('itemsToShowMobile is prop of type number', () => {
			const itemsToShowMobileProp = wrapper.instance().props.itemsToShowMobile;
			expect(typeof itemsToShowMobileProp).toBe('number');
		});

		test('itemsToShowTablet is prop of type number', () => {
			const itemsToShowTabletProp = wrapper.instance().props.itemsToShowTablet;
			expect(typeof itemsToShowTabletProp).toBe('number');
		});

		test('itemsToShowDesktop is prop of type number', () => {
			const itemsToShowDesktopProp = wrapper.instance().props.itemsToShowDesktop;
			expect(typeof itemsToShowDesktopProp).toBe('number');
		});

		test('scrollByMobile is prop of type number', () => {
			const scrollByMobileProp = wrapper.instance().props.scrollByMobile;
			expect(typeof scrollByMobileProp).toBe('number');
		});

		test('scrollByTablet is prop of type number', () => {
			const scrollByTabletProp = wrapper.instance().props.scrollByTablet;
			expect(typeof scrollByTabletProp).toBe('number');
		});

		test('scrollByDesktop is prop of type number', () => {
			const scrollByDesktopProp = wrapper.instance().props.scrollByDesktop;
			expect(typeof scrollByDesktopProp).toBe('number');
		});

		test('hasArrows is prop of type boolean', () => {
			const hasArrowsProp = wrapper.instance().props.hasArrows;
			expect(typeof hasArrowsProp).toBe('boolean');
		});

		test('arrowLeftIcon is prop of type string', () => {
			const arrowLeftIconProp = wrapper.instance().props.arrowLeftIcon;
			expect(typeof arrowLeftIconProp).toBe('string');
		});

		test('arrowRightIcon is prop of type string', () => {
			const arrowRightIconProp = wrapper.instance().props.arrowRightIcon;
			expect(typeof arrowRightIconProp).toBe('string');
		});

		test('controlComponentMobile is prop of type function', () => {
			const controlComponentMobileProp = wrapper.instance().props.controlComponentMobile;
			expect(typeof controlComponentMobileProp).toBe('function');
		});

		test('controlComponentTablet is prop of type function', () => {
			const controlComponentTabletProp = wrapper.instance().props.controlComponentTablet;
			expect(typeof controlComponentTabletProp).toBe('function');
		});

		test('controlComponentDesktop is prop of type function', () => {
			const controlComponentDesktopProp = wrapper.instance().props.controlComponentDesktop;
			expect(typeof controlComponentDesktopProp).toBe('function');
		});

		test('animationTime is prop of type number', () => {
			const animationTimeProp = wrapper.instance().props.animationTime;
			expect(typeof animationTimeProp).toBe('number');
		});

		test('controlPosition is prop of type string', () => {
			const controlPositionProp = wrapper.instance().props.controlPosition;
			expect(typeof controlPositionProp).toBe('string');
		});

		test('items is prop of type array', () => {
			const itemsProp = wrapper.instance().props.items;
			expect(itemsProp).toBeInstanceOf(Array);
		});

		test('breakpoints is prop of type object', () => {
			const breakpointsProp = wrapper.instance().props.breakpoints;
			expect(breakpointsProp).toBeInstanceOf(Object);
		});

		test('currentBreakpoint is prop of type string', () => {
			const currentBreakpointProp = wrapper.instance().props.currentBreakpoint;
			expect(typeof currentBreakpointProp).toBe('string');
		});

	});

	describe('state check', () => {

		test('state check', () => {
			const stateCheck = wrapper.instance().state;
			expect(stateCheck).toBeInstanceOf(Object);
			expect(typeof stateCheck.currentIndex).toBe('number');
			expect(stateCheck.currentIndex).toBe(0);
			expect(stateCheck.animating).toBeFalsy();
		});
	});

	describe('Functions check', () => {

		test('onScroll function call check', () => {
			const onScrollMock = wrapper.instance().onScroll;
			expect(typeof onScrollMock).toBe('function');
			wrapper.setProps({ isNexgenCarousel: false });
			const mockedEvent1 = { target: {} };
			onScrollMock(mockedEvent1);

			expect(wrapper.instance().state.currentIndex).toBeDefined();
		});
		test('onScroll function call check', () => {
			const onScrollMock = wrapper.instance().onScroll;
			expect(typeof onScrollMock).toBe('function');
			wrapper.setProps({ isNexgenCarousel: true });
			const mockedEvent1 = { target: {} };
			onScrollMock(mockedEvent1);

			expect(wrapper.instance().state.currentIndex).toBeDefined();
		});
		test('handleEnd  function call check', () => {
			const handleEndMock = wrapper.instance().handleEnd ;
			expect(typeof handleEndMock).toBe('function');
			wrapper.instance().carouselRef = { scrollLeft: 1 };
			const mockedEvent1 = { target: {} };
			handleEndMock(mockedEvent1);

			expect(wrapper.instance().state.currentIndex).toBeDefined();
		});
		test('handleEnd  function call check', () => {
			const handleEndMock = wrapper.instance().handleEnd ;
			expect(typeof handleEndMock).toBe('function');
			wrapper.instance().carouselRef = { scrollLeft: -1 };
			const mockedEvent1 = { target: {} };
			handleEndMock(mockedEvent1);

			expect(wrapper.instance().state.currentIndex).toBeDefined();
		});
		test('handleEnd  function call check', () => {
			const handleEndMock = wrapper.instance().handleEnd ;
			expect(typeof handleEndMock).toBe('function');
			wrapper.instance().carouselRef = { scrollLeft: 0 };
			const mockedEvent1 = { target: {} };
			handleEndMock(mockedEvent1);

			expect(wrapper.instance().state.currentIndex).toBeDefined();
		});

		test('getControlComponent function call check', () => {
			const getControlComponentMock = wrapper.instance().getControlComponent;
			expect(typeof getControlComponentMock).toBe('function');

			getControlComponentMock();
			const controlComponentMobileMockCallCount = controlComponentMobileMock.mock.calls.length;
			expect(controlComponentMobileMockCallCount).toBeDefined();

			const controlComponentTabletMockCallCount = controlComponentTabletMock.mock.calls.length;
			expect(controlComponentTabletMockCallCount).toBeDefined();

			const controlComponentDesktopMockCallCount = controlComponentDesktopMock.mock.calls.length;
			expect(controlComponentDesktopMockCallCount).toBeDefined();
		});

		test('getItemWidth function call check', () => {
			const getItemWidthMock = wrapper.instance().getItemWidth;
			expect(typeof getItemWidthMock).toBe('function');

			expect(getItemWidthMock()).toBeUndefined();
		});

		test('getItemsToShow function call check when itemsToShowMobile, itemsToShowTablet & itemsToShowDesktop are available', () => {
			const getItemsToShowMock = wrapper.instance().getItemsToShow;
			expect(typeof getItemsToShowMock).toBe('function');

			expect(getItemsToShowMock()).toBe(1); // will be itemsToShowMobile
		});

		test('getScrollBy function call check', () => {
			const getScrollByMock = wrapper.instance().getScrollBy;
			expect(typeof getScrollByMock).toBe('function');

			expect(getScrollByMock()).toBe(1);
		});

		test('animateScroll function call check', () => {
			const animateScrollMock = wrapper.instance().animateScroll;
			expect(typeof animateScrollMock).toBe('function');

			const element = { scrollLeft: 2, scrollWidth: 1, clientWidth: 3 };
			animateScrollMock(element, 2, 0, 2);
			expect(wrapper.instance().state.animating).toBe(false);
		});

		test('animateScroll function call check- other condition', () => {
			const animateScrollMock = wrapper.instance().animateScroll;
			expect(typeof animateScrollMock).toBe('function');

			const element = { scrollLeft: 2, scrollWidth: 4, clientWidth: 3 };
			animateScrollMock(element, 0, -1, 0);
			expect(wrapper.instance().state.animating).toBeTruthy();
		});

		test('canDecrement function call check', () => {
			const canDecrementMock = wrapper.instance().canDecrement;
			expect(typeof canDecrementMock).toBe('function');

			expect(canDecrementMock()).toBeFalsy();
		});

		test('canIncrement function call check', () => {
			const canIncrementMock = wrapper.instance().canIncrement;
			expect(typeof canIncrementMock).toBe('function');

			expect(canIncrementMock()).toBeTruthy();
		});

		test('goTo function call check', () => {
			const goToMock = wrapper.instance().goTo;
			expect(typeof goToMock).toBe('function');

			wrapper.instance().carouselRef = { scrollLeft: 1 };
			expect(goToMock(2, false)).toBeUndefined();
			expect(goToMock(2, true)).toBeUndefined();
			expect(goToMock(2)).toBeUndefined();
		});

		test('next function call check', () => {
			const nextMock = wrapper.instance().next;
			expect(typeof nextMock).toBe('function');

			wrapper.instance().carouselRef = { scrollLeft: 1 };
			expect(nextMock()).toBeUndefined();
		});

		test('prev function call check', () => {
			const prevMock = wrapper.instance().prev;
			expect(typeof prevMock).toBe('function');
			wrapper.instance().carouselRef = { scrollLeft: 1 };
			prevMock();

			expect(prevMock()).toBeUndefined();
		});

		test('next function call check', () => {
			wrapper.setProps({ isNexgenCarousel: false });
			const nextMock = wrapper.instance().next;
			expect(typeof nextMock).toBe('function');

			wrapper.instance().carouselRef = { scrollLeft: 1 };
			expect(nextMock()).toBeUndefined();
		});

		test('prev function call check', () => {
			wrapper.setProps({ isNexgenCarousel: false });
			const prevMock = wrapper.instance().prev;
			expect(typeof prevMock).toBe('function');

			wrapper.instance().carouselRef = { scrollLeft: 1 };
			expect(prevMock()).toBeUndefined();
		});
		test('referenceCarousel function call check', () => {
			const referenceCarouselMock = wrapper.instance().referenceCarousel;
			expect(typeof referenceCarouselMock).toBe('function');

			const arg = { scrollLeft: 1, scrollWidth: 3, clientWidth: 2 };
			referenceCarouselMock(arg);
			expect(wrapper.instance().carouselRef).toEqual(arg);
		});
		test('autoSlide  function call check', () => {
			const autoSlideMock = wrapper.instance().autoSlide;
			expect(typeof autoSlideMock).toBe('function');
			wrapper.instance().carouselRef = { scrollLeft: 1 };
			autoSlideMock();
		});
		test('autoSlide  function call check with param', () => {
			const autoSlideMock = wrapper.instance().autoSlide;
			expect(typeof autoSlideMock).toBe('function');
			wrapper.instance().carouselRef = { scrollLeft: 1 };
			autoSlideMock();
		});
		test('componentDidMount function call check', () => {
			wrapper.instance().carouselRef = { scrollLeft: 1 };
			const componentDidMountMock = wrapper.instance().componentDidMount;
			expect(typeof componentDidMountMock).toBe('function');

			jest.spyOn(window, 'addEventListener').mockImplementationOnce((event, handler, options) => {
				wrapper.instance().carouselRef = { scrollLeft: 1, scrollWidth: 4, clientWidth: 1 };
			});

			const spy = jest.spyOn(wrapper.instance(), 'componentDidMount');

			global.addEventListener('resize', spy);
			global.dispatchEvent(new Event('resize'));

		});

		test('componentDidUpdate function call check', () => {
			const componentDidUpdateMock = wrapper.instance().componentDidUpdate;
			expect(typeof componentDidUpdateMock).toBe('function');

			const prevProps = { currentBreakpoint: '' };
			wrapper.instance().carouselRef = { scrollLeft: 1 };

			wrapper.instance().componentDidUpdate(prevProps);
			expect(wrapper.instance().carouselRef.scrollLeft).toBeDefined();
		});
	});
});

describe('Carousel Test Case Suite when breakpoint is mobile- 2', () => {

	let props, wrapper;
	const controlComponentTabletMock = jest.fn();
	const controlComponentDesktopMock = jest.fn();

	beforeEach(() => {
		props = {
			itemsToShowTablet: 2,
			itemsToShowDesktop: 3,
			scrollByTablet: 2,
			scrollByDesktop: 3,
			hasArrows: true,
			canAutoSlide: false,
			arrowLeftIcon: 'arrowLeftIcon',
			arrowRightIcon: 'arrowRightIcon',
			controlComponentTablet: controlComponentTabletMock,
			controlComponentDesktop: controlComponentDesktopMock,
			animationTime: 1,
			controlPosition: 'bottom',
			items: ['items1', 'items2'],
			breakpoints: { mobile: 320, tablet: 768, desktop: 1025 },
			currentBreakpoint: 'mobile',
			children: ['child1', 'child2'],
			className: null,
			isNexgenCarousel: false
		};
		wrapper = setup(props);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('getControlComponent function call check', () => {
		const getControlComponentMock = wrapper.instance().getControlComponent;
		expect(typeof getControlComponentMock).toBe('function');

		getControlComponentMock();
		const controlComponentTabletMockCallCount = controlComponentTabletMock.mock.calls.length;
		expect(controlComponentTabletMockCallCount).toBeDefined();

		const controlComponentDesktopMockCallCount = controlComponentDesktopMock.mock.calls.length;
		expect(controlComponentDesktopMockCallCount).toBeDefined();
	});

	test('getItemsToShow function call check', () => {
		const getItemsToShowMock = wrapper.instance().getItemsToShow;
		expect(typeof getItemsToShowMock).toBe('function');

		expect(getItemsToShowMock()).toBe(2); // will be itemsToShowTablet
	});

	test('getScrollBy function call check', () => {
		const getScrollByMock = wrapper.instance().getScrollBy;
		expect(typeof getScrollByMock).toBe('function');

		expect(getScrollByMock()).toBe(2);
	});

	test('canDecrement function call check', () => {
		const canDecrementMock = wrapper.instance().canDecrement;
		expect(typeof canDecrementMock).toBe('function');

		expect(canDecrementMock()).toBeFalsy();
	});
	test('goTo function call check', () => {
		const goToMock = wrapper.instance().goTo;
		expect(typeof goToMock).toBe('function');

		wrapper.instance().carouselRef = { scrollLeft: 1 };
		expect(goToMock(2, false)).toBeUndefined();
		expect(goToMock(2, true)).toBeUndefined();
		expect(goToMock(2)).toBeUndefined();
	});
});

describe('Carousel Test Case Suite when breakpoint is mobile- 3', () => {

	let props, wrapper;
	const controlComponentDesktopMock = jest.fn();

	beforeEach(() => {
		props = {
			itemsToShowDesktop: 3,
			scrollByDesktop: 3,
			hasArrows: true,
			canAutoSlide: true,
			arrowLeftIcon: 'arrowLeftIcon',
			arrowRightIcon: 'arrowRightIcon',
			controlComponentDesktop: controlComponentDesktopMock,
			animationTime: 1,
			controlPosition: 'bottom',
			items: ['items1', 'items2'],
			breakpoints: { mobile: 320, tablet: 768, desktop: 1025 },
			currentBreakpoint: 'mobile',
			children: ['child1', 'child2'],
			isNexgenCarousel: true
		};
		wrapper = setup(props);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('getControlComponent function call check', () => {
		const getControlComponentMock = wrapper.instance().getControlComponent;
		expect(typeof getControlComponentMock).toBe('function');

		getControlComponentMock();
		const controlComponentDesktopMockCallCount = controlComponentDesktopMock.mock.calls.length;
		expect(controlComponentDesktopMockCallCount).toBeDefined();
	});

	test('getItemsToShow function call check', () => {
		const getItemsToShowMock = wrapper.instance().getItemsToShow;
		expect(typeof getItemsToShowMock).toBe('function');

		expect(getItemsToShowMock()).toBe(3); // will be itemsToShowDesktop
	});

	test('getScrollBy function call check', () => {
		const getScrollByMock = wrapper.instance().getScrollBy;
		expect(typeof getScrollByMock).toBe('function');

		expect(getScrollByMock()).toBe(3);
	});

	test('canIncrement function call check', () => {
		const newWrapper = wrapper.instance();
		newWrapper.setState({ currentIndex: 1 });
		expect(newWrapper.canIncrement()).toBeFalsy();
	});
});

describe('Carousel Test Case Suite when breakpoint is tablet- 1', () => {

	let props, wrapper;
	const controlComponentMobileMock = jest.fn();
	const controlComponentTabletMock = jest.fn();
	const controlComponentDesktopMock = jest.fn();

	beforeEach(() => {
		props = {
			itemsToShowMobile: 1,
			itemsToShowTablet: 2,
			itemsToShowDesktop: 3,
			scrollByMobile: 1,
			scrollByTablet: 2,
			scrollByDesktop: 3,
			hasArrows: true,
			canAutoSlide: false,
			arrowLeftIcon: 'arrowLeftIcon',
			arrowRightIcon: 'arrowRightIcon',
			controlComponentMobile: controlComponentMobileMock,
			controlComponentTablet: controlComponentTabletMock,
			controlComponentDesktop: controlComponentDesktopMock,
			animationTime: 1,
			controlPosition: 'top',
			items: ['items1', 'items2'],
			breakpoints: { mobile: 320, tablet: 768, desktop: 1025 },
			currentBreakpoint: 'tablet',
			children: ['child1', 'child2', 'child3'],
			isNexgenCarousel: true
		};
		wrapper = setup(props);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('getControlComponent function call check', () => {
		const getControlComponentMock = wrapper.instance().getControlComponent;
		expect(typeof getControlComponentMock).toBe('function');

		getControlComponentMock();

		const controlComponentTabletMockCallCount = controlComponentTabletMock.mock.calls.length;
		expect(controlComponentTabletMockCallCount).toBeDefined();

		const controlComponentDesktopMockCallCount = controlComponentDesktopMock.mock.calls.length;
		expect(controlComponentDesktopMockCallCount).toBeDefined();
	});

	test('getItemsToShow function call check', () => {
		const getItemsToShowMock = wrapper.instance().getItemsToShow;
		expect(typeof getItemsToShowMock).toBe('function');

		expect(getItemsToShowMock()).toBe(2); // will be itemsToShowTablet
	});

	test('getScrollBy function call check', () => {
		const getScrollByMock = wrapper.instance().getScrollBy;
		expect(typeof getScrollByMock).toBe('function');

		expect(getScrollByMock()).toBe(2);
	});

	test('next function call check', () => {
		const nextMock = wrapper.instance().next;
		expect(typeof nextMock).toBe('function');

		wrapper.instance().carouselRef = { scrollLeft: 1 };
		expect(nextMock()).toBeUndefined();
	});

	test('prev function call check', () => {
		const prevMock = wrapper.instance().prev;
		expect(typeof prevMock).toBe('function');

		wrapper.instance().carouselRef = { scrollLeft: 1 };
		expect(prevMock()).toBeUndefined();
	});
	test('goTo function call check', () => {
		const goToMock = wrapper.instance().goTo;
		expect(typeof goToMock).toBe('function');

		wrapper.instance().carouselRef = { scrollLeft: 1 };
		expect(goToMock(2, false)).toBeUndefined();
		expect(goToMock(2, true)).toBeUndefined();
		expect(goToMock(2)).toBeUndefined();
	});
});

describe('Carousel Test Case Suite when breakpoint is tablet- 2', () => {

	let props, wrapper;
	const controlComponentMobileMock = jest.fn();
	const controlComponentDesktopMock = jest.fn();

	beforeEach(() => {
		props = {
			itemsToShowMobile: 1,
			itemsToShowDesktop: 3,
			scrollByMobile: 1,
			scrollByDesktop: 3,
			hasArrows: true,
			canAutoSlide: false,
			arrowLeftIcon: 'arrowLeftIcon',
			arrowRightIcon: 'arrowRightIcon',
			controlComponentMobile: controlComponentMobileMock,
			controlComponentDesktop: controlComponentDesktopMock,
			animationTime: 1,
			controlPosition: 'top',
			items: ['items1', 'items2'],
			breakpoints: { mobile: 320, tablet: 768, desktop: 1025 },
			currentBreakpoint: 'tablet',
			children: ['child1', 'child2', 'child3']
		};
		wrapper = setup(props);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('getControlComponent function call check', () => {
		const getControlComponentMock = wrapper.instance().getControlComponent;
		expect(typeof getControlComponentMock).toBe('function');

		getControlComponentMock();
		const controlComponentDesktopMockCallCount = controlComponentDesktopMock.mock.calls.length;
		expect(controlComponentDesktopMockCallCount).toBeDefined();
	});

	test('getItemsToShow function call check', () => {
		const getItemsToShowMock = wrapper.instance().getItemsToShow;
		expect(typeof getItemsToShowMock).toBe('function');

		expect(getItemsToShowMock()).toBe(3); // will be itemsToShowTablet
	});

	test('getScrollBy function call check', () => {
		const getScrollByMock = wrapper.instance().getScrollBy;
		expect(typeof getScrollByMock).toBe('function');

		expect(getScrollByMock()).toBe(3);
	});

});

describe('Carousel Test Case Suite when breakpoint is null', () => {

	let props, wrapper;
	const controlComponentMobileMock = jest.fn();
	const controlComponentDesktopMock = jest.fn();

	beforeEach(() => {
		props = {
			itemsToShowMobile: 1,
			itemsToShowDesktop: 3,
			scrollByMobile: 1,
			scrollByDesktop: 3,
			hasArrows: true,
			canAutoSlide: false,
			arrowLeftIcon: 'arrowLeftIcon',
			arrowRightIcon: 'arrowRightIcon',
			controlComponentMobile: controlComponentMobileMock,
			controlComponentDesktop: controlComponentDesktopMock,
			animationTime: 1,
			controlPosition: 'top',
			items: ['items1', 'items2'],
			breakpoints: { mobile: 320, tablet: 768, desktop: 1025 },
			currentBreakpoint: null,
			children: ['child1', 'child2', 'child3'],
			isNexgenCarousel: true
		};
		wrapper = setup(props);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('getControlComponent function call check', () => {
		const getControlComponentMock = wrapper.instance().getControlComponent;
		expect(typeof getControlComponentMock).toBe('function');

		getControlComponentMock();
		const controlComponentDesktopMockCallCount = controlComponentDesktopMock.mock.calls.length;
		expect(controlComponentDesktopMockCallCount).toBeDefined();
	});

	test('getItemsToShow function call check', () => {
		const getItemsToShowMock = wrapper.instance().getItemsToShow;
		expect(typeof getItemsToShowMock).toBe('function');

		expect(getItemsToShowMock()).toBe(3); // will be itemsToShowTablet
	});

	test('getScrollBy function call check', () => {
		const getScrollByMock = wrapper.instance().getScrollBy;
		expect(typeof getScrollByMock).toBe('function');

		expect(getScrollByMock()).toBe(3);
	});
	test('next function call check', () => {
		const nextMock = wrapper.instance().next;
		expect(typeof nextMock).toBe('function');

		wrapper.instance().carouselRef = { scrollLeft: 1 };
		expect(nextMock()).toBeUndefined();
	});

	test('prev function call check', () => {
		const prevMock = wrapper.instance().prev;
		expect(typeof prevMock).toBe('function');

		wrapper.instance().carouselRef = { scrollLeft: 1 };
		expect(prevMock()).toBeUndefined();
	});

});

describe('Carousel Test Case Suite when scrollByMobile || scrollByTablet || scrollByDesktop are not available with breakpoint- mobile', () => {

	let props, wrapper;
	const controlComponentMobileMock = jest.fn();
	const controlComponentDesktopMock = jest.fn();

	beforeEach(() => {
		props = {
			itemsToShowMobile: 1,
			itemsToShowDesktop: 3,
			hasArrows: true,
			canAutoSlide: false,
			arrowLeftIcon: 'arrowLeftIcon',
			arrowRightIcon: 'arrowRightIcon',
			controlComponentMobile: controlComponentMobileMock,
			controlComponentDesktop: controlComponentDesktopMock,
			animationTime: 1,
			controlPosition: 'top',
			items: ['items1', 'items2'],
			breakpoints: { mobile: 320, tablet: 768, desktop: 1025 },
			currentBreakpoint: 'mobile',
			children: ['child1', 'child2', 'child3']
		};
		wrapper = setup(props);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('getScrollBy function call check', () => {
		const getScrollByMock = wrapper.instance().getScrollBy;
		expect(typeof getScrollByMock).toBe('function');

		expect(getScrollByMock()).toBe(1);
	});

});

describe('Carousel Test Case Suite when scrollByMobile || scrollByTablet || scrollByDesktop are not available with breakpoint- tablet', () => {

	let props, wrapper;
	const controlComponentMobileMock = jest.fn();
	const controlComponentDesktopMock = jest.fn();

	beforeEach(() => {
		props = {
			itemsToShowMobile: 1,
			itemsToShowTablet: 2,
			itemsToShowDesktop: 3,
			hasArrows: true,
			canAutoSlide: false,
			arrowLeftIcon: 'arrowLeftIcon',
			arrowRightIcon: 'arrowRightIcon',
			controlComponentMobile: controlComponentMobileMock,
			controlComponentDesktop: controlComponentDesktopMock,
			animationTime: 1,
			controlPosition: 'top',
			items: ['items1', 'items2'],
			breakpoints: { mobile: 320, tablet: 768, desktop: 1025 },
			currentBreakpoint: 'tablet',
			children: ['child1', 'child2', 'child3']
		};
		wrapper = setup(props);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('getScrollBy function call check', () => {
		const getScrollByMock = wrapper.instance().getScrollBy;
		expect(typeof getScrollByMock).toBe('function');

		expect(getScrollByMock()).toBe(2);
	});

});

describe('Carousel Test Case Suite when scrollByMobile || scrollByTablet || scrollByDesktop are not available with breakpoint- desktop', () => {

	let props, wrapper;
	const controlComponentMobileMock = jest.fn();
	const controlComponentDesktopMock = jest.fn();

	beforeEach(() => {
		props = {
			itemsToShowMobile: 1,
			itemsToShowTablet: 2,
			itemsToShowDesktop: 3,
			hasArrows: true,
			canAutoSlide: false,
			arrowLeftIcon: 'arrowLeftIcon',
			arrowRightIcon: 'arrowRightIcon',
			controlComponentMobile: controlComponentMobileMock,
			controlComponentDesktop: controlComponentDesktopMock,
			animationTime: 1,
			controlPosition: 'top',
			items: ['items1', 'items2'],
			breakpoints: { mobile: 320, tablet: 768, desktop: 1025 },
			currentBreakpoint: 'desktop',
			children: ['child1', 'child2', 'child3']
		};
		wrapper = setup(props);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('getScrollBy function call check', () => {
		const getScrollByMock = wrapper.instance().getScrollBy;
		expect(typeof getScrollByMock).toBe('function');

		expect(getScrollByMock()).toBe(3);
	});

});






