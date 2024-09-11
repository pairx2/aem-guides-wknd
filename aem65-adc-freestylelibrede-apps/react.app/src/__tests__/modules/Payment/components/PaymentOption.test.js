import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import PaymentOption from '../../../../modules/Payment/components/PaymentOption';

jest.mock('../../../../utils/translationUtils.js');

Enzyme.configure({
	adapter: new EnzymeAdapter()
});

describe('PaymentOption Component Test Suite -isLimitHeight:true,', () => {
	let props;
	let wrapper;
	const toggleOptionMock = jest.fn();
	beforeEach(() => {
		props = {
			title: 'title',
			icon: 'icon',
			index:  1,
			isExpanded: true,
			isLoading: true,
			isLimitHeight: true,
			toggleOption: toggleOptionMock,
			isWidgetLoading: false
		};
		wrapper = shallow(<PaymentOption {...props} />);

	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

});
describe('PaymentOption Component Test Suite -isLimitHeight: false,', () => {
	let props;
	let wrapper;
	const toggleOptionMock = jest.fn();
	beforeEach(() => {
		props = {
			title: 'title',
			icon: null,
			index:  1,
			isExpanded: false,
			isLoading: true,
			isLimitHeight: false,
			toggleOption: toggleOptionMock,
			isWidgetLoading: false
		};
		wrapper = shallow(<PaymentOption {...props} />);

	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
	test('onclick',() =>{
		const divonClick = wrapper.find('div');
		divonClick.simulate('click');
		const toggleOptionMockCount = toggleOptionMock.mock.calls.length;
		expect(toggleOptionMockCount).not.toBe(0);
	});

});

describe('PaymentOption Component Test Suite -isLimitHeight: false,', () => {
	let props;
	let wrapper;
	const toggleOptionMock = jest.fn();
	beforeEach(() => {
		props = {
			title: 'title',
			icon: 'icon',
			index:  1,
			isExpanded: false,
			isLoading: true,
			isLimitHeight: false,
			toggleOption: toggleOptionMock,
			isWidgetLoading: false
		};
		wrapper = shallow(<PaymentOption {...props} />);

	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

});