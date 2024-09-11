import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import CartOverviewRow from '../../../../../modules/Cart/components/CartOverview/CartOverviewRow';

Enzyme.configure({
	adapter: new EnzymeAdapter(),
	// disableLifecycleMethods: true
});

describe('CartOverviewRow Component Test Suite', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
			name: 'String',
			price: 10,
			quantity: 2,
			image: 'String',
			pdpLink: 'String',
			currency: 'String'
		};
		wrapper = shallow(<CartOverviewRow {...props} />);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
	test('parent tag renders 2 rows',() => {
		expect(wrapper.props().children.length).toBe(2);
		expect(wrapper.props().children[0].type.name).toBe('Row');
		expect(wrapper.props().children[1].type.name).toBe('Row');

	});
	test('1st row  renders 4 children',() => {
		expect(wrapper.props().children[0].type.name).toBe('Row');
		expect(wrapper.props().children[0].props.children.length).toBe(4);
		expect(wrapper.props().children[0].props.children[0].props.children.type.name).toBe('CartRowImage');
	});
	test('2nd row  renders 1 child',() => {
		expect(wrapper.props().children[1].type.name).toBe('Row');
	});
});


