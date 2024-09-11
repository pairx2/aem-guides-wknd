import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import VideoCarouselItem from '../../../../../modules/Carousel/components/VideoCarousel/VideoCarouselItem';
import {mockStore} from '../../../../../__mocks__/storeMock';

Enzyme.configure({
	adapter: new EnzymeAdapter()
});
const setup = (props) => {
	const wrapper = shallow(<VideoCarouselItem store={mockStore} {...props} />).dive();
	return wrapper;
};
describe('VideoCarouselItem Component Test Suite', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
			video: {
				videoId:'1221213',
				title: 'title',
				titleTextColor: 'titleTextColor',
				titleSize: 'titleSize',
				thumbnailImage: 'thumbnailImage',
				videoPlayOption: 'videoPlayOption',
			}
		};
		wrapper= setup(props);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
	test('div tag renders rectangle',() => {
		expect(wrapper.type()).toBe('div');
		expect(wrapper.props().children.type.name).toBe('Rectangle');

	});
	test('Rectangle tag renders 2 children',() => {
		expect(wrapper.props().children.props.children.length).toBe(2);
	});
	test('Rectangle tag renders iframe - child 1',() => {
		expect(typeof wrapper.props().children.props.children[0].type).toBe('function');
		expect(wrapper.props().children.props.children[0].props.url).toBe('https://www.youtube.com/watch?v=1221213');
	});
	test('onPlay function',() => {
		const onPlayProp= wrapper.props().children.props.children[0].props.onPlay;
		expect(typeof onPlayProp).toBe('function');
		onPlayProp();
	});
	test('Rectangle tag renders Title - child 2',() => {
		expect(wrapper.props().children.props.children[1].type.name).toBe('Title');
	});

});

describe('VideoCarouselItem Component Test Suite', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
			video: {
				videoId:'1221213',
				title: 'title',
				titleTextColor: 'titleTextColor',
				titleSize: 'titleSize',
				thumbnailImage: null,
				videoPlayOption: 'display-on-modal',
			}
		};
		wrapper= setup(props);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('div tag renders rectangle',() => {
		expect(wrapper.type()).toBe('div');
		expect(wrapper.props().children.type.name).toBe('Rectangle');
	});

	test('onClick property', () => {
		const onClickProp= wrapper.props().children.props.children.props.children[0].props.children.props.onClick;
		expect(typeof onClickProp).toBe('function');

		onClickProp();
	});

});

