import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import BannerVideo from '../../../../modules/Banner/components/BannerVideo';
import {mockStore} from '../../../../__mocks__/storeMock';
Enzyme.configure({
	adapter: new EnzymeAdapter()
});

const setup = (props) => {
	const wrapper = shallow(<BannerVideo store={mockStore} {...props} />).dive();
	return wrapper;
};
describe('BannerVideo Component Test Suite ', () => {
	let props;
	let wrapper;
	const openModalActionMock = jest.fn();
	beforeEach(() => {
		props = {
			video: 'video',
			videoPlayOption: 'display-on-modal',
			openModalAction: openModalActionMock,
			image: 'image',
			children:[
				{
					a:'b'
				}
			]
		};
		wrapper= setup(props);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
	test('videoPlay', () => {
		wrapper.instance().videoPlay();
		expect(wrapper.instance().state.isVideoPlaying).toBe(true);
	});
	test('videoStop', () => {
		wrapper.instance().videoStop();
		expect(wrapper.instance().state.isVideoPlaying).toBe(false);
	});
	test('videoStop function with arg', () => {
		const videoStopMock = wrapper.instance().videoStop;
		expect(typeof videoStopMock).toBe('function');

		videoStopMock('End');
	});
	test('playVideo', () => {
		wrapper.instance().playVideo();
		const openModalActionMockCount = openModalActionMock.mock.calls.length;
		expect(openModalActionMockCount).toBeDefined();
	});
	test('handleProgress with 25 progress', () => {
		const handleProgressMock = wrapper.instance().handleProgress;
		expect(typeof handleProgressMock).toBe('function');

		const progress= {played: 25};
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

	test('playVideo function call on onClick property of Icon', () => {
		const onClickProp= wrapper.props().children.props.children.props.children[0].props.children.props.onClick;
		expect(typeof onClickProp).toBe('function');

		onClickProp();
	});
});

describe('BannerVideo Component Test Suite ', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
			video: 'video',
			children:null,
			image: 'image',
			videoPlayOption: 'videoPlayOption'
		};
		wrapper= setup(props);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
	test('videoPlay', () => {
		wrapper.instance().videoPlay();
		expect(wrapper.instance().state.isVideoPlaying).toBe(true);
	});
	test('videoStop', () => {
		wrapper.instance().videoStop();
		expect(wrapper.instance().state.isVideoPlaying).toBe(false);
	});

	test('videoStop function call on onEnded property', () => {
		const onEndedProp= wrapper.props().children.props.children.props.children[0].props.onEnded;
		expect(typeof onEndedProp).toBe('function');

		onEndedProp();
	});
});
describe('BannerVideo Component Test Suite ', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
			video: 'video',
			children:null,
			image: null,
			videoPlayOption: 'videoPlayOption'
		};
		wrapper= setup(props);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
});