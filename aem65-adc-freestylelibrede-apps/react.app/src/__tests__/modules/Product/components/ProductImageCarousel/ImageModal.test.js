import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import ImageModal from '../../../../../modules/Product/components/ProductImageCarousel/ImageModal';
import {mockStore} from '../../../../../__mocks__/storeMock';

Enzyme.configure({
	adapter: new EnzymeAdapter(),
	// disableLifecycleMethods: true
});

const setup = (props) => {
	const wrapper = shallow(<ImageModal store={mockStore} {...props} />);
	return wrapper;
};

describe('ImageModal Component Test Suite', () => {
	let props, wrapper;
	const closeModalMock = jest.fn();

	beforeEach(() => {
		props = {
			closeModal: closeModalMock,
			productItems: ['img1', 'img2', {videoId: 1}],
		};
		wrapper = setup(props);

	});
	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
	test('closeModal is prop of type function', () => {
		const onClickProp= wrapper.dive().props().children[1].props.onClick;
		expect(typeof onClickProp).toBe('function');
		onClickProp();
		const closeModalMockCallCount = closeModalMock.mock.calls.length;
		expect(closeModalMockCallCount).toBeDefined();
	});
});

