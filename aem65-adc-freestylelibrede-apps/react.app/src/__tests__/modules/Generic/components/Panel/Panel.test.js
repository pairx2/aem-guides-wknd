import React from 'react';
import Panel from '../../../../../modules/Generic/components/Panel/Panel';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

Enzyme.configure({
	adapter: new EnzymeAdapter(),
	// disableLifecycleMethods: true
});

describe('Panel Component Test Suite', () => {
	let props;
	let wrapper;
	let image,items;
	beforeEach(() => {
		props = {
			image: 'imageProp',
			items : [{'icon':'icon','text':'text'},{'icon':'icon','text':'text'}]
		};
		wrapper = shallow(<Panel {...props} />);
		image = 'imageProp',
		items = [{'icon':'icon','text':'text'},{'icon':'icon','text':'text'}];
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('has image as prop', () => {
		const imageProp = wrapper.props().children.props.children[0].props.src;
		expect(imageProp).toEqual(image);
		expect(typeof imageProp).toBe('string');
	});
	test('has items as prop', () => {
		const itemsProp = [{'icon':'icon','text':'text'},{'icon':'icon','text':'text'}]; //will pass
		expect(itemsProp).toStrictEqual(items);
		expect(itemsProp).toBeInstanceOf(Array);
	});
	test('2 items map render',() => {
		//6 are other parent divs , 2 are items map divs
		expect(wrapper.find('div').length).toBe(8);
		expect(wrapper.find('i').first()).toBeDefined();
		expect(wrapper.find('h4').first()).toBeDefined();
	});
	test('image is getting rendered', () => {
		expect(wrapper.props().children.props.children[0].type.name).toBe('Image');
	});
	test('items map div is getting rendered', () => {
		expect(wrapper.props().children.props.children[1].props.children.props.children.props.children.type).toBe('div');
	});
	test('each item div is getting rendered', () => {
		expect(wrapper.props().children.props.children[1].props.children.props.children.props.children.props.children[0].type).toBe('div');
	});
});


