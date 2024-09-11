import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import {mockStore} from '../../../../__mocks__/storeMock';
import BannerProduct from '../../../../modules/Banner/components/BannerProduct';

Enzyme.configure({
	adapter: new EnzymeAdapter(),
});

const setup = (props = {}) => {
	const wrapper = shallow(<BannerProduct store={mockStore} {...props} />).dive().dive();
	return wrapper;
};
describe('BannerProduct Component Test Suite ', () => {
	let props;
	let wrapper;
	const getProductPriceMOck = jest.fn();
	beforeEach(() => {
		props = {
			getProductPrice: getProductPriceMOck,
			productSku: 'S5269856',
			title: 'String',
			description: 'String',
			headingType: 'h1',
			headingTextColor: 'blue',
			subHeading: 'subheading',
			subHeadingType:'h5',
			subHeadingTextColor: 'blue',
			children:[
				{
					a:'b'
				}
			]
		};
		wrapper = setup(props);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

});

describe('BannerProduct Component Test Suite ', () => {
	let props;
	let wrapper;
	const getProductPriceMOck = jest.fn();
	beforeEach(() => {
		props = {
			getProductPrice: getProductPriceMOck,
			productSku: 'productSku',
			title: 'String',
			description: 'String',
			headingType: 'h1',
			headingTextColor: 'blue',
			subHeading: 'subheading',
			subHeadingType:'h5',
			subHeadingTextColor: 'blue',
			children:[
				{
					a:'b'
				}
			]
		};
		wrapper = setup(props);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

});