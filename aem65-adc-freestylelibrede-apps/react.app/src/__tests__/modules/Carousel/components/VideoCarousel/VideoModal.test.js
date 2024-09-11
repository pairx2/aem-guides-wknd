import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import VideoModal from '../../../../../modules/Carousel/components/VideoCarousel/VideoModal';
import {mockStore} from '../../../../../__mocks__/storeMock';

Enzyme.configure({
	adapter: new EnzymeAdapter(),
	// disableLifecycleMethods: true
});

const setup = (props) => {
	const wrapper = shallow(<VideoModal store={mockStore} {...props} />).dive();
	return wrapper;
};

describe('VideoModal Component Test Suite', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
			videoId:'1221213',
			closeModalAction: jest.fn()
		};
		wrapper = setup(props);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('videoPlay function', () => {
		const videoPlayMock = wrapper.instance().videoPlay;
		expect(typeof videoPlayMock).toBe('function');

		videoPlayMock();
	});

	test('handleProgress function with 25', () => {
		const handleProgressMock = wrapper.instance().handleProgress;
		expect(typeof handleProgressMock).toBe('function');

		const progress= {played: 26};
		handleProgressMock(progress);
	});

	test('handleProgress function with 50', () => {
		wrapper.instance().setState({playedQuarter: true});

		const handleProgressMock = wrapper.instance().handleProgress;
		expect(typeof handleProgressMock).toBe('function');

		const progress= {played: 51};
		handleProgressMock(progress);
	});

	test('handleProgress function with 75', () => {
		wrapper.instance().setState({playedQuarter: true, playedHalf: true});

		const handleProgressMock = wrapper.instance().handleProgress;
		expect(typeof handleProgressMock).toBe('function');

		const progress= {played: 76};
		handleProgressMock(progress);
	});
	test('handleProgress function', () => {
		wrapper.instance().setState({playedQuarter: true, playedHalf: true});

		const handleProgressMock = wrapper.instance().handleProgress;
		expect(typeof handleProgressMock).toBe('function');

		const progress= {played: 0};
		handleProgressMock(progress);
	});
	

	test('videoStop function in onEnded prop', () => {
		const onEndedProp= wrapper.props().children[1].props.onEnded;
		expect(typeof onEndedProp).toBe('function');
		onEndedProp();
	});
});



