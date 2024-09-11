import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import CartListItem from '../../../../../modules/Cart/components/MiniCart/CartListItem';

Enzyme.configure({
	adapter: new EnzymeAdapter()
});

describe('CartListItem Component Test Suite', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
			id: 1,
			name: 'String',
			quantity: 1,
			price: 10,
			currency: 'String',
			uom: 1,
			image: 'String',
			pdpLink: 'String',
			isSubscription: false,
			deliveryDate: 'String',
			bundle: {'a':'b'}
		};
		wrapper = shallow(<CartListItem {...props} />);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
	test('div tag renders another div with 4 children',() => {
		expect(wrapper.type()).toBe('div');
		expect(wrapper.props().children.type).toBe('div');
		expect(wrapper.props().children.props.children.length).toBe(4);
	});
	test('CartRowImage render',() => {
		expect(wrapper.props().children.props.children[0].type).toBe('div');
		expect(wrapper.props().children.props.children[0].props.children.type.name).toBe('CartRowImage');
	});
	test('MiniCartRowInfo render',() => {
		expect(wrapper.props().children.props.children[1].type).toBe('div');
		expect(wrapper.props().children.props.children[1].props.children.type.name).toBe('MiniCartRowInfo');
	});
	test('MiniCartProductPrice render',() => {
		expect(wrapper.props().children.props.children[2].type).toBe('div');
		expect(wrapper.props().children.props.children[2].props.children.type.name).toBe('MiniCartProductPrice');
	});
	test('DeleteCartItem render',() => {
		expect(wrapper.props().children.props.children[3].type).toBe('div');
		expect(wrapper.props().children.props.children[3].props.children.type).toBe('span');
		expect(wrapper.props().children.props.children[3].props.children.props.children.type.displayName).toBe('Connect(DeleteCartItem)');

	});
});


