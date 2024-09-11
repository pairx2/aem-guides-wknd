import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import ProductImageCarousel from '../../../../../modules/Product/components/ProductImageCarousel/ProductImageCarousel';

Enzyme.configure({
	adapter: new EnzymeAdapter(),
	// disableLifecycleMethods: true
});

describe('ProductImageCarousel Component Test Suite', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
			images: [{image:'image1'}],
			videos: [{video:'video1', videoId: 'videoId'}]
		};
		wrapper = shallow(<ProductImageCarousel {...props} />);
	});

	test('render check', () => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('images type check', () => {
		expect(wrapper.props().controlPosition).toBe('bottom');
	});

	test('videos type check', () => {
		expect(wrapper.props().items).toBeInstanceOf(Array);
	});
});
