import React from 'react';
import Enzyme, {shallow,mount} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import BannerContent from '../../../../modules/Banner/components/BannerContent';
import {Provider} from 'react-redux';
import {mockStore} from '../../../../__mocks__/storeMock';

Enzyme.configure({
	adapter: new EnzymeAdapter()
});

describe('BannerContent Component Test Suite ', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
			title: 'title',
			description: 'description',
			subHeading: 'subheading',
			subHeadingTextColor: 'blue',
			headingTextColor: 'blue',
			headingType: 'h1',
			subHeadingType: 'h5',
			children:[
				{
					a:'b'
				}
			]
		};
		wrapper = shallow(<BannerContent {...props} />);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
});
describe('BannerContent Component Test Suite ', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
			title: 'title',
			description: 'description',
			subHeading: 'subheading',
			subHeadingTextColor: 'blue',
			headingTextColor: 'blue',
			headingType: 'h1',
			subHeadingType: 'h5',
			children:[]
		};
		wrapper = mount(<Provider store={mockStore}><BannerContent {...props} /></Provider>);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
});