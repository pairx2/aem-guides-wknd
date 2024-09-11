import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import BannerImage from '../../../../modules/Banner/components/BannerImage';

Enzyme.configure({
	adapter: new EnzymeAdapter()
});

describe('BannerImage Component Test Suite ', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
			image: 'image',
			isHalfWidth: true,
			textPosition: 'text-left',
			bannerType: 'Video',
			children:[
				{
					a:'b'
				}
			]
		};
		wrapper = shallow(<BannerImage {...props} />);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
});
describe('BannerImage Component Test Suite ', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
			image: 'image',
			isHalfWidth: false,
			textPosition: 'text-left',
			bannerType: 'image',
			children:[
				{
					a:'b'
				}
			]
		};
		wrapper = shallow(<BannerImage {...props} />);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
});
describe('BannerImage Component Test Suite ', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
			image: 'image',
			isHalfWidth: false,
			textPosition: 'text-left',
			bannerType: 'image',
			children: null
		};
		wrapper = shallow(<BannerImage {...props} />);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
});