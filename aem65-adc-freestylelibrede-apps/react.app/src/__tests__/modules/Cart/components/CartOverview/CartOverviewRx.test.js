import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import CartOverviewRx from '../../../../../modules/Cart/components/CartOverview/CartOverviewRx';

Enzyme.configure({
	adapter: new EnzymeAdapter(),
	// disableLifecycleMethods: true
});

describe('CartOverviewRx Component Test Suite', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
			informationMessage: 'informationMessageString',
			informationMessageHeading: 'informationMessageHeadingString',
		};
		wrapper = shallow(<CartOverviewRx {...props} />);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
	test('div tag renders another div',() => {
		expect(wrapper.type()).toBe('div');
		expect(wrapper.props().children.length).toBe(2);
	});
	test('div tag renders 2 child divs',() => {
		expect(wrapper.props().children[0].type).toBe('div');
		expect(wrapper.props().children[1].type).toBe('div');

	});
	test('1st div tag renders 5 divs',() => {
		expect(wrapper.props().children[0].props.children.length).toBe(5);
		expect(wrapper.props().children[0].props.children[0].type).toBe('div');
		expect(wrapper.props().children[0].props.children[1].type).toBe('div');
		expect(wrapper.props().children[0].props.children[2].type).toBe('div');
		expect(wrapper.props().children[0].props.children[3].type).toBe('div');
		expect(wrapper.props().children[0].props.children[4].type).toBe('div');

	});
	test('2nd div tag renders h5, div ',() => {
		expect(wrapper.props().children[1].props.children[0].type).toBe('h5');
		expect(wrapper.props().children[1].props.children[1].type).toBe('div');

	});
});


