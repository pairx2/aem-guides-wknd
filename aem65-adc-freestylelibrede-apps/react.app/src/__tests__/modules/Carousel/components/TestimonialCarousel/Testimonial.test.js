import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import Testimonial from '../../../../../modules/Carousel/components/TestimonialCarousel/Testimonial';
import Image from '../../../../../modules/Generic/components/Image/Image';

Enzyme.configure({
	adapter: new EnzymeAdapter(),
	// disableLifecycleMethods: true
});

describe('Testimonial Component Test Suite', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
			testimonial:{
				'testimonialImage':'testimonialImage',
				'testimonialImageAltText':'testimonialImageAltText',
				'testimonialQuote':'testimonialQuote',
				'testimonialName':'testimonialName',
				'ctaText':'ctaText',
				'ctaURL':'ctaURL',
				'ctaStyling': 'ctaStyling',
				'ctaAction' : 'ctaAction'
			}
		};
		wrapper = shallow(<Testimonial {...props} />);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
	test('Circle  renders Image',() => {
		expect(wrapper.props().children[0].props.children[0].type.name).toBe('Circle');
		expect(wrapper.props().children[0].props.children[0].props.children.props.fit).toBe(Image.FIT.COVER);
		expect(wrapper.props().children[0].props.children[0].props.children.props.src).toBe('testimonialImage');
		expect(wrapper.props().children[0].props.children[0].props.children.props.alt).toBe('testimonialImageAltText');

	});
	test('div tag render',() => {
		expect(wrapper.props().children[0].props.children[1].type).toBe('div');
	});
	test('h4 inside div - renders testimonialName',() => {
		expect(wrapper.props().children[0].props.children[1].props.children[0].type).toBe('h4');
		expect(wrapper.props().children[0].props.children[1].props.children[0].props.children).toBe('testimonialName');
	});
	test('p inside div - renders testimonialQuote',() => {
		expect(wrapper.props().children[0].props.children[1].props.children[1].type).toBe('p');
		expect(wrapper.props().children[0].props.children[1].props.children[1].props.children).toBe('testimonialQuote');
	});
	test('Button props',() => {
		expect(wrapper.props().children[1].props).toBeInstanceOf(Object);
		expect(wrapper.props().children[1].props.ctaStyle).toBe('ctaStyling');
		expect(wrapper.props().children[1].props.label).toBe('ctaText');
		expect(wrapper.props().children[1].props.href).toBe('ctaURL');
		expect(wrapper.props().children[1].props.target).toBe('ctaAction');
	});
});
