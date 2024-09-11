import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import VideoCarousel from '../../../../../modules/Carousel/components/VideoCarousel/VideoCarousel';
import {Title} from '../../../../../modules/Generic/components/Title/Title';

Enzyme.configure({
	adapter: new EnzymeAdapter(),
	// disableLifecycleMethods: true
});

describe('VideoCarousel Component Test Suite', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
			heading: 'heading',
			sectionHeading: 'sectionHeading',
			ctaText: 'ctaText',
			ctaStyling: 'primary',
			ctaURL: 'ctaURL',
			ctaAction: 'ctaAction',
			children : [{videoId:'1221213'},
				{videoId:'1221213'}
			]
		};
		wrapper = shallow(<VideoCarousel {...props} />);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
	test('Title tag render',() => {
		expect(wrapper.props().children[0].type.name).toBe('Title');
		expect(wrapper.props().children[0].props.size).toBe(Title.SIZE.SECTION);
		expect(wrapper.props().children[0].props.color).toBe(Title.COLOR.BLUE);
		expect(wrapper.props().children[0].props.isCentered).toBe(true);
		expect(wrapper.props().children[0].props.text).toBe('heading');
	});
	test('p tag renders sectionHeading',() => {
		expect(wrapper.props().children[1].type).toBe('p');
		expect(wrapper.props().children[1].props.children).toBe('sectionHeading');
	});
	test('Carousel tag renders Testimonial,with 2 children',() => {
		expect(wrapper.props().children[2].type.displayName).toBe('withBreakpoints(Carousel)');
		expect(wrapper.props().children[2].props.itemsToShowDesktop).toBe(3);
		expect(wrapper.props().children[2].props.itemsToShowMobile).toBe(1);
		expect(wrapper.props().children[2].props.controlComponentDesktop.name).toBe('CarouselControlBlueOrbs');
		expect(wrapper.props().children[2].props.children.length).toBe(2);
	});

});

describe('VideoCarousel Component Test Suite', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
			heading: null,
			sectionHeading: 'sectionHeading',
			ctaText: null,
			ctaStyling: 'primary',
			ctaURL: 'ctaURL',
			ctaAction: 'ctaAction',
			children : [{videoId:'1221213'},
				{videoId:'1221213'}
			]
		};
		wrapper = shallow(<VideoCarousel {...props} />);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});


});


