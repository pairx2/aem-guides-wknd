import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import MessageBanner from '../../../../../modules/Generic/components/MessageBanner/MessageBanner';

Enzyme.configure({
	adapter: new EnzymeAdapter(),
	// disableLifecycleMethods: true
});

describe('MessageBanner Component Test Suite', () => {
	let props;
	let wrapper;
	const onCloseActionMock = jest.fn();
	beforeEach(() => {
		props = {
			description: 'descriptionString',
			color: 'colorString',
			icon: 'iconString',
			canClose: true,
			className: 'classNameString',
			params: ['a','b'],
			onCloseAction: onCloseActionMock
		};
		wrapper = shallow(<MessageBanner {...props} />);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
	test('div  renders children 2 cols inside row',() => {
		expect(wrapper.props().children.type.name).toBe('Row');
		expect(wrapper.props().children.props.children.length).not.toBe(0);
		expect(wrapper.props().children.props.children[0].type.name).toBe('Col');
		expect(wrapper.props().children.props.children[1].type.name).toBe('Col');
		expect(wrapper.props().children.props.children[2].type.name).toBe('Col');
	});
	test('1st col renders Icon',() => {
		expect(wrapper.props().children.props.children[0].props.children.type).toBe('div');
		expect(wrapper.props().children.props.children[0].props.children.props.children.type.name).toBe('Icon');
		expect(wrapper.props().children.props.children[0].props.children.props.children.props.image).toBe('iconString');
	});
	test('2nd col renders p with I18n',() => {
		expect(wrapper.props().children.props.children[1].props.children.type).toBe('div');
		expect(wrapper.props().children.props.children[1].props.children.props.children.type).toBe('p');
		expect(wrapper.props().children.props.children[1].props.children.props.children.props.children.type.name).toBe('I18n');
		expect(wrapper.props().children.props.children[1].props.children.props.children.props.children.props.text).toBe('descriptionString');
	});
	test('3rd col',() => {
		expect(wrapper.props().children.props.children[2].props.children.type).toBe('div');
		expect(wrapper.props().children.props.children[2].props.children.props.children.type.name).toBe('Icon');
	});
	test('onclick',() => {
		const divTag = wrapper.find('div').at(3); //last div
		divTag.simulate('click');
		const onCloseActionCount = onCloseActionMock.mock.calls.length;
		expect(onCloseActionCount).toBeDefined();
	});
});
describe('MessageBanner Component Test Suite - canClose: false', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
			description: 'descriptionString',
			color: 'colorString',
			icon: 'iconString',
			canClose: false,
			className: 'classNameString',
			params: ['a','b'],
			onCloseAction:jest.fn()
		};
		wrapper = shallow(<MessageBanner {...props} />);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
});