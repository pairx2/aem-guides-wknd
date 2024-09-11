import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import ImageCarousel from '../../../../../modules/Carousel/components/ImageCarousel/ImageCarousel';

Enzyme.configure({
	adapter: new EnzymeAdapter()
});

describe('ImageCarousel Component Test Suite', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
			children:[
				{
					renditions: ['a','b'],
					title: 'title'
				},
				{
					renditions: ['a','b'],
					title: 'title'
				}
			]
		};
		wrapper = shallow(<ImageCarousel {...props} />);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
	test('Carousel  renders 2 ImageCarouselItems with props ',() => {
		expect(wrapper.props().children.type.displayName).toBe('withBreakpoints(Carousel)');
		expect(wrapper.props().children.props.children.length).toBe(2);
		expect(wrapper.props().children.props.children[0].props.image).toBeInstanceOf(Object);
		expect(wrapper.props().children.props.children[0].type.name).toBe('ImageCarouselItem');
		expect(wrapper.props().children.props.children[1].props.image).toBeInstanceOf(Object);
		expect(wrapper.props().children.props.children[0].type.name).toBe('ImageCarouselItem');
	});
});
