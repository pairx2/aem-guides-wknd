import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import ImageCarouselItem from '../../../../../modules/Carousel/components/ImageCarousel/ImageCarouselItem';
import Image from '../../../../../modules/Generic/components/Image/Image';

Enzyme.configure({
	adapter: new EnzymeAdapter()
});

describe('ImageCarouselItem Component Test Suite', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
			image:{
				renditions: ['a','b'],
				title: 'title'
			},
		};
		wrapper = shallow(<ImageCarouselItem {...props} />);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
	test('div  renders h2 and Image tags',() => {
		expect(wrapper.type()).toBe('div');
		expect(wrapper.props().children.length).toBe(2);
		expect(wrapper.props().children[0].type).toBe('h2');
		expect(wrapper.props().children[0].props.children).toBe('title');
		expect(wrapper.props().children[1].type.name).toBe('Image');
		expect(wrapper.props().children[1].props.fit).toBe(Image.FIT.COVER);

	});
});
