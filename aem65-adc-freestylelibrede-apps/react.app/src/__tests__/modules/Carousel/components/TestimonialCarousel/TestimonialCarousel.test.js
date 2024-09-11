import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import TestimonialCarousel from '../../../../../modules/Carousel/components/TestimonialCarousel/TestimonialCarousel';

Enzyme.configure({
	adapter: new EnzymeAdapter(),
	// disableLifecycleMethods: true
});

describe('TestimonialCarousel Component Test Suite', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
			sectionHeading: 'sectionHeadingString',
			heading: 'headingString',
			ctaText: 'ctaTextString',
			ctaStyling: 'primary',
			ctaURL: 'ctaURLString',
			ctaAction: 'ctaAction',
			children : [{'testimonialImage':'testimonialImage','testimonialImageAltText':'testimonialImageAltText','testimonialQuote':'testimonialQuote','testimonialName':'testimonialName','ctaText':'ctaText','ctaURL':'ctaURL'},
				{'testimonialImage':'testimonialImage','testimonialImageAltText':'testimonialImageAltText','testimonialQuote':'testimonialQuote','testimonialName':'testimonialName','ctaText':'ctaText','ctaURL':'ctaURL'}
			]
		};
		wrapper = shallow(<TestimonialCarousel {...props} />);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
	test('div tag render', () => {
		expect(wrapper.props().children.type).toBe('div');
	});
	test('h3 tag renders sectionHeading',() => {
		expect(wrapper.props().children.props.children[1].type).toBe('h3');
		expect(wrapper.props().children.props.children[1].props.children).toBe('sectionHeadingString');
	});
	test('h6 tag renders heading',() => {
		expect(wrapper.props().children.props.children[0].type).toBe('h6');
		expect(wrapper.props().children.props.children[0].props.children).toBe('headingString');
	});
	test('Carousel tag renders Testimonial,with 2 children',() => {
		expect(wrapper.props().children.props.children[2].type.displayName).toBe('withBreakpoints(Carousel)');
		expect(wrapper.props().children.props.children[2].props.itemsToShowDesktop).toBe(3);
		expect(wrapper.props().children.props.children[2].props.itemsToShowMobile).toBe(1);
		expect(wrapper.props().children.props.children[2].props.controlComponentDesktop.name).toBe('TestimonialControl');
		expect(wrapper.props().children.props.children[2].props.children.length).toBe(2);
		expect(wrapper.props().children.props.children[2].props.children[0].type.name).toBe('Testimonial');
		expect(wrapper.props().children.props.children[2].props.children[1].type.name).toBe('Testimonial');

	});
	test('div tag renders button',() => {
		expect(wrapper.props().children.props.children[3].type).toBe('div');
		expect(wrapper.props().children.props.children[3].props.children).toBeInstanceOf(Object);
		expect(wrapper.props().children.props.children[3].props.children.type.name).toBe('Button');
		expect(wrapper.props().children.props.children[3].props.children.props.ctaStyle).toBe('primary');
		expect(wrapper.props().children.props.children[3].props.children.props.label).toBe('ctaTextString');
		expect(wrapper.props().children.props.children[3].props.children.props.href).toBe('ctaURLString');
		expect(wrapper.props().children.props.children[3].props.children.props.target).toBe('ctaAction');

	});


});


